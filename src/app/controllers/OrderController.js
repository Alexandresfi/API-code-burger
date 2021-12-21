import * as Yup from 'yup'  //para validar as informações que o front-end envia para o back
import Product from '../models/Product'
import Category from '../models/Category'
import Order from '../schemas/Order'
import User from '../models/User'


class OrderController{
    async store(req,resp){

        const schema = Yup.object().shape({
            products: Yup.array().required()
            .of(
                Yup.object().shape({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
           
        })

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch(err) {
            return resp.status(400).json({error: err.errors})
        }

        const productsId = req.body.products.map(product => product.id) //é possível pegar o id e ir lá no outro banco de dados e pegar as informações que estão lá.
        
        const updateProducts = await Product.findAll({
            where: {
                id: productsId, //pegando as informações no outro banco de dados pelos id fornecidos.
            },
            include : [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        })

        const editedProduct = updateProducts.map(product => {

            const productIndex = req.body.products.findIndex(
                requestProduct => requestProduct.id === product.id
            )

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category.name,
                url: product.url,
                quantity: req.body.products[productIndex].quantity,
                
            }
            return newProduct
        })

        const order = {
            user: {
                id: req.userId,
                name: req.userName,
            },
            products: editedProduct,
            status: 'Pedido realizado',
        }

        const orderResponse = await Order.create(order)

        return resp.status(201).json(orderResponse)

    }

    async index(req, res){ // Para ver todos os orders
        const orders = await Order.find()

        return res.json(orders)
    }

    async update(req, res){

        const schema = Yup.object().shape({ //verificando se o status está sendo enviado corretamente
            status: Yup.string().required(), 
        })

        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch(err) {
            return res.status(400).json({error: err.errors})
        }

        const {admin: isAdmin} = await User.findByPk(req.userId)
        
        if(!isAdmin){
            return res.status(401).json()
        }

        const {id} = req.params
        const {status} = req.body

        try {
            await Order.updateOne({_id: id}, {status})
        } catch(error) {
            return res.status(400).json({error: error.message})
        }

        return res.json({message: 'Status updated sucessfully'})
    }

}

export default new OrderController()