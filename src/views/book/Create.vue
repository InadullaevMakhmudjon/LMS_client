<template>
  <form-wizard
    color="#2ca3f2"
    :title="null"
    :subtitle="null"
    finishButtonText="Submit"
    @on-complete="formSubmitted"
  >
    <!-- tab 1 content -->
    <tab-content title="Step 1" class="mb-5">
      <first-step />
    </tab-content>
    <!-- tab 2 content -->
    <tab-content title="Step 2" class="mb-5">
      <second-step />
    </tab-content>

    <!-- tab 3 content -->
    <tab-content title="Step 3" class="mb-5">
      <third-step />
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Create_1 from "../../components/LMS/Books/create-book-steps/Create_1";
import Create_2 from "../../components/LMS/Books/create-book-steps/Create_2";
import Create_3 from "../../components/LMS/Books/create-book-steps/Create_3";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      city: "new-york",
      proposalTitle: "",
      jobTitle: "",
      textarea: "",
      eventName: "",
      eventLocation: "san-francisco",
      status: "plannning",
      cityOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ],
      statusOptions: [
        { text: "Plannning", value: "plannning" },
        { text: "In Progress", value: "in progress" },
        { text: "Finished", value: "finished" }
      ],
      LocationOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ]
    };
  },
  methods: {
    formSubmitted() {
      alert("Form submitted!");
    }
  },
  components: {
    FormWizard,
    TabContent,
    FirstStep: Create_1,
    SecondStep: Create_2,
    ThirdStep: Create_3
  }
};
</script>
