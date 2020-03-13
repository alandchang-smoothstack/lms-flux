"use strict"

import React from 'react';
import MicroModal from 'react-micro-modal';
import PropTypes from 'prop-types';
import BookActions from '../actions/bookActions';

export class BookList extends React.Component {

    createBookRow(book, index) {
        return (
            <tr key={book.book_id}>
                <td> {book.book_id} </td>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td>
                    <MicroModal trigger={handleOpen => <button type="button" className='btn btn-primary' onClick={handleOpen}>Update</button>}>
                        {handleClose => (
                            <div>
                                <div><span>Title</span></div>
                                <div><input type="text" /></div>
                                <div><span>Author</span></div>
                                <div><input type="text" /></div>
                                <div><button className='btn btn-primary' onClick={(event) => {
                                    this.updateBook(index, {
                                        book_id: book.book_id,
                                        title: event.target.parentElement.parentElement.children[1].firstChild.value,
                                        author: event.target.parentElement.parentElement.children[3].firstChild.value
                                    });
                                    handleClose();
                                }}>Update</button></div>
                            </div>
                        )}
                    </MicroModal>
                </td>
                <td><button type="button" className='btn' onClick={() => this.removeBook(index)}>✕</button></td>
            </tr>
        );
    }

    createBook(book) {
        BookActions.createBook(book);
    }

    updateBook(index, book) {
        BookActions.updateBook(index, book);
    }

    removeBook(index) {
        BookActions.removeBook(index);
    }

    componentDidMount() {
        BookActions.readBooks();
    }

    render() {

        let content = '';

        if (this.props.book.readState.pending) {
            content = (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }


        if (this.props.book.readState.success) {
            content =
                (<table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.book.bookList.map(this.createBookRow, this)}
                    </tbody>
                </table>)
        }

        if (this.props.book.readState.failure) {
            content =
                (
                    <div className="alert alert-danger" role="alert">
                        Error while loading books!
                    </div>
                )
        }

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <div><h1>Books</h1></div>
                    <div><MicroModal trigger={handleOpen => <button type="button" className='btn btn-primary' onClick={handleOpen}>Create</button>}>
                        {handleClose => (
                            <div>
                                <div><span>Title</span></div>
                                <div><input type="text" /></div>
                                <div><span>Author</span></div>
                                <div><input type="text" /></div>
                                <div><button className='btn btn-primary' onClick={(event) => {
                                    this.createBook({
                                        title: event.target.parentElement.parentElement.children[1].firstChild.value,
                                        author: event.target.parentElement.parentElement.children[3].firstChild.value
                                    });
                                    handleClose();
                                }}>Create</button></div>
                            </div>
                        )}
                    </MicroModal></div>
                </div>
                {content}
            </div>
        );
    }
}

BookList.propTypes = {
    book: PropTypes.object.isRequired
};



