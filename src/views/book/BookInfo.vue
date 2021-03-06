<template>
  <div>
    <vx-card>
      <vs-row>
          <vs-button type="flat"  size="small" icon="keyboard_arrow_left" class="mr-2" @click="backHistory">
            back
        </vs-button>
        <vs-button :to="`/book/add-book-item/${bookInfo.id}`"  v-if="$hasPermission(7)" color="primary" class="mr-4" type="filled" icon="add"
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
                  <div :class="`${bookInfo.isBorrowable ? 'book-card__status':'book-card__status_false'} inline-flex mb-2`">
                    <span class="py-1 mr-1"
                      >{{
                        bookInfo.isBorrowable ? "Borrowable" : "Not Borrowable"
                      }}
                    </span>
                    <feather-icon :icon="bookInfo.isBorrowable ? 'CheckSquareIcon' : ''" />
                  </div>

                  <p class="text-lg mb-2 text-grey" v-if="bookInfo.user">
                    {{bookInfo.user.firstName+' '+bookInfo.user.lastName}}
                  </p>
                  <!-- <p class="font-medium yellow text-1xl text-grey mt-4">
                    Book shelf: {{}}
                  </p> -->
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
          <vx-card class="elevation1" title="Statistics">
            <div
              v-for="(browser, index) in stats.numbers"
              :key="browser.id"
              :class="{ 'mt-4': index }"
            >
              <div class="flex justify-between">
                <div class="flex flex-col">
                  <span class="mb-1">{{browser.name}}</span>
                  <h4>{{ browser.value }}</h4>
                </div>
              </div>
              <vs-progress :percent="persentaging(browser.value)"></vs-progress>
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
                v-if="bookItems.length > 0"
                  max-items="10"
                  pagination
                  :data="bookItems"
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
                      Added by
                    </vs-th>
                     <vs-th>
                      Shelf
                    </vs-th>
                    <vs-th>
                      Status
                    </vs-th>
                  </template>

                  <template slot-scope="{ data }">
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                      <vs-td>
                        {{ indextr + 1 }}
                      </vs-td>
                      <vs-td :data="data[indextr].code">
                        {{ data[indextr].rfidTag }}
                      </vs-td>
                      <vs-td :data="data[indextr].code">
                        {{ data[indextr].user.firstName + ' ' +data[indextr].user.lastName}}
                      </vs-td>
                      <vs-td :data="data[indextr].status">
                        {{ data[indextr].shelf.name }}
                      </vs-td>
                      <vs-td :data="data[indextr].status">
                        <vs-chip :color="getStatus(data[indextr].bookStatusId).color">
                           {{ getStatus(data[indextr].bookStatusId).text }}
                        </vs-chip>
                      </vs-td>

                      <vs-td v-if="false" :data="data[indextr].id">
                        <vs-icon
                          class="cursor"
                          icon="edit"
                          size="medium"
                          color="primary"
                        ></vs-icon>
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
      bookInfo: [],
      bookItems: [],
      tempStatus: '',
      stats: {}
    };
  },
  methods: {
    getStatus(id) {
      if(id == 1) return {text: 'Available' , color: 'success'}
      if(id == 2) return {text: 'Borrowed' , color: 'primary'}
      if(id == 3) return {text: 'Lost' , color: 'danger'}
      if(id == 4) return {text: 'Damaged' , color: 'warning'}
    },
    persentaging(value) {
      return (value*100)/this.stats.numbers[0].value
    },
    backHistory(){
      window.history.back();
    },

    getBook(id) {
      Books.getOnebook(id).then(book => {
        console.log(book)
        this.bookItems = book.book.bookItems
        this.bookInfo = book.book;
        this.bookInfo.language = book.book.language.name;
        this.bookInfo.authors = book.book.authors.map(({ name }) => name).join(", ");
      });
    },
    getStats(id) {
      Books.statistics(id).then(res => {
        this.stats = res
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created() {
    this.getStats(this.id)
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
.book-card__status_false {
  background: rgb(190, 72, 25);
  color: white;
  width: 150px;
  padding: 1%;
  padding-left: 3%;
  margin-bottom: 2px;
  border-radius: 5px;
}

</style>
