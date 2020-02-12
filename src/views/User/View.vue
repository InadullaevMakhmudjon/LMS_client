<template>
  <div>
    <vx-card>
      <vs-row>
        <vs-col vs-type="flex" vs-justify="start" vs-align="center" vs-w="6">
          <div class="flex">
            <img
              class="image__"
              src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
              alt=""
              srcset=""
            />
          </div>
          <div class="flex">
            <vs-list>
              <vs-list-header
                icon="supervisor_account"
                title="User information"
              ></vs-list-header>
              <vs-list-item
                icon="person_pin"
                title="Full name"
                subtitle="Inna Qualenlta Delavrio"
              ></vs-list-item>
              <vs-list-item
                icon="phone"
                title="Phone number"
                subtitle="+998998005598"
              ></vs-list-item>

              <vs-list-item
                icon="email"
                title="Email address"
                subtitle="s.arabkanova2@staff.inha.uz"
              ></vs-list-item>
              <vs-list-item
                icon="verified_user"
                title="Status"
                subtitle="active"
              ></vs-list-item>
            </vs-list>
          </div>
        </vs-col>

        <vs-col vs-type="flex" vs-justify="start" vs-align="start" vs-w="6">
          <vs-row vs-justify="start">
           
          </vs-row>
        </vs-col>
        <vs-row>
          <div class="flex text-center">
            <vs-button class="m-1" icon="edit" color="primary" type="filled"
              >Edit</vs-button
            >
            <vs-button class="m-1" icon="delete" color="danger" type="border"
              >Delete</vs-button
            >
          </div>
        </vs-row>
      </vs-row>
    </vx-card>
    <vx-card class="mt-5">
      <div class="flex ">
    <feather-icon class="px-3" icon="LockIcon" svgClasses="h-7 w-7" />
    <h3>Permissions</h3>
    </div>
        <vs-divider></vs-divider>
        <vs-row>
            <vx-col>

            </vx-col>
        </vs-row>
    </vx-card>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      datalist: [{ text: "" }]
    };
  }
};
</script>

<style>
.image__ {
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
