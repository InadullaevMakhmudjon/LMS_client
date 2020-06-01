<template>
  <div>
    <vx-card no-shadow>
    <add-book-item :bookObj="bookInfo" />
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
      bookInfo: {},
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
          ...book,
          imageFile: null
        };
        // console.log(book)
        this.bookInfo.language = book.language.name;
        // this.bookInfo.authors = book.authors.map(({ name }) => name).join(", ");
      });
    },
    submitData() {
       this.$vs.notify({
        title: 'The action has occured',
        text: 'Click on me to execute function',
        color: 'primary',
        fixed: true,
     })
    },
    leaveBack() {
        this.$router.push('/books')
    }
  },
  components: {
    AddBookItem
   },
  
  mounted() {
    this.getBook(this.id);
  }
};
</script>

<style></style>
