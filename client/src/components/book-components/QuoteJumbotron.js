import React, { Component } from 'react';
import { Jumbotron, Carousel } from 'react-bootstrap';

const quotes = [
    {
        quote: `Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.`,
        author: `Albert Einstein`,
        image: `/carousal1.jpg`
    },
    { quote: `So many books, so little time.`, author: `Frank Zappa` },
    {
        quote: `A room without books is like a body without a soul.`,
        author: `Marcus Tullius Cicero`,
        image: `/carousal1.jpg`
    },
    {
        quote: `If you tell the truth, you don't have to remember anything.`,
        author: `Mark Twain`,
        image: `/carousal1.jpg`
    },
    {
        quote: `To live is the rarest thing in the world. Most people exist, that is all.`,
        author: `Oscar Wilde`,
        image: `/carousal1.jpg`
    },
    {
        quote: `To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.`,
        author: `Ralph Waldo Emerson`,
        image: `/carousal1.jpg`
    },
    {
        quote: `And those who were seen dancing were thought to be insane by those who could not hear the music.`,
        author: `Friedrich Nietzsche`,
        image: `/carousal1.jpg`
    },
    {
        quote: `Sometimes people don't want to hear the truth because they don't want their illusions destroyed.`,
        author: `Friedrich Nietzsche`,
        image: `/carousal1.jpg`
    },
    {
        quote: `There are no facts, only interpretations.`,
        author: `Friedrich Nietzsche`,
        image: `/carousal1.jpg`
    },
    {
        quote: `I cannot believe in a God who wants to be praised all the time.`,
        author: `Friedrich Nietzsche`,
        image: `/carousal1.jpg`
    }
];

class QuoteJumbotron extends Component {
    render() {
        const { books } = this.props;
        return (
            <Jumbotron
                style={{
                    margin: '1em',
                    marginTop: '5em',
                    padding: '2em',
                    backgroundColor: 'lightblue',
                    borderRadius: '15px'
                }}
            >
                <h2>Quotes for an eternity</h2>
                <Carousel controls={false} style={{ height: '20vh' }}>
                    {quotes.map(quote => (
                        <Carousel.Item animateIn={true} animateOut={true}>
                            <div>
                                <blockquote>
                                    <h2> &#65282;{quote.quote}&#65282; </h2>
                                </blockquote>
                                <h3>~{quote.author} </h3>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Jumbotron>
        );
    }
}

export default QuoteJumbotron;
