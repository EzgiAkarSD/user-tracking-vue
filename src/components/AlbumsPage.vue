<template>
  <div>
    <div v-if="isLoading" class="loading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div class="container">
      <SidebarComponent :activeTab="'albums'"></SidebarComponent>
      <div>
        <div class="container-back-button">
          <div @click="routePage('home')">
            <img width="30px" height="30px" class="container-back-button-icon" src="../assets/icons/back.png" />
          </div>
          <div class="container-back-button-text">Go Home</div>
        </div>
        <div class="container-albums">
          <div v-for="album in albumList" :key="album.id">
            <div class="container-albums-card" @click="routePage('photo', album.id)">
              <div class="container-albums-card-body">
                <img class="container-albums-card-body-image" src="../assets/icons/album.png" />
                <div class="container-albums-card-body-text">{{ album.title }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoaderComponent from "../components/LoaderComponent.vue";
import SidebarComponent from "../components/SidebarComponent.vue";
import HomePage from "../components/HomePage.vue";
import PhotoPage from "../components/PhotoPage.vue";
export default {
  name: "AlbumsPage",
  components: { LoaderComponent, SidebarComponent },
  data() {
    return {
      userList: {},
      albumList: {},
      photoList: {},
      albumPhotos: [],
      isLoading: true,
    };
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
  mounted() {
    this.fetchAlbums();
  },
  methods: {
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
    fetchAlbums() {
      axios
        .get(`https://jsonplaceholder.typicode.com/albums?userId=${this.getUser().user.id}`)
        .then((response) => {
          this.albumList = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    },
    getUserImage(userId) {
      const imageIndex = userId % this.userImages.length;
      return this.userImages[imageIndex];
    },
    routePage(pageName, albumId) {
      if (pageName === "home") {
        localStorage.removeItem('user');
        this.$router.push({ components: HomePage, path: "/" });
      } else if (pageName === "photo") {
        localStorage.setItem("albumId", albumId);
        this.$router.push({ components: PhotoPage, path: "/photo" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 7fr;
  min-height: 100vh;

  &-back-button {
    display: flex;
    margin: 40px 0 0 45px;

    &-text {
      font-family: Poppins;
      font-size: 20px;
      font-weight: 600;
    }

    &-icon {
      cursor: pointer;
      margin: 1px 30px 0 0;
    }
  }

  &-albums {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px 60px 0 60px;
    overflow-y: auto;
    max-height: calc(100vh - 100px);

    &-card {
      width: 450px;
      height: 410px;
      background-color: #ffffff;
      border: 1px solid #d8d9dd;
      border-radius: 12px;
      margin-bottom: 25px;
      transition: box-shadow 0.3s;
      cursor: pointer;

      &-body {
        display: flex;
        flex-direction: column;
        padding: 25px;

        &-image {
          border-radius: 3px;
          margin-bottom: 18px;
        }

        &-text {
          font-family: Roboto;
          font-size: 14px;
          font-weight: 400;
          color: #26303e;
          margin-left: 3px;
        }
      }
    }
  }
}

.container-albums-card:hover {
  box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
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
