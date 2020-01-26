<template>
  <!-- tab 1 content -->
  <div class="vx-row">
    
    <div class="vx-col md:w-1/3 w-full mt-5">
      <p>Check ISBN: (example: 3232-24324-232)</p>
      <vx-input-group class="mb-base">
        <vs-input v-model="isbn" />

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button color="#2ca3f2">Check</vs-button>
          </div>
        </template>
      </vx-input-group>
      <vs-input label="Book title" v-model="bookTitle" class="w-full mt-3" />
      <vs-input label="Book ISBN" v-model="isbn" class="w-full mt-5" />

      <vs-select
        v-model="bookCategory"
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

      <vs-select
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

    <div class="vx-col md:w-1/3 w-full mt-5">
      <vs-select
        v-model="bookAuthor"
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

      <vs-select
        v-model="bookLanguage"
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
      <vs-row class="mt-5" vs-align="center" vs-justify="between">
        <vs-checkbox class="" v-model="isborrowable">Is borrowable</vs-checkbox>
        <vs-input-number
          label="Duration:"
          class="flex-1 w-1/6"
          v-model="duration"
        />
      </vs-row>

      <vs-select
        v-model="course"
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
      <vs-textarea
        height="200"
        class="mt-5"
        label="Book Definition"
        v-model="bookDef"
      />
    </div>

    <div class="vx-col  md:w-1/3 w-full mt-5 justify-center">
      <vs-upload
        class="w-full justify-center align-center"
        action="https://jsonplaceholder.typicode.com/posts/"
        @on-success="successUpload"
      />
    </div>
  </div>
</template>
<script>
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  data: () => ({
    duration: 20,
    isbn:'',
    bookTitle:'',
    bookCategory:'',
    bookResponsiblePerson:'',
    bookAuthor:'',
    bookLanguage:'',
    isborrowable: false,
    course:'',
    bookDef:'some notes',
    resPersonList: [{text:'Aliev Azam',value:'aliev-azam'}],
    bookAuthorList:[{text:'Juvana Robertson' , value:'1'},{text:'Stewart Helligan',value:'2'},{text:'Mark Tsuri',value:'3'}],
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
  }),
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
    }
  }
};
</script>
