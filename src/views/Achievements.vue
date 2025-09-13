<template>
  <div class="achievements">
    <div class="container">
      <header class="page-header fade-in-up">
        <h1>Achievements & Certifications</h1>
        <p>
          A collection of my professional certifications, courses, and
          achievements that showcase my commitment to continuous learning and
          skill development.
        </p>
      </header>

      <div class="controls-section">
        <div class="search-wrapper">
          <Search :size="20" class="search-icon" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by title or issuer..."
            class="search-input"
          />
        </div>
        <div class="filter-tags">
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="activeTag = tag"
            class="filter-btn"
            :class="{ active: activeTag === tag }"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <div v-if="isLoading" class="achievements-grid grid grid-3">
        <div v-for="n in 6" :key="n" class="skeleton skeleton-card"></div>
      </div>

      <div v-else-if="error" class="info-state">
        <p>{{ error }}</p>
        <button @click="fetchData" class="btn btn-primary">Try Again</button>
      </div>

      <div v-else>
        <transition-group
          name="fade"
          tag="div"
          class="achievements-grid grid grid-3"
          :class="gridWrapperClass"
        >
          <div
            v-for="(achievement, index) in filteredAchievements"
            :key="achievement.id"
            class="achievement-card card"
            @click="openModal(achievement)"
            @mousemove="handleMouseMove($event, index)"
            @mouseleave="handleMouseLeave"
          >
            <div class="achievement-spotlight" ref="spotlightRefs"></div>
            <div class="achievement-image">
              <img
                :src="achievement.image_url"
                :alt="achievement.title"
                loading="lazy"
              />
              <div class="achievement-overlay">
                <Eye :size="24" />
                <span>View Certificate</span>
              </div>
            </div>
            <div class="achievement-content">
              <h3>{{ achievement.title }}</h3>
              <p class="issuer">{{ achievement.issuer }}</p>
              <p class="date">{{ achievement.formatted_date }}</p>
              <div class="achievement-tags">
                <span v-for="tag in achievement.tags" :key="tag" class="tag">
                  {{ tag }}</span
                >
              </div>
            </div>
          </div>
        </transition-group>

        <div v-if="filteredAchievements.length === 0" class="info-state">
          <p>No achievements found matching your criteria.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import axios from "axios";
import { Eye, Search } from "lucide-vue-next";
import { computed, inject, onMounted, ref } from "vue";

interface Achievement {
  id: number;
  title: string;
  issuer: string;
  date: string;
  formatted_date: string;
  image_url: string;
  tags: string[];
}

const achievements = ref<Achievement[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const modal = inject("modal") as any;

const searchQuery = ref("");
const allTags = ref<string[]>([]);
const activeTag = ref("All");

const fetchData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(
      "https://panel.marcyovian.my.id/api/achievements"
    );
    achievements.value = response.data.data;

    const tags = new Set<string>();
    achievements.value.forEach((ach: any) =>
      ach.tags.forEach((tag: any) => tags.add(tag))
    );
    allTags.value = ["All", ...Array.from(tags)];
  } catch (err) {
    console.error("Failed to fetch achievements:", err);
    error.value = "Failed to load achievements. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const filteredAchievements = computed(() => {
  let result = achievements.value;
  if (activeTag.value !== "All") {
    result = result.filter((ach: any) =>
      ach.tags.some((tag: any) => tag === activeTag.value)
    );
  }
  if (searchQuery.value.trim()) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    result = result.filter(
      (ach: any) =>
        ach.title.toLowerCase().includes(lowerCaseQuery) ||
        ach.issuer.toLowerCase().includes(lowerCaseQuery)
    );
  }
  return result;
});

const openModal = (achievement: any) => {
  modal.openModal(achievement);
};

const gridWrapperClass = computed(() => {
  const count = filteredAchievements.value.length;
  if (count === 1) {
    return "layout-single-item";
  }
  if (count === 2) {
    return "layout-two-items";
  }
  return "";
});

// --- Logic untuk Gradient Background Follows Cursor ---
const spotlightRefs = ref<HTMLElement[]>([]);

const handleMouseMove = (event: MouseEvent, index: number) => {
  const card = event.currentTarget as HTMLElement;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // We need to find the correct spotlight element from the refs array.
  // A simple way is to rely on Vue's rendering order, but let's find the specific one.
  const spotlight = card.querySelector(".achievement-spotlight") as HTMLElement;
  if (spotlight) {
    spotlight.style.opacity = "1";
    spotlight.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.1), transparent 60%)`;
  }
};

const handleMouseLeave = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  const spotlight = card.querySelector(".achievement-spotlight") as HTMLElement;
  if (spotlight) {
    spotlight.style.opacity = "0";
  }
};

useHead({
  title: "Achievements & Certifications - MarcYovian Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Explore professional certifications and achievements by MarcYovian, showcasing a commitment to continuous learning and skill development in technology.",
    },
    {
      property: "og:title",
      content: "Achievements & Certifications | MarcYovian",
    },
    {
      property: "og:description",
      content:
        "A collection of professional certifications and awards demonstrating my dedication to skill development.",
    },
    {
      property: "og:image",
      content: "https://marcyovian.my.id/images/og-achievements.png",
    },
    {
      property: "og:url",
      content: "https://marcyovian.my.id/achievements",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://marcyovian.my.id/achievements",
    },
  ],
});
</script>

<style scoped>
.achievements {
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
.achievements-grid {
  margin-top: 3rem;
}
.achievement-card {
  cursor: pointer;
  overflow: hidden;
  padding: 0;
  transition: all 0.3s ease;
  position: relative; /* Diperlukan untuk spotlight */
  z-index: 1;
}
.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px var(--shadow);
}

/* --- Spotlight CSS --- */
.achievement-spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.1),
    transparent 60%
  );
  z-index: 2;
}

.achievement-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.achievement-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.achievement-card:hover .achievement-image img {
  transform: scale(1.05);
}
.achievement-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  z-index: 3; /* Pastikan overlay di atas spotlight */
}
.achievement-card:hover .achievement-overlay {
  opacity: 1;
}
.achievement-overlay span {
  font-size: 0.9rem;
  font-weight: 500;
}
.achievement-content {
  padding: 1.5rem;
  position: relative;
  z-index: 3; /* Pastikan konten di atas spotlight */
}
.achievement-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  line-height: 1.3;
}
.issuer {
  color: var(--accent);
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}
.date {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
.achievement-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid var(--border);
}
.controls-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}
.search-wrapper {
  position: relative;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: var(--text-secondary);
}
.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid var(--border);
  border-radius: 25px;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}
.search-input:focus {
  outline: none;
  border-color: var(--accent);
}
.filter-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.filter-btn {
  padding: 0.5rem 1.25rem;
  border: 2px solid var(--border);
  background-color: transparent;
  color: var(--text-secondary);
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
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
.info-state {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}
@keyframes pulse {
  50% {
    opacity: 0.6;
  }
}
.skeleton-card {
  height: 320px;
  background-color: var(--bg-secondary);
  border-radius: 16px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.achievements-grid.layout-single-item,
.achievements-grid.layout-two-items {
  margin-left: auto;
  margin-right: auto;
}
.achievements-grid.layout-single-item {
  grid-template-columns: 1fr;
  max-width: 400px;
}
.achievements-grid.layout-two-items {
  grid-template-columns: repeat(2, 1fr);
  max-width: 820px;
}
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }
  .achievements-grid {
    grid-template-columns: 1fr;
  }
  .achievement-image {
    height: 160px;
  }
}
@media (max-width: 1024px) {
  .achievements-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
