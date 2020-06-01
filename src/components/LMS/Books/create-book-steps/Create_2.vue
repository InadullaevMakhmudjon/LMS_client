<template>
  <div class="vx-row">
    <vs-card>
      <vs-row vs-w="12">
        <vs-col
          v-for="(item, index) in shelfs"
          :key="index"
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="1"
        >
          <div class="bookshelf" :style="'background-color:' + actived ?'#b1b1b1da': '#2ca3f2'" @click="alerting(item)">
              <vs-row vs-justify="center" vs-type="flex">
                <vs-col vs-type="flex" vs-w="5">
                  <p class="py-0 ma-2">{{ item.text }}</p>
                </vs-col>
                <vs-col vs-type="flex" vs-w="5">
                   <feather-icon
                  color="white"
                  icon="XIcon"
                  svgClasses="stroke-current w-4 h-4"
                />
                </vs-col>
              </vs-row>
          </div>
        </vs-col>
        <vs-button
          radius
          color="#2CA3F2"
          type="border"
          @click="addShelf"
          icon="add"
          size="large"
        ></vs-button>
      </vs-row>
      <template v-if="!!shelfs.length">
        <vs-row
          class="mt-5"
          vs-align="flex-start"
          vs-type="flex"
          vs-justify="center"
          vs-w="12"
        >
          <!-- <vs-col
            vs-type="flex"
            vs-justify="flex-end"
            vs-align="center"
            vs-w="1"
          >
          <div
              id="div-with-loading"
              class="vs-con-loading__container tz w-24 h-24"
            ></div> 
          </vs-col> -->
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
            <h3 class="text-grey justify-start text-3xl pt-6">
            Listening books...
            </h3>
          </vs-col>
        </vs-row>

        <div class="vx-col md:w-full w-full">
          <vs-table
            multiple
            v-model="selected"
            pagination
            max-items="5"
            search
            :data="itemList"
          >
            <template slot="thead">
              <vs-th sort-key="order">Order</vs-th>
              <vs-th sort-key="title">Title</vs-th>
              <vs-th sort-key="isbn">ISBN</vs-th>
              <vs-th sort-key="code">Code</vs-th>
              <vs-th sort-key="status">Status</vs-th>
              <vs-th sort-key="id">Action</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].order">
                  {{ data[indextr].id }}
                </vs-td>

                <vs-td :data="data[indextr].title">
                  {{ data[indextr].title }}
                </vs-td>

                <vs-td :data="data[indextr].isbn">
                  {{ data[indextr].isbn }}
                </vs-td>

                <vs-td :data="data[indextr].code">
                  {{ data[indextr].code }}
                </vs-td>
                <vs-td :data="data[indextr].code">
                  <vs-chip :color="data[indextr].status ? 'danger': ''"> {{ data[indextr].status ? 'Borrowed': 'free' }}</vs-chip> 
                </vs-td>
                <vs-td>
                  <feather-icon
                    color="red"
                    icon="TrashIcon"
                    svgClasses="stroke-current text-danger w-7 h-7"
                  />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </template>
    </vs-card>

    <!--data module --->
    <vs-popup
      class="holamundo"
      title="Lorem ipsum dolor sit amet"
      :active.sync="popupActive"
    >
      <p id="modal" v-text="msg"></p>
    </vs-popup>

    <vs-popup
      class="holamundo"
      title="Select Shelf"
      :active.sync="popupShelf"
    >
      <p id="modal" class="">Choose Proper Shelf</p>
      <vs-row>
        <vs-col vs-type="flex" vs-w="7">
          <vs-select v-model="selectedShelf" class="w-full select-large">
            <vs-select-item
              :key="index"
              :value="item"
              :text="item.text"
              v-for="(item, index) in shelflist"
              class="w-full"
            />
          </vs-select>
        </vs-col>
        <vs-col vs-type="flex" vs-w="3">
           <vs-button color="primary" @click="submitShelf(selectedShelf)">Add</vs-button>
        </vs-col>
      </vs-row>
    </vs-popup>
  </div>
</template>

<script>
export default {
  props: ["shelfs", "shelflist"],
 
  methods: {
  
    addShelf() {
      this.popupShelf = true
      // this.shelfs.push({
      //   shelfId: this.selectedShelf,
      //   shelfName: this.selectedShelf
      // });
    },
    submitShelf(val) {
      console.log(val)
      this.shelfs.push(val)
      this.popupShelf = false
    },
    alerting(props) {
      this.actived = true
      this.msg = props;
      this.popupActive = true;
    }
  },
  data() {
    return {
      actived: false,
      selectedShelf: "",
      msg: "not available yet",
      popupActive: false,
      popupShelf: false,
      selected: [],
      tableList: [
        "vs-th: Component",
        "vs-tr: Component",
        "vs-td: Component",
        "thread: Slot",
        "tbody: Slot",
        "header: Slot"
      ],
      itemList: [
        {
          id: 1,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00234"
        },
        {
          id: 2,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00235",
          status: 1,
        },
        {
          id: 5,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00236",
          status: 1,
        },
        {
          id: 6,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00237"
        },
        {
          id: 7,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00238",
          status: 0
        },
        {
          id: 8,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00239",
          status: 1,
        }
      ]
    };
  },
  mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 1.6,
    //   type: "point",
    //   color: "primary"
    // });
  }
};
</script>

<style>
.activeLoading {
  opacity: 0 !important;
  transform: scale(0.5);
}
.tz {
  background-color: #ffffff;
  color: #b1b1b1da;
}
.bookshelf {
  cursor: pointer;
  background-color: #2ca3f2;
  color: #ffffff;
  width: 100%;
  text-align: center;
  justify-content: center;
  border-radius: 12px;
}

.bookshelf p {
  font-size: 18pt;
  position: relative;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
