<template>
  <div>
    <vs-col
      v-for="(item, i) in types"
      :key="i"
      vs-type="flex"
      vs-justify="center"
      vs-w="4"
    >
      <vx-card>
        <p>{{ item.text }}</p>
        <vx-input-group class="mb-base">
          <vs-input
          autofocus
          type="text"
            v-model="item.value"
            @keyup.enter="addlist(item.value, item.lists)"
          />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button
                color="primary"
                type="border"
                @click="addlist(item.value, item.lists)"
                icon-pack="feather"
                icon="icon-plus"
                >add</vs-button
              >
            </div>
          </template>
        </vx-input-group>
        <template class="justify-between" lang="html">
          <vx-list :list="item.lists" icon="BookmarkIcon"></vx-list>
        </template>
      </vx-card>
    </vs-col>
  </div>
</template>
<script>
export default {
  data: () => ({
    types: [
      { text: "Add category", value: "", lists: [] },
      { text: "Add subject", value: "", lists: [] },
      { text: "Add author", value: "", lists: [] }
    ]
  }),
  methods: {
    addlist(val, arr, placehold) {
      if (val !== "") {
        arr.push(val);
        console.log(val);
      
      } else {
        //handler
      }
    }
  }
};
</script>
