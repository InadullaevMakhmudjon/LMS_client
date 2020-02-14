<template>
  <div>
    <!-- <vx-card title="Filter" collapseAction>
     
</vx-card> -->
<vx-card class="mt-5">
 
  <div class="flex">
      <vs-button class="my-auto mt-5 m-5" to="/user-create">New user</vs-button>
       <vs-select
      class="my-auto"
      label="Status"
      v-model="selectStatus"
      >
      <vs-select-item  :value="item.value" :text="item.label" v-for="(item,index) in status"  :key="index"/>
    </vs-select>
  </div>
    <!-- <vs-col  vs-type="flex" vs-justify="start" vs-align="center" vs-w="2">
      <vs-select
      class="selectExample"
      label="Status"
      v-model="selectStatus"
      >
      <vs-select-item  :value="item.value" :text="item.label" v-for="(item,index) in status"  :key="index"/>
    </vs-select>
  </vs-col> -->

    <vs-row  vs-justify="start">
   <vs-col  class="mt-4" vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
    <div class="w-full">
    </div>
  </vs-col>
</vs-row>
<vs-row>
  <vs-col>
    <vs-table v-model="selected" pagination max-items="3" search :data="users">

    <template slot="thead">
       <vs-th sort-key="sorting">Order</vs-th>
      <vs-th sort-key="username">Full name</vs-th>
      <vs-th sort-key="email">ID</vs-th>
      <vs-th sort-key="website">address</vs-th>
      <vs-th sort-key="id">Role</vs-th>
        <vs-th sort-key="id">Status</vs-th>
         <vs-th sort-key="id">Action
         </vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

           <vs-td :data="data[indextr].name">
          {{indextr+1 }}
        </vs-td>
        <vs-td :data="data[indextr].name">
          {{ data[indextr].name }}
        </vs-td>

        <vs-td :data="data[indextr].username">
          {{ data[indextr].username }}
        </vs-td>

        <vs-td :data="data[indextr].email">
          {{ data[indextr].email }}
        </vs-td>

        <vs-td :data="data[indextr].role">
          {{data[indextr].role}}
        </vs-td>
        <vs-td :data="data[indextr].status">
          <vs-chip :color="data[indextr].status==1 ? 'success':'danger'">{{data[indextr].status==1 ? 'active' : 'Disactivated'}}</vs-chip> 
        </vs-td>
        <vs-td :data="data[indextr].id">
          <!-- <div @click="routing(data[indextr].id)"> <vs-icon class="hover" icon="visibility" size="medium" color="#424242" ></vs-icon></div> -->
          <vs-button @click="routing(data[indextr].id)" icon="visibility" size="small" type="border">View</vs-button>
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
    
  
  </vs-col>
</vs-row>
</vx-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      selectRole:'',
      selectStatus:'',
      'tableList': [
        'vs-th: Component',
        'vs-tr: Component',
        'vs-td: Component',
        'thread: Slot',
        'tbody: Slot',
        'header: Slot'
      ],
      users: [
        {
          "id": 1,
          "name": "Arabkhanova Mohira",
          "username": "L001",
          "email": "m.arabxonova@inha.uz",
          "status": 0,
          "role": "Librarian",
          "phone": "+459494933232"
        },
          {
          "id": 2,
          "name": "Makhmudkhujaev Saidakbar",
          "username": "A001",
          "email": "s.makhmudkhujaev@student.inha.uz",
          "status": 1,
          "role": "Admin",
          "phone": "+998998005598"
        },
         {
          "id": 2,
          "name": "Makhmudkhujaev Saidakbar",
          "username": "A001",
          "email": "s.makhmudkhujaev@student.inha.uz",
          "status": 1,
          "role": "Admin",
          "phone": "+998998005598"
        },
      
      ],
      activeUsers:[
  {
          "id": 2,
          "name": "Makhmudkhujaev Saidakbar",
          "username": "A001",
          "email": "s.makhmudkhujaev@student.inha.uz",
          "status": 1,
          "role": "Admin",
          "phone": "+998998005598"
        },
         {
          "id": 2,
          "name": "Makhmudkhujaev Saidakbar",
          "username": "A001",
          "email": "s.makhmudkhujaev@student.inha.uz",
          "status": 1,
          "role": "Admin",
          "phone": "+998998005598"
        },
      ],
      status: [
        { label:'active', value: '1',},
        { label:'diactivated', value: '2',}
      ]
    
    }
  },
  watch:{
    selectRole(val) {
      console.log(val)
    },
    selectStatus(val) {
      if (val == 1)
      this.users = this.activeUsers
    }
  },
  methods:{
    routing( params ) {
      this.$router.push('/user-view/'+params)
    }
  }
}
</script>

<style scoped>

</style>