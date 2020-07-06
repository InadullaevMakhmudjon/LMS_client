import API, { execute } from './Api';

export default {
    postArraysOfTags: (data) => execute(API().post('books/inventory', data)),
  
}