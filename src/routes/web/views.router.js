import { Router } from "express";
import Products from "../../dao/dbManagers/products.manager.js";
import Carts from "../../dao/dbManagers/carts.manager.js"

const router = Router()
const productsManager = new Products()
const cartsManager = new Carts()

router.get('/products', async (req, res) => {
    const { limit, page, query, sort} = req.query
    try {
        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages} = await productsManager.getAll(limit, page, query, sort)
        const products = docs.map((product) => product.toObject())

        res.render('products', {
            products: products,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
            totalPages,
            styles:'css/products.css'
        })
    } catch (error) {
        console.log(error)
    }
})



export default router