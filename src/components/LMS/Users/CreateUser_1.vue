<template>
  <div>
    <vx-card class="w-full">
      <vs-row no-gutter>
        <div class="vs-col justify-start w-1/2">
          <h3 class="mb-4  regform">
            <feather-icon
              icon="Edit3Icon"
              color="red"
              size="40px"
            ></feather-icon>
            Registration form
          </h3>

          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>First Name</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input
                class="w-full"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                v-model="userData.firstName"
              />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>Last Name</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input
                class="w-full"
                icon-pack="feather"
                icon="icon-user"
                icon-no-border
                v-model="userData.lastName"
              />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>Username</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input
                type="email"
                class="w-full"
                icon-pack="feather"
                icon="icon-mail"
                icon-no-border
                v-model="userData.username"
              />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>Email</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input
                type="email"
                class="w-full"
                icon-pack="feather"
                icon="icon-mail"
                icon-no-border
                v-model="userData.email"
              />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>Role</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-select
                v-model="userData.roleId"
                class="w-full select-large mt-5"
              >
                <vs-select-item
                  v-for="item in roles"
                  :key="item.id"
                  :value="item.id"
                  :text="item.name"
                  class="w-full"
                />
              </vs-select>
            </div>
          </div>

          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>Password</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input
                type="password"
                class="w-full"
                icon-pack="feather"
                icon="icon-lock"
                icon-no-border
                v-model="userData.password"
              />
            </div>
          </div>
          <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/6 w-full">
              <span>Re-enter password</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
              <vs-input
                :danger="confirmingPwd ? false : true"
                :danger-text="confirmingPwd ? '' : 'Password doesnt match'"
                type="password"
                class="w-full"
                icon-pack="feather"
                icon="icon-lock"
                icon-no-border
                v-model="pwd"
              />
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
                <th>Order</th>
                <th>Field</th>
                <th>Access</th>
              </tr>
              <tr v-for="(item, i) in datalist" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ item.name }}</td>
                <td><vs-checkbox v-model="item.has"></vs-checkbox></td>
              </tr>
            </table>
          </div>
        </div>
      </vs-row>
      <vs-row>
        <div class="vx-col w-1/8 ml-auto mt-5">
          <vs-button class="mr-3 " @click="submitData">Save</vs-button>
          <vs-button color="danger" type="border">Discard</vs-button>
        </div>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
import Permissions from "../../../services/Permissions";
import Users from "../../../services/Users";
import Roles from "../../../services/Roles";
export default {
  data() {
    return {
      pwd: "",
      userData: {
        firstName: "",
        lastName: "",
        username: "",
        roleId: 0,
        email: "",
        password: ""
      },
      roles: [],
      datalist: []
    };
  },
  computed: {
    confirmingPwd() {
      return this.pwd == this.userData.password;
    }
  },
  methods: {
    getRoles() {
      Roles.getAll().then(res => {
        this.roles = res;
      });
    },
    submitData() {
      let assignedRoles = [];
      let user = "";
      this.datalist.forEach(element => {
        if (element.has == true) assignedRoles.push({ id: element.id});
      });
      Users.create1(this.userData)
        .then(res => {
          console.log(assignedRoles)
          Users.create2(res.user.id, {
            permissions: assignedRoles
          })
            .then(res => {
              this.successCreated(res);
              this.getPermissionList()
              this.userData = {
                firstName: "",
                lastName: "",
                username: "",
                roleId: '',
                email: "",
                password: ""
              };
              this.pwd = ''
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    },
    getPermissionList() {
      Permissions.getAll()
        .then(permissions => {
          this.datalist = permissions;
        })
        .catch(error => console.log(error));
    },
    successCreated(value) {
      this.$vs.notify({
        color: "success",
        title: value,
        text: "User Has successfully created"
      });
    }
  },
  mounted() {
    this.getPermissionList();
    this.getRoles();
  }
};
</script>

<style>
.regform {
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
