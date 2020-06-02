<template>
<div>
     <div class="vx-row">
            <div class="vx-col">
               <vs-radio v-model="bookObj.formType" vs-name="radios1" vs-value="isbn">ISBN</vs-radio>
            </div>
            <div class="vx-col">
                <vs-radio v-model="bookObj.formType" vs-name="radios1" vs-value="issn">ISSN</vs-radio>
            </div>
            <!-- <div class="vx-col">
                <vs-radio v-model="bookObj.formType" vs-name="radios1" vs-value="other">Other</vs-radio>
            </div> -->
       </div>
  <div class="vx-row">
    <div class="vx-col  sm:w-full md:w-1/3 w-full mt-5">
      <!--check Isbn-->
      <div v-if="bookObj.formType !=='other'" class="mb-5">
          <p>{{ 'Check Format: (ISBN or ISSN)'}}</p>
      <vx-input-group  class="">
      <vs-input  :disabled="point" v-model="bookObj.ISBNCode" />
        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button
              :disabled="point"
              @click="checkISBN(bookObj.ISBNCode)"
              :color="isValidIsbn ? '#2ca3f2' : 'success'"
              >{{ isValidIsbn ? "Check" : "checked" }}</vs-button
            >
          </div>
        </template>
      </vx-input-group>
      <!-- <vx-input-group class="" v-else>
      <vs-input  :disabled="point" v-model="bookObj.ISSNCode" />
        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button
              :disabled="point"
              @click="checkISBN(bookObj.ISSNCode)"
              :color="isValidIsbn ? '#2ca3f2' : 'success'"
              >{{ isValidIsbn ? "Check" : "checked" }}</vs-button
            >
          </div>
        </template>
      </vx-input-group> -->
      </div>
      <!--book title-->
      <vs-input
        :disabled="isValidIsbn"
        label="Book title"
        v-model="bookObj.title"
        class="w-full mt-0"
      />

      <!--book isbn -->
      <vs-input
        disabled
        label="Book ISBN"
        v-model="bookObj.ISBNCode"
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
          v-for="item in categoryList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
          class="w-full"
        />
      </vs-select>
    
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.typeId"
        class="w-full select-large mt-5"
        label="Book type"
      >
        <vs-select-item
          v-for="item in bookTypeList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
          class="w-full"
        />
      </vs-select>
      <!--published year -->
      <div class="mt-5">
        <span class="text-1xs">Published year:</span>
        <datepicker
          :disabled="isValidIsbn"
          v-model="publishedYear"
          format="yyyy"
          :minimumView="'year'"
          :maximumView="'year'"
        ></datepicker>
      </div>
    </div>

    <div class="vx-col sm:w-full md:w-1/3 w-full mt-5">
      <!--Book subjects-->
      <vs-select
        :disabled="isValidIsbn || isTypeIssn"
        v-model="bookObj.subjectId"
        class="w-full select-large mt-0"
        label="Book Subject"
      >
        <vs-select-item
          v-for="item in bookSubjectList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
          class="w-full"
        />
      </vs-select>
      <div class="mb-4">
      <p class="mt-4 text-small">Book Author</p>
      <v-select
        multiple
        v-model="bookObj.authors"
        taggable
        push-tags
        :disabled="isValidIsbn || isTypeIssn"
        :options="bookAuthorList"
        :create-option=" item => ({ id: 0, name: item }) "
        label="name"
      />
      </div>
      <!--book langugage-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.languageId"
        class="w-full select-large"
        label="Book Language"
      >
        <vs-select-item
          v-for="item in languageList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
          class="w-full"
        />
      </vs-select>
      <!--book is borrawable and duration in days-->
      <!-- <vs-row class="mt-5" vs-align="center" vs-justify="between">
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
      </vs-row> -->
      <!--appended courses for the book-->
      <vs-select
        :disabled="isValidIsbn || isTypeIssn"
        v-model="bookObj.courseYear"
        class="w-full select-large mt-3"
        label="School Year"
      >
        <vs-select-item
          v-for="item in courseList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
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
      <p>Upload book cover image here</p>
      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text btn-addon">
            <vs-button
              :disabled="isValidIsbn"
              color="primary"
              class="primary"
              dark
              @click="onPickFile"
              >Upload</vs-button
            >
          </div>
        </template>

        <vs-input disabled v-model="image" />
      </vx-input-group>
      <input
        type="file"
        style="display:none"
        ref="fileInput"
        accept="image/*"
        @change="onfilepicked"
      />
      <template v-if="imageUrl">
        <img
          class="zooming"
          height="300"
          v-if="!popupActivo"
          @click="popupActivo = true"
          :src="imageUrl"
        />
      </template>
       <template v-if="point">
        <img
          width="300"
          class="zooming"
          height="200"
          v-if="!popupActivo"
          @click="popupActivo = true"
          :src="bookObj.image"
        />
      </template>
    <vs-popup
      background-color="rgba(0, 0, 0, 0.8)"
      :title="bookObj.title"
      :active.sync="popupActivo"
    >
      <img class="center" :src="imageUrl" />
    </vs-popup>
  </div>
  </div>
