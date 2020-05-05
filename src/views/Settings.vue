<template>
  <div>
    <template>
      <div>
        <!-- left -->
        <vs-tabs color="primary">
          <vs-tab v-for="(item, i) in types" :key="i" :label="item.text">
            <vs-table :data="item.lists" pagination max-items="15" search>
               <template slot="header">
                  <vx-input-group class="w-10/12 flex-shrink pr-1">
                      <vs-input
                      v-if="$hasPermission(11)"
                        type="text"
                        v-model="item.value"
                        @keyup.enter="addlist(item)"
                      />
                      <template slot="append">
                        <div class="append-text btn-addon">
                          <vs-button
                          v-if="$hasPermission(11)"
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
                </template>
              <template slot="thead">
                <vs-th sort-key="id">
                  Order
                </vs-th>
                <vs-th sort-key="name">
                  Name
                </vs-th>
                <vs-th sort-key="id">
                  Published Date
                </vs-th>
                <vs-th sort-key="id">
                  Modified Date
                </vs-th>
                <vs-th sort-key="editing">
                  Edit
                </vs-th>
                <vs-th sort-key="id">
                  Delete
                </vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    {{ indextr + 1 }}
                  </vs-td>
                  <vs-td :data="tr.name">
                    {{ tr.name }}
                  </vs-td>

                  <vs-td :data="tr.id">
                    {{ tr.createdAt.split("T")[0] }}
                  </vs-td>
                  <vs-td :data="tr.id">
                    {{ tr.updatedAt.split("T")[0] }}
                  </vs-td>
                  <vs-td :data="tr.id">
                    <vs-button
                    v-if="$hasPermission(12)"
                      type="filled"
                      @click="editName(item.id, tr.id, tr)"
                      color="primary"
                      icon="edit"
                      radius
                    ></vs-button>
                  </vs-td>
                  <vs-td :data="tr.id">
                    <vx-tooltip
                      v-if="item.id == 4"
                      :color="tr.bookItems.length > 0 ? 'danger' : ''"
                      position="right"
                      :title="
                        tr.bookItems.length > 0
                          ? 'Cannot be Deleted'
                          : 'Click to delete'
                      "
                      :text="
                        tr.bookItems.length > 0
                          ? 'This item has already been assigned to a book so that it cannot be deleted'
                          : 'No book item is assigned'"
                    >
                      <vs-button
                        :disabled="tr.bookItems.length > 0"
                        radius
                        color="danger"
                        size="medium"
                        @click="deleteItem(item.id, tr.id, tr)"
                        type="filled"
                        icon="delete_outline"
                      ></vs-button>
                    </vx-tooltip>
                    <vx-tooltip
                      v-else
                      :color="tr.books.length > 0 ? 'danger' : ''"
                      position="right"
                      :title="
                        tr.books.length > 0
                          ? 'Cannot be Deleted'
                          : 'Click to delete'
                      "
                      :text="
                        tr.books.length > 0
                          ? 'This item has already been assigned to a book so that it cannot be deleted'
                          : 'No book item is assigned'
                      "
                    >
                      <vs-button
                        v-if="$hasPermission(13)"
                        :disabled="tr.books.length > 0"
                        radius
                        color="danger"
                        size="medium"
                        @click="deleteItem(item.id, tr.id, tr)"
                        type="filled"
                        icon="delete_outline"
                      ></vs-button>
                    </vx-tooltip>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </vs-tab>
        </vs-tabs>
      </div>
    </template>
    <vs-popup title="Update Content" :active.sync="toggle">
      <div class="vx-row justify-center justify-between p-4">
        <vs-input class="w-1/2" icon="edit" v-model="data.name"></vs-input>
        <vs-button class="w-1/3" v-model="data.id" @click="updateData(data)"
          >Save changes</vs-button
        >
      </div>
    </vs-popup>
  </div>
</template>
<script>
import Categories from "@/services/Categories";
import Subjects from "@/services/Subjects";
import Authors from "@/services/Authors";
import Shelves from "@/services/Shelves";
import Language from '@/services/Languages';

