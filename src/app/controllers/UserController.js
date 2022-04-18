//metodos: só pode ter apenas um metodo
// store => Cadastrar / adicionar
// index => Listar vários
// show => Listar aoenas um 
// update => Atualizar
//delete => Deletar

import { v4 } from 'uuid';
import User from '../models/User';
import * as Yup from 'yup'  //para validar as informações que o front-end envia para o back


class UserController{
    async store(req,resp){

        //validando as entradas
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })

        //verificando as entradas e retornando os erros
        try {
            await schema.validateSync(req.body, { abortEarly: false })
        } catch(err) {
            return resp.status(400).json({error: err.errors})
        }

        const {name, email, password, admin} = req.body

        //verificar se o email do usuário já está cadastrado
        const userExists = await User.findOne({
            where: { email },
        })

        if(userExists){
            return resp.status(409).json({error: 'User already exists'})
        }

        console.log(userExists)

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        })

        return resp.status(201).json({id: user.id, name, email, admin})
    }
}

export default new UserController()