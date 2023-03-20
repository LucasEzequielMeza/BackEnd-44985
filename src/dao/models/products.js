import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollections = 'products'

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    state: String,
    code: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model(productsCollections, productsSchema)


