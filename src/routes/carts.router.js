import { Router } from "express";
import ProductManager from "./../dao/fileManagers/manager/productManager.js";
const productManager = new ProductManager('carts.txt');
const routerCarts = new Router();

routerCarts.post('/', async (req, res) => {
    const newCart = req.body
    if (!newCart.products || Array.isArray(newCart.products) == false) {
        return res.status(400).send({status: 'error', message: 'Valores incompletos'})
    }
    const carts = await productManager.addCarts(newCart)
    res.send({status: 'correcto', message: 'Producto creado'})
})

routerCarts.get('/:cid', async (req, res) => {
    const idCarts = Number(req.params.cid)
    const cart = await productManager.getCartById(idCarts)
    res.send({cart})
})


routerCarts.post('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid)
        const idProduct = Number(req.params.pid)

        await productManager.addProductToCart(idCart, idProduct)

        res.status(200).send({status: 'Ok', message: 'Producto agregado'})
    } catch (error) {
        console.log(error)
    }
})

export default routerCarts