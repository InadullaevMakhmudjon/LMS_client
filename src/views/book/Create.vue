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
        :disabled ="onState"
         id="button-with-loading"
          v-if="!props.isLastStep"
          @click.native="submitData(bookObj.title)"
          class="mx-2 wizard-footer-right vs-con-loading__container"
          :style="props.fillButtonStyle"
          ><strong>Save</strong></wizard-button
        >
        <wizard-button
          v-else
          @click.native="formSubmitted"
          class="wizard-footer-right finish-button"
          :style="props.fillButtonStyle"
          >{{ props.isLastStep ? "Save" : "Next" }}</wizard-button>
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
      onState: false,
      bookObj: {
        formType: 'isbn',
        title: "",
        typeId: 0,
        authors:[],
        ISBNCode: "",
        // ISSNCode: "",
        courseYear: null,
        subjectId: null,
        isBorrowable: false,
        duration: 0,
        categoryId: 0,
        publishedYear: 0,
        languageId: 0,
        description: "",
        userId: parseInt(JSON.parse(localStorage.getItem('profileInfo')).id), 
        image: "https://images.assetsdelivery.com/compings_v2/sabelskaya/sabelskaya1906/sabelskaya190600770.jpg",
        imageFile: new FormData(),
      },
      shelfs: [],
      shelfList: [
        { text: "A1", value: "1" },
        { text: "A2", value: "2" },
        { text: "A3", value: "3" },
        { text: "A4", value: "4" },
        { text: "A5", value: "5" }
      ],
      categories: [],
      languages: [],
    };
  },

  methods: {
    formSubmitted() {
      // console.log(this.bookObj);
    },
    nextTab(props) {
      props.nextTab();
    },
    submitData(title) {
    //console.log(this.bookObj)
          this.loading(true)
          Books.uploadImage(this.bookObj.imageFile)
          .then(({ imageUrl }) => {
              this.bookObj.isBorrowable = this.bookObj.isBorrowable ? 1 : 0;
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
                this.loading(false)
                this.$router.push("/books");
              })
              .catch(err => {
                this.loading(false)
                this.$vs.notify({
                  time: 3000,
                  title: title,
                  text: err.message || 'Error occured',
                  color: "danger",
                  iconPack: "feather",
                });
            })
          }).catch( err => {
              this.loading(false)
              console.log(err)
            })
    },

    loading( val ) {
      if (val) {
        this.onState = true
          this.$vs.loading({
          background: 'primary',
          color: 'white',
          container: "#button-with-loading",
          scale: 0.45
        })
      } else {
          this.onState = false
          this.$vs.loading.close("#button-with-loading > .con-vs-loading")
      }
    }
  },
  computed: {
    userIdNum () {
      return this.$store.state.userInfo
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
