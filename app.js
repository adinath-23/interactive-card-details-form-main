const cardNumber = document.querySelector('#card-number')
const cvcInput = document.querySelector('#cvc-input')
const expMonthInput = document.querySelector('#exp-month')
const expYearInput = document.querySelector('#exp-year')
const errors = document.querySelectorAll('.error')
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const printedNumber = document.querySelector('.printed-number')
const printedName = document.querySelector('.printed-name')
const printedDate = document.querySelector('.printed-expiry')
const inputName = document.querySelector('#name')
const printedCvc = document.querySelector('.printed-cvc')
const continueBtn = document.querySelector('#continue')
const confirmed = document.querySelector('.confirmed')

const showError = (field, state, message) => {
    for (let error of errors) {
        if (error.classList.contains(field)) {
            if (state) {
                error.innerHTML = message
            } else {
                error.innerHTML = ''
            }
        }
    }
}


const formatNumber = (number) =>
    number.split("").reduce((previousValue, currentValue, currentIndex) => {
        if (currentIndex !== 0 && (currentIndex % 4 === 0)) {
            previousValue += " ";
        }
        return previousValue + currentValue
    }, '');

cardNumber.addEventListener('input', function () {
    this.value = formatNumber(this.value.replaceAll(/\D/g, ''))
    printedNumber.innerHTML = this.value
    if (this.value.length === 19) {
        showError('card-number', false)
        this.classList.remove('invalid')
    }
})

cardNumber.addEventListener('blur', function () {
    if (this.value.length < 19) {
        showError('card-number', true, 'Please enter all digits')
        this.classList.add('invalid')
    }
})

expMonthInput.addEventListener('blur', function () {
    if (this.value.length < 1) {
        showError('exp-date', true, "Month can't be empty")
        this.classList.add('invalid')
    }
})

expMonthInput.addEventListener('input',
    function () {
        this.value = this.value.replaceAll(/\D/g, '')
        if (+this.value > 12) {
            showError('exp-date', true, "Enter a valid month (01-12)")
            this.value = ''
            this.classList.add('invalid')
        } else {
            showError('exp-date', false)
            this.classList.remove('invalid')
        }
        const date = printedDate.textContent.split('/')
        printedDate.textContent = `${this.value}/${date[1]}`
        return this.value


    }
)

expYearInput.addEventListener('input',
    function () {
        this.value = this.value.replaceAll(/\D/g, '')
        const date = printedDate.textContent.split('/')
        printedDate.textContent = `${date[0]}/${this.value}`
        if (this.value.length == 2) {
            showError('exp-date', false)
            this.classList.remove('invalid')
        }
    }
)

expYearInput.addEventListener('blur', function () {
    if (this.value.length < 2) {
        showError('exp-date', true, "Enter valid year")
        this.classList.add('invalid')
    }
})
cvcInput.addEventListener('input',
    function () {
        this.value = this.value.replaceAll(/\D/g, '')
        if (this.value.length === 3) {
            showError('cvc', false)
            this.classList.remove('invalid')
        }
        printedCvc.textContent = this.value
    }
)

cvcInput.addEventListener('blur', function () {
    if (this.value.length < 3) {
        showError('cvc', true, "Enter valid cvc.")
        this.classList.add('invalid')
    } else {
        showError('cvc', false)
        this.classList.remove('invalid')
    }
})

inputName.addEventListener('input', function () {
    console.log(this.value)
    printedName.innerHTML = this.value
})

inputName.addEventListener('blur', function () {
    if (this.value.length === 0) {
        showError('name', true, "Name can't be empty")
        this.classList.add('invalid')
    } else {
        showError('name', false)
        this.classList.remove('invalid')
    }
})
form.addEventListener('submit', e => {
    e.preventDefault()

    for (let input of inputs) {
        if (input.value.length === 0 || input.classList.contains('invalid')) {
            return input.focus()
        }

    }
    form.classList.add('remove')
    confirmed.classList.remove('remove')
})

continueBtn.addEventListener('click', () => {
    confirmed.classList.add('remove')
    printedCvc.textContent = '000'
    printedDate.textContent = '00/00'
    printedName.textContent = 'JANE APPLESEED'
    printedNumber.textContent = '0000 0000 0000 0000'
    printedCvc.textContent = '000'
    form.reset()
    form.classList.remove('remove')
})
