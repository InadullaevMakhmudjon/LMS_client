<template>
  <div>
    <vx-card title="Filter">
        <vs-col  vs-type="flex"  vs-justify="center" vs-align="center" vs-w="2">
    <div class="w-full">
    <vs-button to="/user-create">New user</vs-button>
    </div>
  </vs-col>
    <vs-row vs-justify="center">
    
  <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
    <div class="w-full">
    <span>Role</span>
    <v-select class="w-full" :options="[{label: 'Foo', value: 'foo'}]"></v-select>
    </div>
  </vs-col>
   <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
    <div class="w-full">
    <span>Status</span>
    <v-select class="w-full" :options="[{label: 'Foo', value: 'foo'}]"></v-select>
    </div>
  </vs-col>
   <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
    <div class="w-full">
    <span>Somefilter</span>
    <v-select class="w-full" :options="[{label: 'Foo', value: 'foo'}]"></v-select>
    </div>
  </vs-col>
   <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
    <div class="w-full">
    <span>Role</span>
    <v-select class="w-full" :options="[{label: 'Foo', value: 'foo'}]"></v-select>
    </div>
  </vs-col>
</vs-row>
</vx-card>
<vx-card class="mt-5">
<vs-row>
  <vs-col>
    <vs-table multiple v-model="selected" pagination max-items="3" search :data="users">

    <template slot="thead">
      <vs-th sort-key="username">ID</vs-th>
      <vs-th sort-key="email">Name</vs-th>
      <vs-th sort-key="website">address</vs-th>
      <vs-th sort-key="id">Role</vs-th>
        <vs-th sort-key="id">Status</vs-th>
         <vs-th sort-key="id">Action
         </vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

        <vs-td :data="data[indextr].email">
          {{ data[indextr].email }}
        </vs-td>

        <vs-td :data="data[indextr].username">
          {{ data[indextr].username }}
        </vs-td>

        <vs-td :data="data[indextr].id">
          {{ data[indextr].website }}
        </vs-td>

        <vs-td :data="data[indextr].id">
          admin
        </vs-td>
        <vs-td :data="data[indextr].id">
          <vs-chip color="danger">blocked</vs-chip> 
        </vs-td>
        <vs-td :data="data[indextr].id">
          {{ data[indextr].id }}
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
          "username": "mohina932",
          "email": "blocked",
          "status": "active",
          "Role": "librarian",
          "phone": "+45949493"
        },
        {
          "id": 2,
          "name": "Ervin Howell",
          "username": "Antonette",
          "email": "Shanna@melissa.tv",
          "website": "anastasia.net",
        }
      ]
    }
  },
}
</script>

<style>

</style>