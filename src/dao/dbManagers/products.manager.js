import { productsModel } from "../models/products.js";
export default class Products {
    constructor () {
        console.log('Working products with DB in mongoDB')
    }

    getAll = async (limit = 10, page = 1, query = '', sort = '') => {
        const products = await productsModel.paginate({title: {$regex: query}}, {limit, page, sort: {price: sort}})
        return products
    }

    getProductById = async (id) => {
        const product = await productsModel.findById({ _id: id })
        return product
    }

    save = async (product) => {
        const result = await productsModel.create(product)
        return result
    }

    updateById = async (id, product) => {
        const result = await productsModel.updateOne({_id: id}, product)
        return result
    }

    deleteById = async (id) => {
        const result = await productsModel.deleteOne({_id: id})
        return result
    }

    delete = async () => {
        const result = await productsModel.deleteMany()
        return result
    }

}