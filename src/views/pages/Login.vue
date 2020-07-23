
<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                width="260"
                src="@/assets/images/pages/abc.jpeg"
                alt="login"
                class="mx-auto"
              />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title mb-8">
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, please login to your account.</p>
                </div>
                <vs-input
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Username"
                  v-model="auth.username"
                  class="w-full no-icon-border"
                  v-on:keyup.enter="login"
                />

                <vs-input
                  v-on:keyup.enter="login"
                  type="password"
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Password"
                  v-model="auth.password"
                  class="w-full mt-6 no-icon-border"
                />
                <div class="flex flex-wrap justify-between my-5">
                  <a @click="reset.flag = true">Forgot a Password ?</a>
                </div>
                <div class="flex flex-wrap justify-between my-5">
                  <vs-button
                    ref="loadableButton"
                    id="button-with-loading"
                    class="vs-con-loading__container float-right"
                    type="relief"
                    vslor="primary"
                    @click="login()"
                    >Login</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
     <vs-popup class="holamundo"  title="Reset your Password" :active.sync="reset.flag">
            <vs-row vs-type="flex" vs-justify="center">
                <vs-col vs-type="flex" vs-w="12">
                        <vx-input-group v-if="success.flag" class=" w-full">
                            <template slot="prepend">
                                <div class="prepend-text bg-primary">
                                <span>@</span>
                                </div>
                            </template>
                            <vs-input type="email" v-model="reset.email" placeholder="Your mail" />
                            <template slot="append">
                                <div class="append-text btn-addon">
                                <vs-button color="primary" :disabled="reset.email.length == ''" @click="resetPassword">Send</vs-button>
                                </div>
                            </template>
                        </vx-input-group>
                </vs-col>  
                <vs-col vs-w="9">
                    <p v-if="success.flag" class=" text-center py-2">Give us your email address and we will send you a link to reset your password </p>
                    <p v-if="!success.flag" class=" text-center py-2 text-success">* {{success.msg}}</p>  
                    <p v-if="!success.flag" class=" text-center py-2 text-dark">You have <strong>5 minutes</strong> for activation</p>    
                </vs-col>  
                <!-- <button href="http://localhost:8080/" target="_blank" onclick="setToken()"></button> -->
            </vs-row>    
     </vs-popup>
  </div>
</template>

<script>
import Auth from "../../services/Auth";
import Profile from "../../services/Profile";
import axios from "axios";

export default {
  data() {
    return {
      success: {
        flag:  true,
        msg: ''
      },
      reset: {
        flag:  false,
        email: ''
      },
      auth: {
        username: "",
        password: ""
      },
      checkbox_remember_me: false
    };
  },
  methods: {
    login() {
      this.loading(true);
      Auth.getToken(this.auth)
        .then(res => {
          this.$store.dispatch("storeData", res.profile);
          this.$store.dispatch("recieveToken", res.token).then(() => {
            this.loading(false);
            this.$router.push("/");
          });
        })
        .catch(error => console.log("error at: " + error));
    },
    loading(val) {
      if (val == true) {
        this.$vs.loading({
          background: "primary",
          color: "white",
          container: "#button-with-loading",
          scale: 0.45
        });
        setTimeout(() => {
          this.$vs.loading.close("#button-with-loading > .con-vs-loading");
        }, 3000);
      } else {
        this.$vs.loading.close("#button-with-loading > .con-vs-loading");
      }
    },
    resetPassword () {
      console.log({email: this.reset.email})
            Profile.resetPassword({email: this.reset.email}).then (res => {
                this.success.msg = res.message
                this.success.flag = false
          }).catch ( err => console.log(err))
    }
  }
};
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
      background-color: #4285f4;
    }
    .bg-github {
      background-color: #333;
    }
  }
}
</style>
