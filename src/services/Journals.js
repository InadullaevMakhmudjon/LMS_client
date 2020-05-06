import API, { execute } from './Api';

export default {
    create: journal => execute(API().post('journals', journal)),
    checkISSN: ISSNCode => execute(API().post('journals/checkIssn', { ISSNCode })),
}