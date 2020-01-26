<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
    <footer class="the-footer flex-wrap justify-between" :class="classes">
        <span>COPYRIGHT @ {{ new Date().getFullYear() }} <a href="https://inha.uz" target="_blank" rel="nofollow">Inha.uz</a>, Inha university in Tashkent</span>
        <span class="md:flex hidden items-center">
           <a href="http://itsolutions.uz/" target="_blank" rel="nofollow">
            <feather-icon icon="BarChart2Icon" svgClasses="stroke-current text-primary w-6 h-6" class="" />
           IT solutions</a>
           
        </span>
    </footer>
</template>

<script>
export default {
    name: "the-footer",
    props: {
        classes: {
            type: String,
        },
    },
}
</script>
