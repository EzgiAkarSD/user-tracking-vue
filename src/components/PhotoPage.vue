<template>
  <div>
    <div v-if="isLoading" class="loading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div class="container">
      <SidebarComponent></SidebarComponent>
      <div class="container-photos">
        <div class="container-photos-back-button">
          <div @click="routeAlbumsPage()">
            <img width="30px" height="30px" class="container-photos-back-button-icon" src="../assets/icons/back.png" />
          </div>
          <div class="container-photos-back-button-text">Go Albums</div>
        </div>
        <div class="container-photos-body">
          <div v-for="photo in photoList" :key="photo.id">
            <img class="container-photos-body-image" :src="photo.url" />
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
import AlbumsPage from "../components/AlbumsPage.vue";
export default {
  name: "PhotoPage",
  components: { LoaderComponent, SidebarComponent },
  data() {
    return {
      photoList: {},
      isLoading: true,
    };
  },
  mounted() {
    this.fetchPhotos();
  },
  methods: {
    getAlbumId() {
      return localStorage.getItem("albumId");
    },
    fetchPhotos() {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${this.getAlbumId()}`
        )
        .then((response) => {
          this.photoList = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    },
    routeAlbumsPage() {
      localStorage.removeItem("albumId");
      this.$router.push({ components: AlbumsPage, path: "/albums" });
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

  &-photos {
    display: flex;
    flex-direction: column;

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

    &-body {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 60px 0 60px;
      overflow-y: auto;
      max-height: calc(100vh - 100px);

      &-image {
        width: 250px;
        padding: 25px;
      }
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
