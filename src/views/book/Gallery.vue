<template>
  <div id="div-with-loading" class="vs-con-loading__container">
    <vs-row>
      <vx-card class="no-shadow" collapse-action title="Filtering books">
        <vs-col
          vs-offset="1"
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="10"
        >
          <div class="mt-2">
            <vs-button v-if="$hasPermission(4)" class="" color="#2ca3f2" to="/book/create-book" dark>
              Create Book
            </vs-button>
          </div>

          <!--Dropdown filters-->
          <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
            <p>Year</p>
            <v-select
              :disabled="disableField"
              v-model="filterList.courseYear"
              class="w-full select-large"
              label="name"
              :reduce="({ id }) => id"
              :options="courses"
            ></v-select>
          </div>

          <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
            <p>Book Type</p>
            <v-select
              :disabled="disableField"
              v-model="filterList.typeId"
              class="w-full select-large"
              label="name"
              :reduce="({ id }) => id"
              :options="bookTypes"
            ></v-select>
          </div>

          <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
            <p>Subject</p>
            <v-select
              :disabled="disableField"
              v-model="filterList.subjectId"
              class="w-full select-large"
              label="name"
              :reduce="({ id }) => id"
              :options="subjects"
            ></v-select>
          </div>

          <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
            <p>Category</p>
            <v-select
              :disabled="disableField"
              v-model="filterList.categoryId"
              class="w-full select-large"
              label="name"
              :reduce="({ id }) => id"
              :options="categories"
            ></v-select>
          </div>
          <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
            <p>Language</p>
            <v-select
              :disabled="disableField"
              v-model="filterList.languageId"
              class="w-full select-large"
              label="name"
              :reduce="({ id }) => id"
              :options="languages"
            ></v-select>
          </div>
        </vs-col>
        <vs-row>
          <vs-col
            vs-offset="1"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="10"
          >
            <vx-tooltip text="Use only ISBN format here">
              <vs-input
                placeholder="isbn"
                class="mb-4 md:mb-0 mr-2  flex-1"
                v-model="filterList.isbn"
                @input="searchByIsbn"
                v-on:keyup.enter="getResult"
              />
            </vx-tooltip>
            <vs-input
              :disabled="disableAllfields"
              class="mb-4 md:mb-0 mr-2  flex-1"
              v-model="filterList.title"
              placeholder="Search by title..."
              @input="addEvent"
              v-on:keyup.enter="getResult"
            />
            <vs-button
              @click="getResult"
              color="primary"
              class="flex"
              v-text="'Search'"
            ></vs-button>
          </vs-col>
        </vs-row>
      </vx-card>
    </vs-row>

    <p class="text-grey text-2xl text-center mt-5 mb-5">
      {{ booksQuantity }} results found in Book list
    </p>

    <vs-row>
      <vs-col vs-justify="start" v-for="book in books" :key="book.id" vs-w="3">
        <main @click="bookInfo(book.id)">
          <div class="book-card">
            <div class="book-card__cover">
              <div class="book-card__book">
                <div class="book-card__book-front " slot="media">
                  <img
                    class="book-card__img"
                    :src="book.image"
                    :alt="book.image"
                  />
                </div>
                <div class="book-card__book-back"></div>
                <div class="book-card__book-side"></div>
              </div>
            </div>
            <div>
              <div class="book-card__status">
                {{ book.isBorrowable ? "Borrowable" : "Not Borrowable" }}
              </div>
              <div class="book-card__title">
                {{
                  book.title.length > 23
                    ? book.title.slice(0, 23) + "..."
                    : book.title
                }}
              </div>
              <div class="book-card__s">
                {{ `by ${book.authorName}` }}
              </div>
              <div class="book-card__author">
                <span>{{ `ISBN: ${book.ISBNCode}` }}</span
                ><span class="book_quantity">43</span>
              </div>
            </div>
          </div>
        </main>
      </vs-col>
    </vs-row>
    <vs-row class="mt-4 justify-end">
      <vs-pagination
        v-if="booksQuantity > 5"
        :total="page"
        v-model="currentx"
      ></vs-pagination>
    </vs-row>
  </div>
</template>

<script>
import Books from "@/services/Books";
import Categories from "@/services/Categories";
import Languages from "@/services/Languages";
import Courses from "@/services/Courses";
import Subjects from "@/services/Subjects";
import BookTypes from "@/services/BookTypes";
import vSelect from "vue-select";
import { Validator } from "vee-validate";

