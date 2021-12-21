//responsável por logar o usuário
import * as Yup from 'yup'
import jwt  from 'jsonwebtoken'
import authConfig from '../../config/auth'
import User from '../models/User'

class SessionController {
    async store(req, resp){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const userEmailOrPasswprdIncrrect = () =>{
            return resp
            .status(401)
            .json({error:'Make sure your password or email are correct'})
        }

        //isValid só retorna se a informação for falsa
        if(!(await schema.isValid(req.body))){
            userEmailOrPasswprdIncrrect()
        }

        const {email, password } = req.body

        const user = await User.findOne({
            where: { email },
        })

        if(!user){
            userEmailOrPasswprdIncrrect()
        }

        //mandando o password para o User  
        if(!(await user.checkPassword(password))){
            userEmailOrPasswprdIncrrect()
        }

        return resp.json({
            id: user.id,
            email,
            name:user.name,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name },
                authConfig.secret,
                {expiresIn: authConfig.expiresIn},) //gerador de token
            })
    }

}

export default new SessionController()