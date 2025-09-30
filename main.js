let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');

function getTotal() {
    if (price.value == '') {
        total.innerHTML = 'Total : 0';
        total.style.background = "#407ba7";
    } else {
        let tempTotal = +price.value + +tax.value + +ads.value - +discount.value;
        if (tempTotal <= 0) {
            total.innerHTML = 'Total : 0';
            total.style.background = "#407ba7";
        } else {
            total.innerHTML = `Total : ${tempTotal}`;
            total.style.background = "#e63946";
        }
    }
}