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
      <!-- <vs-upload
        :disabled="isValidIsbn"
        v-model="bookObj.image"
        limit="1"
        :fileName="bookObj.title"
        class="mt-5"
        @on-success="successUpload"
      /> -->
      <!-- <vs-button label="img" class="primary mb-4" dark @click="onPickFile"
        >Upload image</vs-button> -->
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
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

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
      console.log(this.image)
    },
    showImage(imageUrl) {
      console.log(imageUrl);
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Cover has been successfully uploaded"
      });
    },
    checkISBN(isbn) {
      console.log(isbn);
      this.isValidIsbn = false;
    }
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
