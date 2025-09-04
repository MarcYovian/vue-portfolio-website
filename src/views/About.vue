<template>
  <div class="about-page">
    <!-- Section 1: Introduction -->
    <section class="about-intro section-spacing">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text fade-in-up">
            <h1 class="page-title">About Me</h1>
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
              sharing knowledge with the developer community.
            </p>
          </div>
          <div class="intro-stats fade-in">
            <div class="stat-card">
              <h3>1+</h3>
              <p>Years Experience</p>
            </div>
            <div class="stat-card">
              <h3>5+</h3>
              <p>Projects Completed</p>
            </div>
            <div class="stat-card">
              <h3>2</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="isLoading" class="container section-spacing">
      <!-- Skeleton for Career -->
      <section>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-timeline-item"></div>
        <div class="skeleton skeleton-timeline-item"></div>
      </section>
      <!-- Skeleton for Education -->
      <section>
        <div class="skeleton skeleton-title"></div>
        <div class="education-grid">
          <div class="skeleton skeleton-card"></div>
          <div class="skeleton skeleton-card"></div>
        </div>
      </section>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="container section-spacing error-state">
      <GraduationCap :size="48" class="error-icon" />
      <h3>Oops, Something Went Wrong</h3>
      <p>{{ error }}</p>
      <button @click="fetchAllData" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Content Loaded State -->
    <div v-else>
      <!-- Section 2: Career Journey (Timeline) -->
      <section
        v-if="experiences.length > 0"
        class="career-section section-spacing"
      >
        <div class="container">
          <h2 class="section-title">Career Journey</h2>
          <div class="timeline">
            <div
              v-for="(experience, index) in experiences"
              :key="index"
              class="timeline-item"
            >
              <div class="timeline-connector">
                <div class="timeline-icon">
                  <Briefcase :size="20" />
                </div>
              </div>
              <div class="timeline-content card">
                <span class="period">{{ experience.period }}</span>
                <h3>{{ experience.role }}</h3>
                <span class="company">{{ experience.company }}</span>
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
        </div>
      </section>

      <!-- Section 3: Education -->
      <section
        v-if="educations.length > 0"
        class="education-section section-spacing"
      >
        <div class="container">
          <h2 class="section-title">Education</h2>
          <div class="education-grid">
            <div
              v-for="education in educations"
              :key="education.degree"
              class="education-card card"
            >
              <div class="education-icon">
                <GraduationCap :size="28" />
              </div>
              <div class="education-details">
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
        </div>
      </section>

      <!-- Empty State -->
      <div
        v-if="experiences.length === 0 && educations.length === 0"
        class="container section-spacing empty-state"
      >
        <p>
          Experience and education information is not available at the moment.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Script remains unchanged, it is already excellent.
import axios from "axios";
import { Briefcase, Check, GraduationCap } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const experiences = ref([]);
const educations = ref([]);

const isLoading = ref(true);
const error = ref<string | null>(null);

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
    console.error("Error fetching data:", err);
    error.value =
      "Sorry, something went wrong while fetching data. Please try again later.";
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAllData);
</script>

<style scoped>
/* GENERAL & UTILITIES */
.about-page {
  padding-bottom: 6rem;
  /* Tambahkan ini untuk mencegah overflow secara global di halaman ini */
  overflow-x: hidden;
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

.page-title,
.section-title {
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 4rem;
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
  animation-delay: 0.2s;
}

/* INTRO SECTION */
.about-intro {
  padding-top: 6rem;
  padding-bottom: 4rem;
}
.intro-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  gap: 5rem;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
.intro-text p:last-child {
  margin-bottom: 0;
}

.intro-stats {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background-color: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border);
}

.stat-card h3 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0 0 0.5rem 0;
}

.stat-card p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

/* CAREER SECTION (TIMELINE) */
.career-section {
  background-color: var(--bg-secondary);
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}
.timeline::after {
  content: "";
  position: absolute;
  width: 2px;
  background-color: var(--border);
  top: 0;
  bottom: 0;
  left: 30px;
}

