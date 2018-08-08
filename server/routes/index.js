//@ts-check

import { Router } from 'express';
import Book from '../models/bookSchema';
import Author from '../models/authorSchema';
import Review from '../models/reviewSchema';
import { escapeRegex, stringToObjectId } from '../HelperFunctions';
import { storage } from '../HelperFunctions';
import axios from 'axios';
import multer from 'multer';
const router = Router();

// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });
let bookImageName = '';
let authorImageName = '';
/* /api is prepended before each route */

/* GET home page. */
router.get('/', function(req, res, next) {
    Book.find({}).then(books => res.status(200).json(books));
});

router.get("/genre/:genre", (req, res) => {
    Book.find({genre: req.params.genre}).then(books => {
        res.json(books);
    })
})

router.get('/authors', (req, res) => {
    Author.find({})
        .then(authors => {
            res.json(authors);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post('/uploadBookImage', upload.single('book_image'), (req, res) => {
    bookImageName = req.file.filename;
    res.status(200).json({ message: { success: 'Uploaded Successfully' } });
});

router.post('/uploadAuthorImage', upload.single('author_image'), (req, res) => {
    authorImageName = req.file.filename;
    res.status(200).json({ message: { success: 'Uploaded Successfully' } });
});

router.post('/createbook', (req, res) => {
    console.log(req.body);
    const { ISBN13, title, description, author, pages, genre } = req.body;

    Book.create({
        ISBN13,
        title,
        description,
        genre,
        pages,
        author: stringToObjectId(author)
    })
        .then(book => {
            book.book_img = `/images/${bookImageName}`;
            book.save();

            res.json(book);
        })
        .catch(err => console.log(err));
});

router.put("/editBook", (req, res) => {
    const {ISBN13, description, pages, price, title,quantity} = req.body.bookData;
    Book.findOneAndUpdate({ISBN13: req.body.bookData.ISBN13}, {ISBN13: ISBN13, description: description, pages: pages, price: price, title:title, quantity: quantity}).then(book => console.log("Successfully saved")).catch(err => console.log(err))
})

router.post('/createauthor', (req, res) => {
    console.log(req.body);
    const { author_name, description, dob, genre } = req.body;

    Author.create({
        name: author_name,
        description,
        dob,
        genre
    })
        .then(author => {
            author.author_img = `/images/${authorImageName}`;
            author.save();

            res.json(author);
        })
        .catch(err => console.log(err));
});

router.get('/:isbn', function(req, res, next) {
    Book.find({ ISBN13: req.params.isbn })
        .populate('author', 'name')
        .then(book => res.json(book[0]))
        .catch(err => console.log(err));
});

router.get('/search/:searchQuery', (req, res) => {
    let searchQuery = req.params.searchQuery;
    const filteredSearchQuery = new RegExp(
        escapeRegex(searchQuery.toString()),
        'gi'
    );

    let searchResults = [];

    Book.find()
        .or([
            { title: filteredSearchQuery },
            { genre: filteredSearchQuery },
            { description: filteredSearchQuery },
            { publisher: filteredSearchQuery }
        ])
        .populate('author')
        .then(books => {
            searchResults = [...books];

            Author.find({ name: filteredSearchQuery })
                .then(authors => {
                    searchResults = [...searchResults, ...authors];
                    res.json({
                        books: [...books],
                        authors: [...authors]
                    });
                })
                .catch(err => console.log(err));
        })
        //.then(books => res.json(books))
        .catch(err => console.log(err));
});

router.get('/author/:authorName', (req, res) => {
    const name = req.params.authorName;
    Author.findOne({ name })
        .then(author => {
            Book.find({ author }).then(books => {
                res.status(200).json({ author, books });
            });
        })
        .catch(err => {
            console.log(err);
        });
});

export default router;
