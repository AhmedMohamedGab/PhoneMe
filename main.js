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
let search = document.getElementById('search');
let searchBy = document.getElementById('search-by');

// initializations

let productData = [];   // array to hold products
let mode = 'create';    // initial value of mode (available modes are create and update)
let savedIndex = 0; // a variable to save products indexes to access them in the productData array
let displayedIndexes = []; // indexes of products currently shown in products table
// if local storage already has products ->
if (localStorage.getItem('productData') != null && localStorage.getItem('productData') != '') {
    // add existing products to the productData array
    productData = JSON.parse(localStorage.getItem('productData'));
    searchProducts();   // display existing products in the products table
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

// create new product or update existing product

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
    // if empty tax -> tax = 0
    if (newProduct.tax == '') {
        newProduct.tax = 0;
    }
    // if empty ads -> ads = 0
    if (newProduct.ads == '') {
        newProduct.ads = 0;
    }
    // if empty discount -> discount = 0
    if (newProduct.discount == '') {
        newProduct.discount = 0;
    }
    // if valid inputs -> proceed to create or update product
    if (newProduct.productName != '' && newProduct.category != ''
        && newProduct.price != '' && newProduct.price > 0
        && newProduct.total != '0' && newProduct.count > 0
        && newProduct.count <= 100 && newProduct.tax >= 0
        && newProduct.ads >= 0 && newProduct.discount >= 0) {
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
        searchProducts();   // refresh the products table
        clearInputs();  // clear input fields after user clicks the create button
    } else {    // if invalid inputs -> alert user
        alert('Please fill in all required fields with valid values.');
    }
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

// remove product from products table (delete all product items)

function removeProduct(productIndex) {
    productData.splice(productIndex, 1);    // remove product from the productData array
    localStorage.productData = JSON.stringify(productData); // update local storage with the new array
    searchProducts();   // refresh the products table
}

// delete a single item of a product (delete a single instance of the product)

function deleteItem(productIndex) {
    // if the product has just one item -> remove the product
    if (productData[productIndex].count == 1) {
        removeProduct(productIndex);
    } else {
        productData[productIndex].count--;  // decrement number of items of the product
        localStorage.productData = JSON.stringify(productData); // update local storage with the new array
        searchProducts();   // refresh the products table
    }
}

// delete all products in the table

function deleteAll() {
    if (displayedIndexes.length === 0) return; // if no displayed products -> do nothing and exit

    // ask user for confirmation before deleting all displayed products
    let ok = window.confirm('Are you sure you want to delete all displayed products?');
    if (ok) {   // if user confirms -> delete all displayed products
        // Sort indexes in descending order to safely remove them
        displayedIndexes.sort((a, b) => b - a);
        // remove each displayed product from the productData array
        for (let i of displayedIndexes) {
            productData.splice(i, 1);
        }
        localStorage.setItem('productData', JSON.stringify(productData)); // update local storage with the new array
        searchProducts();   // refresh the products table
    }
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

// search products by name or category and display them in the products table

function searchProducts() {
    let table = '';  // a variable to store searched products in a table
    let searchTerm = search.value.toLowerCase(); // get search term and convert it to lowercase
    displayedIndexes = []; // reset each time we search
    for (let index = 0; index < productData.length; index++) {
        let matches = false;    // product does not match search term by default
        // case user wants to search by product name ->
        if (searchBy.value === 'by product') {
            // if product name matches search term -> matches = true
            if (productData[index].productName.toLowerCase().includes(searchTerm)) matches = true;
        } else {    // case user wants to search by category ->
            // if category matches search term -> matches = true
            if (productData[index].category.toLowerCase().includes(searchTerm)) matches = true;
        }
        // if product matches search term ->
        if (matches) {
            displayedIndexes.push(index); // record this product index
            // add this product to the table variable
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
    }

    productTableBody.innerHTML = table; // display the table in HTML
    // if there is any displayed products ->
    if (displayedIndexes.length > 0) {
        deleteAllBtn.classList.remove('hide');  // show the delete all button
        // show number of displayed products on the delete all button
        deleteAllBtn.value = `Delete All ( ${displayedIndexes.length} )`;
    } else {    // if no displayed products ->
        deleteAllBtn.classList.add('hide'); // hide the delete all button
    }
}