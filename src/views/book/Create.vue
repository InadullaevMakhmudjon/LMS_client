<template>
  <form-wizard
    color="rgba(var(--vs-primary), 1)"
    errorColor="rgba(var(--vs-danger), 1)"
    :title="null"
    :subtitle="null"
    finishButtonText="Submit"
    @on-complete="formSubmitted"
  >
    <!-- tab 1 content -->
    <tab-content title="Step 1" class="mb-5">
      <vx-card fixed-height="1000">
        <first-step :bookObj="bookObj" />
      </vx-card>
    </tab-content>
    <!-- tab 2 content -->
    <tab-content title="Step 2" class="mb-5">
      <second-step :shelfs="shelfs" :shelflist="shelfList" />
    </tab-content>

    <!-- tab 3 content -->
    <tab-content title="Step 3" class="mb-5">
      <third-step :bookObj="bookObj" />
    </tab-content>

    <template slot="footer" slot-scope="props">
      <div class="wizard-footer-left">
        <!-- <wizard-button  @click.native="props.prevTab()" :style="props.fillButtonStyle">Back</wizard-button> -->
        <wizard-button
          @click.native="$router.push('/books')"
          :style="props.fillButtonStyle"
          >Cancel</wizard-button
        >
      </div>
      <div class="wizard-footer-right">
        <wizard-button
          disabled
          v-if="!props.isLastStep"
          @click.native="nextTab(props)"
          class="wizard-footer-right"
          :style="props.fillButtonStyle"
          >Next</wizard-button
        >
        <wizard-button
          v-if="!props.isLastStep"
          @click.native="submitData(bookObj.title)"
          class="mx-2 wizard-footer-right"
          :style="props.fillButtonStyle"
          ><strong>Save</strong></wizard-button
        >
        <wizard-button
          v-else
          @click.native="formSubmitted"
          class="wizard-footer-right finish-button"
          :style="props.fillButtonStyle"
          >{{ props.isLastStep ? "Save" : "Next" }}</wizard-button
        >
      </div>
    </template>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Create_1 from "../../components/LMS/Books/create-book-steps/Create_1";
import Create_2 from "../../components/LMS/Books/create-book-steps/Create_2";
import Create_3 from "../../components/LMS/Books/create-book-steps/Create_3";
import Books from '@/services/Books';

export default {
  data() {
    return {
      bookObj: {
        title: "",
        typeId: 0,
        authorId: 0,
        ISBNcode: "",
        courseYear: 0,
        subjectId: 0,
        isborrowable: false,
        duration: 0,
        categoryId: 0,
        publishedYear: 0,
        languageId: 0,
        description: "",
        image: "https://images.assetsdelivery.com/compings_v2/sabelskaya/sabelskaya1906/sabelskaya190600770.jpg",
        imageFile: new FormData(),
      },
      shelfs: [],
      shelfList: [
        { text: "A1", value: "1" },
        { text: "A2", value: "2" },
        { text: "A3", value: "3" },
        { text: "A4", value: "4" }
      ],
      categories: [],
      languages: [],
    };
  },
  methods: {
    formSubmitted() {
      console.log(this.bookObj);
    },
    nextTab(props) {
      props.nextTab();
    },
    submitData(title) {
      Books.uploadImage(this.bookObj.imageFile)
      .then(({ imageUrl }) => {
        
          this.bookObj.isborrowable = this.bookObj.isborrowable ? 1 : 0;
          this.bookObj.image = imageUrl;
          Books.create(this.bookObj)
          .then(() => {
            this.$vs.notify({
              time: 3000,
              title: title,
              text: "The book has successfully added",
              color: "success",
              iconPack: "feather",
              icon: "icon-check-circle"
            });
            this.$router.push("/books");
          })
          .catch(err => {
            this.$vs.notify({
              time: 3000,
              title: title,
              text: err.message || 'Error occured',
              color: "danger",
              iconPack: "feather",
            });
        })
      });
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
