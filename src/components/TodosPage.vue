<template>
  <div>
    <div v-if="isLoading" class="loading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div class="container">
      <SidebarComponent :activeTab="'todos'"></SidebarComponent>
      <div class="container-todos">
        <div class="container-todos-back-button">
          <div @click="routerHomePage()">
            <img class="container-todos-back-button-icon" src="../assets/icons/back.png" />
          </div>
          <div class="container-todos-back-button-text">Go Home</div>
        </div>
        <div class="todos-list">
          <div class="todos-list-item" v-for="todo in todosList" :key="todo.id">
            <label class="custom-checkbox">
              <input type="checkbox" :checked="getTodoStatus(todo.id)" @change="toggleTodoStatus(todo.id)" />
              <span class="checkmark"></span>
              <div>{{ todo.title }}</div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoaderComponent from "./LoaderComponent.vue";
import SidebarComponent from "./SidebarComponent.vue";
import HomePage from "./HomePage.vue";
export default {
  name: "TodosPage",
  components: { LoaderComponent, SidebarComponent },
  data() {
    return {
      todosList: {},
      isLoading: true,
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    },
    fetchTodos() {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/todos?userId=${this.getUser().user.id}`
        )
        .then((response) => {
          this.todosList = response.data;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error("Error: " + error);
        });
    },
    routerHomePage() {
      localStorage.removeItem("user");
      this.$router.push({ components: HomePage, path: "/" });
    },
    getTodoStatus(todoId) {
      //LocalStorage~ todoID: todoStatus -- check Status//
      const storedStatus = localStorage.getItem(`todo_${todoId}`);
      return storedStatus === "true";
    },
    toggleTodoStatus(todoId) {
      //LocalStorage~ todoID: todoStatus -- set Status//
      const currentStatus = this.getTodoStatus(todoId);
      const newStatus = !currentStatus;
      localStorage.setItem(`todo_${todoId}`, newStatus.toString());
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

  &-todos {
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
        width: 30px;
        height: 30px;
        cursor: pointer;
        margin: 1px 30px 0 0;
      }
    }
  }
}

.user-name {
  color: #26303e;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.user-email {
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

.sidebar-wrapper {
  margin-bottom: 470px;
}

.sidebar-todos {
  display: flex;
  align-items: center;
  background: white;
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

.sidebar-posts {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 35px;

  &-body {
    display: flex;
    margin-left: 45px;
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

.sidebar-albums {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 35px;

  &-body {
    display: flex;
    margin-left: 45px;
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

.sidebar-footer {
  display: flex;
  border-top: 1px solid #d8d9dd;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
  justify-content: center;

  &-logo {
    margin-right: 5px;
  }

  &-text {
    color: #485b69;
    font-family: Poppins;
    font-size: 22px;
    font-weight: 700;
  }
}

.todos-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 65px;
  overflow-y: auto;
  max-height: calc(100vh - 100px);

  &-item {
    display: flex;
    flex-direction: row;
  }
}

.user-text {
  font-family: Poppins;
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0 0 73px;
}

.custom-checkbox {
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  color: #485b69;
  font-family: Roboto;
  font-size: 15px;
  font-weight: 400;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 16px;
  width: 16px;
  border: 2px solid #485b69;
  border-radius: 3px;
}

.custom-checkbox input:checked~.checkmark {
  background-color: #6750a4;
  border-color: #6750a4;
}

.custom-checkbox input:checked~.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.custom-checkbox input:checked~.checkmark:after {
  display: block;
}

.custom-checkbox .checkmark:after {
  left: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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
