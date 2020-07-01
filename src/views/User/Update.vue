<template>
  <div>
       <UpdateUser v-if="flag" :propsData="userData" />
  </div>
</template>

<script>
import Users from '../../services/Users'
import UpdateUser from '../../components/LMS/Users/CreateUser_1';
export default {
  props:['id'],
  data() {
    return  {
      flag: false,
      userData: {}
    }
  },
components: {
UpdateUser
},
methods: {
  getUser() {
    Users.get(this.id).then(res => {
      // console.log(res)
      this.userData = res
      this.flag = true
    }).catch(err => {
      console.log(err)
    })
  }
}, 
created() {
  this.getUser()
}
}
</script>

<style>

</style>