class Storage {
    addCustomerToStorage(customerList) {
        localStorage.setItem("customers", JSON.stringify(customerList))
    }
    
    addProductToStorage(productList){
        localStorage.setItem("products", JSON.stringify(productList))
    }

    addImportToStorage(importList) {
        localStorage.setItem("import", JSON.stringify(importList))
    }

    addOrderToStorage(orderList) {
        localStorage.setItem("order", JSON.stringify(orderList))
    }
}