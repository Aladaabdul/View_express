const express = require("express")
const bodyParser = require("body-parser")

const bookRouter = require("./routes/books")

const app = express()
const PORT = 3000

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static('public'))
app.use(bodyParser.json())

app.use("/books", bookRouter)

app.get("/", (req, res) => {
    res.render("index", {name: "John", age: 27})
})



app.listen(PORT, () => {
    console.log(`http:\\localhost:${PORT}`)
})