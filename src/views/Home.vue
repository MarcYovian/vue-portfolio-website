<template>
  <div class="home">
    <!-- Hero Section -->
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

          <div class="hero-actions">
            <router-link to="/projects" class="btn btn-primary">
              <Folder :size="20" />
              View My Projects
            </router-link>
            <router-link to="/contacts" class="btn btn-secondary">
              <Mail :size="20" />
              Get In Touch
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills">
      <div class="container">
        <h2 class="section-title">Technical Skills</h2>

        <div class="skills-grid">
          <div
            v-for="category in skillCategories"
            :key="category.name"
            class="skill-category card"
          >
            <div class="category-header">
              <component :is="category.icon" :size="24" class="category-icon" />
              <h3>{{ category.name }}</h3>
            </div>

            <div class="skills-list">
              <span
                v-for="skill in category.skills"
                :key="skill"
                class="skill-tag"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <h2 class="section-title">Services I Offer</h2>

        <div class="services-grid grid grid-3">
          <div
            v-for="service in services"
            :key="service.title"
            class="service-card card"
          >
            <div class="service-icon">
              <component :is="service.icon" :size="32" />
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
  </div>
</template>

<script setup lang="ts">
import {
  Brain,
  Check,
  Database,
  Folder,
  Globe,
  Mail,
  Server,
  Settings,
  Smartphone,
} from "lucide-vue-next";
import TypingEffect from "../components/TypingEffect.vue";

const roles = [
  "Back-end Developer",
  "Mobile Developer",
  "Full-Stack Developer",
];

const skillCategories = [
  {
    name: "Back-end",
    icon: Server,
    skills: ["Php", "Python", "MySQL"],
  },
  {
    name: "Front-end",
    icon: Globe,
    skills: ["Vue.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    name: "Mobile",
    icon: Smartphone,
    skills: ["Flutter", "Firebase"],
  },
  {
    name: "Machine Learning",
    icon: Brain,
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Hugging Face",
    ],
  },
  {
    name: "Tools",
    icon: Settings,
    skills: ["Git", "Github"],
  },
];

const services = [
  {
    title: "Website Development",
    icon: Globe,
    description:
      "Responsive and user-friendly websites with modern design and optimized performance.",
    features: [
      "Responsive design",
      "Optimized performance",
      "E-commerce solutions",
      "Blog platforms",
    ],
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    description:
      "Cross-platform mobile applications with native performance and intuitive UX.",
    features: ["Android apps", "Cross-platform solutions"],
  },
  {
    title: "API Development",
    icon: Database,
    description:
      "RESTful APIs with robust architecture and comprehensive documentation.",
    features: [
      "Scalable API design",
      "Database optimization",
      "Security implementation",
      "Performance monitoring",
    ],
  },
];
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
