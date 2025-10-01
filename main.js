// get total price of products

let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

function getTotal() {
    if (price.value == '') {
        total.innerHTML = '0';
        total.style.background = "#407ba7";
    } else {
        let tempTotal = +price.value + +tax.value + +ads.value - +discount.value;
        if (tempTotal <= 0) {
            total.innerHTML = '0';
            total.style.background = "#407ba7";
        } else {
            total.innerHTML = `${tempTotal}`;
            total.style.background = "#e63946";
        }
    }
}

// create new product

let productName = document.getElementById('product-name');
let category = document.getElementById('category');
let count = document.getElementById('count');
let createBtn = document.getElementById('create-btn');

let productData = [];

if (localStorage.getItem('productData')) {
    productData = JSON.parse(localStorage.getItem('productData'));
}

function createProduct() {
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

    productData.push(newProduct);

    localStorage.setItem('productData', JSON.stringify(productData));

    clearInputs();
}

// clear input fields

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