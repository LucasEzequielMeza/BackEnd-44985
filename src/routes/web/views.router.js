import { Router } from "express";
import Products from "../../dao/dbManagers/products.manager.js";
import Carts from "../../dao/dbManagers/carts.manager.js"

const router = Router()
const productsManager = new Products()
const cartsManager = new Carts()

const publicAccess = (req, res, next) => {
    if(req.session.user) return res.redirect('/productos');
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}


router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});


router.get('/reset', publicAccess, (req, res) => {
    res.render('resetPassword');
});


router.get('/productos', privateAccess, async (req, res) => {
    const { limit, page, query, sort} = req.query
    try {
        const {docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPages} = await productsManager.getAll(limit, page, query, sort)
        const products = docs.map((product) => product.toObject())

        res.render('products', {
            user: req.session.user,
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