console.log('client side js')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    const url = '/weather?address=' + location

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent =data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
            console.log(data)
        })
    })
})