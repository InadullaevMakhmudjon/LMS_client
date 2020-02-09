<template>
  <div>
    <update-book :bookObj="bookInfo" />
    <vs-row>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="12">
        <vs-button @click="submitData" imageFile>Save changes</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import UpdateBook from "../create-book-steps/Create_1";
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
          imageFile: new FormData()
        };
        this.bookInfo.language = book.language.name;
        this.bookInfo.authors = book.authors.map(({ name }) => name).join(", ");
      });
    },
    submitData() {
      if(Object.entries(this.bookInfo.imageFile).length !== 0) {

      Books.uploadImage(this.bookInfo.imageFile )
      .then(({ imageUrl }) => {
        console.log(imageUrl)
      this.bookInfo.image = imageUrl;
      Books.updateBookInfo(this.id, this.bookInfo).then(() => {
        this.$vs.notify({
          time: 3000,
          title: "Updating...",
          text: "The book has successfully updated",
          color: "primary",
          iconPack: "feather",
          icon: "icon-check-circle"
        });
        this.$router.push("/books");
      });
    }
      )}
      else {
        Books.updateBookInfo(this.id, this.bookInfo).then(() => {
        this.$vs.notify({
          time: 3000,
          title: "Updating...",
          text: "The book has successfully updated",
          color: "primary",
          iconPack: "feather",
          icon: "icon-check-circle"
        });
        this.$router.push("/books");
      });
      }
    }
  },
  components: {
    UpdateBook
  },
  mounted() {
    this.getBook(this.id);
  }
};
</script>

<style></style>
