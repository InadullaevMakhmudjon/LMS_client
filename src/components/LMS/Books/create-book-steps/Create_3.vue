<template>
  <div class="vx-row">
    <vs-row vs-w="12">
      <vx-card class="pb-5">
        <div class="m-5">
          <vs-col
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-lg="2"
            vs-sm="4"
            vs-xs="12"
          >
            <div class="con-example-images">
              <img
                src="https://dynamic.indigoimages.ca/books/1285740629.jpg?altimages=false&scaleup=true&width=614&maxheight=614&quality=85&lang=en"
              />
            </div>
          </vs-col>

          <vs-col
            class="pl-5 ml-5"
            vs-type="flex"
            vs-align="center"
            vs-lg="6"
            vs-sm="4"
            vs-xs="12"
          >
            <vs-list color="red">
              <vs-list-header
                icon="chrome_reader_mode"
                title="Gathered Book Info"
              ></vs-list-header>
              <vs-list-item
                v-for="item in bookObj"
                :key="item.text"
                icon="check"
                :title="item.text"
                :subtitle="item.value"
              ></vs-list-item>
            </vs-list>
          </vs-col>
        </div>
      </vx-card>
    </vs-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    bookObj: [
      // "The foundation of Calculus",
      // "James Stewart",
      // "English",
      // "Mathematics",
      // "23232-4323434-233-34",
      // "Freshman",
      // "121",
      // "Aliev Azam",
      // "A4, A4",
      // "23 days"
      { text: "Book title", value: "The foundation of Calculus" },
      { text: "Book Author", value: "James Stewart" },
      { text: "Language", value: "English" },
      { text: "Category", value: "Mathematics" },
      { text: "ISBN", value: "23232-4323434-233-34" },
      { text: "School Year", value: "Freshman" },
      { text: "Item Quantity", value: "121" },
      { text: "Responsible Person", value: "Aliev Azam" },
      { text: "Book Location", value: "A2, A4" },
      { text: "Borrowing Period", value: "23 days" }
    ]
  })
};
</script>

<style>
.con-example-images img {
  max-height: 500px;
  max-width: 300px;
}
</style>
