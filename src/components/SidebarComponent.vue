<template>
  <div class="container">
    <div class="container-sidebar">
      <div v-if="isHomePage" class="container-sidebar-header">
        <img src="../assets/icons/rectangle.png" />
        <div class="container-sidebar-header-wrapper">
          <img class="container-sidebar-header-wrapper-icon" src="../assets/icons/users.png" />
          <div class="container-sidebar-header-wrapper-text">Users</div>
        </div>
      </div>
      <div v-else style="width: 100%">
        <div class="sidebar-profile">
          <img class="sidebar-profile-icon" :src="getUser().userImage" />
          <div>
            <div class="sidebar-profile-name">{{ getUser().user.name }}</div>
            <div class="sidebar-profile-email">{{ getUser().user.email }}</div>
          </div>
        </div>
        <div class="sidebar-menu">
          <div :class="activeTab === 'todos' ? 'sidebar-item active-tab' : 'sidebar-item'">
            <img v-if="activeTab === 'todos'" src="../assets/icons/rectangle.png" />
            <div class="sidebar-item-body" @click="routePage(`todo/${getUser().user.id}`)">
              <img class="sidebar-item-body-image" width="20" height="20" src="../assets/icons/checkup-list.png" />
              <div class="sidebar-item-body-text">Todos</div>
            </div>
          </div>
          <div :class="activeTab === 'posts' ? 'sidebar-item active-tab' : 'sidebar-item'">
            <img v-if="activeTab === 'posts'" src="../assets/icons/rectangle.png" />
            <div class="sidebar-item-body" @click="routePage('posts')">
              <img class="sidebar-item-body-image" width="15" height="15" src="../assets/icons/posts.png" />
              <div class="sidebar-item-body-text">Posts</div>
            </div>
          </div>
          <div :class="activeTab === 'albums' ? 'sidebar-item active-tab' : 'sidebar-item'">
            <img v-if="activeTab === 'albums'" src="../assets/icons/rectangle.png" />
            <div class="sidebar-item-body" @click="routePage('albums')">
              <img class="sidebar-item-body-image" width="18" height="18" src="../assets/icons/photo-heart.png" />
              <div class="sidebar-item-body-text">Albums</div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar-footer">
        <img class="sidebar-footer-icon" src="../assets/icons/logo.png" />
        <div class="sidebar-footer-text">N2Mobile</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SidebarComponent",
  data() {
    return {
      userList: {},
    };
  },
  props: {
    isHomePage: {
      type: Boolean,
      default: false,
    },
    activeTab: {
      type: String,
      default: "",
    },
  },
  methods: {
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
    routePage(tabName) {
      if (this.$router.currentRoute.path !== `/${tabName}`) {
        if (tabName === `todo/${this.getUser().user.id}`) {
          this.$router.addRoute({
            name: "TodosPage",
            path: "/todo",
          });
          this.$router.push({
            name: "TodosPage",
            params: { userId: this.getUser().user.id },
          });
        } else {
          this.$router.push(`/${tabName}`);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  &-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #f5f5f5;
    border: 1px solid #d8d9dd;
    align-items: center;
    width: 250px;

    &-header {
      display: flex;
      align-items: center;
      background: white;
      width: 100%;
      margin-top: 35px;

      &-wrapper {
        display: flex;
        margin-left: 40px;
        align-items: center;

        &-icon {
          margin-right: 10px;
        }

        &-text {
          color: #4f359b;
          font-family: Poppins;
          font-size: 18px;
          font-weight: 400;
        }
      }
    }
  }
}

.sidebar-profile {
  display: flex;
  align-items: center;
  margin-top: 20px;
  border-bottom: 1px solid #d8d9dd;

  &-icon {
    width: 60px;
    margin: 10px;
  }

  &-name {
    color: #26303e;
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &-email {
    color: #5c6672;
    font-family: Josefin Sans;
    width: 150px;
    font-size: 14px;
    font-weight: 300;
    text-decoration: underline;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.sidebar-menu {
  margin-bottom: 470px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 35px;

  &-body {
    display: flex;
    margin-left: 40px;
    align-items: center;
    cursor: pointer;

    &-text {
      color: #4f359b;
      font-family: Poppins;
      font-size: 18px;
      font-weight: 400;
    }

    &-image {
      margin-right: 10px;
    }
  }
}

.active-tab {
  background-color: #ffffff;
}

.sidebar-footer {
  display: flex;
  border-top: 1px solid #d8d9dd;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;

  &-icon {
    margin-right: 5px;
  }

  &-text {
    color: #485b69;
    font-family: Poppins;
    font-size: 22px;
    font-weight: 700;
  }
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #d8d9dd;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #d8d9ddb6;
}
</style>
