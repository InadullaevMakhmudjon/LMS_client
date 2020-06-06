<template>
  <div class="vx-row">
    <div class="tabs">
    <div class="tabs__nav">
      <div class="tabs__nav_tab"
           v-for="(item, index) in bookObj.shelfItems"
           :key="index"
           :class="[index === active ? 'tabs__nav_tab--active' : 'tabs__nav_offtab']"
           @click="activate(index, item)">{{ item.shelfName}}
      </div>
      <div @click="addShelf" class="tabs__nav_tab"> 
             <feather-icon
                    color="red"
                    icon="PlusIcon"
                    svgClasses="stroke-current  w-6 h-6"
                  /></div>
    </div>
    <div class="tabs__content">
  
      <template >
        <vs-row
          class="mt-5"
          vs-align="flex-start"
          vs-type="flex"
          vs-justify="center"
          vs-w="12"
        >
          <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
            <h3 class="text-grey justify-start text-3xl pt-6">
            Listening books...
            </h3>
          </vs-col>
        </vs-row>

        <div class="vx-col md:w-full w-full">
          <vs-table
          v-if="bookObj.shelfItems.length"
            pagination
            max-items="10"
            search
            :data="bookObj.shelfItems[this.active].bookItems"
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
                <vs-td>
                  <div @click="deleteBookItem(tr, indextr)">
                  <feather-icon
                    color="red"
                    icon="TrashIcon"
                    svgClasses="stroke-current text-danger w-7 h-7"
                  />
                  </div>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
          <vs-button @click="disconnect" color="red">Disconnect</vs-button>
        </div>
      </template>
    </div>
  </div>
  
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
import Books from '@/services/Books.js';
export default {
  props: {
    bookObj: {
      type: Object,
      required: true
    }
  },
   data() {
    return {
      active: 0,
      shelfItems: [],
      socket: io(process.env.VUE_APP_READER_SOCKET,{transports: ['websocket']}),
      actived: false,
      selectedShelf: "",
      popupShelf: false,
      shelflist: [],
      itemList: []
    };
  },
  computed: {
  
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
      this.bookObj.shelfItems.push(
        {
        shelfName: val.name,
        shelfId: val.id,
        bookId: this.bookObj.id,
        bookItems: []
      })
      this.popupShelf = false
    },

     activate (index, item) {
       this.active = index
    },

    deleteBookItem(item, idx) {
      console.log(item, idx)
      this.bookObj.shelfItems[this.active].bookItems.splice(idx, 1)
      console.log(this.bookObj.shelfItems[this.active])
      this.socket.emit('delete', { rfidTag: item.code });
    },
 
    disconnect() {
       this.bookObj.shelfItems[this.active].bookItems.push({
          id:  Math.floor(Math.random()*100),
          title: `${Math.floor(Math.random()*100)}dasdasasaq`,
          isbn: Math.floor(Math.random()*10000),
          code: Math.floor(Math.random()*100000)
        })
      // this.socket.disconnect()
      // this.$vs.notify({
      //   title: 'disconnected',
      //   color: 'success'
      // })
    }
  },

  created() {
    console.log(this.bookObj)
     this.getShelves()
    console.log('started...')
    setTimeout(() => {
      this.socket.emit('bookId', this.bookObj.id )
    }, 1000);

    setTimeout(() => {
        this.socket.on("bookItem", data => {
          console.log(data)
          Books.hasBookItem(data.rfidTag).then( (res) => {
          if(res.length == 0 )
            {
            if(this.bookObj.shelfItems.length > 0 ) {
            this.bookObj.shelfItems[this.active].bookItems.push({
            id: this.bookObj.id,
            title: this.bookObj.title,
            isbn: this.bookObj.ISBNCode,
            code: data.rfidTag
            })
            }
            }else {
              this.$vs.notify({
                title: 'DUBLICATED BOOK ITEM, CHECK !',
                color: 'warning',
                fixed: true
              })
            }

          }).catch( err => console.log(err))
       
      })
    }, 1200);
 
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
  font-size: 12pt;;
  top:0;
  left:0;
  height:100%;
  width:100%;
  box-sizing:border-box;
  background: rgb(255, 255, 255);
  padding:0.6rem;
  &__nav {
    display:flex;
    &_tab {
      padding:1rem;
      margin:0 0.8rem 0 0;
      border-radius:0 0.5rem 0 0;
      border-bottom-style:inset;
      cursor:pointer;
      opacity:0.85;
      transition:80ms linear all;
      &--active {
        opacity:1;
        transition-timing-function: ease-in-out;
        box-shadow:none;
        background:rgb(255, 255, 255);
        border-bottom-width: 5px;
        border-bottom-color: rgb(0, 150, 219);
      }
    }
  }
  &__content {
    background:rgb(255, 255, 255);
    padding:1rem;
    border-radius:0 0.5rem 0.5rem 0.5rem;
  }
}
</style>
