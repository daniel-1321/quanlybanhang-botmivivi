// Init input
const searchCustomerInput = $('#searchCustomerInput')
const searchProductInput = $('#searchProductInput')

// Init button
const btnSearchCustomer = $('#btnSearchCustomer')
const btnSearchProduct = $('#btnSearchProduct')
const btnCreateNewOrder = ('.btnCreateNewOrder')
const btnCreateOldOrder = ('.btnCreateOldOrder')

// Init tbody
const customerTbody = $('#customerTbody')
const productTbody = $('#productTbody')

// Init common class
const validation = new Validation()
const storage = new Storage()
const ui = new UI()

// Init list
let productList = []
let customerList = []
let orderList = []

class Customer {
    /**
     * Search a list of customer
     * @param {*} name 
     */
    searchCustomer(name) {
        const customers = customerList.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        jQuery.isEmptyObject(customers) ? alert('Khách hàng không tồn tại') : customerTbody.html(ui.displayCustomerDebt(customers))
    }
}

class Product {
    /**
     * Search a list of product
     * @param {*} code 
     */
    searchProduct(code) {
        const products = productList.filter(e => e.code.includes(code.toLowerCase()))
        jQuery.isEmptyObject(products) ? alert('Sản phẩm không tồn tại') : productTbody.html(ui.displayOrderProduct(products))
    }
}

class Order {
    createNewOrder(){

    }

    createOldOrder() {

    }
}

$(document).ready(function () {
    const customer = new Customer()
    const product = new Product()

    customerList = JSON.parse(localStorage.getItem('customers')) || [];
    productList = JSON.parse(localStorage.getItem('products')) || [];

    $.when(customerList && productList).done(() => {
        btnSearchCustomer.click(() => searchCustomerInput.val() === '' ? alert('Nhập đầy đủ thông tin') : customer.searchCustomer(searchCustomerInput.val()))
        btnSearchProduct.click(() => $.trim(searchProductInput.val()) === '' ? alert('Nhập mã sản phẩm') : product.searchProduct(searchProductInput.val()))
    })
    $('body').delegate(btnCreateNewOrder, 'click', function () {
        const customer = JSON.parse($(this).attr('data-value'))
        console.log(editCustomer);
        
    })

    $('body').delegate(btnCreateOldOrder, 'click', function () {
        const customer = JSON.parse($(this).attr('data-value'))
        console.log(editCustomer);
        
    })
})