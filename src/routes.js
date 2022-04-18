import {Router} from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import ProductController from './app/controllers/ProductController'
import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'

import authMiddleware from './app/middlewares/auth'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const upload = multer(multerConfig)


const routes = new Router()

routes.get('/', (req, res)=>{
  return res.json({massege: "Seja bem  vindo ao Code Burgue"})
})

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products',  ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/category',  upload.single('file'), CategoryController.store)
routes.get('/categories',  CategoryController.index)
routes.put('/category/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders',  OrderController.index)

export default routes
