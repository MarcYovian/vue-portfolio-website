<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <!-- Rombak struktur hero-content agar lebih fleksibel -->
        <div class="hero-content">
          <!-- Wrapper untuk teks, agar bisa diatur posisinya -->
          <div class="hero-text-content fade-in-up">
            <h1 class="hero-title">I'm a <TypingEffect :words="roles" /></h1>
            <p class="hero-description">
              Passionate full-stack developer with expertise in back-end
              systems, mobile applications, and machine learning. I create
              scalable solutions that solve real-world problems and deliver
              exceptional user experiences.
            </p>
            <div class="hero-actions">
              <router-link to="/contacts" class="btn btn-primary">
                Let's Talk
              </router-link>
              <router-link to="/projects" class="btn btn-secondary">
                My Projects
              </router-link>
            </div>
          </div>
          <!-- Wrapper untuk gambar -->
          <div class="hero-image-wrapper fade-in">
            <img
              src="@/assets/images/IMG_0114.jpg"
              alt="Profile Picture"
              class="profile-picture"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading" class="container section-spacing">
      <!-- Skeleton untuk Skills -->
      <section class="skills">
        <div class="skeleton skeleton-title"></div>
        <div class="skills-grid">
          <div v-for="n in 6" :key="n" class="skeleton skeleton-card"></div>
        </div>
      </section>
      <!-- Skeleton untuk Services -->
      <section class="services">
        <div class="skeleton skeleton-title"></div>
        <div class="services-grid">
          <div
            v-for="n in 3"
            :key="n"
            class="skeleton skeleton-card-large"
          ></div>
        </div>
      </section>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container section-spacing error-state">
      <DynamicHeroIcon
        name="heroicon-o-exclamation-triangle"
        class="error-icon"
      />
      <h3>Oops, Something Went Wrong</h3>
      <p>{{ error }}</p>
      <button @click="fetchAllData" class="btn btn-primary">
        <DynamicHeroIcon name="heroicon-o-arrow-path" class="w-4 h-4" />
        Try Again
      </button>
    </div>

    <!-- Content Loaded State -->
    <div v-else>
      <!-- Skills Section -->
      <section v-if="skillCategories.length > 0" class="skills section-spacing">
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

      <!-- Services Section -->
      <section v-if="services.length > 0" class="services section-spacing">
        <div class="container">
          <h2 class="section-title">Services I Offer</h2>
          <div class="services-grid">
            <div
              v-for="service in services"
              :key="service.title"
              class="service-card card"
            >
              <div class="service-icon-wrapper">
                <DynamicHeroIcon :name="service.icon" class="service-icon" />
              </div>
              <div class="service-text">
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
        </div>
      </section>

      <!-- Empty State -->
      <div
        v-if="skillCategories.length === 0 && services.length === 0"
        class="container section-spacing"
        style="text-align: center"
      >
        <p>Content is currently unavailable. Please check back later.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Tidak ada perubahan pada script, sudah sangat baik!
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

interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

interface Service {
  title: string;
  icon: string;
  description: string;
  features: string[];
}

// Inisialisasi state
const skillCategories = ref<SkillCategory[]>([]);
const services = ref<Service[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Fungsi untuk fetch semua data
const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // Menggunakan Promise.all untuk fetch data secara paralel
    const [skillCategoriesResponse, servicesResponse] = await Promise.all([
      axios.get("https://panel.marcyovian.my.id/api/skill-categories"),
      axios.get("https://panel.marcyovian.my.id/api/services"),
    ]);

    skillCategories.value = skillCategoriesResponse.data.data;
    services.value = servicesResponse.data.data;
  } catch (err: any) {
    console.error("Error fetching data:", err);
    error.value =
      "Sorry, something went wrong while fetching data. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

// Panggil fetchAllData saat komponen di-mount
onMounted(fetchAllData);
</script>

<style scoped>
/* GENERAL & UTILITIES */
.home {
  width: 100%;
  overflow-x: hidden; /* Mencegah horizontal scroll */
}

.section-spacing {
  padding: 6rem 0;
}

.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: var(--text-primary);
}

/* ANIMATIONS */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-out forwards;
}

/* HERO SECTION */
.hero {
  padding: 6rem 0;
  display: flex;
  align-items: center;
  min-height: 90vh;
}

.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;
}

.hero-text-content {
  max-width: 600px;
  text-align: left;
}

.hero-title {
  font-size: 3.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-image-wrapper {
  position: relative;
  width: 320px;
  height: 320px;
  flex-shrink: 0;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 8px solid var(--bg-secondary);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* SKILLS SECTION */
.skills {
  background-color: var(--bg-secondary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category .card {
  background-color: var(--bg-primary); /* Sedikit beda agar menonjol */
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-header h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
}

.category-icon {
  color: var(--accent);
  width: 28px;
  height: 28px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background-color: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

/* SERVICES SECTION */
.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.service-card {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  text-align: left;
}

.service-icon-wrapper {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: var(--accent-light, #ede7f6);
  color: var(--accent);
}

.service-icon {
  width: 28px;
  height: 28px;
}

.service-card h3 {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.service-card p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.service-features li svg {
  color: var(--accent);
  flex-shrink: 0;
}

/* ERROR & SKELETON STATES */
.error-state {
  text-align: center;
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

.skeleton {
  background-color: var(--bg-tertiary);
  border-radius: 8px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

.skeleton-title {
  height: 36px;
  width: 300px;
  margin: 0 auto 4rem;
}

.skeleton-card {
  height: 220px;
}
.skeleton-card-large {
  height: 180px;
}

/* RESPONSIVE DESIGN */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column-reverse; /* Gambar di atas, teks di bawah */
    text-align: center;
    gap: 3rem;
  }
  .hero-text-content {
    text-align: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .section-spacing {
    padding: 4rem 0;
  }
  .section-title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-description {
    font-size: 1rem;
  }
  .hero-image-wrapper {
    width: 250px;
    height: 250px;
  }
  .service-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .service-text {
    width: 100%;
  }
  .service-features {
    display: inline-block;
    text-align: left;
  }
}
</style>
