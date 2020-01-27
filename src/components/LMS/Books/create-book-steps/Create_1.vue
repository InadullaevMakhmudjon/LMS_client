<template>
  <!-- tab 1 content -->
  <div class="vx-row">
    <div class="vx-col  sm:w-full md:w-1/3 w-full mt-5">
      <!--check Isbn-->
      <p>Check ISBN: (example: 3232-24324-232)</p>
      <vx-input-group class="mb-base">
        <vs-input v-model="bookObj.ISBNcode" />

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button @click="checkISBN(bookObj.ISBNcode)" :color="isValidIsbn ? '#2ca3f2' :'success'"
              >{{isValidIsbn ? 'Check': 'checked'}}</vs-button
            >
          </div>
        </template>
      </vx-input-group>
      <!--book title-->
      <vs-input
        :disabled="isValidIsbn"
        label="Book title"
        v-model="bookObj.title"
        class="w-full mt-3"
      />
     
      <!--book isbn -->
      <vs-input
        disabled
        label="Book ISBN"
        v-model="bookObj.ISBNcode"
        class="w-full mt-5"
      />
      <!--book category-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.categoryId"
        class="w-full select-large mt-5"
        label="Category"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in categoryList"
          class="w-full"
        />
      </vs-select>
      <!--book responsible person-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookResponsiblePerson"
        class="w-full select-large mt-5"
        label="Responsible Person"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in resPersonList"
          class="w-full"
        />
      </vs-select>
    </div>

    <div class="vx-col sm:w-full md:w-1/3 w-full mt-5">
      <!--book author-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.author"
        class="w-full select-large mt-0"
        label="Book Author"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in bookAuthorList"
          class="w-full"
        />
      </vs-select>
      <!--book langugage-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.languageId"
        class="w-full select-large mt-3"
        label="Book Language"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in languageList"
          class="w-full"
        />
      </vs-select>
      <!--book is borrawable and duration in days-->
      <vs-row class="mt-5" vs-align="center" vs-justify="between">
        <vs-checkbox
          :disabled="isValidIsbn"
          class=""
          v-model="bookObj.isBorrowable"
          >Is borrowable</vs-checkbox
        >
        <vs-input-number
          v-if="bookObj.isBorrowable"
          label="Duration:"
          class="flex-1 w-1/6"
          v-model="bookObj.duration"
        />
      </vs-row>
      <!--appended courses for the book-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.courseYear"
        class="w-full select-large mt-3"
        label="School Year"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in courseList"
          class="w-full"
        />
      </vs-select>
      <!--book description-->
      <vs-textarea
        :disabled="isValidIsbn"
        height="200"
        class="mt-5"
        label="Book Definition"
        v-model="bookObj.description"
      />
    </div>
    <div class="vx-col sm:w-full  md:w-1/3 w-full mt-5 justify-center">
      <!--image uploading-->
      <vs-upload
        :disabled="isValidIsbn"
        v-model="bookObj.image"
        limit="1"
        :fileName="bookObj.title"
        class="mt-5"
        @on-success="successUpload"
      />
    </div>
  </div>
</template>
<script>
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  props: {
    bookObj: {
      type: Object,
      required: true
    },   
  },
  data() {
    return {
      isValidIsbn: true,
      bookResponsiblePerson: "",
      resPersonList: [{ text: "Aliev Azam", value: "aliev-azam" }],
      bookAuthorList: [
        { text: "Juvana Robertson", value: "1" },
        { text: "Stewart Helligan", value: "2" },
        { text: "Mark Tsuri", value: "3" }
      ],
      courseList: [
        { text: "Freshman", value: "1" },
        { text: "Sophomore", value: "2" },
        { text: "Senior", value: "3" },
        { text: "Junior", value: "4" },
        { text: "staff", value: "5" }
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
      categoryList: [
        { text: "Computer Science", value: "1" },
        { text: "Data Science", value: "2" },
        { text: "Biology", value: "3" },
        { text: "Chemistry", value: "4" },
        { text: "Lingustics", value: "5" },
        { text: "Algorithms", value: "6" },
        { text: "Phylosophy", value: "7" }
      ],
      languageList: [
        { text: "Uzbek", value: "1" },
        { text: "English", value: "2" },
        { text: "Russian", value: "3" },
        { text: "Korean", value: "4" },
        { text: "Italian", value: "5" },
        { text: "Spain", value: "6" },
        { text: "Chinese", value: "7" }
      ]
    };
  },
  component: {
    TabContent
  },
  methods: {
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Cover has been successfully uploaded"
      });
    },
    checkISBN(isbn) {

      this.isValidIsbn = false
    }
  }
};
</script>
