<template>
  <div>
    <vx-card no-shadow>
    <add-book-item :bookObj="bookInfo"  />
    <vs-row>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
        <vs-button @click="leaveBack" class="mx-2">Cancel</vs-button>
        <vs-button @click="submitData" imageFile>Save changes</vs-button>
      </vs-col>
    </vs-row>
    </vx-card>
  </div>
</template>

<script>
import AddBookItem from "../create-book-steps/Create_2";
import Books from "@/services/Books.js";
export default {
  data() {
    return {
      bookInfo: {
        shelfId: 0
      },
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    getBook(id) {
      Books.getOnebook(id).then(book => {
        this.bookInfo = {
          ...book.book,
           shelfId: 0,
          imageFile: null
        };
        // console.log(book)
        this.bookInfo.language = book.book.language.name;
        // this.bookInfo.authors = book.authors.map(({ name }) => name).join(", ");
      });
    },
    submitData() {
   const bookItem = this.bookInfo.bookItems.map( el => {
        return el.bookItems.map(np => {
          console.log(np)
          return np
        })
        console.log(el)
        })
    },
    leaveBack() {
        this.$router.push('/books')
    }
  },
  components: {
    AddBookItem
   },
  
  created() {
    this.getBook(this.id);
  }
};
</script>

<style></style>
