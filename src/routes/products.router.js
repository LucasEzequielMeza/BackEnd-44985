import { Router } from "express";
import ProductManager from "../manager/productManager.js";
const productsRouter = new Router()

const productManager = new ProductManager('productos.txt')

productsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit)
    if (!limit || limit > products.length) {
        return res.send({products})
    }
    const arrLimit = products.slice(products[0], limit)
    res.send(arrLimit)
})

productsRouter.get('/:pid', async (req, res) => {
    const idProducts = Number(req.params.pid)
    const products = await productManager.getProductById(idProducts)
    res.send({products})
})

productsRouter.post('/', async (req, res) => {
    const newProduct = req.body
    if (!newProduct.titulo || !newProduct.descripcion || !newProduct.codigo || !newProduct.precio || !newProduct.estado || !newProduct.stock || !newProduct.categoria) {
        return res.status(400).send({status: 'error', message: 'Valores incompletos'})
    }
    const products = await productManager.addProduct(newProduct)
    res.send({status: 'correcto', message: 'Producto creado', products})
})

productsRouter.put('/:pid', async (req, res) => {
    // try {
    //     const productId = Number(req.params.pid)
    //     const products = await productManager.getProducts()
    //     const index = products.findIndex((elemId) => elemId.id === productId)

    //     if (index < 0) {
    //         return res.status(404).json({
    //             msg: `El producto con id ${id} no existe`,
    //           });
    //     }

    //     products[index] = {
    //         id: productId,
    //         titulo: req.body.titulo,
    //         descripcion: req.body.descripcion,
    //         codigo: req.body.codigo,
    //         precio: req.body.precio,
    //         estado: req.body.estado,
    //         stock: req.body.stock,
    //         categoria: req.body.categoria
    //     }

    //     await productManager.getProducts(products)

    //     res.send({message: 'Producto actualizado'})
        
    // } catch (error) {
    //     console.log(error)
    // }
    const product = Number(req.params.pid)
    const updateProduct = await productManager.updateById(product)
    res.send({message: 'Producto actualizado'})
})

productsRouter.delete('/:pid', async (req, res) => {
    const productId = Number(req.params.pid)
    const deleteProduct = await productManager.deleteById(productId)
    res.send({status: 'correcto', message: 'Producto eliminado', deleteProduct})
})

export default productsRouter