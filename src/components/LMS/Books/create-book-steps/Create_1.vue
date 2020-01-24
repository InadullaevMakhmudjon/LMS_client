<template>
    <div>
         <tab-content title="Step 1" class="mb-5">

          <!-- tab 1 content -->
          <div class="vx-row">
              <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="First Name" v-model="firstName" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input label="Last Name"  v-model="lastName" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-input type="email" label="Email"  v-model="email" class="w-full" />
              </div>
              <div class="vx-col md:w-1/2 w-full mt-5">
                  <vs-select v-model="city" class="w-full select-large" label="City">
                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in cityOptions" class="w-full" />
                  </vs-select>
              </div>
          </div>
      </tab-content>
    </div>
</template>
<script>
import {TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
    component:{
        TabContent
    }
}
</script>