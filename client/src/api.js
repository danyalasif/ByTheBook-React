import axios from 'axios';
export default {
    user: {
        login: credentials =>
            axios
                .post('/api/users/login', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(res => res.data.user),

        signup: user =>
            axios
                .post('/api/users/register', {
                    username: user.username,
                    password: user.password,
                    email: user.email
                })
                .then(res => res.data.user),

        logout: () => axios.get('/api/users/logout').then(res => res.data),

        confirm: token =>
            axios
                .post('/api/users/confirmation', { token })
                .then(res => res.data.user),

        wishlist: () => axios.get('/api/users/wishlist').then(res => res.data),
        readlist: () => axios.get('/api/users/readlist').then(res => res.data),

        review: data =>
            axios.post('/api/reviews', { data }).then(res => {
                return { reviewSuccess: res.data.success };
            })
    },

    cart: {
        addProduct: product =>
            axios.post('/api/cart/addToCart', { product }).then(res => {
                console.log(res.data);
                return res.data;
            }),
        getCart: () => axios.get('/api/cart/cartItems').then(res => res.data)
    }
};
