<template>
  <div id="ag-grid-demo">
    <vx-card title="report">
      <!-- TABLE ACTION ROW -->
      <vs-row vs-justify="start">
<!-- 
        <div
          v-for="i in 6"
          :key="i"
          class="md:w-1/6 xs:w-1/4 m-5"
        >
            <v-select
              v-model="selectedCourse"
              class="w-full select-large"
              label="text"
              :options="year"
            ></v-select>
        </div> -->
      </vs-row>

      <div class="flex flex-wrap justify-between items-center">
        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div
          class="flex flex-wrap items-center justify-between ag-grid-table-actions-right"
        >
          <vs-input
            class="mb-4 md:mb-0 mr-4 w-1/2"
            v-model="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search..."
          />
          <vs-button
            class="mb-4 md:mb-0 w-1/4 text-center"
            @click="gridApi.exportDataAsCsv()"
            v-text="'CSV'"
          ></vs-button>
          <vs-button
            type="border"
            icon="print"
            radius
            class="w-1/3"
            size="large"
            @click="gridApi.exportDataAsCsv()"
          ></vs-button>
        </div>
      </div>
      <ag-grid-vue
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
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
      <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span class="mr-2"
                >{{
                  currentPage * paginationPageSize - (paginationPageSize - 1)
                }}
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
        </div>
      <vs-pagination
        :total="totalPages"
        :max="maxPageNumbers"
        v-model="currentPage"
      />
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
          headerName: "First Name",
          field: "firstname",
          width: 175,
          filter: true,
          checkboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          headerCheckboxSelection: true
        },
        {
          headerName: "Last Name",
          field: "lastname",
          filter: true,
          width: 175
        },
        {
          headerName: "Email",
          field: "email",
          filter: true,
          width: 250,
          pinned: "left"
        },
        {
          headerName: "Company",
          field: "company",
          filter: true,
          width: 250
        },
        {
          headerName: "City",
          field: "city",
          filter: true,
          width: 150
        },
        {
          headerName: "Country",
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
