<template>
  <div>
    <template>
      <div>
        <vs-tabs color="rgb(32, 201, 192)">
          <vs-tab label="Book config">
            <!-- left -->
            <vs-tabs  color="primary">
              <vs-tab v-for="(item, i) in types" :key="i" :label="item.text">
                <vx-input-group class="mb-base w-full">
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

                <vs-list>
                  <vs-list-item
                    v-for="itemChild in item.lists"
                    :key="itemChild.id"
                    :title="itemChild.name">
                    <!-- <vs-button
                      radius
                      color="danger"
                      size="size"
                      @click="deleteItem(item.id, itemChild.id)"
                      type="border"
                      icon="delete_outline"
                    ></vs-button> -->
                     <vs-switch color="success" v-model="switch2" icon-pack="feather" vs-icon="icon-check" />
                  </vs-list-item>
                </vs-list>
              </vs-tab>
            </vs-tabs>
          </vs-tab>
          <vs-tab label="User config">
            <p>content is not available yet...</p>
          </vs-tab>
        </vs-tabs>
      </div>
    </template>
  </div>
</template>
<script>
import Categories from '@/services/Categories';
import Subjects from '@/services/Subjects';
import Authors from '@/services/Authors';

export default {
  data: () => ({
    types: [
      { id: 1, text: "Add category", value: "", lists: [] },
      { id: 2, text: "Add subject", value: "",lists: [] },
      { id: 3, text: "Add author", value: "", lists: [] },
      /* { text: "Add shelf", value: "", lists: [] } */
    ]
  }),
  methods: {
    getAll() {
      Promise.all([
        Categories.getAll(),
        Authors.getAll(),
        Subjects.getAll(),
      ]).then(result => {
        const [categories, authors, subjects] = result;
        this.types[0].lists = categories;
        this.types[1].lists = subjects;
        this.types[2].lists = authors;
      });
    },
    addlist(item) {
      switch(item.id) {
        case 1:
          Categories.create(item.value)
            .then(() => this.getAll())
            .catch(err => console.error(err))
            .finally(() => { item.value = "" });
          return;
        case 2:
          Subjects.create(item.value)
            .then(() => this.getAll())
            .catch(err => console.error(err))
            .finally(() => { item.value = "" });
          return;
        case 3:
          Authors.create(item.value)
          .then(() => this.getAll())
          .catch(err => console.error(err))
          .finally(() => { item.value = "" });
          return;
        default:
          return;
      }
    },
    deleteItem(id, itemId) {
      switch(id) {
        case 1:
          Categories.delete(itemId)
          .then(() => this.getAll())
          .catch(error => console.error(error))
          return;
        case 2:
          Subjects.delete(itemId)
          .then(() => this.getAll())
          .catch(error => console.error(error))
          return;
        case 3:
          Authors.delete(itemId)
          .then(() => this.getAll())
          .catch(error => console.error(error))
          return;
        default:
          return;
      }
    }
  },
  mounted() {
    this.getAll();
  },
};
</script>