.timeline-item {
  position: relative;
  padding: 0 0 3rem 80px;
}
.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-connector {
  position: absolute;
  left: 0;
  top: 5px;
  width: 60px;
  display: flex;
  justify-content: center;
}

.timeline-icon {
  width: 44px;
  height: 44px;
  background-color: var(--accent-light, #ede7f6);
  color: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border: 4px solid var(--bg-secondary);
}
.timeline-content.card {
  background-color: var(--bg-primary);
}
.period {
  display: inline-block;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.timeline-content h3 {
  margin: 0 0 0.25rem 0;
}

.company {
  color: var(--accent);
  font-weight: 600;
  margin-bottom: 1rem;
  display: block;
}

.description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.achievements {
  list-style: none;
  padding-left: 0;
  margin-bottom: 1.5rem;
}

.achievements li {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  align-items: flex-start;
}

.achievements li svg {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 4px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* EDUCATION SECTION */
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.education-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.education-icon {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background-color: var(--accent-light, #ede7f6);
  color: var(--accent);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.education-details h3 {
  margin: 0 0 0.25rem 0;
}
.institution {
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}
.year,
.gpa {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0;
}

.education-details .description {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 0.75rem;
  margin-bottom: 0;
}

/* ERROR, EMPTY & SKELETON STATES */
.error-state,
.empty-state {
  text-align: center;
}
.error-icon {
  color: var(--accent);
  margin: 0 auto 1.5rem;
}
.error-state h3,
.empty-state h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
}
.error-state p,
.empty-state p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

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
  height: 36px;
  width: 280px;
  margin: 0 auto 4rem;
}
.skeleton-timeline-item {
  height: 250px;
  max-width: 800px;
  margin: 0 auto 3rem;
  border-radius: 16px;
}
.skeleton-card {
  height: 150px;
  border-radius: 16px;
}

/* RESPONSIVE DESIGN */
@media (max-width: 992px) {
  .intro-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  .intro-text {
    order: 2;
  }
  .intro-stats {
    order: 1;
    flex-direction: row;
    justify-content: space-around;
  }
}

@media (max-width: 768px) {
  .section-spacing {
    padding: 4rem 0;
  }
  .page-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
  }
  .section-title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }

  .timeline::after {
    left: 22px;
  }
  .timeline-item {
    padding-left: 60px;
  }
  .timeline-connector {
    width: 44px;
  }
}

/* Penambahan media query untuk layar sangat kecil */
@media (max-width: 400px) {
  .timeline-item {
    /* Mengurangi padding kiri untuk memberi lebih banyak ruang bagi konten */
    padding-left: 55px;
  }
  .timeline::after {
    /* Sedikit menggeser garis timeline */
    left: 20px;
  }
  .timeline-connector {
    /* Memastikan ikon tetap di tengah */
    width: 40px;
  }
  .card {
    /* Mengurangi padding di dalam kartu umum */
    padding: 1.5rem;
  }

  /* --- Perbaikan untuk intro-stats agar bisa di-scroll --- */
  .intro-stats {
    justify-content: flex-start; /* Ganti dari space-around agar item mulai dari kiri */
    overflow-x: auto; /* Aktifkan scroll horizontal */
    padding-bottom: 1rem; /* Jarak untuk shadow & scrollbar (jika terlihat) */

    /* Sembunyikan scrollbar untuk tampilan lebih bersih */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .intro-stats::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  .intro-stats .stat-card {
    flex-shrink: 0; /* Mencegah kartu menyusut */
    flex-basis: 150px; /* Tentukan lebar dasar kartu */
    padding: 1.5rem; /* Tetapkan padding yang sudah dikurangi */
  }
  /* --- Akhir Perbaikan --- */

  .education-grid {
    /* Memastikan grid tidak memaksakan lebar minimum */
    grid-template-columns: 1fr;
  }
}
</style>
