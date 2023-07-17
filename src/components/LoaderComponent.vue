<template>
  <div class="loader">
    <div class="loader-circle"></div>
  </div>
</template>

<script>
export default {
  name: "LoadingPage",
};
</script>

<style lang="scss" scoped>
body {
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loader-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: pulse 1.5s ease-in-out infinite;
}

.loader-circle:before {
  content: "";
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 8px solid #4F359B;
  border-color: #4F359B transparent #4F359B transparent;
  animation: loader 1.2s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
</style>
