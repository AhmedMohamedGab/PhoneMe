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
let mode = 'create';    // initial value of mode (available modes are create and update)
let savedIndex = 0; // a variable to save products indexes to access them in the productData array
// if local storage already has products ->
if (localStorage.getItem('productData') != null && localStorage.getItem('productData') != '') {
    // add existing products to the productData array
    productData = JSON.parse(localStorage.getItem('productData'));
    constructTable();   // display existing products in the products table
}

// get total price of the product and display it if valid

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
    // if invalid count -> count = 1
    if (newProduct.count <= 0) {
        newProduct.count = 1;
    }
    // if user in create mode ->
    if (mode === 'create') {
        // add the new product to the productData array (array that holds all products)
        productData.push(newProduct);
    } else {
        // user in update mode ->
        // replace old product in the productData array with updated product
        productData[savedIndex] = newProduct;
    }
    localStorage.setItem('productData', JSON.stringify(productData));   // copy the productData array to local storage
    constructTable();   // refresh the products table
    clearInputs();  // clear input fields after user clicks the create button
}

// clear input fields after user clicks the create button

function clearInputs() {
    // clear input fields
    productName.value = ''
    category.value = ''
    count.value = ''
    price.value = ''
    tax.value = ''
    ads.value = ''
    discount.value = ''
    // reset total box value and color
    total.innerHTML = '0'
    total.style.background = "#407ba7";
    mode = 'create';    // reset mode to create
    createBtn.value = 'Create'; // reset create button
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
                <td><button class="btn btn-primary edit-btn" onclick="editProduct(${index})">Edit</button></td>
                <td><button class="btn btn-danger delete-btn" onclick="deleteItem(${index})">Delete Item</button></td>
                <td><button class="btn btn-danger delete-btn" onclick="removeProduct(${index})">Remove Product</button></td>
            </tr>
        `;
    }
    productTableBody.innerHTML = table; // display the table in HTML
    // if there is any products ->
    if (productData.length > 0) {
        deleteAllBtn.classList.remove('hide');  // show the delete all button
        // show number of products on the delete all button
        deleteAllBtn.value = `Delete All ( ${productData.length} )`;
    } else {
        deleteAllBtn.classList.add('hide');  // hide the delete all button
    }
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

// delete all products in the table

function deleteAll() {
    productData = [];    // remove all products from the productData array
    localStorage.productData = ''; // remove all products from local storage
    deleteAllBtn.classList.add('hide');  // hide the delete all button
    productTableBody.innerHTML = '';    // empty the products table
}

// edit a specific product

function editProduct(productIndex) {
    // fill input fields with product data from productData array
    productName.value = productData[productIndex].productName;
    category.value = productData[productIndex].category;
    count.value = productData[productIndex].count;
    price.value = productData[productIndex].price;
    tax.value = productData[productIndex].tax;
    ads.value = productData[productIndex].ads;
    discount.value = productData[productIndex].discount;
    getTotal(); // get total price of the product and display it
    mode = 'update';    // change mode to update
    createBtn.value = 'Update'; // change create button to update button
    // save the index of product that user wants to update, to access it directly in the productData array
    savedIndex = productIndex;
    // scroll smoothly to page top
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
}