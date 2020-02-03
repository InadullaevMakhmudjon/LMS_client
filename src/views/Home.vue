<template>
  <div>
    <vs-row class="mt-5">
      <vs-col
        v-for="(item, i) in analysis"
        :key="i"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="3"
        class="xs:w-full md:w-1/4"
      >
        <div class="vx-col w-full md:w-full mb-base">
        
          <vx-card
            title-color="primary"
            vs-justify="center"
            vs-align="center"
            :title="item.title"
            icon="mood"
          >
            <template slot="actions">
              <feather-icon
                icon="DownloadIcon"
                svgClasses="w-6 h-6 text-grey"
              ></feather-icon>
            </template>

            <div class="mt-10 mb-10 text-center p-1">
              <h2 class="text-5xl primary " v-text="item.totalQuantity"></h2>
            </div>

            <!-- DATA -->
            <div class="flex justify-between text-center" slot="no-body-bottom">
              <div
                v-for="user in item.types"
                :key="user.name"
                class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0"
              >
                <p class="mt-4" v-text="user.name"></p>
                <p class="mb-4 text-2xl" v-text="user.quantity"></p>
              </div>
            </div>
          </vx-card>
        </div>
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col>
        <report/>
      </vs-col>
    </vs-row>
  </div>
</template>
<script>
import VxBreadcrumb from "../layouts/components/VxBreadcrumb.vue";
import Report from '../components/LMS/Books/Report'
export default {
  data() {
    return {
      analysis: [
        {
          icon:'',
          title: "Total Books",
          totalQuantity: "1 032",
          types: [
            { name: "Borrowed", quantity: "201" },
            { name: "Lost", quantity: "221" },
            { name: "Available", quantity: "221" }
          ]
        },
        {
          title: "Total Users",
          totalQuantity: 234,
          types: [
            { name: "Freshman", quantity: "201" },
            { name: "Sophomore", quantity: "221" },
            { name: "Junior", quantity: "221" },
            { name: "Senior", quantity: "221" },
            { name: "Staff", quantity: "221" }
          ]
        },
        {
          title: "Overdues",
          totalQuantity: 217,
          types: [
            { name: "Freshman", quantity: "201" },
            { name: "Sophomore", quantity: "221" },
            { name: "Junior", quantity: "221" },
            { name: "Senior", quantity: "221" },
            { name: "Staff", quantity: "221" }
          ]
        },
        {
          title: "Blocklist",
          totalQuantity: 2122,
          types: [
            { name: "Freshman", quantity: "201" },
            { name: "Sophomore", quantity: "221" },
            { name: "Junior", quantity: "221" },
            { name: "Senior", quantity: "221" },
            { name: "Staff", quantity: "221" }
          ]
        }
      ]
    };
  },
  methods: {
    letit(item) {
      this.$router.push(item);
    }
  },
  components: {
    VxBreadcrumb,
    Report
  }
};
</script>
