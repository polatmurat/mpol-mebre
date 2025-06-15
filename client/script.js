async function register(e) {
    e.preventDefault();
    const name = document.getElementById("register__name").value;
    const mail = document.getElementById("register__mail").value;
    const password = document.getElementById("register__password").value;

    const userData = {
        name,
        mail,
        password
    };

    const response = await axios.post("http://localhost:3000/register", userData);

    console.log(response);



}