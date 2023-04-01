import { cartsModel } from "../models/carts.js"
import { productsModel } from "../models/products.js";
import Products from "./products.manager.js"

const productsManager = new Products();

export default class Carts {
    constructor () {}

    getAll = async () => {
        const carts = await cartsModel.find()
        return carts.map(cart => cart.toObject())
    }

    save = async () => {
        let cart = {
            products: []
        }
        const result = await cartsModel.create(cart)
        return result
    }

    getProductsCart = async (cartId) => {
        const cart = await cartsModel.findById({ _id: cartId }).populate({
            path: 'products.product',
            model: 'products'
        })

        if (!cart) {
            return { message: 'El carrito seleccionado no existe'}
        }

        return cart.products
    }

    addProductToCart = async (cartId, productId) => {
        const cart = await cartsModel.findById({ _id: cartId})

        if (!cart) {
            return { message: 'El carrito no existe' };
        }

        const product = await productsModel.findById(productId)

        if (!product) {
            return { message: 'El producto que desea agregar no existe' };
        }

        const productsCart = cart.products
        const productIndex = productsCart.findIndex((product) => product.product = productId)
        console.log(productIndex)

        if (productIndex === -1) {
            const result = await cartsModel.findByIdAndUpdate({ _id : cartId}, { $push: { products: { "product": productId, "quantity": 1}}})
            return result
        } else {
            const result = await cartsModel.updateOne({ _id : cartId , "products.product": productId}, { $inc: { "products.$.quantity": 1}})
            return result
        }

    }

    deleteProductToCart = async (cartId, productoId) => {
        const cart = await cartsModel.findById({ _id: cartId })
        if (!cart) {
            return { message: 'El carrito seleccionado no existe'}
        }
        const productsCart = await cartsModel.updateOne({ _id: cartId }, { $pull: { products: { 'product': productoId}}})
        return productsCart
    }

    updateProductToCart = async (cartId, product) => {
        const cart = await cartsModel.findById({ _id: cartId})
        if (!cart) {
            return { message: 'El carrito no existe' };
          }
      
          const result = await cartsModel.updateOne({ _id: cartId}, { "products": product });
          return result;
    }

    updateQuantityProductToCart = async (cartId, productId, quantity) => {
        const cart = await cartsModel.findById({ _id: cartId })

        if (!cart) {
            return { message: 'El carrito seleccionado no existe'}
        }

        const productsCart = cart.products
        const productIndex = productsCart.findIndex(product => product.product === productId)

        if (productIndex === -1) {
            return { message: 'El producto seleccionado no existe'}
        } else {
            const result = await cartsModel.updateOne({ _id: cartId, 'products.product': productId}, { 'products.$.quantity': quantity })
            return result
        }
    }

    emptyCart = async (cartId) => {
        const cart = cartsModel.findById({ _id: cartId})
        if (!cart) {
            return { message: 'El carrito no existe' };
        }

        const result = await cartsModel.updateOne({ _id: cartId}, { 'products': []})
        return result
    }

}