export default {
  data: () => ({
    toggle: false,
    data: {
      name: "",
      id: ""
    },
    types: [
      { id: 1, text: "Add category", value: "", lists: [] },
      { id: 2, text: "Add subject", value: "", lists: [] },
      { id: 3, text: "Add author", value: "", lists: [] },
      { id: 4, text: "Add shelf", value: "", lists: [] },
      { id: 5, text: "Add Language", value: "", lists: [] }
      /* { text: "Add shelf", value: "", lists: [] } */
    ]
  }),
  methods: {
    getAll() {
      Promise.all([
        Categories.getAll(),
        Authors.getAll(),
        Subjects.getAll(),
        Shelves.getAll(),
        Language.getAll()
      ]).then(result => {
        const [categories, authors, subjects, shelves, languages] = result;
        this.types[0].lists = categories;
        this.types[1].lists = subjects;
        this.types[2].lists = authors;
        this.types[3].lists = shelves;
         this.types[4].lists = languages;
         console.log(this.types[4].lists)
      });
    },
    notify(val, type, action) {
      this.$vs.notify({
        title: val,
        text: `${type} has been ${action} successfully`,
        color: "success",
        icon: "verified_user"
      });
    },
    addlist(item) {
      console.log(item)
      switch (item.id) {
        case 1:
          Categories.create(item.value)
            .then(() => {
              this.getAll();
              this.notify(item.value, "Category", "created");
            })
            .catch(err => console.error(err))
            .finally(() => {
              item.value = "";
            });
          return;
        case 2:
          Subjects.create(item.value)
            .then(() => {
              this.getAll();
              this.notify(item.value, "Subject", "created");
            })
            .catch(err => console.error(err))
            .finally(() => {
              item.value = "";
            });
          return;
        case 3:
          Authors.create(item.value)
            .then(() => {
              this.getAll();
              this.notify(item.value, "Author", "created");
            })
            .catch(err => console.error(err))
            .finally(() => {
              item.value = "";
            });
          return;
        case 4:
          Shelves.create(item.value)
            .then(() => {
              this.getAll();
              this.notify(item.value, "Shelf", "created");
            })
            .catch(err => console.error(err))
            .finally(() => {
              item.value = "";
            });
            return;
        case 5:
          Language.create(item.value)
            .then(() => {
              this.getAll();
              this.notify(item.value, "Language", "created");
            })
            .catch(err => console.error(err))
            .finally(() => {
              item.value = "";
            });
            return;
        default:
          return;
      }
    },
    deleteItem(id, itemId, tr) {
      console.log(tr)
    //  console.log(tr);
      switch (id) {
        case 1:
          Categories.delete(itemId)
            .then(() => {
              this.notify(tr.name, "Category", "deleted")
              this.getAll()
              })
            .catch(error => {
              console.error(error);
            });
          return;
        case 2:
          Subjects.delete(itemId)
            .then(() => {
              this.notify(tr.name, "Subject", "deleted")
              this.getAll()
              })
            .catch(error => console.error(error));
          return;
        case 3:
          Authors.delete(itemId)
            .then(() => {
              this.notify(tr.name, "Author", "deleted")
              this.getAll()
              })
            .catch(error => console.error(error));
          return;
        case 4:
          Shelves.delete(itemId)
            .then(() => {
              this.notify(tr.name, "Shelf", "deleted")
              this.getAll()
              })
            .catch(error => console.error(error));
          return;
            case 5:
          Language.delete(itemId)
            .then(() => {
              this.notify(tr.name, "Language", "deleted")
              this.getAll()
              })
            .catch(error => console.error(error));
          return;
        default:
          return;
      }
    },
    editName(chosen, trId, obj) {
      this.toggle = true;
      this.data = { ...obj, criteria: chosen };
    },
    updateData(obj) {
      //category handle query
      switch (obj.criteria) {
        case 1:
          Categories.update(obj.id, obj.name)
            .then(() => {
              this.getAll();
              this.toggle = false;
              this.notify(obj.name, "Category", "updated");
            })
            .catch(err => console.error(err));
          return;
        case 2:
          Subjects.update(obj.id, obj.name).then(() => {
            this.getAll();
            this.toggle = false;
            this.notify(obj.name, "Subjects", "updated");
          });
          return;
        case 3:
          Authors.update(obj.id, obj.name).then(() => {
            this.getAll();
            this.toggle = false;
            this.notify(obj.name, "Authors", "updated");
          });
        case 4:
          Shelves.update(obj.id, obj.name).then(() => {
            this.getAll();
            this.toggle = false;
            this.notify(obj.name, "Shelf", "updated");
          });
          return;
      }
    }
  },
  mounted() {
    this.getAll();
  }
};
</script>
