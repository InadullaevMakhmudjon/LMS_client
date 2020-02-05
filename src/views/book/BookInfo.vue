<template>
  <div>
    <vx-card>
      <vs-row>
        <vs-button color="primary" class="mr-4" type="filled"
          >Add book item</vs-button
        >
        <vs-button color="primary" type="filled">Edit</vs-button>
      </vs-row>

      <vs-row class="justify-between">
        <!--book definition-->
        <vs-col vs-type="flex" vs-justify="start" vs-align="center" vs-w="6">
          <vx-card no-shadow>
            <vs-row>
              <vs-col
                vs-type="flex"
                vs-justify="center"
                vs-align="center"
                vs-w="4"
              >
                <img
                  class="cover"
                  src="https://cdn10.bigcommerce.com/s-g9n04qy/products/60099/images/60293/61cibLPhI8L._SL1200___17104.1430064174.500.500.jpg?c=2"
                />
              </vs-col>
              <vs-col vs-justify="start" vs-align="center" vs-w="6">
                <vs-list class="ml-3">
                  <vs-list-header
                    title="Detailed Charactertics"
                  ></vs-list-header>
                  <vs-list-item
                    title="One text"
                    v-for="i in 7"
                    :key="i"
                  ></vs-list-item>
                </vs-list>
              </vs-col>
            </vs-row>
          </vx-card>
        </vs-col>
        <!--book statistics-->
        <vs-col vs-type="flex"  vs-align="center" vs-w="5">
          <vx-card class="elevation1" title="Browser Statistics">
            <div
              v-for="(browser, index) in 4"
              :key="browser.id"
              :class="{ 'mt-4': index }"
            >
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <span class="mb-1">hello world</span>
                  <h4>{{ persentaging }}%</h4>
                </div>
                <div class="flex flex-col text-right">
                  <span class="flex -mr-1">
                    <span class="mr-1">don't</span>
                    <!-- <feather-icon :icon=" browser.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[browser.comparedResult < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon> -->
                  </span>
                  <span class="text-grey">22:30</span>
                </div>
              </div>
              <vs-progress :percent="persentaging"></vs-progress>
            </div>
          </vx-card>
        </vs-col>
      </vs-row>
      <vs-tabs>
        <vs-tab label="Books">
          <div>
            <vs-table
              max-items="10"
              pagination
              :data="users"
              maxHeight="600px"
              search
            >
              <template slot="thead">
                  <vs-th>
                  Order
                </vs-th>
                <vs-th>
                  Code
                </vs-th>
                <vs-th>
                  Title
                </vs-th>
                <vs-th>
                  Status
                </vs-th>
                <vs-th>
                 Edit
                </vs-th>
                <vs-th>
                 Archive
                </vs-th>
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                     <vs-td >
                    {{indextr+1}}
                  </vs-td>
                  <vs-td :data="data[indextr].code">
                    {{ data[indextr].code }}
                  </vs-td>

                  <vs-td :data="data[indextr].title">
                    {{ data[indextr].title }}
                  </vs-td>

                  <vs-td :data="data[indextr].status">
                    {{ data[indextr].status }}
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    <vs-icon class="cursor" icon="edit" size="medium" color="primary"></vs-icon>
                  </vs-td>
                  <vs-td v-if="data[indextr].action" :data="data[indextr].id" >
                    <span><vs-icon class="cursor" size="medium" icon="archive" color="#99d6ff"></vs-icon></span>
                  </vs-td>
                  <vs-td v-else :data="data[indextr].id" >
                    <span @click="doArchive(data)"><vs-icon class="cursor" size="medium" icon="archive" color="primary"></vs-icon></span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab label="Borrowed books">
          <div></div>
        </vs-tab>
      </vs-tabs>
    </vx-card>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selected: "",
      persentaging: Math.floor(Math.random() * 100),
      users: [
        {
          id: 1,
          code: "234343",
          title: "The Fundomental of Calculus",
          status: "borrowed",
          edit: "hildegard.org",
          action: true
        },
         {
          id: 2,
          code: "2344433",
          title: "The Fundomental of Calculus",
          status: "borrowed",
          edit: "hildegard.org",
          action: true
        },
         {
          id: 3,
          code: "2344478",
          title: "The Fundomental of Calculus",
          status: "lost",
          edit: "hildegard.org",
          action: false
        }
      ]
    };
  },
  methods:{
      doArchive(val) {
          alert('dsfsa')
          console.log(val)
      }
  }
};
</script>

<style scoped>
.elevation1 {
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none !important;
}
.cover {
  max-width: 270px;
  max-height: 420px;
}
.cursor{
    cursor: pointer;
}
</style>
