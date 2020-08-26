<template>
  <div>
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="start" vs-align="center" vs-w="6">
          <div class="flex">
            <img
              class="image__"
              src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
              alt=""
              srcset=""
            />
          </div>
          <div class="flex">
            <vs-list>
              <vs-list-header
                icon="supervisor_account"
                title="User information"
              ></vs-list-header>
              <vs-list-item
                icon="person_pin"
                title="Full name"
                subtitle="Inna Qualenlta Delavrio"
              ></vs-list-item>
              <vs-list-item
                icon="phone"
                title="Phone number"
                subtitle="+998998005598"
              ></vs-list-item>

              <vs-list-item
                icon="email"
                title="Email address"
                subtitle="s.arabkanova2@staff.inha.uz"
              ></vs-list-item>
              <vs-list-item
                icon="verified_user"
                title="Status"
                subtitle="active"
              ></vs-list-item>
            </vs-list>
          </div>
        </vs-col>

        <vs-col vs-type="flex" vs-justify="start" vs-align="start" vs-w="6">
          <vs-row vs-justify="start"> </vs-row>
        </vs-col>
        <vs-row>
          <div class="flex text-center">
            <vs-button class="m-1" icon="edit" color="primary" type="filled"
              >Edit</vs-button
            >
            <vs-button disabled class="m-1" icon="delete" color="danger" type="border"
              >Delete</vs-button
            >
          <ul class="con-s ml-5">

      <label color="red" for="">Diactivate</label>
      <vs-switch v-model="isActive"/>
</ul>
          </div>
        </vs-row>
      </vs-row>
    </vx-card>
    <vx-card class="mt-5">
      <div class="flex ">
        <feather-icon class="px-3" icon="LockIcon" svgClasses="h-7 w-7" />
        <h3>Permissions</h3>
      </div>
      <vs-divider></vs-divider>
      <vs-row class="w-full">
        <vs-col class="w-1/2">
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
          <div>
              <vs-button class="my-base" @click="submitData">Save Changes</vs-button>
             <vs-button class="my-base mx-2" type="border" @click="revertData" color="warning">Discard</vs-button>
          </div>
        </vs-col>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      isActive:true,
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
    };
  },
  methods: {
    submitData() {
      this.datalist.forEach(el => {
        el.store.push(el.read, el.create, el.update, el.delete)
        // console.log(el.store)
      })
    },
    revertData() {
      this.datalist.forEach( el => el.store = [])
    }
  }
};
</script>

<style>
.image__ {
  width: 200px;
  height: 200px;
  object-fit: cover;
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
