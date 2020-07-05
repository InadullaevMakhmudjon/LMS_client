import API, { execute } from './Api';

export default {
  borrowBooks: (data) => execute(API().post('borrows', data)),
  studentBorrowedBooks: (id) => execute(API().get(`borrows?memberId=${id}&isReturned=0`)),
  studentRetunedBooks: () => execute(API().get('borrows?memberId=1&isReturned=1')),
  studentPostBook: (id) => execute(API().post(`borrows/${id}/return`)),
  transactions: () => execute(API().get('transactions'))
}