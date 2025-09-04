<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <AchievementModal
      v-if="showModal"
      :achievement="selectedAchievement"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import AchievementModal from "./components/AchievementModal.vue";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";

const showModal = ref(false);
const selectedAchievement = ref(null);

const openModal = (achievement: any) => {
  selectedAchievement.value = achievement;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedAchievement.value = null;
};

provide("modal", { openModal, closeModal });
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 80px; /* Account for sticky navbar */
}
</style>
