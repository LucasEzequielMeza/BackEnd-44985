import mongoose from "mongoose";

const cartsCollections = 'carts'

const cartsSchema = new mongoose.Schema({
    cart: {
        type: Array,
        default: []
    }
})

export const cartsModel = mongoose.model(cartsCollections, cartsSchema)
