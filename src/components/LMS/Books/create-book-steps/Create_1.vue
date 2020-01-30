<template>
  <!-- tab 1 content -->
  <div class="vx-row">
    <div class="vx-col  sm:w-full md:w-1/3 w-full mt-5">
      <!--check Isbn-->
      <p>Check ISBN: (example: 2-266-11156-6)</p>
      <vx-input-group class="mb-base">
        <vs-input v-model="bookObj.ISBNcode" />

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button
              @click="checkISBN(bookObj.ISBNcode)"
              :color="isValidIsbn ? '#2ca3f2' : 'success'"
              >{{ isValidIsbn ? "Check" : "checked" }}</vs-button
            >
          </div>
        </template>
      </vx-input-group>
      <!--book title-->
      <vs-input
        :disabled="isValidIsbn"
        label="Book title"
        v-model="bookObj.title"
        class="w-full mt-5"
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
          v-for="item in categoryList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
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
          v-for="item in resPersonList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
          class="w-full"
        />
      </vs-select>
    </div>

    <div class="vx-col sm:w-full md:w-1/3 w-full mt-5">
      <!--book author-->
      <vs-select
        :disabled="isValidIsbn"
        v-model="bookObj.authorId"
        class="w-full select-large mt-0"
        label="Book Author"
      >
        <vs-select-item
          v-for="item in bookAuthorList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
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
          v-for="item in languageList"
          :key="item.id"
          :value="item.id"
          :text="item.name"
          class="w-full"
        />
      </vs-select>
      <!--book is borrawable and duration in days-->
      <vs-row class="mt-5" vs-align="center" vs-justify="between">
        <vs-checkbox
          :disabled="isValidIsbn"
          class=""
          v-model="bookObj.isborrowable"
          >Is borrowable</vs-checkbox
        >
        <vs-input-number
          v-if="bookObj.isborrowable"
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
            <vs-button  :disabled="isValidIsbn" color="primary"  class="primary" dark @click="onPickFile" >Upload</vs-button>
          </div>
        </template>

        <vs-input disabled v-model="image"  />
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
    </div>
    <vs-popup
      background-color="rgba(0, 0, 0, 0.8)"
      :title="bookObj.title + ' ( Cover )'"
      :active.sync="popupActivo"
    >
      <img class="center" :src="imageUrl" />
    </vs-popup>
  </div>
</template>
<script>
import Books from '@/services/Books.js'
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Authors from '@/services/Authors';
import Categories from '@/services/Categories';
import Languages from '@/services/Languages'
import Users from '@/services/Users';
import Courses from '@/services/Courses';

export default {
  props: {
    bookObj: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      popupActivo: false,
      image: null,
      imageUrl: "",
      loading: false,
      isUploadable: true,
      isValidIsbn: true,
      bookResponsiblePerson: "",
      resPersonList: [{ text: "Aliev Azam", value: "aliev-azam" }],
      bookAuthorList: [],
      courseList: [],
      subjects: [
        { text: "Comxorithm", value: "1" },
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
      categoryList: [],
      languageList: []
    };
  },
  computed: {
    baseUrl() {
      return process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : 'http://localhost:3030/api'
    }
  },
  component: {
    TabContent
  },
  methods: {
    getAll() {
      this.loading = true;
      Promise.all([
        Authors.getAll(),
        Categories.getAll(),
        Languages.getAll(),
        Users.getAll(),
        Courses.getAll(),
      ]).then(result => {
        const [authors, categories, languages, users, courses] = result;
        this.bookAuthorList = authors;
        this.categoryList = categories;
        this.languageList = languages;
        this.resPersonList = users;
        this.courseList = courses;
      }).catch((error) => console.log(error.message))
      .finally(() => this.loading = false);
    },
    onfilepicked(event) {
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
      this.bookObj.imageFile.append('image', files[0]);
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
    checkISBN(isbn) {
      Books.checkISBN(isbn)
      .then(() => this.isValidIsbn = false)
      .catch(() => this.isValidIsbn = true);     
    },
  },
  mounted() {
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
</style>
