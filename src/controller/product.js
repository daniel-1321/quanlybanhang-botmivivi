//Init input
const searchProductInput = $('#searchProductInput')
const productCodeInput = $('#productCodeInput')
const productNameInput = $('#productNameInput')
const productProviderInput = $('#productProviderInput')
const productPackagingInput = $('#productPackagingInput')
const productNetweightInput = $('#productNetweightInput')
const productRetailPriceInput = $('#productRetailPriceInput')
const productWholeSalePriceInput = $('#productWholeSalePriceInput')

// Init button
const btnSearchProduct = $('#btnSearchProduct')
const btnAddProduct = $('#btnAddProduct')
const btnUpdateProduct = $('#btnUpdateProduct')
const btnEditProduct = ('.btnEditProduct')

//Init list
let productList = []

//Init product tbody
const productTbody = $('#productTbody')

// Init static list
const netweightList = [0.5, 1, 5, 10, 15, 20, 25, 30, 40]
const packagingList = ['Bao', 'Thùng', 'Bịch', 'Hủ', 'Chai']
const providerList = ['VFM', 'Uni', 'Địa Cầu', 'Bình Đông', 'Hàn Quốc', 'Bình An', 'Đại Nam', 'Đại Phong', 'Lúa Vàng', 'Mekong', 'Nông Sản Xanh', 'Pha Lê', 'Phương Nga', 'Men Mauri', 'Cón Men', 'GBCO', 'Khác']

// Init common class
const validation = new Validation()
const storage = new Storage()
const ui = new UI()

class Init {
    loadData() {
        $.each(packagingList, function (key, value) {
            productPackagingInput.append($("<option></option>")
                .attr("value", value)
                .text(value))
        })

        $.each(netweightList, function (key, value) {
            productNetweightInput.append($("<option></option>")
                .attr("value", value)
                .text(value))
        })

        $.each(providerList, function (key, value) {
            productProviderInput.append($("<option></option>")
                .attr("value", value)
                .text(value))
        })
    }
}
class Product {
    /**
     * Create new product object by getting value from form
     */
    getProductValue() {
        const newProduct = {
            id: $.uuid(),
            code: $.trim(productCodeInput.val()),
            name: productNameInput.val(),
            provider: productProviderInput.val(),
            packaging: productPackagingInput.val(),
            netweight: productNetweightInput.val(),
            price: {
                retailPrice: parseInt(productRetailPriceInput.val()),
                wholeSalePrice: parseInt(productWholeSalePriceInput.val())
            }
        }
        return newProduct
    }

    /**
     * Add product to local storage
     */
    addProduct() {
        const storage = new Storage()
        productList = [...productList, this.getProductValue()]
        storage.addProductToStorage(productList)
        setTimeout(() => validation.clearInput(), 1000)
    }

    /**
     * Search a list of product
     * @param {*} code 
     */
    searchProduct(code) {
        const products = productList.filter(e => e.code.includes(code.toLowerCase()))
        jQuery.isEmptyObject(products) ? alert('Sản phẩm không tồn tại') : productTbody.html(ui.displayProduct(products))
    }

    /**
     * Fill data of needed-edit product into form
     * @param {*} editProduct 
     */
    updateProduct(editProduct) {
        // get index of edit product in productList
        var index = productList.findIndex(item => item.id === editProduct.id)

        // load data into form
        productCodeInput.val(editProduct.code).prop('readonly', true);
        productNameInput.val(editProduct.name).prop('readonly', true);
        productProviderInput.val(editProduct.provider)
        productPackagingInput.val(editProduct.packaging)
        productNetweightInput.val(editProduct.netweight)
        productRetailPriceInput.val(editProduct.price.retailPrice)
        productWholeSalePriceInput.val(editProduct.price.wholeSalePrice)

        btnUpdateProduct.click(() => {
            if (validation.checkInput()) {
                const editedProduct = {
                    id: editProduct.id,
                    code: editProduct.code,
                    name: editProduct.name,
                    provider: productProviderInput.val(),
                    packaging: productPackagingInput.val(),
                    netweight: productNetweightInput.val(),
                    price: {
                        retailPrice: parseInt(productRetailPriceInput.val()),
                        wholeSalePrice: parseInt(productWholeSalePriceInput.val())
                    }
                }
                // Replace old product by new one
                productList.splice(index, 1, editedProduct)
                this.searchProduct(editedProduct.code)
                storage.addProductToStorage(productList)
                setTimeout(() => validation.clearInput(), 100)
            } else {
                alert('Nhập đầy đủ thông tin')
            }
        })
    }
}

$(document).ready(function () {
    const product = new Product()
    const init = new Init()
    productList = JSON.parse(localStorage.getItem('products')) || [];

    $.when(init.loadData() && productList).done(() => {
        console.log(productList);
        btnAddProduct.click(() => validation.checkInput() ? product.addProduct() : alert('Nhập đầy đủ thông tin'))
        btnSearchProduct.click(() => $.trim(searchProductInput.val()) === '' ? alert('Nhập mã sản phẩm') : product.searchProduct(searchProductInput.val()))
    })

    $('body').delegate(btnEditProduct, 'click', function (e) {
        const editProduct = JSON.parse($(this).attr('data-value'))
        btnAddProduct.addClass('d-none')
        btnUpdateProduct.removeClass('d-none')
        product.updateProduct(editProduct)
    })
})
