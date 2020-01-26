<template>
  <div class="vx-row">
    <vs-card>
      <vs-row vs-w="12">
        <vs-col
          v-for="index in 3"
          :key="index"
          vs-type="flex"
          vs-justify="center"
          vs-align="center"
          vs-w="1"
        >
          <div class="bookshelf" @dblclick="alerting(index)">
            <p class="">A {{ index }}</p>
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

      <vs-row
        class="mt-5"
        vs-align="flex-start"
        vs-type="flex"
        vs-justify="center"
        vs-w="12"
      >
        <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="1">
          <div
            id="div-with-loading"
            class="vs-con-loading__container tz w-24 h-24"
          ></div>
        </vs-col>
        <vs-col vs-type="flex" vs-justify="start" vs-align="center" vs-w="2">
          <h3 class="text-grey justify-start text-3xl pt-6">Listening books</h3>
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
    </vs-card>

    <!--data module --->

    <vs-popup
      class="holamundo"
      title="Lorem ipsum dolor sit amet"
      :active.sync="popupActive"
    >
      <p id="modal" v-text="msg"></p>
    </vs-popup>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 1.6,
      type: "point",
      color: "primary"
    });
  },
  methods: {
    addShelf() {
      alert("helo");
    },
    alerting(props) {
      this.msg = props;
      this.popupActive = true;
    }
  },
  data() {
    return {
      msg: "not available yet",
      popupActive: false,
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
          code: "00235"
        },
        {
          id: 5,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00236"
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
          code: "00238"
        },
        {
          id: 8,
          title: "The fundamental of calculus",
          isbn: "2839-32343-2433-2",
          code: "00239"
        }
      ]
    };
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
}
.bookshelf {
  cursor: pointer;
  background-color: #2ca3f2;
  color: #ffffff;
  height: 100%;
  width: 100%;
  text-align: center;
  justify-content: center;
  border-radius: 14px;
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
