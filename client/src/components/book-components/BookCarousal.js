import React from 'react';
import { Carousel } from '../../../node_modules/react-bootstrap';

const quotes = [
    {
        quote: `Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.`,
        author: `Albert Einstein`,
    },
    { quote: `So many books, so little time.`, author: `Frank Zappa` },
    {
        quote: `A room without books is like a body without a soul.`,
        author: `Marcus Tullius Cicero`,
    },
    {
        quote: `If you tell the truth, you don't have to remember anything.`,
        author: `Mark Twain`,
    },
    {
        quote: `To live is the rarest thing in the world. Most people exist, that is all.`,
        author: `Oscar Wilde`,
    },
    {
        quote: `To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.`,
        author: `Ralph Waldo Emerson`,
    },
    {
        quote: `And those who were seen dancing were thought to be insane by those who could not hear the music.`,
        author: `Friedrich Nietzsche`,
    },
    {
        quote: `Sometimes people don't want to hear the truth because they don't want their illusions destroyed.`,
        author: `Friedrich Nietzsche`,
    },
    {
        quote: `There are no facts, only interpretations.`,
        author: `Friedrich Nietzsche`,
    },
    {
        quote: `I cannot believe in a God who wants to be praised all the time.`,
        author: `Friedrich Nietzsche`,
    }
];


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


const BookCarousal = () => (
    <Carousel interval="100000" style={{ marginBottom: '2em' }}>
        {quotes.map((quote, i) => (
            <Carousel.Item key={i}>
                <img
                    width={1920}
                    height={320}
                    alt="900x500"
                    src={`https://loremflickr.com/1400/320/grass?image=${i}`}
                />
                <Carousel.Caption>
                    <p style={retroStyles}>&#65282;{quote.quote}&#65282;</p>
                    <h3>~{quote.author}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        ))}

    </Carousel>
);
export default BookCarousal;