export default {
  data: () => ({
    selectedCourse: "",
    disableField: false,
    disableAllfields: false,
    currentx: 1,
    page: 1,
    booksQuantity: 0,
    required: "THE FIELD IS REQUIRED",
    filterList: {
      title: "",
      isbn: "",
      courseYear: "",
      languageId: "",
      categoryId: "",
      subjectId: "",
      typeId: ""
    },

    courses: [],
    bookTypes: [],
    subjects: [],
    categories: [],
    languages: [],
    books: [
      {
        id: 1,
        title: "",
        author: { name },
        image: "",
        ISBNCode: ""
      }
    ]
  }),
  components: {
    vSelect
  },
  computed: {
    authors() {
      return;
    }
  },
  watch: {
    filterList: {
      handler(value) {
        Object.keys(value).forEach(key => {
          if (value[key] === null) {
            this.filterList[key] = "";
          }
        });
      },
      deep: true
    },
    currentx(val) {
      this.getAll(val,12);
    }
  },
  methods: {
    getResult() {
      this.loading(true);
      if (this.disableAllfields && this.disableAllfields) {
        Books.getISBN(this.filterList.isbn,this.currentx, 12).then(({ items: books, length }) => {
          this.books = books;
          this.booksQuantity = length;
          this.page = Math.ceil(length / 12);
          this.loading(false);
          this.books.forEach(book => {
              book.authorName = book.authors.map(({ name }) => name).join(", ");
            });
        }).catch(error => {
            console.log(error);
            this.loading(false);})

      } else {
        // this.$validator.validateAll().then(result => {
        //   if (result) {

        // const url = Object.keys(this.filterList)
        //   .map(key => `${key}=${this.filterList[key]}`)
        //   .join("&");
        const url = `title=${this.filterList.title}&courseYear=${this.filterList.courseYear}&languageId=${this.filterList.languageId}&categoryId=${this.filterList.categoryId}&subjectId=&typeId=${this.filterList.typeId}`;
        Books.getSearchedBooks(url,this.currentx,12)
          .then(({ items: books, length }) => {
            this.books = books;
            this.booksQuantity = length;
            this.page = Math.ceil(length / 12);
            this.books.forEach(book => {
              book.authorName = book.authors.map(({ name }) => name).join(", ");
            });
            this.loading(false);
          })
          .catch(error => {
            console.log(error);
            this.loading(false);
            //   });
            // } else {
            //    alert('ERROR')
            // }
          });
      }
    },
    bookInfo(id) {
      this.$router.push("/books/" + id);
    },
    //   languages() {
    //     Languages.getAll().then((languages) => {
    //     this.languages = languages;
    //   });
    // },
    //   courses() {
    //     Courses.getAll().then((courses) => {
    //     this.courses = courses;
    //   });
    // },
    //   courses() {
    //     Courses.getAll().then((courses) => {
    //     this.courses = courses;
    //   });
    // },

    getFilters() {
      Promise.all([
        Categories.getAll(),
        BookTypes.getAll(),
        Subjects.getAll(),
        Courses.getAll(),
        Languages.getAll()
      ]).then(result => {
        const [categories, booktypes, subjects, courses, languages] = result;
        this.categories = categories;
        this.subjects = subjects;
        this.bookTypes = booktypes;
        this.courses = courses;
        this.languages = languages;
      });
    },
    getAll(val) {
      Books.getAll(val, 12).then(({ items: books, length }) => {
        this.books = books;
        this.booksQuantity = length;
        this.page = Math.ceil(length / 12);
        this.books.forEach(book => {
          book.authorName = book.authors.map(({ name }) => name).join(", ");
        });
      });
    },
    funct(parm) {
      // console.log(parm);
    },
    //ui loadings
    loading(con) {
      if (con == true) {
        this.$vs.loading({
          container: "#div-with-loading",
          scale: 0.9
        });
      } else if (con == false) {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      }
    },
    addEvent(val) {
      if (this.filterList.title.length > 0) this.disableField = true;
      else this.disableField = false;
    },
    searchByIsbn(val) {
      if (val.length > 0) {
        this.disableAllfields = true;
        this.disableField = true;
      } else {
        this.disableAllfields = false;
        this.disableField = false;
      }
    }
  },
  mounted() {
    this.getAll(1, 12);
    this.getFilters();
  }
};
</script>

<style lang="scss">
main {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  cursor: pointer;
}

.book-card {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  .book-card__cover {
    position: relative;
    width: 200px;
    height: 300px;
    margin: 0 auto 8px auto;
    perspective: 1000px;
  }

  .book-card__book {
    height: 100%;
    transform-style: preserve-3d;
    transition: all 250ms ease;
  }

  .book-card__book-front {
    position: absolute;
    height: 100%;
  }

  .book-card__book-back {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    transform: translateZ(-40px);
  }

  .book-card__book-side {
    position: absolute;
    top: 5px;
    bottom: 2px;
    right: -29px;
    width: 40px;
    background-size: 5px;
    background-color: #e1e1e1;
    background-image: linear-gradient(to right, #ccc 35%, #e1e1e1 35%);
    opacity: 0;
    transform: rotate3d(0, 1, 0, 90deg);
  }

  .book-card__img {
    width: 100%;
    height: 100%;
    background-color: #e1e1e1;
  }

  .book-card__title {
    font-size: 1.3em;
    margin-bottom: 8px;
  }
  .book-card__s {
    font-size: 1rem;
    color: #2ca3f2;
  }
  .book_quantity {
    background: #ededed;
    color: rgb(26, 26, 26);
    border-radius: 5px;
    padding: 2px 10px;
  }
  .book-card__status {
    background: rgb(104, 190, 54);
    color: white;
    width: 50%;
    padding: 1%;
    padding-left: 3%;
    margin-bottom: 2px;
    border-radius: 5px;
  }

  .book-card__author {
    color: #757575;
    font-size: 1em;
    display: flex;
    justify-content: space-between;
  }

  // STATES
  &:hover {
    .book-card__book {
      transform: rotate3d(0, -1, 0, 30deg) translate(-15px, -30px);
    }

    .book-card__book-back {
      box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.35);
    }

    .book-card__book-side {
      opacity: 1;
    }
  }
}
.elevation {
  box-shadow: 0;
}
</style>
