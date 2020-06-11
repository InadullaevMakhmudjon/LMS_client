<template>
  <div>
    <vx-card no-shadow>
      <add-book-item :bookObj="bookInfo" />
      <vs-row>
        <vs-col
          vs-type="flex"
          vs-justify="flex-end"
          vs-align="center"
          vs-w="12"
        >
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
import io from "socket.io-client";
export default {
  data() {
    return {
      bookInfo: {
        shelfId: 0,
        shelfItems: [],
        socket: io(process.env.VUE_APP_READER_SOCKET, { transports: ["websocket"]}),
      }
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
          shelfItems: [],
          shelfId: 0,
          socket: io(process.env.VUE_APP_READER_SOCKET, { transports: ["websocket"]}),
          imageFile: null
        };
        this.bookInfo.language = book.book.language.name;
        // this.bookInfo.authors = book.authors.map(({ name }) => name).join(", ");
      });
    },
    submitData() {
      
      const bookItem = this.bookInfo.shelfItems
        .map(el => {
          return el.bookItems.map(r => ({
            bookId: r.id,
            shelfId: el.shelfId,
            rfidTag: r.code
          }));
        })
        .reduce((ac, cur) => ac.concat(cur));
        console.log(bookItem)
      Books.postBookItems(bookItem).then(res  => {
        this.bookInfo.socket.disconnect()
        this.$router.push(`/books/${this.bookInfo.id}`)
        this.$vs.notify({ 
          title: 'Book items added successfully',
          color: 'success'
        })
      }).catch( err => console.log(err))
    },
    leaveBack() {
      this.bookInfo.socket.disconnect()
      this.$router.push(`/books/${this.bookInfo.id}`);
    }
  },
  components: {
    AddBookItem
  },

  created() {
    console.log(this.bookInfo.shelfItems.length);
    this.getBook(this.id);
  }
};
</script>

<style></style>
