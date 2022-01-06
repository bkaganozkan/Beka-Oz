<template>
  <div class="folder-center">Dosya</div>
</template>

<script>
import { Box } from "@/_helpers/ThreeJS/Objects";
export default {
  data() {
    return {
      object: null,
    };
  },

  created() {
    this.object = new Box(true);
    document.addEventListener("click", (event) => {
      console.log(typeof event.target.__vue__.object);
    });
  },
};
</script>

<style lang='scss' scoped>
.folder-center {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
  width: 100px;
  height: 100px;
  margin: 5px;
}
</style>