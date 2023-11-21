const express = require("express");
const bodyParser = require("body-parser")

const bookRouter = express.Router()
const app = express()
const PORT = 3000

app.use(bodyParser.json())


const books = [
    {
        title: "Lord of the ring",
        id: 1,
        year: 1990
    },

    {
        title: "Ring of power",
        id: 2,
        year:2023
    }
]

bookRouter.get("/", (req, res)=> {
    res.render("books", {books})
})

bookRouter.get("/:id", (req, res) => {
    const id = req.params.id
    const book = books.find(book => book.id == id)
    console.log(book)

    if (!book) {
        res.status(404).send("Book not found")
    }
    res.send(book)
 })

bookRouter.get("/users/:id/:name", (req, res) => {
    const id = req.params.id
    const title = req.params.name;
    const book = books.find(book => book.id === parseInt(id) && book.title === title);
    if (!book) {
        res.status(404).send("Book not found")
    }
    res.json(book)
})

bookRouter.post("/", (req, res) => {
    const book = req.body
    books.push(book)
    res.json(book)
})

bookRouter.put("/:id", (req, res) => {
    const id = req.params.id
    const book = req.body
    const index = books.findIndex(book => book.id == id)

    if (index === -1) {
        res.status(404).send("Book not found")
        return
    }
    books[index] = book
    res.json(book)
})

bookRouter.delete("/:id", (req, res) => {
    const id = req.params.id
    const index = books.findIndex(book => book.id == id)

    if (index === -1) {
        res.status(404).send("Book not found")
        return
    }
    books.splice(index, 1)
    res.json(books)
})


module.exports = bookRouter;