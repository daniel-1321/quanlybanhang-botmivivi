// Init lable
const lblCustomerId = $('#lblCustomerId')
const lblCustomerName = $('#lblCustomerName')

//Init input
const searchCustomerInput = $('#searchCustomerInput')
const customerIdInput = $('#customerIdInput')
const customerNameInput = $('#customerNameInput')
const customerPhoneInput = $('#customerPhoneInput')
const customerAddressInput = $('#customerAddressInput')
const customerDistrictInput = $('#customerDistrictInput')
const customerNoteInput = $('#customerNoteInput')
const customerCautionInput = $('#customerCautionInput')
const installmentDebtInput = $('#installmentDebtInput')
const overlappingDebtInput = $('#overlappingDebtInput')
const oldDebtInput = $('#oldDebtInput')
const newDebtInput = $('#newDebtInput')
const debt = $('.debt')

// Init button
const btnSearchCustomer = $('#btnSearchCustomer')
const btnUpdateCustomer = $('#btnUpdateCustomer')
const btnAddCustomer = $('#btnAddCustomer')
const btnEditCustomer = ('.btnEditCustomer')
const btnMoreDetail = ('.btnMoreDetail')

const btnShowDetail = ('.btnShowDetail')


//Init list
let customerList = []

//Init customer tbody
const customerTbody = $('#customerTbody')

// Init modal-body
const detailCustomerBody = $('#detailCustomerBody')

// Init modal
const moreDetailModal = $('#moreDetailModal')

// Init common class
const validation = new Validation()
const storage = new Storage()
const ui = new UI()

class Customer {
    /**
     * Create new customer object by getting value from form
     */
    getCustomerData() {
        const newCustomer = {
            id: $.uuid(),
            name: customerNameInput.val(),
            phone: customerPhoneInput.val(),
            address: customerAddressInput.val(),
            district: customerDistrictInput.val(),
            note: {
                note: customerNoteInput.val(),
                caution: customerCautionInput.val()
            },
            debt: {
                installment: installmentDebtInput.val() === '' ? 0 : parseInt(installmentDebtInput.val()),
                overlapping: overlappingDebtInput.val() === '' ? 0 : parseInt(overlappingDebtInput.val()),
                old: oldDebtInput.val() === '' ? 0 : parseInt(oldDebtInput.val()),
                new: newDebtInput.val() === '' ? 0 : parseInt(newDebtInput.val())
            }
        }
        return newCustomer
    }

    addCustomer() {
        customerList = [...customerList, this.getCustomerData()]
        storage.addCustomerToStorage(customerList)
        setTimeout(() => validation.clearInput(), 200)
    }

    updateCustomer(editCustomer) {
        // get index of edit product in productList
        var index = customerList.findIndex(item => item.id === editCustomer.id)

        // load data into form
        customerIdInput.html(editCustomer.id)
        customerNameInput.val(editCustomer.name)
        customerPhoneInput.val(editCustomer.phone)
        customerAddressInput.val(editCustomer.address)
        customerDistrictInput.val(editCustomer.district)
        customerNoteInput.val(editCustomer.note.note)
        customerCautionInput.val(editCustomer.note.caution)
        installmentDebtInput.val(editCustomer.debt.installment)
        overlappingDebtInput.val(editCustomer.debt.overlapping)
        oldDebtInput.val(editCustomer.debt.old)
        newDebtInput.val(editCustomer.debt.new)

        btnUpdateCustomer.click(() => {
            if (validation.checkInput()) {
                const editedCustomer = {
                    id: editCustomer.id,
                    name: customerNameInput.val(),
                    phone: customerPhoneInput.val(),
                    address: customerAddressInput.val(),
                    district: customerDistrictInput.val(),
                    note: {
                        note: customerNoteInput.val(),
                        caution: customerCautionInput.val()
                    },
                    debt: {
                        installment: installmentDebtInput.val() === '' ? 0 : parseInt(installmentDebtInput.val()),
                        overlapping: overlappingDebtInput.val() === '' ? 0 : parseInt(overlappingDebtInput.val()),
                        old: oldDebtInput.val() === '' ? 0 : parseInt(oldDebtInput.val()),
                        new: newDebtInput.val() === '' ? 0 : parseInt(newDebtInput.val())
                    }
                }
                // Replace old product by new one
                customerList.splice(index, 1, editedCustomer)
                this.searchCustomer(editedCustomer.name)
                storage.addCustomerToStorage(customerList)
                setTimeout(() => validation.clearInput(), 100)
            } else {
                alert('Nhập đầy đủ thông tin')
            }
        })
    }

    searchCustomer(name) {
        const customers = customerList.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        jQuery.isEmptyObject(customers) ? alert('Khách hàng không tồn tại') : customerTbody.html(ui.displayCustomer(customers))
    }

    showDetailInfo(customer) {
        $.when(moreDetailModal.modal('show')).then(() => {
            lblCustomerId.html(customer.id)
            lblCustomerName.html(customer.name)
            detailCustomerBody.html(ui.displayCustomerDetail(customer))
        })
    }
}

$(document).ready(function () {
    const customer = new Customer()
    customerList = JSON.parse(localStorage.getItem('customers')) || [];
    $.when(customerList).done(() => {
        console.log(customerList);
        btnAddCustomer.click(() => validation.checkInput() ? customer.addCustomer() : alert('Nhập đầy đủ thông tin'))
        btnSearchCustomer.click(() => searchCustomerInput.val() === '' ? alert('Nhập đầy đủ thông tin') : customer.searchCustomer(searchCustomerInput.val()))
    })

    $('body').delegate(btnEditCustomer, 'click', function (e) {
        const editCustomer = JSON.parse($(this).attr('data-value'))
        btnAddCustomer.addClass('d-none')
        btnUpdateCustomer.removeClass('d-none')
        customer.updateCustomer(editCustomer)
    })

    $('body').delegate(btnMoreDetail, 'click', function (e) {
        const customerInfo = JSON.parse($(this).attr('data-value'))
        customer.showDetailInfo(customerInfo)
    })
})