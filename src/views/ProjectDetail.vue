<template>
  <div class="project-detail-page">
    <div v-if="isLoading" class="container loading-state">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-header"></div>
      <div class="skeleton skeleton-content"></div>
    </div>

    <div v-else-if="error" class="container error-state">
      <alert-circle :size="48" class="error-icon" />
      <h3>Oops, Project Not Found</h3>
      <p>{{ error }}</p>
      <router-link to="/projects" class="btn btn-primary">
        Back to Projects
      </router-link>
    </div>

    <div v-else-if="project" class="project-container">
      <header
        class="project-header"
        :style="{ backgroundImage: `url(${project.image_url})` }"
      >
        <div class="header-overlay"></div>
        <div class="container header-content fade-in-up">
          <span class="project-category">{{ project.category }}</span>
          <h1 class="project-title">{{ project.title }}</h1>
        </div>
      </header>

      <main class="container project-main-content">
        <div class="content-grid">
          <div class="project-info">
            <h2>About The Project</h2>
            <p class="project-description">{{ project.description }}</p>

            <div class="details-section">
              <h3>Technologies Used</h3>
              <div class="tech-tags">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="project-links">
              <a
                v-if="project.demo_url"
                :href="project.demo_url"
                target="_blank"
                class="btn btn-primary"
              >
                <external-link :size="18" /> Live Demo
              </a>
              <a
                v-if="project.github_url"
                :href="project.github_url"
                target="_blank"
                class="btn btn-secondary"
              >
                <github :size="18" /> Source Code
              </a>
            </div>
          </div>

          <aside class="project-visuals">
            <div class="visual-card card">
              <img
                :src="project.image_url"
                :alt="project.title"
                class="project-image-fallback"
              />
            </div>
          </aside>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { AlertCircle, ExternalLink, Github } from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  category: string;
  technologies: string[];
}

const route = useRoute();
const project = ref<Project | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchProjectDetails = async (slug: string) => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      `https://panel.marcyovian.my.id/api/projects/${slug}`
    );
    project.value = response.data.data;
  } catch (err) {
    console.error("Failed to fetch project details:", err);
    error.value =
      "The project you are looking for does not exist or could not be loaded.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const slug = route.params.slug as string;
  fetchProjectDetails(slug);
});
</script>

<style scoped>
/* Mobile First Design */
.project-detail-page {
  padding-bottom: 4rem;
}

.project-header {
  position: relative;
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  color: white;
  padding: 2rem 0;
}

.header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(13, 17, 23, 1) 0%,
    rgba(13, 17, 23, 0.6) 50%,
    rgba(13, 17, 23, 0.2) 100%
  );
}

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.project-category {
  display: inline-block;
  background-color: var(--accent);
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.project-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.project-main-content {
  padding-top: 3rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.project-info h2 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border);
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.details-section {
  margin-bottom: 2.5rem;
}

.details-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-tag {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.4rem 1rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid var(--border);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.project-links .btn {
  width: 100%;
  justify-content: center;
}

.project-visuals {
  position: sticky;
  top: 100px;
}

.visual-card {
  padding: 0;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-tertiary);
}

.project-image-fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Loading and Error States */
.loading-state,
.error-state {
  text-align: center;
  padding: 6rem 1rem;
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
  height: 40px;
  width: 60%;
  margin: 0 auto 2rem;
}
.skeleton-header {
  height: 200px;
  margin-bottom: 2rem;
}
.skeleton-content {
  height: 300px;
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

/* Tablet and larger screens */
@media (min-width: 768px) {
  .project-title {
    font-size: 2.5rem;
  }

  .content-grid {
    grid-template-columns: 1.5fr 1fr;
    gap: 4rem;
  }

  .project-links .btn {
    width: auto;
  }
}

/* Desktop screens */
@media (min-width: 1024px) {
  .project-header {
    height: 400px;
  }

  .project-title {
    font-size: 3.5rem;
  }

  .project-main-content {
    padding-top: 4rem;
  }
}
</style>
