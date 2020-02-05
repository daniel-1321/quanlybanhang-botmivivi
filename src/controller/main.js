
class Validation {
    checkInput() {
        var flag = true;
        $('.isRequired').each(function () {
            if ($(this).val() === '') {
                flag = false
            }
        })
        return flag
    }
    clearInput(){
        $('.clearInput').html('')
        $('.clearInput').val('')
    }
}

class DateFormat {
    formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY")
    }
    convertDatePicker = (date) => {
        return moment(date).format("YYYY-MM-DD")
    }
    myFormatDate = (date) => {
        return moment(date).format("DDMMYYYY")
    }
}

