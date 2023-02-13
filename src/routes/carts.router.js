import { Router } from "express";
import ProductManager from "../manager/productManager.js";
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


routerCarts.post('/:cid/product/:pid', (req, res) => {
    try {
        const idCart = Number(req.params.cid)
        const newProduct = req.body
        if (!newProduct.id || !newProduct.titulo || !newProduct.descripcion || !newProduct.codigo || !newProduct.precio || !newProduct.estado || !newProduct.stock || !newProduct.categoria) {
            return res.status(400).send({status: 'error', message: 'Valores incompletos'})
        }
        const {products} = idCart

        if (products.length > 0) { //Si la longitud es menor a cero, pusheo el nuevo producto dentro del array

            // products que corresponde al carrito con “id” = 1
            
            products.push(newProduct.id)
            
            products.quantity = 1 //Pongo la cantidad = 1
            
            } else if (products.filter(elem => elem.id === products.id)) { //Pregunto si dentro del array products hay
            
            // un producto con el id que tiene producto (del req.body)
            
            newProduct.quantity = newProduct.quantity + 1
            
            products.push(newProduct.id)
            
            } else {
            
            products.push(newProduct.id)
            
            }
            

    } catch (error) {
        console.log(error)
    }
})

export default routerCarts