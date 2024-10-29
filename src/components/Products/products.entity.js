export class Product {
    constructor({ id = 0, name = '', description = '', price = '', rating = 0, image = '' }) {
        this.id = id; // ID del producto
        this.name = name; // Nombre del producto
        this.description = description; // Descripción del producto
        this.price = price; // Precio del producto
        this.rating = rating; // Calificación del producto
        this.image = image; // Imagen del producto
    }
}
