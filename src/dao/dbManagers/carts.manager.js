import { cartsModel } from "../models/carts.js"
export default class Carts {
    constructor () {}

    getAll = async () => {
        const carts = await cartsModel.find()
        return carts
    }

    save = async (cart) => {
        const result = await cartsModel.create(cart)
        return result
    }

    addProductToCart = async (cartId, productId) => {
        const carritos = await cartsModel.find()
        try {
            let carritoIndex = carritos.findIndex((cart) => cart.id = cartId)
            console.log(carritoIndex)
            // if (carritoIndex != -1) {
            //     let productoIndex = carritos[carritoIndex].products.findIndex((product) => product.id === productId)
            //     console.log(productoIndex)
            //     if (productoIndex != -1) {
            //         carritos[carritoIndex].products[productoIndex].quantity + 1
            //     } else {
            //         carritos[carritoIndex].products.push({
            //             product:productId,
            //             quantity: 1
            //         })
            //     }
            // } else {
            //     console.log('El carrito no existe')
            // }
        } catch (error) {
            console.log(error)
        }
    }
}