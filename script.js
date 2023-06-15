const itemsGrid = document.querySelector('.items-grid');

let customers = [];
let products = [];

function addCustomerToTable(customer) {
    const customerTable = document.getElementById('customerTable');
    const row = customerTable.insertRow();
    row.innerHTML = `
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
    `;
}

function handleCustomerFormSubmit(event) {
    event.preventDefault();

    const customerForm = document.getElementById('customerForm');
    const firstNameInput = document.getElementById('customerFirstName');
    const lastNameInput = document.getElementById('customerLastName');

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    if (firstName && lastName) {
        const customer = { firstName, lastName };
        customers.push(customer);
        addCustomerToTable(customer);

        customerForm.reset();
        localStorage.setItem('customers', JSON.stringify(customers));
    }
}

function addProduct() {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productIdInput = document.getElementById('productId');
    const productPriceInput = document.getElementById('productPrice');

    const productName = productNameInput.value;
    const productId = productIdInput.value;
    const productPrice = productPriceInput.value;

    if (productName && productId && productPrice) {
        const product = { name: productName, id: productId, price: productPrice };
        products.push(product);

        productForm.reset();

        localStorage.setItem('products', JSON.stringify(products));

        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${product.id}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
}

function loadCustomersFromCache() {
    const cachedCustomers = localStorage.getItem('customers');
    if (cachedCustomers) {
        customers = JSON.parse(cachedCustomers);
        for (const customer of customers) {
            addCustomerToTable(customer);
        }
    }
}

function loadProductsFromCache() {
    const cachedProducts = localStorage.getItem('products');
    if (cachedProducts) {
        products = JSON.parse(cachedProducts);
        fillItemsGrid();
    }
}

function fillItemsGrid() {
    for (const product of products) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${product.id}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to cart</button>
        `;
        itemsGrid.appendChild(itemElement);
    }
}

const customerForm = document.getElementById('customerForm');
customerForm.addEventListener('submit', handleCustomerFormSubmit);

const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', function (event) {
    event.preventDefault();//bez reoladanja
    addProduct();
});

// Load customers and products from cache
loadCustomersFromCache();
loadProductsFromCache();
