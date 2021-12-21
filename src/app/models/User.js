//responsável por gravar as informações no banco de dados
import Sequelize, { Model }  from "sequelize";

import bcrypt from 'bcrypt' //vai gerar o password criptografado

class User extends Model{ //herança da class Model
    static init(sequelize){ //quando usamos o static não precisamos instânciar o metodo User, aqui estamos criado um init
        super.init({ //campos que o usuário terá, dar uma olhada nas migrations
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL, //não vai aparecer lá no banco de dados
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        }, {
            sequelize,
        })
        //criptografando a senha
        this.addHook('beforeSave', async (user)=>{
            if(user.password) {
                user.password_hash = await bcrypt.hash(user.password,10)
            }
        })

        return this
    } 

    //verificando de a senha do login é igual a do database
    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    }
        
}

export default User