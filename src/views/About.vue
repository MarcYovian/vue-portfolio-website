<template>
  <div class="about">
    <div class="container">
      <!-- Introduction Section -->
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

      <!-- Career Timeline -->
      <section class="career-section">
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
                <span class="duration">{{ experience.duration }}</span>
              </div>

              <p class="description">{{ experience.description }}</p>

              <ul class="achievements">
                <li
                  v-for="achievement in experience.achievements"
                  :key="achievement"
                >
                  <Check :size="16" />
                  {{ achievement }}
                </li>
              </ul>

              <div class="technologies">
                <span
                  v-for="tech in experience.technologies"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Section -->
      <section class="education-section">
        <h2>Education</h2>
        <div class="education-grid grid grid-2">
          <div
            v-for="education in educationList"
            :key="education.degree"
            class="education-card card"
          >
            <div class="education-icon">
              <GraduationCap :size="32" />
            </div>

            <div class="education-content">
              <h3>{{ education.degree }}</h3>
              <p class="institution">{{ education.institution }}</p>
              <p class="year">{{ education.year }}</p>
              <p v-if="education.gpa" class="gpa">GPA: {{ education.gpa }}</p>
              <p v-if="education.description" class="description">
                {{ education.description }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, GraduationCap } from "lucide-vue-next";

const experiences = [
  {
    role: "Web Developer (Internship)",
    company: "PT Perkebunan Nusantara I Region V",
    duration: "July 2024 - December 2024",
    description:
      "Contributed to the development, maintenance, and modernization of several key internal web applications for operational efficiency, including systems for KPI monitoring, payment processing (Superman), and project management (SLA Dashboard).",
    achievements: [
      "Successfully led the migration of three core internal applications (Superman, E-Sign, Akomodasi Regional) from legacy frameworks like Laravel 6 & CodeIgniter 3 to modern Laravel 10, enhancing system performance, security, and maintainability.",
      "Engineered and deployed multiple APIs to integrate key business systems with third-party platforms like Looker for data analytics and BSSN for digital signatures, as well as enabling real-time mobile notifications via Firebase.",
      "Developed and optimized critical features across various projects, including dynamic monitoring dashboards with Chart.js, server-side data processing to handle large datasets efficiently, and implemented the Service Repository Pattern to improve code structure.",
    ],
    technologies: [
      "PHP",
      "Laravel (8, 10)",
      "CodeIgniter 3",
      "JavaScript",
      "jQuery",
      "Chart.js",
      "Firebase",
      "Git",
    ],
  },
  {
    role: "Practical Assistant (Multiple Courses)",
    company: "Telkom University Surabaya",
    duration: "September 2022 - July 2024",
    description:
      "Provided academic mentorship and support to undergraduate students across several core computer science courses, including Framework Programming, Object-Oriented Programming, and Algorithms & Data Structures.",
    achievements: [
      "Mentored and provided intensive assistance to over 100 students in Information Systems and Information Technology programs.",
      "Developed and designed practical teaching modules for courses such as Algorithms & Data Structures and Basic Algorithms & Programming.",
      "Evaluated student assignments and major projects to ensure correct application of programming principles in Laravel, Java, and C++.",
    ],
    technologies: ["Laravel", "Java", "C++", "C"],
  },
];

const educationList = [
  {
    degree: "Bachelor's Degree in Information Technology",
    institution: "Telkom University Surabaya",
    year: "September 2021 - August 2024",
    gpa: "3.87/4.0",
    description:
      "Relevant coursework includes Mobile Programming, Databases, and Algorithms & Data Structures. Actively participated in various events, including the Innovillage Competition 2023 and the Telkom University Open House.",
  },
];
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

.duration {
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

.technologies {
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
