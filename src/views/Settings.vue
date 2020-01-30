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
            type="text"
            v-model="item.value"
            @keyup.enter="addlist(item)"
          />
          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button
                color="primary"
                type="border"
                @click="addlist(item)"
                icon-pack="feather"
                icon="icon-plus"
                >add</vs-button
              >
            </div>
          </template>
        </vx-input-group>
        <!-- <template class="justify-between" lang="html">
          <vx-list :list="item.lists" icon="BookmarkIcon"></vx-list>
        </template> -->
          <vs-list >
     <vs-list-item v-for="(n,i) in item.lists" :key="i"  :title="n">
      <vs-button radius color="danger" size="size" @click="deleteShelf()" type="border" icon="delete_outline"></vs-button>
    </vs-list-item>
  </vs-list>
      </vx-card>
    </vs-col>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data: () => ({
    types: [
      { text: "Add category", value: "", lists: ['Computer','ID'] },
      { text: "Add subject", value: "",lists: [] },
       { text: "Add author", value: "", lists: [] },
      { text: "Add shelf", value: "", lists: [] }
    ]
  }),
  methods: {
    addlist(item) {
      if (item.value !== "") {
          item.lists.unshift(item.value);
      } else {
        //handler return
      }
      item.value = "";
    }
  }
};
</script>
