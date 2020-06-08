<template>
  <div>
      <vs-row>
        <vs-col>
            <vs-image src="https://img2.freepng.ru/20180712/qvg/kisspng-student-university-and-college-admission-institute-medical-students-5b47ed72b04f14.8766271215314404987222.jpg"></vs-image>
        </vs-col>
        <vs-col>

        </vs-col>
      </vs-row>
  </div>
</template>

<script>
export default {
methods: {
    openLoadingBackground(type, color){
      this.$vs.loading({
          background: color,
          color:'rgb(255, 255, 255)',
          text: 'Please, use student Card to continue process',
          type: 'point',
          scale: 1.3
          })
      setTimeout( ()=> {
        this.$vs.loading.close()
      }, 3000);
    },
},
created() {
   this.openLoadingBackground('return', '#22c16b')
}
}
</script>

<style>

</style>