<template>
 <div>
      <vs-table 
        notSpacer 
        :maxItems="6" 
        :data="actionLogs" 
        :sst="true"
        @search="handleSearch"
        @change-page="handleChangePage"
        pagination
        search>
      <template slot="header">
        <!-- <h3>Users</h3> -->
      </template>
      <template slot="thead">
        <vs-th>BOOK TITLE</vs-th>
        <vs-th> DATE</vs-th>
        <vs-th>STATUS</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >

           <vs-td :data="data[indextr].bookTitle">
            {{data[indextr].bookTitle}}
          </vs-td>

          <vs-td :data="data[indextr].createdAt">
            {{data[indextr].createdAt | moment("MMM")}}
          </vs-td>

          <vs-td :data="data[indextr].isBorrowed">
            {{data[indextr].isBorrowed ? 'Borrowed' : 'Not borrowed'}}
          </vs-td>

            <!-- <vs-td :data="data[indextr].status">
             <div class="actionColor">
                 <feather-icon icon="LockIcon" class="w-6 h-6 mr-1 red"></feather-icon>
             </div>
          </vs-td> -->
        </vs-tr>
      </template>
    </vs-table>
 </div>
</template>

<script>
import io from "socket.io-client"
import Logs from '../../../services/Logs'
export default {
data() {
    return {
         socket: io(process.env.VUE_APP_SOCKET,{transports: ['websocket']}),
        actionLogs: []
    }
},
methods: {
    handleChangePage(val) {
        // console.log(val)
    },
    handleSearch(val) {
        // console.log(val)
    },
    pushData(val) {
        this.actionLogs.unshift(val)
        this.$vs.notify({
            title: val.bookTitle,
            text: val.createdAt,
            color: val.isBorrowed ? 'success': 'danger',
            icon: val.isBorrowed ? 'verified_user' : 'privacy_tip',
            fixed: true
        })
    },
    getAllLogs() {
        Logs.getAll().then(res => {
            this.actionLogs = res
            // console.log(res)
        }).catch(err => console.log(err))
    }
},
created() {
    this.getAllLogs()
     this.socket.on("newLog", data => {
        this.pushData(data)
      });
}
}
</script>

<style>
.actionColor:hover{
    color:rgb(0, 172, 202);

}
</style>