import React, { Component } from 'react';
// import logo from './logo.svg';

import './App.css';

import HomePage from './components/pages/HomePage';
import TopNavigation from './components/navigation/TopNavigation';

import ProfilePage from './components/pages/ProfilePage';
import AdminPage from './components/pages/AdminPage';
import BookPage from './components/pages/BookPage';

import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import AdminRoute from './components/routes/AdminRoute';
import AuthorProfile from './components/pages/AuthorProfile';
import CheckoutPage from './components/pages/CheckoutPage';
import SearchPage from './components/pages/SearchPage';
import CreateBook from './components/pages/CreateBook';
import CreateAuthor from './components/pages/CreateAuthor';
import OrderPage from './components/pages/OrderPage';
import ReadlistPage from './components/pages/ReadlistPage';
import WishlistPage from './components/pages/WishlistPage';
import GenrePage from './components/pages/GenrePage';

import Footer from './components/navigation/Footer';

class App extends Component {
    render() {
        return (
            <div>
                <GuestRoute component={TopNavigation} />
                <GuestRoute path="/" exact component={HomePage} />
                <GuestRoute
                    path="/search/:searchQuery"
                    exact
                    component={SearchPage}
                />
                <GuestRoute path="/book/:isbn" exact component={BookPage} />
                <GuestRoute path="/genre/:genre" exact component={GenrePage} />
                <GuestRoute
                    path="/author/:authorName"
                    exact
                    component={AuthorProfile}
                />
                <UserRoute
                    path="/profile/:username"
                    exact
                    component={ProfilePage}
                />
                <UserRoute path="/checkout" exact component={CheckoutPage} />
                <UserRoute path="/orders" exact component={OrderPage} />
                <UserRoute
                    path="/:user/readlist"
                    exact
                    component={ReadlistPage}
                />
                <UserRoute
                    path="/:user/wishlist"
                    exact
                    component={WishlistPage}
                />
                <AdminRoute path="/admin" exact component={AdminPage} />
                <AdminRoute
                    path="/admin/createbook"
                    exact
                    component={CreateBook}
                />

                <AdminRoute
                    path="/admin/createauthor"
                    exact
                    component={CreateAuthor}
                />

                <GuestRoute component={Footer} />
            </div>
        );
    }
}

export default App;
