<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content fade-in-up">
          <h1 class="hero-title">I'm a <TypingEffect :words="roles" /></h1>
          <p class="hero-description">
            Passionate full-stack developer with expertise in back-end systems,
            mobile applications, and machine learning. I create scalable
            solutions that solve real-world problems and deliver exceptional
            user experiences.
          </p>
          <div class="hero-actions"></div>
        </div>
      </div>
    </section>

    <div v-if="isLoading" class="container">
      <section class="skills">
        <div class="skeleton skeleton-title"></div>
        <div class="skills-grid">
          <div v-for="n in 3" :key="n" class="skeleton skeleton-card"></div>
        </div>
      </section>
      <section class="services">
        <div class="skeleton skeleton-title"></div>
        <div class="services-grid grid grid-3">
          <div v-for="n in 3" :key="n" class="skeleton skeleton-card"></div>
        </div>
      </section>
    </div>

    <div v-else-if="error" class="container error-state">
      <DynamicHeroIcon
        name="heroicon-o-exclamation-triangle"
        class="error-icon"
      />
      <h3>Oops, Terjadi Kesalahan</h3>
      <p>{{ error }}</p>
      <button @click="fetchAllData" class="btn btn-primary">
        <DynamicHeroIcon name="heroicon-o-arrow-path" class="w-4 h-4" />
        Coba Lagi
      </button>
    </div>

    <div v-else>
      <section v-if="skillCategories.length > 0" class="skills">
        <div class="container">
          <h2 class="section-title">Technical Skills</h2>
          <div class="skills-grid">
            <div
              v-for="category in skillCategories"
              :key="category.name"
              class="skill-category card"
            >
              <div class="category-header">
                <DynamicHeroIcon :name="category.icon" class="category-icon" />
                <h3>{{ category.name }}</h3>
              </div>
              <div class="skills-list">
                <span
                  v-for="skill in category.skills"
                  :key="skill"
                  class="skill-tag"
                  >{{ skill }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="services.length > 0" class="services">
        <div class="container">
          <h2 class="section-title">Services I Offer</h2>
          <div class="services-grid grid grid-3">
            <div
              v-for="service in services"
              :key="service.title"
              class="service-card card"
            >
              <div class="service-icon">
                <DynamicHeroIcon :name="service.icon" class="w-4 h-4" />
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <Check :size="16" />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div
        v-if="skillCategories.length === 0 && services.length === 0"
        class="container"
        style="text-align: center; padding: 4rem 0"
      >
        <p>Konten saat ini tidak tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script Anda tidak perlu diubah, sudah sangat baik.
import axios from "axios";
import { Check } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import DynamicHeroIcon from "../components/DynamicHeroIcon.vue";
import TypingEffect from "../components/TypingEffect.vue";

const roles = [
  "Back-end Developer",
  "Mobile Developer",
  "Full-Stack Developer",
];

const skillCategories = ref([]);
const services = ref([]);

const isLoading = ref(true);
const error = ref(null);

const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const [skillCategoriesResponse, servicesResponse] = await Promise.all([
      axios.get("https://panel.marcyovian.my.id/api/skill-categories"),
      axios.get("https://panel.marcyovian.my.id/api/services"),
    ]);

    skillCategories.value = skillCategoriesResponse.data.data;
    services.value = servicesResponse.data.data;
  } catch (err) {
    console.log("Error fetching data:", err);
    error.value =
      "Sorry, something went wrong while fetching data. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  fetchAllData();
});
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  padding: 6rem 0 8rem;
  background: linear-gradient(
    135deg,
    var(--bg-primary) 0%,
    var(--bg-secondary) 100%
  );
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
}

.skills {
  padding: 6rem 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-category {
  text-align: center;
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.category-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.category-icon {
  color: var(--accent);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.skill-tag {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background-color: var(--accent);
  color: #000;
  transform: translateY(-1px);
}

.services {
  padding: 6rem 0;
  background-color: var(--bg-secondary);
}

.services-grid {
  margin-top: 3rem;
}

.service-card {
  text-align: center;
}

.service-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background-color: var(--accent);
  color: #000;
  border-radius: 16px;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  margin-bottom: 1rem;
}

.service-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.service-features {
  list-style: none;
  text-align: left;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.service-features li svg {
  color: var(--accent);
  flex-shrink: 0;
}

.error-state {
  text-align: center;
  padding: 6rem 0;
}
.error-icon {
  color: var(--accent);
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
}
.error-state h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}
.error-state p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
.error-state .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Gaya untuk Skeleton Loader */
.skeleton {
  background-color: var(--bg-tertiary);
  border-radius: 8px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.skeleton-title {
  height: 36px;
  width: 300px;
  margin: 0 auto 3rem;
}

.skeleton-card {
  height: 200px;
}

@media (max-width: 768px) {
  .hero {
    padding: 4rem 0 6rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .skills,
  .services {
    padding: 4rem 0;
  }
}
</style>
