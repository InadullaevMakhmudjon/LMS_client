<template>
 <div>
       <vx-card class="w-full" >
<vs-row no-gutter> 
    
        <div class="vs-col justify-start w-1/2">
            <h3 class="mb-4  regform"><feather-icon icon="Edit3Icon" color="red" size="40px" ></feather-icon> Registration form</h3>
           <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>First Name</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border v-model="input5" />
    </div>
  </div>
   <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Last Name</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border v-model="input5" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Email</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input type="email" class="w-full" icon-pack="feather" icon="icon-mail" icon-no-border v-model="input6" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Mobile</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input class="w-full" icon-pack="feather" icon="icon-smartphone" icon-no-border v-model="input7" />
    </div>
  </div>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/6 w-full">
      <span>Password</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full">
      <vs-input type="password" class="w-full" icon-pack="feather" icon="icon-lock" icon-no-border v-model="input8" />
    </div>
  </div>

        </div>
      <div class="vs-col w-1/2">
            <!-- <div class="flex">
        <vs-radio class="m-2" v-model="radios2" vs-value="primary">Male</vs-radio>   
     <vs-radio class="m-2" color="success" v-model="radios2" vs-value="primary">Female</vs-radio>
        </div> -->
         <div class="vx-row">
    <div class="vx-col  w-full">
         <h3 class="mb-base  regform"><feather-icon icon="LockIcon" color="red" size="40px" ></feather-icon>Permission</h3>
      <span>Gender</span>
    </div>
    <div class="vx-col sm:w-1/3 w-full">
      <vs-radio class="m-2" v-model="radios2" vs-value="primary">Male</vs-radio>   
     <vs-radio class="m-2" color="success" v-model="radios2" vs-value="primary">Female</vs-radio>
    </div>
  </div>
        </div>  
</vs-row>
<vs-row>
   
    <div class="vx-col w-1/8 ml-auto">
      <vs-button class="mr-3 ">Save</vs-button>
      <vs-button color="warning" type="border"  @click="input5 = input6 = input7 = input8 = ''; check2 = false;">Discard</vs-button>
  </div>
</vs-row>
 </vx-card>
 </div>
</template>

<script>
export default {

}
</script>

<style>

.regform{
  color: rgb(65, 65, 65);   
}
</style>