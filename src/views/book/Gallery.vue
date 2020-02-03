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
      5 results found in Book list
    </p>

    <vs-row>
      <vs-col
        v-for="book in books"
        :key="book.id"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="3"
      >
        <div
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
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Books from '@/services/Books';

export default {
  data: () => ({
    selectedCourse:'',
    searchQuery:'',
    selectedLanguage:'',
    selectedCategory:'',
    selectedSubject:'',
    selectedBookType:'',
    updateSearchQuery:'',

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
        title: '',
        author: { name },
        image: '',
        ISBNCode: '',
      }
    ]
  }),
  computed: {
    authors() {
      return 
    }
  },
  methods: {
    getAll() {
      Books.getAll().then(books => {
        this.books = books;
        this.books.forEach(book => {
          book.authorName = book.authors.map(({ name }) => name).join(', ');
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

<style>
.elevation {
  box-shadow: 0;
}
</style>
