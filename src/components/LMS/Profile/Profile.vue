<template>
  <div>
    <vx-card class="">
      <vs-tabs :color="colorx" position="top">
        <vs-tab @click="colorx = 'success'" label="Profile info">
            <vx-row vs-justify="center" vs-w="6">
            <div class="w-1/4">
            <vs-list>
                 <vs-list-item title="Arabkhonova Mokhina" subtitle="Librarian">
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
                    v-model="input13"
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
                    v-model="input14"
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
                    v-model="input15"
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
                    label="Password"
                    v-model="input16"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <vs-checkbox class="inline-flex" v-model="check4"
                    >Remember Me</vs-checkbox
                  >
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-button class="mr-3 mb-2">Submit</vs-button>
                  <vs-button
                    color="warning"
                    type="border"
                    class="mb-2"
                    @click="
                      input13 = input14 = input15 = input16 = '';
                      check4 = false;"
                    >Cancle</vs-button
                  >
                </div>
              </div>
            </template>
          </div>
          </vx-row>
        </vs-tab>

        <vs-tab @click="colorx = 'warning'" label="Password settings">
          <div class="con-tab-ejemplo w-1/4">
               <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password" v-model="input16" />
      </div>
    </div>
       <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password" v-model="input16" />
      </div>
    </div>
       <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border label="Password" v-model="input16" />
      </div>
    </div>
            <div class="vx-row">
    <div class="vx-col sm:w-2/3 w-full ml-auto">
      <vs-button class="mr-3 mb-2">Submit</vs-button>
      <vs-button color="warning" type="border" class="mb-2" @click="input5 = input6 = input7 = input8 = ''; check2 = false;">Reset</vs-button>
    </div>
  </div>
          </div>
        </vs-tab>
      </vs-tabs>
    </vx-card>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
