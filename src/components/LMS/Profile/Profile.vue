<template>
  <div>
    <vx-card class="">
      <vs-tabs color="warning" position="top">
        <vs-tab  label="Profile info">
          <vs-row>
          <vs-col vs-justify="start" vs-w="6">
            <div class="w-2/3">
              <vs-list>
                <vs-list-item :title="userInfo.firstName+' '+userInfo.lastName" :subtitle="userInfo.role.name">
                  <vs-avatar size="70px" src="/img/avatar-s-11.68ff1200.png" />
                </vs-list-item>
              </vs-list>
            </div>
            <div class="vx-col w-2/3">
              <template>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <vs-input
                      class="w-full"
                      icon-pack="feather"
                      icon="icon-user"
                      icon-no-border
                      label="First Name"
                      v-model="userInfo.firstName"
                    />
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <vs-input
                      class="w-full"
                      icon-pack="feather"
                      icon="icon-user"
                      icon-no-border
                      label="Last Name"
                      v-model="userInfo.lastName"
                    />
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <vs-input
                    disabled
                      type="email"
                      class="w-full"
                      icon-pack="feather"
                      icon="icon-mail"
                      icon-no-border
                      label="Email"
                      v-model="userInfo.email"
                    />
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                  </div>
                </div>
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <vs-button @click="submitting" class="mr-3 mb-2">Save</vs-button>
                    <vs-button
                      color="warning"
                      type="border"
                      class="mb-2"
                
                      >Cancel</vs-button
                    >
                  </div>
                </div>
              </template>
            </div>
          </vs-col>
          <vs-col vs-justify="center" vs-w="6">
                <div class="vx-row">
    <div class="flex my-3">
        <feather-icon class="px-3" icon="LockIcon" svgClasses="h-6 w-6" />
        <h3>Permissions</h3>
      </div>
      <vs-divider></vs-divider>
    <table disabled>
            <tr>
              <th>Field</th>
              <th>Enabled</th>
            </tr>
            <tr v-for="(item,i) in datalist" :key="i">
              <td>{{item.name}}</td>
              <td><vs-checkbox disabled  v-model="item.has"></vs-checkbox></td>
    
            </tr>
          </table>
  </div>
          </vs-col>
          </vs-row>
        </vs-tab>

        <vs-tab label="Password settings">
          <div class="con-tab-ejemplo w-1/4">
            <div class="vx-row mb-6">
              <div class="vx-col w-full">
                <vs-input
                  type="password"
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-lock"
                  icon-no-border
                  label="Old password"
                  v-model="userPwd.currentPassword"
                />
              </div>
            </div>
              <div class="vx-row mb-6">
              <div class="vx-col w-full">
                <vs-input
                  type="password"
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-lock"
                  icon-no-border
                  label="New password"
                  v-model="userPwd.newPassword"
                />
              </div>
            </div>
            <div class="vx-row mb-6">
              <div class="vx-col w-full">
                <vs-input
                  type="Confirm new password"
                  class="w-full"
                  icon-pack="feather"
                  icon="icon-lock"
                  icon-no-border
                  label="Password"
                  v-model="userPwd.confirm"
                />
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col sm:w-2/3 w-full">
                <vs-button class="mr-3 mb-2">Save</vs-button>
                <vs-button
                  color="warning"
                  type="border"
                  class="mb-2"
                  >Reset</vs-button
                >
              </div>
            </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </vx-card>
  </div>
</template>

<script>
export default {
  data() {
   return {
      userInfo: {
      id: '',
      lastName: '',
      firstName: '',
      role: {},
      permissions: []
    },
    userPwd:{
      currentPassword: '',
      newPassword: '',
      confirm:''
    },
      // datalist: [
      // {
      //  id: 2,
      //  name: 'Settings',
      //  permission: {
      //       read: false,
      //     create: false,
      //     update: false,
      //     delete: false,
      //       prop: true,
      //      store: []
        
      //  }
      // },
      //   {
      //     type: "Books",
      //     read: false,
      //     create: false,
      //     update: false,
      //     delete: false,
      //       prop: true,
      //     store: []
      //   }
      //   ]
   }
  },
  computed:{
datalist() {
  return this.$store.state.userInfo.permissions
},

  },
  methods : {
     userInfos() {
    this.userInfo = JSON.parse(localStorage.getItem('profileInfo'))
},
    submitting() {
      console.log({
        id:this.userInfo.id,
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
     //   email: this.userInfo.email
      })
    }
  },
  mounted() {
    this.userInfos()
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
