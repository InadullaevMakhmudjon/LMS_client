<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full">
      <vs-input
        label="Proposal Title"
        v-model="proposalTitle"
        class="w-full mt-4"
      />
      <vs-input label="Job Title" v-model="jobTitle" class="w-full mt-4" />
    </div>
    <div class="vx-col md:w-1/2 w-full">
      <vs-textarea
        v-model="textarea"
        label="Short discription"
        class="mb-0 md:mt-10 mt-6"
        rows="3"
      />
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
