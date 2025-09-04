<template>
  <div class="projects">
    <div class="container">
      <header class="page-header fade-in-up">
        <h1>My Projects</h1>
        <p>
          A showcase of my recent work, featuring web applications, mobile apps,
          and machine learning projects. Each project represents a unique
          challenge and learning opportunity.
        </p>
      </header>

      <div v-if="isLoading">
        <div class="filters">
          <div v-for="n in 4" :key="n" class="skeleton skeleton-filter"></div>
        </div>
        <div class="projects-grid grid grid-2">
          <div v-for="n in 4" :key="n" class="skeleton skeleton-card"></div>
        </div>
      </div>

      <section v-else-if="error" class="error-state">
        <Github :size="48" class="error-icon" />
        <h3>Oops, Terjadi Kesalahan</h3>
        <p>{{ error }}</p>
        <button @click="fetchAllData" class="btn btn-primary">Coba Lagi</button>
      </section>

      <div v-else>
        <!-- Filter Tabs -->
        <div class="filters">
          <button
            v-for="category in categories"
            :key="category"
            @click="setActiveFilter(category)"
            class="filter-btn"
            :class="{ active: activeFilter.name === category.name }"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- Projects Grid -->
        <transition-group
          name="fade"
          tag="div"
          class="projects-grid grid grid-2"
          :class="gridWrapperClass"
        >
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card card fade-in-up"
          >
            <div class="project-image">
              <img
                :src="project.image_url"
                :alt="project.title"
                loading="lazy"
              />
              <div class="project-overlay">
                <div class="project-links">
                  <a
                    v-if="project.demo_url"
                    :href="project.demo_url"
                    target="_blank"
                    class="project-link"
                    aria-label="View live demo"
                  >
                    <ExternalLink :size="20" />
                  </a>
                  <a
                    v-if="project.github_url"
                    :href="project.github_url"
                    target="_blank"
                    class="project-link"
                    aria-label="View source code"
                  >
                    <Github :size="20" />
                  </a>
                </div>
              </div>
            </div>

            <div class="project-content">
              <h3>{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>

              <div class="project-tech">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="project-actions">
                <a
                  v-if="project.demo_url"
                  :href="project.demo_url"
                  target="_blank"
                  class="btn btn-primary btn-small"
                >
                  <ExternalLink :size="16" />
                  Live Demo
                </a>
                <a
                  v-if="project.github_url"
                  :href="project.github_url"
                  target="_blank"
                  class="btn btn-secondary btn-small"
                >
                  <Github :size="16" />
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </transition-group>
        <!-- Empty State -->
        <div
          v-if="filteredProjects.length === 0 && !isLoading"
          class="empty-state"
        >
          <p>No projects found for the "{{ activeFilter.name }}" category.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ExternalLink, Github } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

const projects = ref([]);
const categories = ref([]);
const activeFilter = ref({ id: "all", name: "All" });

const setActiveFilter = (category) => {
  activeFilter.value = category;
};

const isLoading = ref(true);
const error = ref(null);

const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const [projectCategoriesResponse, projectsResponse] = await Promise.all([
      axios.get("https://panel.marcyovian.my.id/api/project-categories"),
      axios.get("https://panel.marcyovian.my.id/api/projects"),
    ]);

    categories.value = [
      { id: "all", name: "All" },
      ...projectCategoriesResponse.data.data,
    ];
    projects.value = projectsResponse.data.data;
  } catch (err) {
    console.log("Error fetching data:", err);
    error.value =
      "Sorry, something went wrong while fetching data. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAllData);

const filteredProjects = computed(() => {
  if (activeFilter.value.name === "All") {
    return projects.value;
  }
  // Diasumsikan setiap project memiliki properti `category_name`
  return projects.value.filter(
    (project) => project.category === activeFilter.value.name
  );
});

const gridWrapperClass = computed(() => {
  const count = filteredProjects.value.length;
  if (count === 1) {
    return "layout-single-item";
  }
  if (count === 2) {
    return "layout-two-items";
  }
  return "";
});
</script>

<style scoped>
.projects {
  padding: 2rem 0 6rem;
}

.page-header {
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.page-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border);
  background-color: transparent;
  color: var(--text-secondary);
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: var(--font-ui);
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-btn.active {
  background-color: var(--accent);
  border-color: var(--accent);
  color: #000;
}

.projects-grid {
  margin-top: 3rem;
}

.project-card {
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.project-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: var(--accent);
  color: #000;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.project-link:hover {
  background-color: var(--accent-hover);
  transform: scale(1.1);
}

.project-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-content h3 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
  flex: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--border);
}

.project-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.error-state {
  text-align: center;
  padding: 4rem 0;
}
.error-icon {
  color: var(--accent);
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

/* Gaya untuk Skeleton Loader */
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

.skeleton {
  background-color: var(--bg-tertiary);
  border-radius: 16px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-filter {
  height: 48px;
  width: 120px;
  border-radius: 25px;
}

.skeleton-card {
  height: 450px; /* Sesuaikan dengan tinggi kartu proyek Anda */
}

/* Gaya untuk Transisi Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.projects-grid.layout-single-item,
.projects-grid.layout-two-items {
  margin-left: auto;
  margin-right: auto;
}

.projects-grid.layout-single-item {
  grid-template-columns: 1fr; /* Hanya buat 1 kolom */
  max-width: 550px; /* Batasi lebar maksimum kartu proyek */
}

/* Jika hanya ada 2 item, batasi lebar containernya */
.projects-grid.layout-two-items {
  max-width: 1124px; /* Sesuaikan dengan lebar 2 kartu + gap */
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-image {
    height: 200px;
  }

  .project-content {
    padding: 1.5rem;
  }

  .project-actions {
    flex-direction: column;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  /* Pastikan class layout kita tidak mengganggu di mobile */
  .projects-grid.layout-single-item,
  .projects-grid.layout-two-items {
    max-width: 550px; /* Batas lebar tetap berlaku */
  }
}
</style>
