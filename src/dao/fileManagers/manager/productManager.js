import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts () {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            if (contenido.length > 0) {
                const productos = JSON.parse(contenido)
                return productos
            } else {
                return []
            }
        } catch (error) {
            return 'El archivo no puede ser leido'
        }
    }

    async addProduct (producto) {
        try {
    
            if (fs.existsSync(this.path)) {
                const productos = await this.getProducts();
                if (productos.length > 0) {
                    const ultimoId = productos[productos.length - 1].id + 1
                    producto.id = ultimoId
                    productos.push(producto)
                    await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
                } else {
                    producto.id = 1
                    await fs.promises.writeFile(this.path, JSON.stringify([producto], null, 2))
                }
            } else {
                producto.id = 1
                await fs.promises.writeFile(this.path, JSON.stringify([producto], null, 2))
            }
        } catch (error) {
            return "El producto no pudo ser guardado";
        }
    }

    async getProductById (id) {
        try {
            const productos = await this.getProducts();
            const producto = productos.find(elemento => elemento.id === id);
            return producto
        } catch (error) {
            return 'No es posible encontrar el producto indicado'
        }
    }

    async updateById (id, nuevoValor) {
        const products = await this.getProducts()

        try {
            const updateProducts = products.map((product) => {
                if (product.id === id) {
                    product = nuevoValor
                    return {... product, id}
                } else {
                    return {...product}
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateProducts))
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById (id) {
        try {
            const productos = await this.getProducts()
            const newProductos = productos.filter(elemento => elemento.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newProductos, null, 2));
            return `El producto ${id} fue eliminado`
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll () {
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    }

    async getCarts () {
        try {
            const contenido = await fs.promises.readFile(this.path, 'utf-8')
            if (contenido.length > 0) {
                const cart = JSON.parse(contenido)
                return cart
            } else {
                return []
            }
        } catch (error) {
            return 'El archivo no puede ser leido'
        }
    }

    async getCartById (id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(elemento => elemento.id === id);
            return cart
        } catch (error) {
            return 'No es posible encontrar el carrito indicado'
        }
    }

    async addCarts (cart) {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await this.getCarts();
                if (carts.length > 0) {
                    const ultimoId = carts[carts.length - 1].id + 1
                    cart.id = ultimoId
                    carts.push(cart)
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
                } else {
                    cart.id = 1
                    await fs.promises.writeFile(this.path, JSON.stringify([cart], null, 2))
                }
            } else {
                cart.id = 1
                await fs.promises.writeFile(this.path, JSON.stringify([cart], null, 2))
            }
        } catch (error) {
            return "El producto no pudo ser guardado";
        }
    }

    addProductToCart = async (cartId, productId) => {
        const carritos = await this.getCarts()
        try {
            let carritoIndex = carritos.findIndex((cart) => cart.id === cartId);
            if(carritoIndex != -1) {
                console.log(carritos[carritoIndex].products);
                let productoIndex = carritos[carritoIndex].products.findIndex((p) => p.product === productId); 
                console.log('HOLA',productoIndex)
                if(productoIndex != -1) {
                    carritos[carritoIndex].products[productoIndex].quantity++
                }
                else {

                    carritos[carritoIndex].products.push({
                        product:productId,
                        quantity:1
                    })
                }
            }
            
            else{
                console.log("El carrito no existe");
            }
        
            await fs.promises.writeFile(this.path, JSON.stringify(carritos, null, 2));
        } catch (error) {
            console.log(error)
        }
    }
}
