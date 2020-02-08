<template>
  <div>
      <update-book :bookObj="bookInfo"/>
  </div>
</template>

<script>
import UpdateBook from '../create-book-steps/Create_1'
import Books from '@/services/Books.js'
export default {
    data() {
        return {
            bookInfo:{}
        }
    },
  props: {
       bookObj: {
      type: Object,
      required: true
    },

    id : {
        type: String,
        required: true
    }
},
methods:{
    getBook(id) {
      Books.getOnebook(id).then(book => {
        this.bookInfo = book;
        this.bookInfo.language = book.language.name;
        this.bookInfo.authors = book.authors.map(({ name }) => name).join(", ");
      });
    }
},
components:{
    UpdateBook,
},
mounted() {
 this.getBook(this.id)
}
}
</script>

<style>

</style>