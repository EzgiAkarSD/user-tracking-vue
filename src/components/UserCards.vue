<template>
  <div class="user-cards">
    <div
      v-for="user in userList"
      :key="user.id"
      @click="navigateToPage(user, getUserImage(user.id))"
    >
      <div class="card">
        <div class="card-body">
          <div class="card-body-header">
            <img class="card-body-header-image" :src="getUserImage(user.id)" />
            <div class="card-body-header-profile">
              <div class="card-body-header-profile-name">{{ user.name }}</div>
              <div class="card-body-header-profile-text">{{ user.email }}</div>
              <div class="card-body-header-profile-text">{{ user.phone }}</div>
            </div>
          </div>
          <div class="card-body-center">
            <div class="card-body-center-data">
              <img
                class="card-body-center-data-icon"
                src="../assets/icons/pin-heart.png"
              />
              <div class="card-body-center-data-text">Location</div>
            </div>
            <div class="card-body-center-data-text">
              {{ user.address.suite }}
            </div>
            <div class="card-body-center-data-text">
              {{ user.address.city }} / {{ user.address.street }}
            </div>
          </div>
          <div class="card-body-center">
            <div class="card-body-center-data">
              <img
                class="card-body-center-data-icon"
                src="../assets/icons/skyscraper.png"
              />
              <div class="card-body-center-data-text">Company</div>
            </div>
            <div class="card-body-center-data-text">
              {{ user.company.name }}
            </div>
          </div>
          <div class="card-body-center">
            <div class="card-body-center-data">
              <img
                class="card-body-center-data-icon"
                src="../assets/icons/world-share.png"
              />
              <div class="card-body-center-data-text">Website</div>
            </div>
            <div class="card-body-center-data-text">{{ user.website }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import TodosPage from "./TodosPage.vue";
export default {
  name: "UserCards",
  data() {
    return {
      userList: {},
      successResponse: false,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  computed: {
    userImages() {
      return [
        "../assets/icons/person1.png",
        "../assets/icons/person2.png",
        "../assets/icons/person3.png",
      ];
    },
  },
  methods: {
    fetchUsers() {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          this.userList = response.data;
          // Data transmission from Child element to Parent element //
          this.$emit("successResponse", this.successResponse);
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    },
    getUserImage(userId) {
      const imageIndex = userId % this.userImages.length;
      return this.userImages[imageIndex];
    },
    navigateToPage(user, userImage) {
      const userData = {
        user: user,
        userImage: userImage,
      };
      // Process of set users in LocalStorage //
      localStorage.setItem("user", JSON.stringify(userData));
      this.$router.addRoute({
        name: "TodosPage",
        path: "/todo",
        component: TodosPage,
      });
      this.$router.push({
        name: "TodosPage",
        params: { userId: user.id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 60px 0 60px;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
}

.card {
  width: 450px;
  height: 400px;
  background-color: #ffffff;
  border: 1px solid #d8d9dd;
  border-radius: 12px;
  margin-bottom: 25px;
  transition: box-shadow 0.3s;
  cursor: pointer;

  &-body {
    display: flex;
    flex-direction: column;
    padding: 23px;

    &-header {
      display: flex;

      &-image {
        border-radius: 50%;
        margin: 0 20px 20px 20px;
      }

      &-profile {
        margin-top: 15px;
        margin-right: 45px;

        &-name {
          color: #26303e;
          font-family: Poppins;
          font-size: 18px;
          font-weight: 500;
        }

        &-text {
          color: #5c6672;
          font-family: Poppins;
          font-size: 14px;
          font-weight: 300;
        }
      }
    }
  }
}

.card:hover {
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body-center {
  margin: 0 0 20px 20px;

  &-data {
    display: flex;
    align-items: center;
    margin-bottom: 7px;

    &-text {
      color: #313e50;
      font-family: Poppins;
      font-size: 14px;
      font-weight: 500;
    }

    &-icon {
      margin-right: 7px;
    }
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
