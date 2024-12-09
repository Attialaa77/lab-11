class ProductProperties {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getTotalValue() {
        return this.price * this.quantity;
    }

    toString() {
        return `Product: ${this.name}, Price: $${this.price.toFixed(2)}, Quantity: ${this.quantity}`;
    }

    static applyDiscount(products, discount) {
        products.forEach(product => {
            product.price -= product.price * discount;
        });
    }
}

class PerishableProductProperties extends ProductProperties {
    constructor(name, price, quantity, expirationDate) {
        super(name, price, quantity);
        this.expirationDate = expirationDate;
    }

    toString() {
        return `${super.toString()}, Expiration Date: ${this.expirationDate}`;
    }
}

// Store Class
class Store {
    constructor() {
        this.inventory = [];
    }

    addProduct(product) {
        this.inventory.push(product);
    }

    getInventoryValue() {
        return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
    }

    findProductByName(name) {
        return this.inventory.find(product => product.name.toLowerCase() === name.toLowerCase()) || null;
    }
}

const myStore = new Store();
myStore.addProduct(new ProductProperties("Apple", 2.5, 50));
myStore.addProduct(new ProductProperties("Banana", 1.2, 100));
myStore.addProduct(new PerishableProductProperties("Milk", 1.5, 10, "2024-12-31"));
myStore.addProduct(new PerishableProductProperties("Yogurt", 2.0, 20, "2024-12-20"));
myStore.addProduct(new ProductProperties("Bread", 3.0, 30));

function showInventoryValue() {
    const totalValue = myStore.getInventoryValue().toFixed(2);
    document.getElementById("outputText").textContent = `Total Inventory Value: $${totalValue}`;
}

function applyDiscount() {
    ProductProperties.applyDiscount(myStore.inventory, 0.15);
    const totalValueAfterDiscount = myStore.getInventoryValue().toFixed(2);
    document.getElementById("outputText").textContent = `Total Inventory Value after 15% discount: $${totalValueAfterDiscount}`;
}

function findProduct() {
    const productName = prompt("Enter the product name to find:");
    const foundProduct = myStore.findProductByName(productName);
    if (foundProduct) {
        document.getElementById("outputText").textContent = foundProduct.toString();
    } else {
        document.getElementById("outputText").textContent = "Product not found.";
    }
}

// results when the button is clicked
function showResults() {
    const resultText = document.getElementById("outputText").textContent;
    alert(resultText); }
