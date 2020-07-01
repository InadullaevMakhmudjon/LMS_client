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
              :disabled="isEditing"
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
              :disabled="isEditing"
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
              :disabled="isEditing"
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
              :disabled="isEditing"
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
              :disabled="isEditing"
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
                :disabled="isEditing"
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
                :disabled="isEditing"
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
      <vs-row class="mt-2">
        <div class="vx-col w-1/8 ml-auto mt-5">
          <vs-button class="mr-3 " v-if="!isEditing" :disabled="isSaved" @click="submitData">Save</vs-button>
          <vs-button class="mr-3 " v-else :disabled="isSaved" @click="saveEdit">Save Edits</vs-button>
          <vs-button color="danger" :disabled="isSaved" type="border" to="/users">Discard</vs-button>
        </div>
      </vs-row>
      <template slot="footer">
        <vs-progress v-if="isSaved" indeterminate :height="4" color="success">primary</vs-progress>
      </template>
    </vx-card>
  </div>
</template>

<script>
import Permissions from "../../../services/Permissions";
import Users from "../../../services/Users";
import Roles from "../../../services/Roles";
export default {
  props: {
    propsData: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      pwd: "",
      isSaved: false,
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
    },
    isEditing() {
      return this.$route.name == 'Userinfo'
    }
  },
  methods: {
    getRoles() {
      Roles.getAll().then(res => {
        this.roles = res;
      });
    },
    submitData() {
      if(this.userData.firstName == '' && this.userData.lastName == '' && this.userData.roleId == '' && this.userData.email == '' && this.userData.password == '')
        {
          alert('All fields are required. Please fill in the fields')
          return;
        }
      this.isSaved = true
      let assignedRoles = [];
      let user = "";
      this.datalist.forEach(element => {
        if (element.has == true) assignedRoles.push({ id: element.id});
      });
      Users.create1(this.userData)
        .then(res => {
          // console.log(assignedRoles)
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
               this.isSaved = false
            })
            .catch(error => {
            this.isSaved = false
            console.log(error)
            });
        })
        .catch(error => {
          this.isSaved = false
          console.log(error)
          });
    },
    saveEdit() {
      // E'tiborga olinsa shu qism davom ettiriladi, bolmasa faqat rollarni edit qilish mumkun boladi 
      const assignedRoles = []
      this.datalist.forEach(element => {
        if (element.has == true) assignedRoles.push({ id: element.id});
      });
      Users.update(this.propsData.id, assignedRoles).then(res => {
        // console.log(res)
        this.$vs.notify({
          title: 'Successfully updated',
          color: 'success',
        })
        this.$router.push('/users')
      }).catch( err => {
        console.log(err)
      })
    },
    getPermissionList() {
      Permissions.getAll()
        .then(permissions => {
          // console.log(permissions)
          if(!this.isEditing) this.datalist = permissions;
          else {
              this.datalist = permissions.map(el => ({
                  id: el.id,
                  name: el.name,
                  has: this.propsData.permissions.filter(fn => el.id == fn.id).length > 0
                }))
            }
          
        })
        .catch(error => console.log(error));
    },
    successCreated(value) {
      this.$vs.notify({
        color: "success",
        title: value,
        text: "User has successfully created. Check user's mail",
        icon:'mail',
        fixed: true
      });
    }
  },
  created () {

    // console.log(this.propsData)
    if(this.$route.name == 'Userinfo')
        {
          this.userData = this.propsData
          // this.datalist = this.propsData.permissions.map(el => {
          //   return {
          //     id: el.id, name: el.name, has: true 
          //     }
          // })
          
        }
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
