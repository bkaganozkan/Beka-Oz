<template>
  <div class="model-sidebar-container">
    <div class="sidebar-container" :class="[show ? 'show' : 'hide']">
      <div v-show="show">
        <Folder />
      </div>
    </div>
    <div class="sidebar-option-container">
      <button @click="sidebarShow" class="">O</button>
    </div>
  </div>
</template>

<script>
import Folder from "./Folder";
export default {
  components: {
    Folder,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    sidebarShow() {
      this.show = !this.show;
    },
  },
};
</script>

<style lang='scss' >
.model-sidebar-container {
  z-index: 2;
}

.sidebar-option-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  right: 50;
  width: 5vw;
}

.sidebar-container {
  position: relative;
  height: 95% !important;
  z-index: 1;
  resize: horizontal;
  transition: all 0.5s cubic-bezier(0, -0.54, 0.65, 0.74);
}

.show {
  width: 15vw;
}

.hide {
  width: 0vw;
}
</style>