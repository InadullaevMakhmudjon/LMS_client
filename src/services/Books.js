import { execute, API } from './Api';

export default {
    getAll: () => execute(API.get('books')),
    create: book => execute(API.post('books', book)),
    checkISBN: ISBNcode => execute(API.post('books/checkIsbn', { ISBNcode })),
    uploadImage: book => execute(API.post('books/images', book))
}