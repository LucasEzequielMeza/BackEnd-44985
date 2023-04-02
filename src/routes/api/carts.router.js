import { Router } from "express";
import { cartsModel } from "../../dao/models/carts.model.js";
import Carts from "../../dao/dbManagers/carts.manager.js";

const cartsManager = new Carts()

const router = Router()

router.get('/', async (req, res) => {
    try {
        const carts = await cartsManager.getAll()
        res.send({status: 'success', payload: carts})
    } catch (error) {
        res.status(400).send({status: "Error", message: error})
    }
})

router.post('/', async (req, res) => {
    const cart = req.body
    try {
        const result = await cartsManager.save(cart)

        res.send({status: 'success', payload: result})
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async (req, res) => {
    const idCart = req.params.cid
    try {
        const cart = await cartsManager.getProductsCart(idCart)
        res.send({ message: "Success", payload: cart });
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid
        const idProduct = req.params.pid

        const result = await cartsManager.addProductToCart(idCart, idProduct)
        res.status(200).send({status: 'success', message: 'Product added successfully', payload: result})
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    try {
        const result = await cartsManager.deleteProductToCart(idCart, idProduct)
        res.send({ message: "Success", payload: result });
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
})


router.put('/:cid', async (req, res) => {
    const idCart = req.params.cid
    const product = req.body
    try {
        const result = await cartsManager.updateProductToCart(idCart, product)
        res.send({message: 'success', payload: result})
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
})

router.put('/:cid/products/pid', async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    const quantity = req.body
    try {
        const result = await cartsModel.updateQuantityProductToCart(idCart, idProduct, quantity)
        res.send({message: 'success', payload: result})
    } catch (error) {
        res.status(400).send({status: "Error",message: "Ha ocurrido un inconveniente en el servidor"});
    }
})

export default router

