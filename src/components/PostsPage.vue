<template>
  <div>
    <div v-if="isLoading" class="loading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div class="container">
      <SidebarComponent :activeTab="'posts'"></SidebarComponent>
      <div class="container-posts">
        <div class="container-posts-back-button">
          <div @click="routerHomePage()">
            <img width="30px" height="30px" class="container-posts-back-button-icon" src="../assets/icons/back.png" />
          </div>
          <div class="container-posts-back-button-text">Go Home</div>
        </div>
        <div class="container-posts-wrapper">
          <div v-for="post in postsList" :key="post.id">
            <div class="post-cards">
              <div class="post-cards-body">
                <div class="post-cards-title">{{ post.title }}</div>
                <div class="post-cards-subtitle">{{ post.body }}</div>
              </div>
              <div class="post-cards-more-button">
                <div class="post-cards-more-button-text">See More</div>
                <div @click="openCommentsPopup(post)">
                  <img class="post-cards-more-button-icon" src="../assets/icons/more.png" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isVisiblePopup" class="popup">
      <div class="popup-content">
        <div class="popup-content-header">
          <div class="popup-content-header-title">{{ selectedPost.title }}</div>
          <div class="popup-content-close-button" @click="closeCommentsPopup">
            <img src="../assets/icons/rounded-cancel.png" />
          </div>
        </div>
        <div class="popup-content-body">
          <div class="popup-content-body-post">
            {{ selectedPost.body }}
          </div>
          <div class="popup-content-body-comments">
            <div class="popup-content-body-comments-header">Comments</div>
            <div class="popup-content-body-comments-body" v-for="comment in commentList" :key="comment.id">
              <img width="60px" height="60px" :src="getCommentImage(comment.id)" />
              <div class="popup-content-body-comments-body-text">
                <div class="popup-content-body-comments-body-text-name">
                  {{ comment.name }}
                </div>
                <div class="popup-content-body-comments-body-text-body">
                  {{ comment.body }}
                </div>
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
export default {
  name: "PostsPage",
  components: { LoaderComponent, SidebarComponent },
  data() {
    return {
      isLoading: true,
      isVisiblePopup: false,
      postsList: {},
      selectedPost: {},
      commentList: {},
    };
  },
  computed: {
    commentImages() {
      return [
        { id: 1, url: "../assets/icons/comment-photo1.png" },
        { id: 2, url: "../assets/icons/comment-photo2.png" },
      ];
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
    fetchPosts() {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${this.getUser().user.id}`)
        .then((response) => {
          this.postsList = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    },
    fetchComments(postId) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => {
          this.commentList = response.data;
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    },
    routerHomePage() {
      localStorage.removeItem('user');
      this.$router.push({ components: HomePage, path: "/" });
    },
    openCommentsPopup(post) {
      this.selectedPost = post;
      this.fetchComments(post.id);
      this.isVisiblePopup = true;
    },
    closeCommentsPopup() {
      this.isVisiblePopup = false;
    },
    getCommentImage(commentId) {
      const imageIndex = commentId % this.commentImages.length;
      return this.commentImages[imageIndex].url;
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

  &-posts {
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

    &-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow-y: auto;
      max-height: calc(100vh - 150px);
      margin: 40px 0 0 70px;
    }
  }
}

.post-cards {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 40px;
  margin-bottom: 40px;
  border-bottom: 1px solid #d8d9dd;

  &-body {
    width: 60%;
  }

  &-title {
    font-family: Poppins;
    font-size: 18px;
    font-weight: 500;
    color: #26303e;
    margin-bottom: 10px;
  }

  &-subtitle {
    font-family: Poppins;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
  }

  &-more-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 45px 10px 0;

    &-text {
      font-family: Poppins;
      font-size: 14px;
      font-weight: 500;
      color: #26303e;
      margin-right: 5px;
    }

    &-icon {
      cursor: pointer;
      margin-top: 3px;
    }
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  &-content {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 1000px;
    height: 600px;
    text-align: center;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      &-title {
        font-family: Poppins;
        font-size: 24px;
        font-weight: 500;
        color: #26303e;
        margin-left: 10px;
      }
    }

    &-close-button {
      cursor: pointer;
    }

    &-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 25px;
      height: 100%;

      &-post {
        text-align: left;
        font-family: Poppins;
        font-size: 14px;
        font-weight: 400;
        padding: 20px 20px 0 5px;
        color: #000000;
        border-right: 1px solid #d8d9dd;
      }

      &-comments {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 12px 20px 0 20px;
        overflow-y: auto;
        max-height: 500px;

        &-body {
          align-items: center;
          display: flex;
          padding: 20px;

          &-title {
            margin-left: 10px;
          }

          &-text {
            margin-left: 15px;

            &-name {
              font-family: Poppins;
              font-size: 14px;
              font-weight: 500;
              color: #26303e;
              text-align: left;
              margin-bottom: 10px;
            }

            &-body {
              font-family: Roboto;
              font-size: 14px;
              font-weight: 400;
              text-align: left;
              color: #5c6672;
            }
          }
        }

        &-header {
          font-family: Poppins;
          font-size: 20px;
          font-weight: 600;
          text-align: left;
          color: #26303e;
        }
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
