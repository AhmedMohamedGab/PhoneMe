// get page elements

let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let productName = document.getElementById('product-name');
let category = document.getElementById('category');
let count = document.getElementById('count');
let createBtn = document.getElementById('create-btn');
let deleteAllBtn = document.getElementById('delete-all-btn');
let productTableBody = document.getElementById('product-table-body');

// initializations

let productData = [];   // array to hold products
// if local storage already has products ->
if (localStorage.getItem('productData')) {
    // add existing products to the productData array
    productData = JSON.parse(localStorage.getItem('productData'));
    // display existing products in the products table
    constructTable();
    // show the delete all button
    deleteAllBtn.classList.remove('hide');
}

// get total price of products and display it if valid

function getTotal() {
    // if no price entered -> no total will be calculated
    if (price.value == '') {
        total.innerHTML = '0';
        total.style.background = "#407ba7";
    } else {
        // calculate total
        let tempTotal = +price.value + +tax.value + +ads.value - +discount.value;
        // if total <= 0 (not valid) -> don't display it
        if (tempTotal <= 0) {
            total.innerHTML = '0';
            total.style.background = "#407ba7";
        } else {
            // display total
            total.innerHTML = `${tempTotal}`;
            total.style.background = "#e63946";
        }
    }
}

// create new product

function createProduct() {
    // object that takes user inputs
    let newProduct = {
        productName: productName.value,
        category: category.value,
        count: count.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML
    }
    // add the new product to the productData array (array that holds all products)
    productData.push(newProduct);
    // copy the productData array to local storage
    localStorage.setItem('productData', JSON.stringify(productData));
    // display the new product in products table
    addProduct(newProduct);
    // clear input fields after user clicks the create button
    clearInputs();
    // there is at least one product now, so show the delete all button
    deleteAllBtn.classList.remove('hide');
}

// clear input fields after user clicks the create button

function clearInputs() {
    productName.value = ''
    category.value = ''
    count.value = ''
    price.value = ''
    tax.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = '0'
    total.style.background = "#407ba7";
}

// get existing products from productData array and display them in the products table

function constructTable() {
    let table = '';  // a variable to store existing products in a table
    for (let index = 0; index < productData.length; index++) {
        // table variable stores a table having product details
        table += `
            <tr>
                <td>${index + 1}</td>
                <td>${productData[index].productName}</td>
                <td>${productData[index].category}</td>
                <td>${productData[index].count}</td>
                <td>${productData[index].price}</td>
                <td>${productData[index].tax}</td>
                <td>${productData[index].ads}</td>
                <td>${productData[index].discount}</td>
                <td>${productData[index].total}</td>
                <td><button class="btn btn-primary update-btn">Update</button></td>
                <td><button class="btn btn-danger delete-btn" onclick="deleteItem(${index})">Delete Item</button></td>
                <td><button class="btn btn-danger delete-btn" onclick="removeProduct(${index})">Remove Product</button></td>
            </tr>
        `;
    }
    productTableBody.innerHTML = table; // display the table in HTML
}

// Read data of new product and add it to the products table

function addProduct(newProduct) {
    // tableRow variable stores a table row having new product details
    let tableRow = `
        <tr>
            <td>${productData.length}</td>
            <td>${newProduct.productName}</td>
            <td>${newProduct.category}</td>
            <td>${newProduct.count}</td>
            <td>${newProduct.price}</td>
            <td>${newProduct.tax}</td>
            <td>${newProduct.ads}</td>
            <td>${newProduct.discount}</td>
            <td>${newProduct.total}</td>
            <td><button class="btn btn-primary update-btn">Update</button></td>
            <td><button class="btn btn-danger delete-btn" onclick="deleteItem(${productData.length - 1})">Delete Item</button></td>
            <td><button class="btn btn-danger delete-btn" onclick="removeProduct(${productData.length - 1})">Remove Product</button></td>
        </tr>
    `;
    productTableBody.innerHTML += tableRow; // append the table row to the products table
}

// remove product from products table (delete all product items)

function removeProduct(productIndex) {
    productData.splice(productIndex, 1);    // remove product from the productData array
    localStorage.productData = JSON.stringify(productData); // update local storage with the new array
    constructTable();   // refresh the products table
}

// delete a single item of a product (delete a single instance of the product)

function deleteItem(productIndex) {
    // if the product has just one item -> remove the product
    if (productData[productIndex].count == 1) {
        removeProduct(productIndex);
    } else {
        productData[productIndex].count--;  // decrement number of items of the product
        localStorage.productData = JSON.stringify(productData); // update local storage with the new array
        constructTable();   // refresh the products table
    }
}