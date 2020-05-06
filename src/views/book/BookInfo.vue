<template>
  <div>
    <vx-card>
      <vs-row>
          <vs-button type="flat"  size="small" icon="keyboard_arrow_left" class="mr-2" @click="backHistory">
            back
        </vs-button>
        <vs-button  v-if="$hasPermission(7)" color="primary" class="mr-4" type="filled" icon="add"
          >Add</vs-button
        >
        <vs-button  v-if="$hasPermission(5)" color="primary" type="filled"  icon="edit"  :to="'/book/update-book/'+bookInfo.id">Edit</vs-button>
      </vs-row>

      <vs-row class="justify-between">
        <!--book definition-->
        <vs-col
          v-if="bookInfo.title"
          vs-offset="0"
          vs-type="flex"
          vs-justify="start"
          vs-align="center"
          vs-w="7"
        >
          <vx-card no-shadow>
            <vs-col vs-type="flex" vs-justify="start" class="" vs-w="12">
              <div>
                <img class="cover" :src="bookInfo.image" />
              </div>
              <div class="mx-3">
                <vs-list>
                  <h6 class="item-name text-2xl font-semibold mb-1">
                    {{ bookInfo.title }}
                  </h6>
                  <p class="text-lg mb-2 cursor-pointer">
                    by <span class="text-primary ">{{ bookInfo.authors }}</span>
                  </p>
                  <p class=" text-lg mb-2">
                    {{ `ISBN: ${bookInfo.ISBNCode}` }}
                  </p>
                  <p class=" text-lg mb-2">
                    {{ `Published Year: ${bookInfo.publishedYear}` }}
                  </p>
                    <p class=" text-lg mb-2">
                    {{ `Category: ${bookInfo.category.name}` }}
                  </p>
                  <p class=" text-lg mb-2">
                    {{ `Language: ${bookInfo.language}` }}
                  </p>
                  <p class=" text-lg mb-2">
                    {{ `Duration: ${bookInfo.duration} days` }}
                  </p>
                  <p class=" text-lg mb-2">
                    {{ `Available:  0 / 0` }}
                  </p>
                  <div class="book-card__status inline-flex mb-2">
                    <span class="py-1 mr-1"
                      >{{
                        bookInfo.isBorrowable ? "Borrowable" : "Not Borrowable"
                      }}
                    </span>
                    <feather-icon icon="CheckSquareIcon" />
                  </div>

                  <p class="text-lg mb-2 text-grey" v-if="bookInfo.user">
                    {{bookInfo.user.firstName+' '+bookInfo.user.lastName}}
                  </p>
                  <p class="font-medium yellow text-1xl text-grey mt-4">
                    Book Location: 23A
                  </p>
                </vs-list>
              </div>
            </vs-col>
            <vs-col>
              <vx-card card-border no-shadow class="mt-2">
                  <p class="font-medium text-1xl text-black ">
                    {{bookInfo.description ? bookInfo.description : 'not available...'}}
                  </p>
              </vx-card>
            </vs-col>
          </vx-card>
        </vs-col>
        <!--book statistics-->
        <vs-col vs-type="flex" vs-align="center" vs-w="5">
          <vx-card class="elevation1" title="Browser Statistics">
            <div
              v-for="(browser, index) in 4"
              :key="browser.id"
              :class="{ 'mt-4': index }"
            >
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <span class="mb-1">null</span>
                  <h4>{{ persentaging }}%</h4>
                </div>
                <div class="flex flex-col text-right">
                  <span class="flex -mr-1">
                    <span class="mr-1">null</span>
                    <!-- <feather-icon :icon=" browser.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[browser.comparedResult < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon> -->
                  </span>
                  <span class="text-grey">null</span>
                </div>
              </div>
              <vs-progress :percent="persentaging"></vs-progress>
            </div>
          </vx-card>
        </vs-col>
      </vs-row>
      <vs-row class="mt-5">
        <vs-col vs-w="12">
          <vs-tabs class="mt-5">
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
                      <vs-td>
                        {{ indextr + 1 }}
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
                        <vs-icon
                          class="cursor"
                          icon="edit"
                          size="medium"
                          color="primary"
                        ></vs-icon>
                      </vs-td>
                      <vs-td
                        v-if="data[indextr].action"
                        :data="data[indextr].id"
                      >
                        <span
                          ><vs-icon
                            class="cursor"
                            size="medium"
                            icon="archive"
                            color="#99d6ff"
                          ></vs-icon
                        ></span>
                      </vs-td>
                      <vs-td v-else :data="data[indextr].id">
                        <span @click="doArchive(data)"
                          ><vs-icon
                            class="cursor"
                            size="medium"
                            icon="archive"
                            color="primary"
                          ></vs-icon
                        ></span>
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
        </vs-col>
      </vs-row>
    </vx-card>
  </div>
</template>

<script>
import Books from "@/services/Books";
export default {
  props: ["id"],
  data() {
    return {
      selected: "",
      persentaging: Math.floor(Math.random() * 100),
      bookInfo: [],
      users: [
        {
          id: 1,
          code: "234343",
          title: "The Fundomental of Calculus",
          status: "borrowed",
          edit: "hildegard.org",
          action: true
        }
      ]
    };
  },
  methods: {
    backHistory(){
 window.history.back();
    },

    doArchive(val) {
      alert("dsfsa");
      console.log(val);
    },
    getBook(id) {
      Books.getOnebook(id).then(book => {
        console.log(book)
        this.bookInfo = book;
        this.bookInfo.language = book.language.name;
        this.bookInfo.authors = book.authors.map(({ name }) => name).join(", ");
      });
    }
  },
  mounted() {
    this.getBook(this.id);
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
.cursor {
  cursor: pointer;
}
.book-card__status {
  background: rgb(104, 190, 54);
  color: white;
  width: 150px;
  padding: 1%;
  padding-left: 3%;
  margin-bottom: 2px;
  border-radius: 5px;
}
</style>
