import { cartsModel } from "../models/carts.js"
import { productsModel } from "../models/products.js"
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
        console.log('Id carrito',cartId)
        console.log('Id producto', productId)
        try {
            let carritoIndex = carritos.findIndex((cart) => cart.id === cartId)
            console.log('CarritoIndex', carritoIndex)
            if (carritoIndex != -1) {
                let productoIndex = carritos[carritoIndex].cart.findIndex((product) => product.id === productId)
                console.log('Producto Index',productoIndex)
                if (productoIndex = -1) {
                    carritos[carritoIndex].cart.push({
                        product:productId,
                        quantity: 1
                    })
                } else {
                    carritos[carritoIndex].cart[productoIndex].quantity + 1
                }
            } else {
                console.log('El carrito no existe')
            }
        } catch (error) {
            console.log(error)
        }
    }
}