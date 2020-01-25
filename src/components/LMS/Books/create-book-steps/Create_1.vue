<template>
  <!-- tab 1 content -->
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mt-5">
      <vs-input label="First Name" v-model="firstNames" class="w-full" />
    </div>
    <div class="vx-col md:w-1/2 w-full mt-5">
      <vs-input label="Last Name" v-model="lastNames" class="w-full" />
    </div>
    <div class="vx-col md:w-1/2 w-full mt-5">
      <vs-input type="email" label="Email" v-model="emails" class="w-full" />
    </div>
    <div class="vx-col md:w-1/2 w-full mt-5">
      <vs-select v-model="citys" class="w-full select-large" label="City">
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>
    </div>
  </div>
</template>
<script>
import { TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  data: () => ({}),
  component: {
    TabContent
  }
};
</script>
