import API, { execute } from './Api';

export default {
  borrowBooks: (data) => execute(API().post('borrows', data)),
  studentBorrowedBooks: (id) => execute(API().get(`borrows?memberId=${id}&isReturned=0`)),
  studentRetunedBooks: () => execute(API().get('borrows?memberId=1&isReturned=1')),
  studentPostBook: (id) => execute(API().post(`borrows/${id}/return`)),
  transactions: () => execute(API().get('transactions')),
  isAllowedBorrowing: id => execute(API().get(`borrows/${id}/check`)),
  changeStatusOfbookLost1: id => execute(API().post(`bookItems/${id}` ,{ bookStatusId: 3 })),
  changeStatusOfbookLost2: borrowId => execute(API().post(`borrows/${borrowId}/lost`, {})),
  changeStatusOfbookDamaged1: id => execute(API().post(`bookItems/${id}` ,{ bookStatusId: 4 })),
  changeStatusOfbookDamaged2: borrowId => execute(API().post(`borrows/${borrowId}/damaged`, {}))
}