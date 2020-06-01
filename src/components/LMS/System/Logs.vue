<template>
 <div>
      <vs-table 
        notSpacer 
        :maxItems="3" 
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
        <vs-th>UID</vs-th>
        <vs-th>FULL NAME</vs-th>
        <vs-th>BOOK TITLE</vs-th>
        <vs-th> DATE</vs-th>
        <vs-th>STATUS</vs-th>
        <vs-th>BLOCK USER</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].uid">
            {{data[indextr].uid}}
          </vs-td>

          <vs-td :data="data[indextr].name">
            {{data[indextr].name}}
          </vs-td>

           <vs-td :data="data[indextr].bookName">
            {{data[indextr].bookName}}
          </vs-td>

          <vs-td :data="data[indextr].date">
            {{data[indextr].date}}
          </vs-td>

          <vs-td :data="data[indextr].status">
            {{data[indextr].status}}
          </vs-td>

            <vs-td :data="data[indextr].status">
             <div class="actionColor">
                 <feather-icon icon="LockIcon" class="w-6 h-6 mr-1 red"></feather-icon>
             </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
 </div>
</template>

<script>
export default {
data() {
    return {
        actionLogs: [
            {
                uid: "u1710023",
                name: "Saidakbar Makhmudkhujaev",
                bookName: 'Calculus 2020',
                status: 'Borrowed',
                date: '2 Jan, 2020',
                action: 23
            },
            {
                uid: "u1710023",
                name: "Saidakbar Makhmudkhujaev",
                bookName: 'Calculus 2020',
                status: 'Borrowed',
                date: '2 Jan, 2020',
                action: 23
            },
             {
                uid: "u1710023",
                name: "Saidakbar Makhmudkhujaev",
                bookName: 'Calculus 2020',
                status: 'Borrowed',
                date: '2 Jan, 2020',
                action: 23
            }, {
                uid: "u1710023",
                name: "Saidakbar Makhmudkhujaev",
                bookName: 'Calculus 2020',
                status: 'Borrowed',
                date: '2 Jan, 2020',
                action: 23
            }, {
                uid: "u1710023",
                name: "Saidakbar Makhmudkhujaev",
                bookName: 'Calculus 2020',
                status: 'Borrowed',
                date: '2 Jan, 2020',
                action: 23
            }, {
                uid: "u1710023",
                name: "Saidakbar Makhmudkhujaev",
                bookName: 'Calculus 2020',
                status: 'Borrowed',
                date: '2 Jan, 2020',
                action: 23
            }
        ]
    }
},
methods: {
    handleChangePage(val) {
        console.log(val)
    },
    handleSearch(val) {
        console.log(val)
    }
}
}
</script>

<style>
.actionColor:hover{
    color:rgb(0, 172, 202);

}
</style>