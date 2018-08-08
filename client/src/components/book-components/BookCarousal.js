import React from 'react';
import { Carousel } from '../../../node_modules/react-bootstrap';
const quotes = [
    {
        quote: `Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.`,
        author: `Albert Einstein`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    { quote: `So many books, so little time.`, author: `Frank Zappa` },
    {
        quote: `A room without books is like a body without a soul.`,
        author: `Marcus Tullius Cicero`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `If you tell the truth, you don't have to remember anything.`,
        author: `Mark Twain`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `To live is the rarest thing in the world. Most people exist, that is all.`,
        author: `Oscar Wilde`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.`,
        author: `Ralph Waldo Emerson`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `And those who were seen dancing were thought to be insane by those who could not hear the music.`,
        author: `Friedrich Nietzsche`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `Sometimes people don't want to hear the truth because they don't want their illusions destroyed.`,
        author: `Friedrich Nietzsche`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `There are no facts, only interpretations.`,
        author: `Friedrich Nietzsche`,
        image: `http://localhost:3001/carousal1.jpg`
    },
    {
        quote: `I cannot believe in a God who wants to be praised all the time.`,
        author: `Friedrich Nietzsche`,
        image: `http://localhost:3001/carousal1.jpg`
    }
];

let textShadow = `1px -1px 0 #767676, 
-1px 2px 1px #737272, 
-2px 4px 1px #767474, 
-3px 6px 1px #787777, 
-4px 8px 1px #7b7a7a, 
-5px 10px 1px #7f7d7d, 
-6px 12px 1px #828181, 
-7px 14px 1px #868585, 
-8px 16px 1px #8b8a89, 
-9px 18px 1px #8f8e8d, 
-10px 20px 1px #949392, 
-11px 22px 1px #999897, 
-12px 24px 1px #9e9c9c, 
-13px 26px 1px #a3a1a1, 
-14px 28px 1px #a8a6a6, 
-15px 30px 1px #adabab, 
-16px 32px 1px #b2b1b0, 
-17px 34px 1px #b7b6b5, 
-18px 36px 1px #bcbbba, 
-19px 38px 1px #c1bfbf, 
-20px 40px 1px #c6c4c4, 
-21px 42px 1px #cbc9c8, 
-22px 44px 1px #cfcdcd, 
-23px 46px 1px #d4d2d1, 
-24px 48px 1px #d8d6d5, 
-25px 50px 1px #dbdad9, 
-26px 52px 1px #dfdddc, 
-27px 54px 1px #e2e0df, 
-28px 56px 1px #e4e3e2;`;

let retroStyles = {
    color: '#2c2c2c',
    backgroundColor: '#d5d5d5',
    letterSpacing: '.05em',
    textShadow: `4px 4px 0px #d5d5d5, 
      7px 7px 0px rgba(0, 0, 0, 0.2)`,
    fontFamily: `Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif`,
    fontSize: '30px',
    textRendering: 'optimizeLegibility'
};

// fontSize: '25px',
// fontFamily: 'Lato',
// textShadow: { textShadow },
// fontWeight: '700',
// letterSpacing: '.015em',
// background: 'red'

const BookCarousal = ({ books }) => (
    <Carousel interval="100000" style={{ marginBottom: '2em' }}>
        {quotes.map(quote => (
            <Carousel.Item>
                <img
                    width={1920}
                    height={300}
                    alt="900x500"
                    src="http://localhost:3001/images/carousal1.jpeg"
                />
                <Carousel.Caption>
                    <p style={retroStyles}>&#65282;{quote.quote}&#65282;</p>
                    <h3>~{quote.author}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
        {/* <Carousel.Item>
            <img
                width={1920}
                height={300}
                alt="900x300"
                src="http://localhost:3001/images/carousal1.jpeg"
            />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                width={1920}
                height={300}
                alt="900x300"
                src="http://localhost:3001/images/carousal1.jpeg"
            />
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                </p>
            </Carousel.Caption>
        </Carousel.Item> */}
    </Carousel>
);
export default BookCarousal;
