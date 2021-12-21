import multer from "multer"
import {v4} from 'uuid'
import {extname, resolve} from 'path'


//não podemos guardar imagens dentro de um banco de dados, o que fazemos
// é mandar uma referência (um link) de onde está imagem está.
//Existe um servidor próprio para guarda imagens CDN, por enquanto as imagens
//serão guardadas dentro da nossa aplicação
export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback)=>{
            callback(null, v4() + extname(file.originalname))
        }
    })
}