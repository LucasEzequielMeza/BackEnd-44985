import { Router } from "express";
import { cartsModel } from "../../dao/models/carts.js";
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

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const idCart = req.params.cid
        const idProduct = req.params.pid

        await cartsManager.addProductToCart(idCart, idProduct)

        res.status(200).send({status: 'success', message: 'Product added successfully'})
    } catch (error) {
        console.log(error)
    }
})

export default router

