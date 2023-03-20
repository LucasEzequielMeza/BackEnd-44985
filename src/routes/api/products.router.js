import { Router } from 'express'
import { productsModel } from '../../dao/models/products.js'
import Products from '../../dao/dbManagers/products.manager.js'

const productsManager = new Products()

const router = Router()

router.get('/', async (req, res) => {

    const {limit, page, sort, query} = req.query
    
    try {
        // const products = await productsManager.getAll(limit, page, query, sort)
        // res.send({status: 'success', payload: products})
        const products = await productsManager.getAll(limit, page, query, sort)
        res.send({status: 'success', playload: products})
    } catch (error) {
        res.status(400).send({status: "Error", message: error})
    }

})



router.get('/:id', async (req, res) => {
    const productId = req.params.id
    const product = await productsModel.find({_id: productId})
    res.json(product)

})

router.post('/', async (req, res) => {
    const newProduct = new productsModel(req.body)
    await newProduct.save()
    res.send(newProduct)
})

router.put('/:id', async (req, res) => {
    const newValue = req.body
    const productId = req.params.id
    await productsModel.updateOne({_id: productId}, newValue)
    res.status(200).send({status: 'success'})

})

router.delete('/', async (req, res) => {
    await productsModel.deleteMany()
    res.status(200).send({status: 'success'})
})

router.delete('/:id', async (req, res) => {
    const productId = req.params.id
    await productsModel.deleteOne({_id: productId})
    res.status(200).send({status: 'success'})
})

export default router