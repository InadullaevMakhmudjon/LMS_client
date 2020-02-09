import { execute, API } from './Api';

export default {
    getAll: (page, quantity) => execute(API.get('books/?page=' + page + '&size=' + quantity)),
    getOnebook: (id) => execute(API.get('books/' + id)),
    updateBookInfo: (id, book) => execute(API.post('books/' + id, book)),
    create: book => execute(API.post('books', book)),
    checkISBN: ISBNCode => execute(API.post('books/checkIsbn', { ISBNCode })),
    uploadImage: book => execute(API.post('books/images', book)),
    getSearchedBooks: obj => execute(API.get('books/search?page=1&size=10&' + obj))
}