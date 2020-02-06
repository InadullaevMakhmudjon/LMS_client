import { execute, API } from './Api';

export default {
    getAll: (page, quantity) => execute(API.get('books/?page=' + page + '&size=' + quantity)),
    getOnebook: (id) => execute(API.get('books/'+id)),
    create: book => execute(API.post('books', book)),
    checkISBN: ISBNcode => execute(API.post('books/checkIsbn', { ISBNcode })),
    uploadImage: book => execute(API.post('books/images', book))
}