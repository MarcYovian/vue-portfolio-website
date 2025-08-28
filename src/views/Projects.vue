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

      <!-- Filter Tabs -->
      <div class="filters">
        <button
          v-for="category in categories"
          :key="category"
          @click="setActiveFilter(category)"
          class="filter-btn"
          :class="{ active: activeFilter === category }"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid grid grid-2">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card card fade-in-up"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" loading="lazy" />
            <div class="project-overlay">
              <div class="project-links">
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  class="project-link"
                  aria-label="View live demo"
                >
                  <ExternalLink :size="20" />
                </a>
                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
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
                v-if="project.demoUrl"
                :href="project.demoUrl"
                target="_blank"
                class="btn btn-primary btn-small"
              >
                <ExternalLink :size="16" />
                Live Demo
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                class="btn btn-secondary btn-small"
              >
                <Github :size="16" />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="empty-state">
        <p>No projects found for the selected category.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExternalLink, Github } from "lucide-vue-next";
import { computed, ref } from "vue";

const activeFilter = ref("All");
const categories = ["All", "Web", "Mobile", "Backend", "Machine Learning"];

const setActiveFilter = (category: string) => {
  activeFilter.value = category;
};

const projects = [
  {
    id: 1,
    title: "St. John the Apostle Chapel Information System",
    description:
      "Full-stack organizational information system with event scheduling, asset borrowing, and intelligent document management.",
    image: "../public/images/project-sinyora.png",
    technologies: ["Laravel", "Livewire", "Tailwind CSS", "MySQL"],
    category: "Web",
    demoUrl: "https://sinyora.my.id/",
  },
  {
    id: 2,
    title: "Document Processing API",
    description:
      "Intelligent API for automated document processing, capable of performing OCR, document classification, named entity recognition (NER), and extracting structured information from various document types.",
    image: "../public/images/project-ai-sinyora.png",
    technologies: [
      "Python",
      "Flask",
      "Huggingface",
      "IndoBERT",
      "Transformers",
    ],
    category: "Machine Learning",
    githubUrl: "https://github.com/MarcYovian/document-processing-api",
  },
  {
    id: 3,
    title: "Telkom University Parking Information System",
    description:
      "A cross-platform mobile application for Telkom University's Parking Information System, allowing users to find and manage parking spots in real-time. The app features user authentication, profile management, and QR code generation for parking validation.",
    image:
      "https://github.com/MarcYovian/TelU_PIS/assets/90125356/8b99a3ea-047f-4d4f-826b-dc02d07958c9",
    technologies: ["Flutter", "Firebase", "Provider"],
    category: "Mobile",
    githubUrl: "https://github.com/MarcYovian/TelU_PIS",
  },
];

const filteredProjects = computed(() => {
  if (activeFilter.value === "All") {
    return projects;
  }
  return projects.filter((project) => project.category === activeFilter.value);
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
}
</style>
