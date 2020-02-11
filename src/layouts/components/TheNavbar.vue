<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar
        class="vx-navbar navbar-custom"
        :color="navbarColor"
        :class="classObj"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <!-- Quick access buttons-->
        <div class="flex">
          <vx-tooltip
            title="New book"
            color="success"
            position="bottom"
            text="You can add new book from here"
          >
            <vs-button
              radius
              color="#2CA3F2"
              type="border"
              to="/book/create-book"
              icon="add"
              size="large"
            >
            </vs-button>
          </vx-tooltip>
          <!-- <span @click="alerting"><vs-icon icon-pack="feather"  size="30px" icon="archiveIcon"></vs-icon></span> -->
          <vs-button
            class="ml-2"
            color="success"
            type="border"
            size="medium"
            icon="vertical_align_bottom"
            >Return</vs-button
          >
          <vs-button
            class="ml-2"
            color="primary"
            type="border"
            size="medium"
            icon="vertical_align_top"
            >Borrow</vs-button
          >
        </div>

        <vs-spacer></vs-spacer>
        <h5 class="mr-3">english</h5>

        <!-- NOTIFICATIONS -->
        <!-- <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer ml-4">
        <feather-icon icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" :badge="unreadNotifications.length"></feather-icon>
        <vs-dropdown-menu class="notification-dropdown dropdown-custom vx-navbar-dropdown">

          <div class="notification-top text-center p-5 bg-primary text-white">
            <h3 class="text-white">{{ unreadNotifications.length }} New</h3>
            <p class="opacity-75">App Notifications</p>
          </div>

          <VuePerfectScrollbar ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0 mb-10" :settings="settings">
          <ul class="bordered-items">
            <li v-for="ntf in unreadNotifications" :key="ntf.index" class="flex justify-between px-4 py-4 notification cursor-pointer">
              <div class="flex items-start">
                <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
                <div class="mx-2">
                  <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>
                  <small>{{ ntf.msg }}</small>
                </div>
              </div>
              <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
            </li>
          </ul>
          </VuePerfectScrollbar>
                    <div class="
                        checkout-footer
                        fixed
                        bottom-0
                        rounded-b-lg
                        text-primary
                        w-full
                        p-2
                        font-semibold
                        text-center
                        border
                        border-b-0
                        border-l-0
                        border-r-0
                        border-solid
                        d-theme-border-grey-light
                        cursor-pointer">
                        <span>View All Notifications</span>
                    </div>
        </vs-dropdown-menu>
      </vs-dropdown> -->

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <small>Librarian</small>
          </div>
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            class="cursor-pointer"
          >
            <div class="con-img ml-3">
              <img
                v-if="activeUserImg.startsWith('http')"
                key="onlineImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
              <img
                v-else
                key="localImg"
                :src="
                  require(`@/assets/images/portrait/small/${activeUserImg}`)
                "
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                >
                  <feather-icon
                    icon="UserIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Profile</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                >
                  <feather-icon
                    icon="MailIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Inbox</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                >
                  <feather-icon
                    icon="CheckSquareIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Tasks</span>
                </li>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                >
                  <feather-icon
                    icon="MessageSquareIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Chat</span>
                </li>
                <vs-divider class="m-1"></vs-divider>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/pages/login')"
                >
                  <feather-icon
                    icon="LogOutIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VxAutoSuggest from "@/components/vx-auto-suggest/VxAutoSuggest.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import draggable from "vuedraggable";

export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: "",
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: "New Message",
          msg: "Are your going to meet me tonight?",
          icon: "ChevronsRightIcon",
          time: this.randomDate({ sec: 10 }),
          category: "primary"
        },
        {
          index: 1,
          title: "New Order Recieved",
          msg: "You got new order of goods.",
          icon: "ChevronsRightIcon",
          time: this.randomDate({ sec: 40 }),
          category: "primary"
        },
        {
          index: 2,
          title: "Server Limit Reached!",
          msg: "Server have 99% CPU usage.",
          icon: "ChevronsRightIcon",
          time: this.randomDate({ min: 1 }),
          category: "primary"
        },
        {
          index: 3,
          title: "New Mail From Peter",
          msg: "Cake sesame snaps cupcake",
          icon: "ChevronsRightIcon",
          time: this.randomDate({ min: 6 }),
          category: "primary"
        },
        {
          index: 4,
          title: "Bruce's Party",
          msg: "Chocolate cake oat cake tiramisu",
          icon: "ChevronsRightIcon",
          time: this.randomDate({ hr: 2 }),
          category: "primary"
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    };
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    }
  },
  computed: {
    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";
      else if (this.sidebarWidth == "reduced") return "navbar-reduced";
      else if (this.sidebarWidth) return "navbar-full";
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesLimited", list);
      }
    },
    starredPagesMore: {
      get() {
        return this.starredPages.slice(10);
      },
      set(list) {
        this.$store.dispatch("arrangeStarredPagesMore", list);
      }
    },

    // PROFILE
    user_displayName() {
      return "Arabkhonova Mokhina";
      // return JSON.parse(localStorage.getItem('userInfo')).displayName
    },
    activeUserImg() {
      return this.$store.state.AppActiveUser.img;
      // return JSON.parse(localStorage.getItem('userInfo')).photoURL || this.$store.state.AppActiveUser.img;
    }
  },
  methods: {
    alerting() {
      alert("sd");
    },
    showSidebar() {
      this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
    },
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch("updateStarredPage", {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? ` sec ago` : "just now");
      }

      return "Just Now";
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },
    // Method for creating dummy notification time
    randomDate({ hr, min, sec }) {
      let date = new Date();

      if (hr) date.setHours(date.getHours() - hr);
      if (min) date.setMinutes(date.getMinutes() - min);
      if (sec) date.setSeconds(date.getSeconds() - sec);

      return date;
    }
  },
  directives: {
    "click-outside": {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  },
  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
    draggable
  }
};
</script>
