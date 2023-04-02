const form = document.getElementById('loginForm')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(form)
    const objeto = {}

    data.forEach((value, key) => objeto[key] = value)

    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status === 200) {
            window.location.replace('/productos')
        }
    })
})