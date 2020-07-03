import API, { execute } from './Api';

export default {
    getAll: (page, size) => execute(API().get('books/?page=' + page + '&size=' + size)),
    getOnebook: (id) => execute(API().get('books/' + id)),
    updateBookInfo: (id, book) => execute(API().post('books/' + id, book)),
    create: book => execute(API().post('books', book)),
    checkISBN: code => execute(API().post('books/checkIsbn', code)),
    getISBN: (str, page, size) => execute(API().get(`/books/search/?page=${page}&size=${size}&ISBNCode=${str}`)),
    uploadImage: book => execute(API().post('books/images', book)),
    getSearchedBooks: (books, page, size) => execute(API().get(`books/search?page=${page}&size=${size}&` + books)),
    postBookItems:items => execute(API().post('bookItems', items)),
    hasBookItem: rfidTag => execute(API().get(`bookItems/check?rfidTag=${rfidTag}`)),
    deleteBookItem: id => execute(API().delete(`bookItems/${id}`))
}