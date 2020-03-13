import Dispatcher from '../dispatcher/appDispatcher';
import axios from 'axios'

const BooksActions = {
    createBook: function (book) {
        Dispatcher.dispatch({
            actionType: 'create_book_started'
        });
        axios.put(`http://www.mocky.io/v2/5e688bd22f00002e59d8ad48`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'create_book_successful',
                    data: {
                        book_id: Math.floor(new Date().getTime() / 1000),
                        title: book.title,
                        author: book.author
                    }
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'create_book_failure'
                });
            });
    },
    readBooks: function () {
        Dispatcher.dispatch({
            actionType: 'read_books_started'
        });
        axios.get(`http://www.mocky.io/v2/5daca80c30000092002987ad`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'read_books_successful',
                    data: res.data
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'read_books_failure'
                });
            });
    },
    updateBook: function (index, book) {
        Dispatcher.dispatch({
            actionType: 'update_book_started'
        });
        axios.put(`http://www.mocky.io/v2/5e6850fc2f00005900d8abb5`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'update_book_successful',
                    data: { index: index, book: book }
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'update_book_failure'
                });
            });
    },
    removeBook: function (index) {
        Dispatcher.dispatch({
            actionType: 'remove_book_started'
        });
        axios.delete(`http://www.mocky.io/v2/5e68517e2f00006500d8abb9`)
            .then(res => {
                Dispatcher.dispatch({
                    actionType: 'remove_book_successful',
                    data: index
                });
            })
            .catch((error) => {
                console.log(error);
                Dispatcher.dispatch({
                    actionType: 'remove_book_failure'
                });
            });
    }
}

module.exports = BooksActions;