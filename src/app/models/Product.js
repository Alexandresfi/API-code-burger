import Sequelize, {Model} from "sequelize"

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.STRING,
            path: Sequelize.STRING,
            offer: Sequelize.BOOLEAN,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:3000/product-file/${this.path}`
                },
            },
        },
        {
            sequelize,
        })
            return this
    }

    static associate(models){ //relacionamento de tabaleas
        this.belongsTo(models.Category, {
            foreignKey: 'category_id', //está dizendo que este campo (category_id) é estrangeiro, isto é, ele não é dessa tabela
            as: 'category'
        }) 
    }
}

export default Product