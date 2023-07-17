<template>
  <div>
    <div v-if="isLoading" class="loading">
      <LoaderComponent></LoaderComponent>
    </div>
    <div class="container">
      <SidebarComponent :isHomePage="true"></SidebarComponent>
      <div>
        <div class="page-header">All Users</div>
        <UserCards @successResponse="useLoader"></UserCards>
      </div>
    </div>
  </div>
</template>

<script>
import LoaderComponent from "./LoaderComponent.vue";
import SidebarComponent from "./SidebarComponent.vue";
import UserCards from "./UserCards.vue";
export default {
  name: "HomePage",
  components: { LoaderComponent, SidebarComponent, UserCards },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    useLoader(resp) {
      this.isLoading = resp;
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
  display: grid;
  grid-template-columns: 1fr 7fr;
  min-height: 100vh;
}

.page-header {
  font-family: Poppins;
  font-size: 20px;
  font-weight: 600;
  margin: 40px 0 0 73px;
}
</style>
