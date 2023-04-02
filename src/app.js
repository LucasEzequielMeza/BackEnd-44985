// Importaciones dependencias
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import passport from 'passport';
// Path absoluto
import __dirname from './utils.js'

// Importaciones de routers
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import sessionsRouter from './routes/api/session.router.js'
import viewsRouter from './routes/web/views.router.js'
import initializePassport from './config/passport.config.js';


const app = express()


// Parametros de conexion
const USER = 'lukassl19972016';
const PASSWORD = 'mXglQ93OmNNZpSUO';
const DATA_BASE = 'proyectoFinal';

// Conexion con Base de Datos
try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@lucasezequielcoderhouse.ez3iygk.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`)
} catch (error) {
    console.log(error)
}

// Persistencia en Base de Datos
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${USER}:${PASSWORD}@lucasezequielcoderhouse.ez3iygk.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true },
        ttl: 60
    }),
    secret:'secretCoder',
    resave: true,
    saveUninitialized: true 
}))

// Configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Estableciendo ruta publica
app.use(express.static(`${__dirname}/public`));

// Configuracion para recepcion de JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Configuracion motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


// Rutas
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)

// Socket

// Chat

// Enviar datos al usuario que lo solicite

// Iniciar servidor
app.listen(8080, console.log('Server Runing'))