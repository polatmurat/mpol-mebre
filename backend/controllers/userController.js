const connect = require('../config/db');
const User = require('../models/User');
const { hashedPassword, comparePassword } = require("../services/authService");

const register = async (req, res) => {

    const { name, email, password } = req.body;

    console.log(name, email, password);


    console.log("Kullanıcı kaydı yapılacak fonksiyonun içerisinden merhabaa :)");

    // Token - Authentication
    //       - Authorization

    if (name.length < 3) {
        return res.status(400).json({ error: 'İsim değeri minimum 3 karakterden oluşmalıdır.' })
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Geçersiz mail adresi.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Parola en az 6 karakterden oluşmalıdır.' })
    }

    try {
        const client = await connect();

        const userCollection = client.db('mebre').collection('user');

        const emailExist = await userCollection.findOne({ email });

        if (!emailExist) {

            const hashedSifre = await hashedPassword(password);

            const user = new User(name, email, hashedSifre);
            await userCollection.insertOne(user);
            return res.status(201).json({ message: 'User registered successfully.' });
        }

        return res.status(400).json({
            error: {
                message: `${email} is already taken.`,
                path: 'email_taken'
            }
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json("Server internal error.");
    }
};

const login = async (req, res) => {

    const { email, password } = req.body;

    if (!email.includes('@') || email.length < 4) {
        return res.status(400).json({status: false, message: 'Invalid mail'});
    }

    try {

        const client = await connect();

        const userCollection = client.db('mebre').collection('user');

        const user = await userCollection.findOne({ email });

        if (user) {

            if (await comparePassword(password, user.password)) {
                return res.status(200).json({ status: true, message: 'User login successfully.' });
            }

            return res.status(400).json({ status: false, message: 'Incorrect password' });
        }

        return res.status(404).json({ status: false, message: 'Incorrect email' });

    } catch (error) {

        console.error(error.message);
        return res.status(500).json("Server internal error.");
    }

};


module.exports = { register, login };