<template>
  <div class="vx-row">
    <div class="tabs">
    <div class="tabs__nav">
      <div class="tabs__nav_tab"
           v-for="(item, index) in items"
           :key="index"
           :class="[index === active ? 'tabs__nav_tab--active' : '']"
           @click="activate(index, item)">{{ item.shelfName}}
           </div>
           <div @click="addShelf" class="tabs__nav_tab">&#43;</div>
    </div>
    <div class="tabs__content">
       <vx-card no-shadow>
    
      <template >
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
                  {{ indextr+1 }}
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
    </vx-card>
    </div>
  </div>
  

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
              :text="item.name"
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
import io from "socket.io-client"
import Shelves from '../../../../services/Shelves';
export default {
  props: {
    bookObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    getShelves() {
      Shelves.getAll().then( res => {
        // console.log(res)
        this.shelflist = res
      }).catch( err => console.log(err))
    },
    addShelf() {
      this.popupShelf = true
    },
    submitShelf(val) {
      //console.log(val)
      this.items.push({
        shelfName: val.name,
        shelfId: val.id,
        bookId: '',
        bookItems: []
      })
      //console.log(this.items)
      // this.fetchData()
      this.popupShelf = false
    },
    // alerting(props) {
    //   this.actived = true
    //   this.msg = props;
    //   this.popupActive = true;
    // },
    fetchData() {
      
    },
     activate (index, item) {
       console.log(item)
       this.itemList = item.bookItems
       this.active = index
    }
  },
  computed: {
      content () {
      return this.items[this.active]
    }
  },
  data() {
    return {
      active: 0,
    items: [
      {
      shelfName: 'A1',
      shelfId: '',
      bookId: '',
      bookItems: [
       {
        id: 's',
        rfidTag: '232dcddcfgdfg3dfasd3f',
        title: 'sdadas',
        code: '2332-232-323'
       },
       {
        id: 's',
        rfidTag: '232dcddasdasc3dfasgfg',
        title: 'asdasda',
        code: '2332-232-323'
       },
       {
        id: 's',
        rfidTag: '232dcddsfsdfc3dfasjhyf',
        title: 'asdasda',
        code: '2332-232-323'
       }
      ]
    },
     {
      shelfName: 'A2',
      shelfId: '',
      bookId: '',
      bookItems: [
       {
        id: 's',
        rfidTag: '232dcddcfgdfg3dfasd3f',
        title: 'BBBBBB',
        code: '2332-232-323'
       },
       {
        id: 's',
        rfidTag: '232dcddasdasc3dfasgfg',
        title: 'BBBBBB',
        code: '2332-232-323'
       },
       {
        id: 's',
        rfidTag: '232dcddsfsdfc3dfasjhyf',
        title: 'BBBBBB',
        code: '2332-232-323'
       }
      ]
    }
    ],
      socket: io(process.env.VUE_APP_READER_SOCKET,{transports: ['websocket']}),
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
      shelfs: [],
      shelflist: [],
      itemList: []
    };
  },
  created() {
      this.getShelves()
    // console.log('sending id ...')
    // setTimeout(() => {
    //   console.log(this.bookObj)
    //   this.socket.emit('bookId',this.bookObj.id )
    // }, 1000);
    // setTimeout(() => {
      
    //   console.log('waiting response...')
    //  this.socket.on("bookItem", data => {
    //     console.log(data)
    //     this.itemList.unshift( {
    //       id: this.bookObj.id,
    //       title: this.bookObj.title,
    //       isbn: this.bookObj.ISBNCode,
    //       code: data.rfidTag
    //     })
    //   })
    // }, 1300);
  }
};
</script>

<style scoped lang="scss">
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
.tabs {
  top:0;
  left:0;
  height:100%;
  width:100%;
  box-sizing:border-box;
  background: rgba(44, 163, 242, 0.377);
  padding:1rem;
  &__nav {
    display:flex;
    &_tab {
      padding:1rem;
      margin:0 0.5rem 0 0;
      background:#fff;
      border-radius:0.5rem 0.5rem 0 0;
      box-shadow:inset 0 -1rem 0.75rem -1rem rgba(0,0,0,0.25);
      cursor:pointer;
      opacity:0.75;
      transition:100ms linear all;
      &--active {
        opacity:1;
        box-shadow:none;
      }
    }
  }
  &__content {
    background:#fff;
    padding:1rem;
    border-radius:0 0.5rem 0.5rem 0.5rem;
  }
}
</style>
