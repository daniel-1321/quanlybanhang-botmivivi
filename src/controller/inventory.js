// Init label
var importDatelbl = $('#importDatelbl')
var lblTotalQuantity = $('#lblTotalQuantity')
var lblToTalNetweight = $('#lblToTalNetweight')

// Init Input
const searchProductInput = $('#searchProductInput')
const btnPrintImportList = $('#btnPrintImportList')
const driverNameInput = $('#driverNameInput')
const licensePlateInput = $('#licensePlateInput')
const importNoteInput = $('#importNoteInput')
const currentDateInput = $('.currentDateInput')
const searchImportDateInput = $('#searchImportDateInput')

// Init button
const btnSearchProduct = $('#btnSearchProduct')
const btnSaveCart = $('#btnSaveCart')
const btnAddToImportCart = ('.btnAddToImportCart')
const btnRemoveFromImportCart = ('.btnRemoveFromImportCart')
const btnRemoveImportSheet = ('.btnRemoveImportSheet')

// Init print areas
const importListPrint = $('#importListPrint')

// Init tbody
const productTbody = $('#productTbody')
const cartTbody = $('#cartTbody')
const importListTbody = $('#importListTbody')
const importListTbodyChild = $('#importListTbody-child')


// Init product list
let productList = []

// Init import list
let importList = []

// Init import sheet list
let importSheetList = []

// Init import cart
let importCart = []

// Init common class
const validation = new Validation()
const storage = new Storage()
const ui = new UI()
const dateFormat = new DateFormat()

// Init current date
var date = new Date();

class Cart {
    addToCart(product, quantity, manuDate) {
        // Item in a cart
        const importItem = {
            name: product.name,
            packaging: product.packaging,
            provider: product.provider,
            netweight: parseInt(product.netweight),
            quantity: parseInt(quantity),
            manuDate: dateFormat.formatDate(manuDate)
        }

        // Add item into import cart
        importCart = [...importCart, importItem]
        cartTbody.html(ui.displayImportCart(importCart))
        setTimeout(() => validation.clearInput(), 100)
    }
    removeFromCart(index) {
        importCart.splice(index, 1)
        cartTbody.html(ui.displayImportCart(importCart))
    }

    saveCart() {
        // Create one import sheet
        const cart = {
            id: $.uuid(),
            date: dateFormat.myFormatDate(currentDateInput.val()),
            driver: driverNameInput.val(),
            license: licensePlateInput.val(),
            note: importNoteInput.val(),
            importCart: importCart
        }
        importList = [...importList, cart]
        storage.addImportToStorage(importList)
        setTimeout(() => validation.clearInput(), 100)
        importCart = []
        cartTbody.html('')
        productTbody.html('')
    }

    /**
     * Search import list by date
     * @param {*} date 
     */
    searchImportListByDate(date) {
        const importSheets = importList.filter(e => e.date === date)
        jQuery.isEmptyObject(importSheets) ? importListTbody.html('`<tr><td colspan="5" class="text-center font-weight-bold text-uppercase">Không có phiếu nhập</td></tr>`') : importListTbody.html(ui.displayImportListByDate(importSheets))
    }

    /**
     * Remove import sheet by id
     * @param {*} id 
     */
    removeImportCart(id) {
        const storage = new Storage()
        importList = importList.filter(cart => cart.id !== id)
        storage.addImportToStorage(importList)
        this.searchImportListByDate(dateFormat.myFormatDate(searchImportDateInput.val()))
    }
}

class Product {
    /**
     * Search a list of product
     * @param {*} code 
     */
    searchProduct(code) {
        const products = productList.filter(e => e.code.includes(code.toLowerCase()))
        jQuery.isEmptyObject(products) ? alert('Sản phẩm không tồn tại') : productTbody.html(ui.displayImportProduct(products))
    }
}

$(document).ready(function () {
    const cart = new Cart()

    // Set date
    importDatelbl.html(dateFormat.formatDate(date))

    
    importList = JSON.parse(localStorage.getItem('import')) || [];
    productList = JSON.parse(localStorage.getItem('products')) || [];
    const product = new Product()
    $.when(importList && productList && currentDateInput.val(dateFormat.convertDatePicker(date))).done(() => {
        btnSearchProduct.click(() => $.trim(searchProductInput.val()) === '' ? alert('Nhập mã sản phẩm') : product.searchProduct(searchProductInput.val()))
        searchImportDateInput.change(() => cart.searchImportListByDate(dateFormat.myFormatDate(searchImportDateInput.val())))
        cart.searchImportListByDate(dateFormat.myFormatDate(searchImportDateInput.val()))
    })


    // Add product into import cart
    $('body').delegate(btnAddToImportCart, 'click', function () {
        var product = JSON.parse($(this).attr('data-value'))
        // console.log($(this).closest('tr').find("td:eq(3) input").val())
        const quantityInput = $(this).closest('tr').find("input[type='number']").val()
        const manuDateInput = $(this).closest('tr').find("input[type='date']").val();

        if (quantityInput === '' || parseInt(quantityInput) < 1) {
            alert('Hãy nhập số lượng')
        } else {
            cart.addToCart(product, quantityInput, manuDateInput)
        }
    })

    // Delete product in import cart
    $('body').delegate(btnRemoveFromImportCart, 'click', function () {
        var rowIndex = $('#importCartTable tr').index($(this).closest('tr'));
        cart.removeFromCart(rowIndex - 1)
    })

    // Delete one import sheet
    $('body').delegate(btnRemoveImportSheet, 'click', function () {
        var id = (JSON.parse($(this).attr('data-value'))).id
        cart.removeImportCart(id)
    })

    btnSaveCart.click(() => (validation.checkInput() && importCart.length > 0) ? cart.saveCart() : alert('Nhập đầy đủ thông tin'))

    btnPrintImportList.click(() => printMe(importListPrint))
})
