<template>
  <div id="ag-grid-demo">
    <vx-card title="Report">
    <vs-row
  vs-align="center"
  vs-type="flex" vs-justify="space-around" vs-w="12">
  <vs-col  v-for="(col,index) in 6"  :key="index" vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
      <div class="flex-1 pa-2 m-2 mb-5 xs:w-full ">
            <p>Subject</p>
            <v-select
              v-model="selectedSubject"
              class="w-full select-large"
              label="text"
              :options="subjects"
            ></v-select>
          </div>
  </vs-col>
</vs-row>
      <vs-row vs-type="flex" >
        <vs-col vs-type="flex" vs-justify="center" class="justify-between" vs-align="center" vs-w="6">
          <vs-input
            class="mb-4 md:mb-0 mr-4 w-full"
            v-model="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search..."
          />
          <vs-button>SEARCH</vs-button>
        </vs-col>
        <vs-col
          vs-type="flex"
          vs-justify="flex-end"
          class="space-around"
          vs-align="center"
          vs-w="6"
        >
          <vs-button color="primary" type="flat" icon="vertical_align_bottom"
            >Excel</vs-button
          >
          <vs-button
            type="border"
            icon="print"
            radius
            class="w-full ml-2"
            size="large"
            @click="gridApi.exportDataAsCsv()"
          ></vs-button>
        </vs-col>
      </vs-row>
      <ag-grid-vue
        :gridOptions="gridOptions"
        class="ag-theme-material w-120 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="contacts"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
      >
      </ag-grid-vue>

      <div class=" flex justify-between mt-3">
        <vs-dropdown vs-trigger-click class="cursor-pointer">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2"
              >{{ currentPage * paginationPageSize - (paginationPageSize - 1) }}
              -
              {{
                contacts.length - currentPage * paginationPageSize > 0
                  ? currentPage * paginationPageSize
                  : contacts.length
              }}
              of {{ contacts.length }}</span
            >
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
              <span>20</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
              <span>50</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
              <span>100</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
              <span>150</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
        <vs-pagination
          :total="totalPages"
          :max="maxPageNumbers"
          v-model="currentPage"
        />
      </div>
      <!-- <VuePerfectScrollbar ref="agGridTablePs" class="scroll-area" :settings="psSettings" />  -->
    </vx-card>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import contacts from "./data.json";
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";
export default {
  components: {
    AgGridVue
    // VuePerfectScrollbar
  },
  data() {
    return {
      searchQuery: "",
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      defaultColDef: {
        sortable: true,
        editable: true,
        resizable: true,
        suppressMenu: true
      },
      columnDefs: [
        {
          headerName: "Full name",
          field: "firstname",
          width: 175,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },
        {
          headerName: "Course",
          field: "lastname",
          filter: true,
          width: 175
        },
        {
          headerName: "Student ID",
          field: "email",
          filter: true,
          width: 250,
          pinned: "left"
        },
        {
          headerName: "Issued Date",
          field: "company",
          filter: true,
          width: 250
        },
        {
          headerName: "Due Date",
          field: "city",
          filter: true,
          width: 150
        },
        {
          headerName: "Book Code",
          field: "country",
          filter: true,
          width: 150
        },
        {
          headerName: "State",
          field: "state",
          filter: true,
          width: 100
        },
        {
          headerName: "Zip",
          field: "zip",
          filter: "agNumberColumnFilter",
          width: 100
        },
        {
          headerName: "Followers",
          field: "followers",
          filter: "agNumberColumnFilter",
          width: 125
        }
      ],
      year: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ],
      contacts: contacts
      // perfectscrollbar settings
      // psSettings: {
      //     maxScrollbarLength: 60,
      //     wheelSpeed: 1,
      //     swipeEasing: true
      // },
    };
  },
  watch: {
    "$store.state.windowWidth"(val) {
      if (val <= 576) {
        this.maxPageNumbers = 4;
        this.gridOptions.columnApi.setColumnPinned("email", null);
      } else this.gridOptions.columnApi.setColumnPinned("email", "left");
    }
  },
  computed: {
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 50;
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
        else return 1;
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1);
      }
    }
  },
  methods: {
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    // const el = document.querySelector('.ag-body-viewport');
    // console.log(this.$refs.agGridTablePs)
    // this.$refs.agGridTablePs.__init(el)
    // this.$refs.agGridTablePs.update()
  }
};
</script>