</div>
</template>
<script>
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import Books from "@/services/Books.js";
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Authors from "@/services/Authors";
import Categories from "@/services/Categories";
import Languages from "@/services/Languages";

import Courses from "@/services/Courses";
import Subjects from "@/services/Subjects";
import BookTypes from "@/services/BookTypes";
import Journals from '@/services/Journals';

export default {
  props: {
    bookObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      bookTest: [
        { code: "CA", country: "Canada" },
        { code: "USA", country: "America" }
      ],
      point: false,
      publishedYear: 2,
      popupActivo: false,
      image: null,
      imageUrl: "",
      loading: false,
      isUploadable: true,
      isValidIsbn: true,
      bookTypeList: [],
      bookAuthorList: [],
      bookSubjectList: [],
      courseList: [],
      subjects: [],
      categoryList: [],
      languageList: []
    };
  },
  computed: {
    baseUrl() {
      return process.env.NODE_ENV === "production"
        ? process.env.VUE_APP_BASE_URL
        : "http://localhost:3030/api";
    },
    isTypeIssn() {
      return this.bookObj.formType=='issn'
    }
  },
  watch: {
    publishedYear(value) {
      this.bookObj.publishedYear = value.getFullYear();
    },
    bookObj: {
        handler(book) {
          if(book.formType=='other') this.isValidIsbn = false
        },
        deep: true
    }
  },
  components: {
    TabContent,
    Datepicker,
    vSelect
  },
  methods: {
    getAll() {
       if(this.$route.name=='update_book'){
         this.isValidIsbn = false
         this.image = this.bookObj.image
         this.point = true
       }
      this.loading = true;
      Promise.all([
        Authors.getAll(),
        Categories.getAll(),
        Languages.getAll(),
        Courses.getAll(),
        Subjects.getAll(),
        BookTypes.getAll()
      ])
        .then(result => {
          const [
            authors,
            categories,
            languages,
            courses,
            subjects,
            bookTypes
          ] = result;
          this.bookAuthorList = authors;
          this.categoryList = categories;
          this.languageList = languages;
          this.courseList = courses;
         // console.log(this.courseList)
          this.bookSubjectList = subjects;
          this.bookTypeList = bookTypes;
        })
        .catch(error => console.log(error.message))
        .finally(() => (this.loading = false));
    },
    onfilepicked(event) {
      this.bookObj.imageFile = new FormData()
      this.point = false
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please, input correct image file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0].name;
      this.bookObj.imageFile.append("image", files[0]);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    successUpload(value) {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Cover has been successfully uploaded"
      });
    },
    checkISBN(code) {
      Books.checkISBN({
          ISBNCode: code
      })
        .then(() => (this.isValidIsbn = false))
        .catch(() => (this.isValidIsbn = true));
    }   
  },
  created() {
    this.getAll();
  }
};
</script>
<style>
.zooming {
  cursor: pointer;
  transition: transform 0.4s;
}

.zooming:hover {
  transform: scale(1.01);
  border-radius: 2px;
  box-shadow: 4px 4px 4px #dddddd;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
.text-small {
  font-size: 12px;
  color: rgb(97, 96, 96);
}
</style>
