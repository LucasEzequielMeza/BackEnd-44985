import { Router } from "express";
import Products from "../../dao/dbManagers/products.manager.js";

const router = Router()
const productsManager = new Products()

router.get('/products', async (req, res) => {
    const product = await productsManager.getAll()
    res.render('products', product)
})

export default router