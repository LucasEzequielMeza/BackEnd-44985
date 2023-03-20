// import express from 'express';
// import productsRouter from './routes/products.router.js';
// import routerCarts from './routes/carts.router.js';

// const app = express();

// app.use(express.json());

// app.use(express.urlencoded({extended: true}))

// app.use('/api/products', productsRouter)

// app.use('/api/cart', routerCarts);

// app.listen(8000, () => console.log('Server runing'))

import express from 'express';
import __dirname from './utils.js'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import viewsRouter from './routes/web/views.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

const app = express()

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

try {
    await mongoose.connect('mongodb+srv://lukassl19972016:mXglQ93OmNNZpSUO@lucasezequielcoderhouse.ez3iygk.mongodb.net/proyectoFinal?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}

app.listen(8080, console.log('Server Runing'))