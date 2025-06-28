const express = require("express");
const colors = require("colors");
const cors = require("cors");
const fs = require("fs");
const connect = require('./config/db');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.use('/api', userRoute);
app.use('/api/product', productRoute);

// app.get('/try', async (req, res) => {
//     return res.status(200).json({
//         message: 'Başarıyla istek ulaştı. /try path',
//         data: ["5", 3, true]
//     })
// });


// app.post("/register", async (req, res) => {
//     console.log("İstek ulaştı");

//     const user = req.body;

//     console.log(user);

//     fs.writeFileSync("kullanici_bilgileri.json", JSON.stringify(user));

//     return res.status(201).json({ message: 'User created successfully' });
// })


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port!`.magenta.italic);
});


const startServer = async () => {
    try {
        const client = await connect();
        const databaseName = client.db('mebre').databaseName;

        console.log(`MongoDB has been connected --> ${databaseName}`.blue.inverse);
    } catch (error) {
        console.error(`Failed to connect to MongoDB ${error.message}`.red.bold);
        process.exit(1);
    }
};

startServer();