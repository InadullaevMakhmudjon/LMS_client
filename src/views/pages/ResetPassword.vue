<template>
    <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
        <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
            <vx-card >
                <div slot="no-body" class="">
                    <div class="vx-row justify-center items-center">
                        <div class="vx-col sm:w-full md:w-full lg:w-1/2">
                            <div class="p-8">
                                <div class="vx-card__title mb-8">
                                    <h4 class="mb-4">Reset Password</h4>
                                    <p>Welcome back, please provide a new password</p>
                                </div>
                                <vs-alert  color="danger" :active="err.flag">
                                {{ err.msg }}
                                </vs-alert>
                                <vs-input
                                    :danger="err.flag"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="New password"
                                    v-model="newPassword"
                                    v-on:keyup.enter="login"
                                    class="w-full no-icon-border pt-2"/>

                                <vs-input
                                    :danger="err.flag"
                                    type="password"
                                    icon="icon icon-lock"
                                    icon-pack="feather"
                                    label-placeholder="Confirm password"
                                    v-model="confirmPassword"
                                    v-on:keyup.enter="login"
                                    class="w-full mt-6 no-icon-border" />

                                <vs-button  @click="login" class="float-right my-3" :disabled="!(confirmPassword && newPassword)">Reset</vs-button>

                                <vs-divider>Inha University in Tashkent</vs-divider>
                            </div>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
          <vs-popup class="holamundo" button-close-hidden :active.sync="redirect.flag">
              <p>{{redirect.msg}}</p>
          </vs-popup>
    </div>
</template>

<script>
import Profile from '../../services/Profile';
export default {
    props: ['id'],
    data() {
        return {
           redirect: {
               flag: false,
               msg: ''
           },
            confirmPassword: '',
            newPassword: '',
             err:{
                flag: false,
                msg: ''
            },
        }
    },
    methods: {
    login() {
        Profile.updatePassword(this.id, {password: this.newPassword}).then( res => {
            console.log(res)
            this.$vs.notify({
                title: 'Password has been updated successfully',
                text: 'This page will be redirected to main entrance',
                color:'success'
            })
            setTimeout(() => {
                this.$router.replace('/')
            }, 2000);
        }).catch(err => {
               this.$vs.dialog({
                color:  'danger',
                title: `Time expired`,
                text: err.data,
                type: 'alert',
                accept:this.acceptAlert,
                acceptText: 'Back to Login'
              })
        })
    },
    acceptAlert() {
        this.$router.replace('/pages/login')
    }
    },
}
</script>

<style lang="scss">
#page-login {
    .social-login {
        .bg-facebook {
          background-color: #1551b1;
        }
        .bg-twitter {
          background-color: #00aaff;
        }
        .bg-google {
          background-color: #4285F4;
        }
        .bg-github {
          background-color: #333;
        }
    }
}
</style>