import mongoose, {Schema} from "mongoose";

const cartsCollections = 'carts'

const cartsSchema = new mongoose.Schema({
    products: [{
        product: {
            type: Schema.ObjectId, 
            ref: 'products'
        },
        quantity: {
            type: Number,
            default: 0
        }
    }]
})

export const cartsModel = mongoose.model(cartsCollections, cartsSchema)
