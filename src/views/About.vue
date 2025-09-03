<template>
  <div class="about">
    <div class="container">
      <section class="intro-section fade-in-up">
        <h1>About Me</h1>
        <div class="intro-content">
          <div class="intro-text">
            <p>
              Hi, I'm a passionate software developer with a deep love for
              creating innovative solutions that make a real difference. My
              journey into programming began during my university years, where I
              discovered the power of code to solve complex problems and bring
              ideas to life.
            </p>
            <p>
              Over the years, I've evolved from a curious student into a
              versatile full-stack developer with expertise spanning back-end
              systems, mobile applications, and machine learning. I believe in
              writing clean, efficient code and building systems that are not
              just functional, but also scalable and maintainable.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, or
              sharing knowledge with the developer community. I'm always excited
              about the next challenge and the opportunity to learn something
              new.
            </p>
          </div>
          <div class="intro-stats">
            <div class="stat-card card">
              <h3>1+</h3>
              <p>Years Experience</p>
            </div>
            <div class="stat-card card">
              <h3>5+</h3>
              <p>Projects Completed</p>
            </div>
            <div class="stat-card card">
              <h3>2</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </section>

      <div v-if="isLoading">
        <section class="career-section">
          <div class="skeleton skeleton-title"></div>
          <div class="timeline" style="max-width: 800px; margin: 0 auto">
            <div
              v-for="n in 2"
              :key="n"
              class="skeleton skeleton-timeline-item"
            ></div>
          </div>
        </section>
        <section class="education-section">
          <div class="skeleton skeleton-title"></div>
          <div class="education-grid grid grid-2">
            <div v-for="n in 2" :key="n" class="skeleton skeleton-card"></div>
          </div>
        </section>
      </div>

      <section v-else-if="error" class="error-state">
        <GraduationCap :size="48" class="error-icon" />
        <h3>Oops, Terjadi Kesalahan</h3>
        <p>{{ error }}</p>
        <button @click="fetchAllData" class="btn btn-primary">Coba Lagi</button>
      </section>

      <div v-else>
        <section v-if="experiences.length > 0" class="career-section">
          <h2>Professional Experience</h2>
          <div class="timeline">
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-marker">
                <div class="timeline-dot"></div>
              </div>
              <div class="timeline-content card">
                <div class="timeline-header">
                  <h3>{{ experience.role }}</h3>
                  <span class="company">{{ experience.company }}</span>
                  <span class="period">{{ experience.period }}</span>
                </div>
                <p class="description">{{ experience.description }}</p>
                <ul class="achievements">
                  <li
                    v-for="achievement in experience.achievements"
                    :key="achievement"
                  >
                    <Check :size="16" /> {{ achievement }}
                  </li>
                </ul>
                <div class="skills">
                  <span
                    v-for="tech in experience.skills"
                    :key="tech"
                    class="tech-tag"
                    >{{ tech }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <section v-if="educations.length > 0" class="education-section">
          <h2>Education</h2>
          <div class="education-grid grid grid-2">
            <div
              v-for="education in educations"
              :key="education.degree"
              class="education-card card"
            >
              <div class="education-icon"><GraduationCap :size="32" /></div>
              <div class="education-content">
                <h3>{{ education.degree }}</h3>
                <p class="institution">{{ education.institution }}</p>
                <p class="year">{{ education.period }}</p>
                <p v-if="education.gpa" class="gpa">
                  GPA: {{ education.gpa }}/{{ education.max_gpa }}
                </p>
                <p v-if="education.description" class="description">
                  {{ education.description }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          v-if="experiences.length === 0 && educations.length === 0"
          class="empty-state"
        >
          <p>Informasi pengalaman dan edukasi saat ini tidak tersedia.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { Check, GraduationCap } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const experiences = ref([]);
const educations = ref([]);

const isLoading = ref(true);
const error = ref(null);

const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const [experiencesResponse, educationsResponse] = await Promise.all([
      axios.get("https://panel.marcyovian.my.id/api/experiences"),
      axios.get("https://panel.marcyovian.my.id/api/educations"),
    ]);

    experiences.value = experiencesResponse.data.data;
    educations.value = educationsResponse.data.data;
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
.about {
  padding: 2rem 0 6rem;
}

.intro-section {
  margin-bottom: 6rem;
}

.intro-section h1 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3rem;
}

.intro-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.7;
}

.intro-text p {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.intro-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
}

.stat-card h3 {
  font-size: 2rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.stat-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.career-section {
  margin-bottom: 6rem;
}

.career-section h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--border);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  padding-left: 60px;
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0;
}

.timeline-dot {
  width: 40px;
  height: 40px;
  background-color: var(--accent);
  border-radius: 50%;
  border: 4px solid var(--bg-primary);
  box-shadow: 0 0 0 2px var(--border);
}

.timeline-content {
  padding: 2rem;
}

.timeline-header {
  margin-bottom: 1rem;
}

.timeline-header h3 {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.company {
  color: var(--accent);
  font-weight: 500;
  margin-right: 1rem;
}

.period {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.achievements {
  list-style: none;
  margin-bottom: 1.5rem;
}

.achievements li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.achievements li svg {
  color: var(--accent);
  flex-shrink: 0;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  border: 1px solid var(--border);
}

.education-section h2 {
  text-align: center;
  margin-bottom: 3rem;
}

.education-card {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.education-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: var(--accent);
  color: #000;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.education-content h3 {
  margin-bottom: 0.5rem;
}

.institution {
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.year,
.gpa {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.education-content .description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.error-state,
.empty-state {
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
.error-state p,
.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}
.error-state .btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Gaya untuk Skeleton Loader */
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}

.skeleton {
  background-color: var(--bg-tertiary);
  border-radius: 8px;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-title {
  height: 32px;
  width: 280px;
  margin: 0 auto 3rem;
}

.skeleton-timeline-item {
  height: 250px;
  width: 100%;
  border-radius: 16px;
  margin-bottom: 3rem;
}

.skeleton-card {
  height: 180px;
  border-radius: 16px;
}

@media (max-width: 768px) {
  .intro-section h1 {
    font-size: 2.5rem;
  }

  .intro-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .intro-stats {
    flex-direction: row;
    justify-content: space-around;
  }

  .timeline::before {
    left: 15px;
  }

  .timeline-item {
    padding-left: 50px;
  }

  .timeline-dot {
    width: 30px;
    height: 30px;
  }

  .education-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>
