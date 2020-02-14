<template>
 <div>
       <vx-card class="w-full" >
<vs-row no-gutter> 
    
        <div class="vs-col justify-start w-1/2">
            <h3 class="mb-4  regform"><feather-icon icon="Edit3Icon" color="red" size="40px" ></feather-icon> Registration form</h3>
            
           <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>First Name</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border v-model="userData.firstName" />
    </div>
  </div>
   <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Last Name</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border v-model="userData.lastName" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Email</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input type="email" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border v-model="userData.email" />
    </div>
  </div>

  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Password</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border v-model="userData.password" />
    </div>
  </div>

        </div>
      <div class="vs-col w-1/2">
            <!-- <div class="flex">
        <vs-radio class="m-2" v-model="radios2" vs-value="primary">Male</vs-radio>   
     <vs-radio class="m-2" color="success" v-model="radios2" vs-value="primary">Female</vs-radio>
        </div> -->
         <div class="vx-row">
    <div class="flex mb-base">
        <feather-icon class="px-3" icon="LockIcon" svgClasses="h-6 w-6" />
        <h3>Permissions</h3>
      </div>
    <table disabled>
            <tr>
              <th>Field</th>
              <th>Create</th>
              <th>Read</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            <tr v-for="(item,i) in datalist" :key="i">
              <td>{{item.type}}</td>
              <td><vs-checkbox  v-model="item.create"></vs-checkbox></td>
              <td><vs-checkbox  v-model="item.read"></vs-checkbox></td>
              <td><vs-checkbox  v-model="item.update"></vs-checkbox></td>
              <td><vs-checkbox  v-model="item.delete"></vs-checkbox></td>
            </tr>
          </table>
  </div>
        </div>  
</vs-row>
<vs-row>
   
    <div class="vx-col w-1/8 ml-auto mt-5">
      <vs-button class="mr-3 " @click="submitData">Save</vs-button>
      <vs-button color="danger" type="border" >Discard</vs-button>
  </div>
</vs-row>
 </vx-card>
 </div>
</template>

<script>
export default {
data() {
   return {
     userData:{
       firstName:'',
       lastName: '',
       email:'',
       phone:'',
       password:''
     },

      datalist: [
        {
          type: "Librarian",
          read: false,
          create: false,
          update: false,
          delete: false,
          prop: true,
          store: []
        },
        {
          type: "Books",
          read: false,
          create: false,
          update: false,
          delete: false,
            prop: true,
          store: []
        },
        {
          type: "Book Items",
          read: false,
          create: false,
          update: false,
          delete: false,
            prop: true,
          store: []
        },
        {
          type: "Settings",
          read: false,
          create: false,
          update: false,
          delete: false,
            prop: true,
          store: []
        },
        {
          type: "Members",
          read: false,
          create: false,
          update: false,
          delete: false,
          prop: false,
          store: []
        }
      ],
   }
},
methods:{
  submitData() {
    console.log(this.userData)
  }
}
}
</script>

<style>

.regform{
  color: rgb(65, 65, 65);   
}
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid rgb(243, 243, 243);
}

tr:hover {
  background-color: #f5f5f5;
}
</style>