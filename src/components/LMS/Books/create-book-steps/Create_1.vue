<template>
  <!-- tab 1 content -->
  <div class="vx-row">
    <div class="vx-col md:w-1/3 w-full mt-5">
      <p>Check ISBN: (example: 3232-24324-232)</p>
      <vx-input-group class="mb-base">
        <vs-input v-model="input2" />

        <template slot="append">
          <div class="append-text btn-addon">
            <vs-button color="#2ca3f2">Check</vs-button>
          </div>
        </template>
      </vx-input-group>
      <vs-input label="Book title" v-model="firstName" class="w-full" />
      <vs-input label="Book ISBN" v-model="firstName" class="w-full mt-3" />

      <vs-select
        v-model="city"
        class="w-full select-large mt-3"
        label="Category"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>

      <vs-select
        v-model="city"
        class="w-full select-large mt-3"
        label="Responsible Person"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>
    </div>

    <div class="vx-col md:w-1/3 w-full mt-5">
        <vs-select
        v-model="city"
        class="w-full select-large mt-0"
        label="Book Author"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>

       <vs-select
        v-model="city"
        class="w-full select-large mt-3"
        label="Book Language"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>
      <vs-row class="mt-5" vs-align="center" vs-justify="between">
         <vs-checkbox class="" v-model="checkBox2">Is borrowable</vs-checkbox>
          <vs-input-number label="Duration:" class="flex-1 w-1/6" v-model="number"/>
      </vs-row>
  

       <vs-select
        v-model="city"
        class="w-full select-large mt-3"
        label="School Year"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>
        <vs-textarea height="200" class="mt-5" label="Label in Textarea" v-model="textarea" />
    </div>




    <div class="vx-col  md:w-1/3 w-full mt-5 justify-center">
        <vs-upload class="w-full justify-center align-center"  action="https://jsonplaceholder.typicode.com/posts/" @on-success="successUpload" />
    </div>
  </div>
</template>
<script>
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  data: () => ({
    number:20
  }),
  component: {
    TabContent
  },
  methods:{
    successUpload(){
      this.$vs.notify({color:'success',title:'Upload Success',text:'Cover has been successfully uploaded'})
    }
  }
};
</script>
