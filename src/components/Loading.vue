<template>
  <div class="loading-spinner">
      <i class="fas fa-cog fa-spin"></i>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss">
.loading-spinner {
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffffff3;
  opacity: 0.6;
  z-index: 999;

  & i{
    font-size: 64px;
    font-weight: bolder;
  }
}
</style>
