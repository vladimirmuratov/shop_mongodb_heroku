const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const config = require("config")
const chalk = require("chalk")
const routes = require("./routes")
const initDataBase = require("./startUp/initDataBase")

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use("/api", routes)

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDataBase()
        })
        await mongoose.connect(config.get("mongoUri"))
        console.log(chalk.green(`MongoDB connected...`))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        })
    } catch (e) {
        console.log(chalk.red(e.message))
        process.exit(1)
    }
}

start()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}