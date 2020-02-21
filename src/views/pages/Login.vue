<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

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
                  <a href="#">Forgot a Password ?</a>
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
  </div>
</template>

<script>
import Auth from "../../services/Auth";
import axios from "axios";

export default {
  data() {
    return {
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
