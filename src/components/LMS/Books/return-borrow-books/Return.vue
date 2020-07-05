<template>
  <div>
      <vs-row vs-type="flex" class="mb-6">
        <vs-col vs-type="flex" vs-w="3">
            <img class="image__" not-margin src="https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/Pictures/web/j/z/p/benedict-cumberbatch-as-sherlock-holmes.jpg?itok=CdKuiG3A">
        </vs-col>
        <vs-col vs-type="flex" vs-w="9">
           <vx-card no-shadow>
              <vs-row vs-justify="space-between">
              <vs-col vs-type="flex" vs-w="6">
                  <div>
                    <h4 class="pb-2"><strong>Student Name:</strong> {{studentInfo.name}}</h4>
                    <h4 class="pb-2"><strong>ID Number:</strong> {{studentInfo.uid}}</h4>
                    <h4 class="pb-2"><strong>Course: </strong>{{studentInfo.course.name }}</h4>
                    <h4 class="pb-2"><strong>Phone number: </strong><a :href="'tel:'+studentInfo.phoneNumber" >{{studentInfo.phoneNumber}}</a></h4>
                    <div><h4 class="pb-2"><strong>Borrowed books:</strong> {{studentInfo.borrows.length}}</h4></div>
                    <div><h4 class="pb-2"><strong>Status:</strong> <span :class="studentInfo.isBlocked ? 'passive__bck py-1 px-4 ml-3': 'active__bck py-1 px-4 ml-3'">{{studentInfo.isBlocked ? 'blocked' : 'active'}}</span></h4></div>
                  </div>
              </vs-col>
            </vs-row>
            <vs-row class="mt-5" vs-type="flex" vs-justify="space-between">
                <!-- <vs-col vs-type="flex" vs-w="3">
                    <vs-button color="primary">Start Borrowing</vs-button>
                </vs-col> -->
                <!-- <vs-col  vs-type="flex" vs-w="3">
                    <vs-button color="success">Save</vs-button>
                </vs-col> -->
            </vs-row>
           </vx-card>
        </vs-col>
      </vs-row>
      <vs-row vs-justify="center">
        <vs-col  vs-w="12">
             <vs-table class="table__border" :maxItems="20"  :data="bookItems">
                <template slot="header">
                  <vs-row v-if="false">
                      <vs-col>
                        <h5 class="my-3"><strong style="color: #dfc223;">#</strong> Please, start reading the book using RFID Reader</h5>
                      </vs-col>
                  </vs-row>
                  <vs-row class="my-2" vs-type="flex" vs-justify="space-between">
                  <vs-col class="mx-0 px-0" vs-type="flex" vs-justify="start" vs-align="center" vs-w="6" vs-sm="3" vs-lg="2">
                      <vs-button :disabled="flagBtn" color="primary" @click="openData">Start Returning</vs-button>
                  </vs-col>
                  <vs-col class="px-0" vs-type="flex" vs-justify="flex-end" vs-align="center"  vs-w="6" vs-sm="3" vs-lg="2">
                      <vs-button to="/transfer" class="ml-2" type="border" color="primary">Cancel</vs-button>
                      <vs-button @click=" submitData" class="ml-2" color="primary">Finish</vs-button>
                  </vs-col>
                  </vs-row>
                </template>
                <template slot="thead">
                  <vs-th>
                    Book title
                  </vs-th>
                  <vs-th>
                    Code
                  </vs-th>
                  <vs-th>
                    Borrowed Date
                  </vs-th>
                   <vs-th>
                    Tag
                  </vs-th>
                  <vs-th>
                    Change Status
                  </vs-th>
                </template>
                <template v-if="bookItems.length > 0" slot-scope="{data}">
                  <vs-tr :state="tr.color"  :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].bookItem.book.title">
                      {{ data[indextr].bookItem.book.title }}
                    </vs-td>

                    <vs-td :data="data[indextr].bookItem.bookId">
                      {{ data[indextr].bookItem.bookId }}
                    </vs-td>

                    <vs-td :data="data[indextr].borrowedDate">
                      {{data[indextr].borrowedDate | moment("Do MMM, YYYY") }}
                    </vs-td>

                     <vs-td :data="data[indextr].bookItem.rfidTag">
                      {{data[indextr].bookItem.rfidTag }}
                    </vs-td>

                    <vs-td>
                      <div @click="deleteF(indextr,data[indextr])">
                        <feather-icon
                          color="red"
                          icon="EditIcon"
                          svgClasses="stroke-current text-primary w-5 h-5"
                        />
                       </div>
                    </vs-td>
                  </vs-tr>
                </template>
              </vs-table>
        </vs-col>
        <!-- <vs-col  vs-w="4">
          <vx-card no-shadow>
            <datepicker class="w-full" placeholder="Select Date" v-model="date"></datepicker>
          </vx-card>
        </vs-col> -->
      </vs-row>
  </div>
