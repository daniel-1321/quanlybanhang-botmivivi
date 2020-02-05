class UI {
    displayCustomer(customerList) {
        let result = ''
        customerList.filter(customer => {
            result += `
            <tr class="border border-warning rounded">
            <td class="font-weight-bold text-uppercase">${customer.name}</td>
            <td class="text-right">${customer.phone}</td>
            <td>${customer.address + ', Q. ' + customer.district}</td>
            <td class="text-center">
                <i class="fas fa-info fa-2x btnMoreDetail text-warning mx-1" data-value='${JSON.stringify(customer)}'></i>
                <i class="fa fa-edit fa-2x btnEditCustomer text-danger mx-1" data-value='${JSON.stringify(customer)}'></i>
            </td>
        </tr>
        `
        })
        return result
    }

    displayCustomerDebt(customerList){
        let result =''
        customerList.filter(customer =>{
            var debt = customer.debt
            result+= `
            <tr class="border border-warning rounded">
                <td class="font-weight-bold text-uppercase">${customer.name}</td>
                <td class="text-right">${debt.installment.toLocaleString('en')}</td>
                <td class="text-right">${debt.overlapping.toLocaleString('en')}</td>
                <td class="text-right">${debt.old.toLocaleString('en')}</td>
                <td class="text-center">
                    <i class="fas fa-plus btnCreateNewOrder text-warning mx-1" data-toggle="tooltip" data-placement="top"
                    title="Tạo mới" data-value='${JSON.stringify(customer)}'></i>
                    <i class="fa fa-redo btnCreateOldOrder text-danger mx-1"data-toggle="tooltip" data-placement="top"
                    title="Tạo theo đơn cũ" data-value='${JSON.stringify(customer)}'></i>
                </td>
            </tr>
            `
        })
        return result
    }

    displayCustomerDetail(customer) {
        var debt = customer.debt
        var note = customer.note
        let result = ''
        result = `
            <tr>
                <td>${debt.installment.toLocaleString('en')}</td>
                <td>${debt.overlapping.toLocaleString('en')}</td>
                <td>${debt.old.toLocaleString('en')}</td>
            </tr>
            <tr>
                <th>Ghi chú</th>
                <td colspan="2" class="text-left">${note.note}</td>
            </tr>
            <tr>
                <th>Lưu ý</th>
                <td colspan="2" class="text-left">${note.caution}</td>
            </tr>
        `
        return result
    }

    displayProduct(productList) {
        let result = ''
        productList.filter(product => {
            var price = product.price
            result += `
        <tr>
        <td class="text-center font-weight-bold">${product.code}</td>
        <td class="font-weight-bold text-uppercase">${product.name}</td>
        <td class="text-center">${product.packaging}</td>
        <td class="text-center">${product.netweight}</td>
        <td class="text-right">${price.retailPrice.toLocaleString('en')}</td>
        <td class="text-right">${price.wholeSalePrice.toLocaleString('en')}</td>
        <td class="text-right">${product.provider}</td>
        <td class="text-center text-danger font-weight-bold"><i class="fa fa-edit btnEditProduct fa-2x" data-value='${JSON.stringify(product)}'></i>
        </td>
    </tr>
        `
        })
        return result
    }

    displayImportProduct(productList) {
        let result = ''
        productList.filter(product => {
            result += `
        <tr>
            <td class="font-weight-bold text-uppercase">${product.name}</td>
            <td class="text-right">
                <input type="number" class="clearInput" style="max-width: 75px">
            </td>
            <td class="text-center">
                <input type="date" class="datepicker" value="${dateFormat.convertDatePicker(date)}">
            </td>
            <td class="text-center"><i class="fa fa-plus text-danger p-3 btnAddToImportCart" data-value='${JSON.stringify(product)}'></i></td>
        </tr>
        `
        })
        return result
    }

    displayOrderProduct(productList) {
        let result = ''
        productList.filter(product => {
            result += `
            <tr class="border border-warning rounded">
                <td class="font-weight-bold text-uppercase">${product.name}</td>
                <td class="text-right">${product.netweight}</td>
                <td class="text-right">125</td>
                <td class="text-right w-25">
                    <input type="number" class="clearInput">
                </td>
                <td class="text-center">
                    <i class="fas fa-plus btnAddProductToCart text-danger mx-1"></i>
                </td>
            </tr>
        `
        })
        return result
    }
    displayImportCart(importCart) {
        let result = ''
        var total = 0;
        var totalNetweight = 0;
        importCart.filter(item => {
            total += item.quantity
            totalNetweight += item.netweight * item.quantity
            result += `
                <tr>
                    <td class="font-weight-bold">${(item.name).toUpperCase()}</td>
                    <td class="text-center">${item.netweight}</td>
                    <td class="text-right font-weight-bold">${item.quantity}</td>
                    <td class="text-center">${(item.netweight * item.quantity).toLocaleString('en')}</td>
                    <td class="text-center">${item.manuDate}</td>
                    <td class="text-center">
                        <i class="fa fa-trash text-danger p-3 btnRemoveFromImportCart" data-value='${JSON.stringify(item)}'></i>
                    </td>
                </tr>
            `
        })
        result += `
            <tr>
                <td colspan="2" class="text-uppercase text-center font-weight-bold">TỔNG CỘNG</td>
                <td class="text-center font-weight-bold" id='lblTotalQuantity'>${total.toLocaleString('en')}</td>
                <td class="text-center font-weight-bold" id='lblToTalNetweight'>${totalNetweight.toLocaleString('en')} </td>
            </tr>
        `
        return result

    }

    displayImportListByDate(importList) {
        let result = ''
        importList.filter(item => {
            var cart = item.importCart
            result += `
                    <tr class="mb-2">
                        <td class="text-uppercase text-center font-weight-bold">${item.driver}</td>
                        <td class="text-uppercase text-center font-weight-bold">${item.license}</td>
                        <td class="p-0">    
                        ${this.displayImportCartItem(cart)}                          
                        </td>
                        <td>${item.note}</td>
                        <td class="text-center">
                        <i class="fa fa-trash text-danger p-3 btnRemoveImportSheet" data-value='${JSON.stringify(item)}'></i>
                        </td>
                    </tr>
                `
        })
        return result
    }

    displayImportCartItem(cartItems) {
        var totalQuantity = 0;
        var totalNetweight = 0;
        let result = ''
        result = `
        <table class="table w-100 mb-0 table-striped">
            <tbody id="importListTbody-child">
        `
        let tbody = ''
        cartItems.filter(item => {
            totalQuantity += item.quantity
            totalNetweight += item.netweight * item.quantity
            tbody += `
                <tr class="">
                    <td class="text-uppercase" style="width:30%">${item.name}</td>
                    <td class="text-center" style="width:10%">${item.netweight}</td>
                    <td class="text-uppercase text-center" style="width:20%">${item.quantity.toLocaleString('en')}</td>
                    <td class="text-right" style="width:20%">${(item.netweight * item.quantity).toLocaleString('en')}</td>
                    <td class="text-right" style="width:20%">${item.provider}</td>
                </tr>
            `
        })
        tbody += `
            <tr>
                <td colspan="2" class="text-uppercase text-center font-weight-bold">Tổng Cộng</td>
                <td class="text-center font-weight-bold">${totalQuantity.toLocaleString('en')} Bao</td>
                <td class="text-center font-weight-bold">${totalNetweight.toLocaleString('en')}</td>
            </tr>
        `
        result += tbody
        result += `</tbody></table>`
        return result

    }

}