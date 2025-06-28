async function register(e) {
    e.preventDefault();
    const name = document.getElementById("register__name").value;
    const email = document.getElementById("register__mail").value;
    const password = document.getElementById("register__password").value;

    const userData = {
        name,
        email,
        password
    };

    try {

        const response = await axios.post("http://localhost:3000/api/register", userData);


        if (response.status === 201) {
            alert('User registered successfully.');
            window.location.href = '/client/index.html';
        } else {
            console.log("Responseee : ", response);
        }

    } catch (error) {

        console.error(error);

        if (error.response.data.error.path === 'email_taken') {
            alert(error.response.data.error.message);
        }

    }

}

async function login(e) {
    e.preventDefault();

    const email = document.querySelector('#login__mail').value;
    const password = document.querySelector('#login__password').value;

    const loginData = { email, password };

    try {

        const response = await axios.post("http://localhost:3000/api/login", loginData);


        if (response.status === 200) {
            alert('User login successfully.');
            window.location.href = '/client/index.html';
        } else {
            console.log("Login failed.");
        }

    } catch (error) {

        console.error(error);

        alert(error.response.data.message);

    }
}