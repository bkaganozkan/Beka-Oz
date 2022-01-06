<template>
  <div class="beka-bottom-container">
    <div class="beka-options-container">Burası Özel Alan Search-Upload</div>

    <div class="folders-container">
      <Folder v-for="(f, ind) in 15" :key="ind" />
    </div>
  </div>
</template>



<script>
import Folder from "./Folder.vue";
export default {
  components: { Folder },
};
</script>

<style lang='scss' scoped>
.beka-bottom-container {
  display: block;
  overflow: auto;
  height: 17.7vh !important;
  border: 2px solid rgb(54, 54, 54);
}
.folders-container {
  display: grid;
  justify-items: center;
  align-content: flex-start;
  grid-template-columns: repeat(10, 120px);
  grid-gap: 5px;
}
.beka-options-container {
    padding: 20px 10px;
    border-bottom: 1px solid gray;
}
</style>