</template>

<script>
import moment from 'moment';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import io from "socket.io-client"
import Transfer from '@/services/Transfer.js';
export default {
  data() {
    return {
      flagBtn: false,
      date: null,
      globalFlag: '',
      isBookItem: '',
      socket: io(process.env.VUE_APP_READER_SOCKET,{transports: ['websocket']}),
      socketOfUser: io(process.env.VUE_APP_BR_SOCKET, {transports: ['websocket']}),
      studentInfo: {
        "id": 1,
        "uid": "u1710008",
        "name": "Abdullaev Azamat",
        "rfidTag": "123qwewer",
        "phoneNumber": "+998909272970",
         course: "Senior",
        "isBlocked": false,
        "createdAt": "2020-06-08T12:53:33.000Z",
        "updatedAt": "2020-06-08T12:53:33.000Z",
        "borrows": [
            {
                "id": 1,
                "memberId": 1,
                "bookItemId": 1,
                "borrowedDate": "2020-06-08T13:04:04.000Z",
                "dueDate": "2021-05-14T19:00:00.000Z",
                "isReturned": false,
                "returnedDate": null,
                "extendedDate": null,
                "createdAt": "2020-06-08T13:04:04.000Z",
                "updatedAt": "2020-06-08T13:04:04.000Z"
            }
        ]
    },
      bookItems: []
    }
  },
    components: {
    flatPickr
  },
    methods: {
      getBorrowedBooks(id) {
        Transfer.studentBorrowedBooks(id).then( res => {
          console.log(res)
          this.bookItems = res.map(el => {
            return {
              ...el,
              color: null
            }
          })
          console.log(this.bookItems)
        }).catch( err => console.log(err))
      },
      openData() {
        this.disconnectNFC()
        this.flagBtn = true
        console.log('socket started...')
        this.socket.emit('rfidTag')
        this.socket.on("bookItemDetails", data => {
          console.log(data)
        this.bookItems.filter(el => {
          console.log(el.bookItem.id == data.id)
          if(el.bookItem.id == data.id) {
              el.color = 'success'
            Transfer.studentPostBook(el.id).then(res => {
              console.log(res)
            }).catch(err => console.log(err))
          }
          this.isBookItem = ''
         })
          // this.bookItems.push(data)
        })
      },
      deleteF(idx, code) {
        // this.bookItems.splice(idx, 1)
      console.log(idx, code)
      this.isBookItem = 'success'
      // this.socket.emit('delete', { rfidTag: code });
      },
    openLoadingBackground(type, color){
      this.$vs.loading({
        background: color,
          color:'rgb(255, 255, 255)',
          text: 'Please, use student Card to continue process',
          type: 'point',
          scale: 1.3
          })
         this.socketOfUser.on('studentReceived',data => {
           console.log(data)
            this.studentInfo = data
            this.getBorrowedBooks(this.studentInfo.id)
            this.$vs.loading.close()
          })
    },
    disconnectNFC() {
      this.socketOfUser.disconnect()
    },
    submitData() {
      // this.socket.disconnect()
      // const tasks = []
      // this.bookItems.forEach((borrow) => tasks.push(Transfer.borrowBooks({
      //   memberId: this.studentInfo.id,
      //   bookItemId: borrow.id,
      //   dueDate: this.$moment(new Date().getTime()).add(1, 'day').valueOf()
      // }))); 
      // Promise.all(tasks).then( result => {
      //   console.log(result)
      //   this.bookItems = []
      //   this.flagBtn = false
      //   this.$vs.notify({
      //     title: 'Success',
      //     text: 'Books has borrowed successfully',
      //     color: 'success',
      //     icon: 'send'
      //   })
      // }).catch(err => console.log(err))
        this.socket.disconnect()
        this.$router.push('/transfer')
    }
    },
    created() {
        this.openLoadingBackground('return', '#2fba31')
        this.getBorrowedBooks()
    },
    beforeRouteLeave(to, from, next) {
       const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }

    }
}
</script>

<style>
.image__{
  height: 300px;
  width: 330px;
  object-fit: cover;
  border-color: red;
  border-width: 20px;
}
.active__bck{
  background-color: rgb(22, 189, 7);
  font-size: 14px;
  border-radius: 23px;
  color: white;
}
.passive__bck{
  background-color: rgb(206, 76, 25);
  font-size: 14px;
  border-radius: 23px;
  color: white;
}
/* .table__border:hover{
  border-width: 2px;
  border-style: solid;
  animation: example 5s infinite;
}
@keyframes example {
  0%   {border-color: rgb(29, 230, 245);}
  25%  {border-color: rgb(204, 207, 8);}
  50%  {border-color: rgb(3, 214, 115);}
  100% {border-color: rgb(233, 206, 54);}
} */

</style>