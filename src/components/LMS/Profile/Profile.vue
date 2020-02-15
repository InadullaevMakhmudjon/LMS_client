<template>
  <div>
    <vx-card class="">
      <vs-tabs color="warning" position="top">
        <vs-tab  label="Profile info">
          <vs-col vs-justify="start" vs-w="12">
            <div class="w-1/4">
              <vs-list>
                <vs-list-item :title="userInfo.firstName+' '+userInfo.lastName" :subtitle="userInfo.role.name">
                  <vs-avatar size="70px" src="/img/avatar-s-11.68ff1200.png" />
                </vs-list-item>
              </vs-list>
            </div>
            <div class="vx-col w-1/4">
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
                    <vs-input
                      class="w-full"
                      icon-pack="feather"
                      icon="icon-smartphone"
                      icon-no-border
                      label="Mobile"
                      v-model="userInfo.phoneNumber"
                    />
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                  </div>
                </div>
                <div class="vx-row">
                  <div class="vx-col w-full">
                    <vs-button class="mr-3 mb-2">Submit</vs-button>
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
              <div class="vx-col sm:w-2/3 w-full ml-auto">
                <vs-button class="mr-3 mb-2">Submit</vs-button>
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
      phoneNumber:'',
      role: {},
      permissions: []
    },
    userPwd:{
      currentPassword: '',
      newPassword: '',
      confirm:''
    }
   }
  },
methods: {
  getUserInfo () {
    console.log(this.$store.state.userInfo)
    this.userInfo = this.$store.state.userInfo
  }
},
mounted() {
  this.getUserInfo()
},
}
</script>

<style></style>
