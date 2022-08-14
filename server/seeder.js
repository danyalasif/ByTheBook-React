//@ts-check
import User from './models/userSchema';
import Book from './models/bookSchema';
import Review from './models/reviewSchema';
import Author from './models/authorSchema';
import { faker } from "@faker-js/faker";


const GENRE = [
    "Philosophy",
    "Classics",
    "Nonfiction",
    "Literature",
    "Literature",
    "Religion",
    "Century",
    "Unfinished",
    "Psychology",
    "Poetry",
    "Young Adult",
    "Romance",
    "Fiction",
    "Contemporary",
    "Realistic Fiction",
    "Teen",
    "Coming Of Age",
    "Novels",
    "Drama",
    "Love",




]

const LANGUAGES = [
    "English",
    "German",
    "French",
    "Italian",
    "Spanish",
    "Urdu"
]

const RATING = [0, 1, 2, 3, 4, 5]

function getRandomFromArray(genre) {
    return genre[Math.floor(Math.random() * genre.length)];
}


function addAuthors() {
    const authorData = {
        name: faker.name.fullName(),
        description: faker.lorem.paragraphs(),
        dob: faker.date.birthdate(),
        genre: getRandomFromArray(GENRE),
        author_img: faker.image.people(500, 500, true)
    }


    Author.insertMany(authorData).then((res) => console.log(res[0]._id))
}


function addBooks(author_id) {
    const bookObj = {
        ISBN13: faker.random.numeric(13),
        description: faker.lorem.paragraphs(),
        pages: faker.random.numeric(3),
        price: faker.random.numeric(2),
        title: faker.music.songName(),
        language: getRandomFromArray(LANGUAGES),
        rating: getRandomFromArray(RATING),
        book_img: faker.image.abstract(800, 1200, true),
        quantity: faker.random.numeric(1),
        publisher: faker.company.name(),
        genre: [getRandomFromArray(GENRE), getRandomFromArray(GENRE)],
        author: author_id,
        website: ""
    }
    Book.insertMany(bookObj).then((book) => console.log(book[0]._id))
}

function seedDb() {
    addAuthors();
    Author.find({}).then(author => {
        addBooks(getRandomFromArray(author)._id)
    })
}

export { seedDb }