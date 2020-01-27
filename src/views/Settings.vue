<template>
 <!-- <div>
    <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/3 w-full">
      <span>First Name</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border v-model="input5" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/3 w-full">
      <span>Email</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input type="email" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border v-model="input6" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/3 w-full">
      <span>Mobile</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border v-model="input7" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/3 w-full">
      <span>Password</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border v-model="input8" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-2/3 w-full ml-auto">
      <vs-checkbox class="inline-flex" v-model="check2">Remember Me</vs-checkbox>
    </div>
  </div>
  <div class="vx-row">
    <div class="vx-col sm:w-2/3 w-full ml-auto">
      <vs-button class="mr-3 mb-2">Submit</vs-button>
      <vs-button color="warning" type="border" class="mb-2" @click="input5 = input6 = input7 = input8 = ''; check2 = false;">Reset</vs-button>
    </div>
  </div>
 </div> -->
 <div>
   
<vs-row>
  <vx-card>
  <vs-col vs-type="flex" vs-justify="start" vs-align="center" vs-w="6">
   <div>
    <div class="vx-row mb-6 ">
    <div class="vx-col  md:w-1/2">
      <span>Add Category</span>
    </div>
    <div class="vx-col   md:w-1/3">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border  />
    </div>
   <div class="vx-col  md:w-1/3">
     <vs-button class="flex-1" radius icon="plus"></vs-button>
    </div>
  </div>
 </div> 
  </vs-col>

   <vs-col vs-type="flex" vs-justify="start" vs-align="center" vs-w="6">
    <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/3 md:w-full">
      <span>Add Subject</span>
    </div>
    <div class="vx-col sm:w-2/3 md:w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border />
    </div>
  </div>
  </vs-col>
  </vx-card>
</vs-row>
 </div>
</template>
        