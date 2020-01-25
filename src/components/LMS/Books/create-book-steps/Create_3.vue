<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full">
      <vs-input label="Event Name" v-model="eventName" class="w-full mt-5" />
    </div>
    <div class="vx-col md:w-1/2 w-full">
      <vs-select
        v-model="country"
        class="w-full select-large mt-5"
        label="Event Location"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in cityOptions"
          class="w-full"
        />
      </vs-select>
    </div>
    <div class="vx-col md:w-1/2 w-full mt-5">
      <vs-select
        v-model="statue"
        class="w-full select-large"
        label="Event Status"
      >
        <vs-select-item
          :key="index"
          :value="item.value"
          :text="item.text"
          v-for="(item, index) in statusOptions"
          class="w-full"
        />
      </vs-select>
    </div>
    <div class="vx-col md:w-1/2 w-full md:mt-8">
      <div class="demo-alignment">
        <span>Requirements:</span>
        <div class="flex">
          <vs-checkbox>Staffing</vs-checkbox>
          <vs-checkbox>Catering</vs-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style></style>
