<template>
  <div>
    <vs-row>
      <vs-col
        vs-offset="1"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="10"
      >
        <div class="mt-2">
          <vs-button class="" color="#2ca3f2" to="/book/create-book" dark>
            Create Book
          </vs-button>
        </div>

        <!--Dropdown filters-->
        <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
          <vs-select
            size="large"
            v-model="selectedCourse"
            class="w-full select-large"
            label="Year"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in year"
              class="w-full"
            />
          </vs-select>
        </div>

        <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
          <vs-select
            size="large"
            v-model="selectedBookType"
            class="w-full select-large"
            label="Books type"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in bookTypes"
              class="w-full"
            />
          </vs-select>
        </div>

        <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
          <vs-select
            size="large"
            v-model="selectedSubject"
            class="w-full select-large"
            label="Subjects"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in subjects"
              class="w-full"
            />
          </vs-select>
        </div>

        <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
          <vs-select
            size="large"
            v-model="selectedCategory"
            class="w-full select-large"
            label="Category"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in category"
              class="w-full"
            />
          </vs-select>
        </div>

        <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
          <vs-select
            size="large"
            v-model="selectedLanguage"
            class="w-full select-large"
            label="Language"
          >
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item, index) in language"
              class="w-full"
            />
          </vs-select>
        </div>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-offset="1"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="10"
      >
        <vs-input
          class="mb-4 md:mb-0 mr-4  flex-1"
          v-model="searchQuery"
          @input="updateSearchQuery"
          placeholder="Search..."
        />
        <vs-button color="#2ca3f2" class="flex" v-text="'Search'"></vs-button>
      </vs-col>
    </vs-row>

    <p class="text-grey text-2xl text-center mt-5 mb-5">
      {{ books.length }} results found in Book list
    </p>

    <vs-row>
      <!-- <div
          class="vx-col w-full sm:w-1/2 lg:w-full mb-base"
          @click="funct(book.id)"
        >
          <vx-card class="m-1">
            <img
              :src="book.image"
              alt="content-img"
              class="responsive"
            />

            <div class="my-6 justify-center">
              <vs-row class="justify-between">
                <vs-alert
                  class="w-1/2 md:w-1/3 lg:w-1/2 xs:w-full p-0 mb-2 text-center align-center"
                  color="success"
                  active="true"
                >
                  <span class="text-1xs align-center"> (borrowable)! </span
                  ><feather-icon icon="CheckCircleIcon" svgClasses="h-4 w-4" />
                </vs-alert>

                <vs-alert
                  class="w-1/4 p-0 mb-2 text-center align-center"
                  active="true"
                  >(22 / 300)!</vs-alert
                >
              </vs-row>

              <h3 class="mb-2">{{ book.title }}</h3>
              <p class="text-primary">{{ `by ${book.authorName}` }}</p>
              <p class="text-black text-2xs">{{ `ISBN: ${book.ISBNCode}` }}</p>
            </div>
          </vx-card>
        </div> -->

      <!-- <vx-card class="overlay-card h-100 overflow-hidden w-full">
    <template slot="no-body">
      <img :src="book.image" alt="user-profile-cover" class="responsive">
      <div class="card-overlay text-white flex flex-col justify-between">
        <h4 class="text-white mb-4">{{book.title}}</h4>
        <p>{{`ISBN: ${book.ISBNCode}`}}</p>
      </div>
    </template>
  </vx-card> -->

      <main v-for="book in books" :key="book.id">
        <vs-col>
          <div class="book-card">
            <div class="book-card__cover">
              <div class="book-card__book">
                <div class="book-card__book-front">
                  <img class="book-card__img" :src="book.image" />
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
        </vs-col>
      </main>
    </vs-row>
  </div>
</template>

<script>
import Books from "@/services/Books";

export default {
  data: () => ({
    selectedCourse: "",
    searchQuery: "",
    selectedLanguage: "",
    selectedCategory: "",
    selectedSubject: "",
    selectedBookType: "",
    updateSearchQuery: "",

    year: [
      { text: "Freshman", value: "1" },
      { text: "Sophomore", value: "2" },
      { text: "Senior", value: "3" },
      { text: "Junior", value: "4" },
      { text: "staff", value: "5" }
    ],
    bookTypes: [
      { text: "borrowable", value: "1" },
      { text: "Not borrowable", value: "2" }
    ],
    subjects: [
      { text: "Computer Algorithm", value: "1" },
      { text: "System Analysis", value: "2" },
      { text: "Calculus", value: "3" },
      { text: "Physics", value: "4" },
      { text: "Academic English 1", value: "5" },
      { text: "Academic English 2", value: "6" },
      { text: "Korean 1", value: "7" },
      { text: "Korean 2", value: "8" },
      { text: "Data Stucture", value: "9" },
      { text: "Discrete Mathematics", value: "10" },
      { text: "Signal and Systems", value: "11" }
    ],
    category: [
      { text: "Computer Science", value: "1" },
      { text: "Data Science", value: "2" },
      { text: "Biology", value: "3" },
      { text: "Chemistry", value: "4" },
      { text: "Lingustics", value: "5" },
      { text: "Algorithms", value: "6" },
      { text: "Phylosophy", value: "7" }
    ],
    language: [
      { text: "Uzbek", value: "1" },
      { text: "English", value: "2" },
      { text: "Russian", value: "3" },
      { text: "Korean", value: "4" },
      { text: "Italian", value: "5" },
      { text: "Spain", value: "6" },
      { text: "Chinese", value: "7" }
    ],
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
  computed: {
    authors() {
      return;
    }
  },
  methods: {
    getAll() {
      Books.getAll().then(books => {
        this.books = books;
        this.books.forEach(book => {
          book.authorName = book.authors.map(({ name }) => name).join(", ");
        });
      });
    },
    funct(parm) {
      // console.log(parm);
    }
  },
  mounted() {
    this.getAll();
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
    background: #EDEDED;
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
