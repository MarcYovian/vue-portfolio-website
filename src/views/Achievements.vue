<template>
  <div class="achievements">
    <div class="container">
      <header class="page-header fade-in-up">
        <h1>Achievements & Certifications</h1>
        <p>A collection of my professional certifications, courses, and achievements that showcase my commitment to continuous learning and skill development.</p>
      </header>

      <div class="achievements-grid grid grid-3">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.id"
          class="achievement-card card"
          @click="openModal(achievement)"
        >
          <div class="achievement-image">
            <img :src="achievement.image" :alt="achievement.title" loading="lazy" />
            <div class="achievement-overlay">
              <Eye :size="24" />
              <span>View Certificate</span>
            </div>
          </div>
          
          <div class="achievement-content">
            <h3>{{ achievement.title }}</h3>
            <p class="issuer">{{ achievement.issuer }}</p>
            <p class="date">{{ achievement.date }}</p>
            
            <div class="achievement-tags">
              <span 
                v-for="tag in achievement.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { Eye } from 'lucide-vue-next'

const modal = inject('modal') as any

const openModal = (achievement: any) => {
  modal.openModal(achievement)
}

const achievements = [
  {
    id: 1,
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'March 2024',
    image: 'https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Demonstrated expertise in designing distributed systems and architectures on AWS platform.',
    credentialUrl: 'https://aws.amazon.com/certification/',
    tags: ['AWS', 'Cloud Architecture', 'DevOps']
  },
  {
    id: 2,
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: 'January 2024',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Certified in building scalable and reliable applications on Google Cloud Platform.',
    credentialUrl: 'https://cloud.google.com/certification/',
    tags: ['GCP', 'Cloud Development', 'Kubernetes']
  },
  {
    id: 3,
    title: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    date: 'December 2023',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Expertise in MongoDB database design, development, and administration.',
    credentialUrl: 'https://university.mongodb.com/',
    tags: ['MongoDB', 'NoSQL', 'Database']
  },
  {
    id: 4,
    title: 'React Advanced Patterns',
    issuer: 'Meta (Facebook)',
    date: 'November 2023',
    image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Advanced React concepts including hooks, context, and performance optimization.',
    credentialUrl: 'https://developers.facebook.com/docs/react/',
    tags: ['React', 'Frontend', 'JavaScript']
  },
  {
    id: 5,
    title: 'Machine Learning Specialization',
    issuer: 'Stanford University (Coursera)',
    date: 'October 2023',
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Comprehensive course covering supervised learning, unsupervised learning, and neural networks.',
    credentialUrl: 'https://www.coursera.org/specializations/machine-learning',
    tags: ['Machine Learning', 'Python', 'AI']
  },
  {
    id: 6,
    title: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: 'September 2023',
    image: 'https://images.pexels.com/photos/6963944/pexels-photo-6963944.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Proficiency in Docker containerization, orchestration, and best practices.',
    credentialUrl: 'https://www.docker.com/certification/',
    tags: ['Docker', 'Containerization', 'DevOps']
  },
  {
    id: 7,
    title: 'Vue.js 3 Certification',
    issuer: 'Vue School',
    date: 'August 2023',
    image: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Mastery of Vue.js 3 Composition API, Pinia, and modern Vue.js development practices.',
    credentialUrl: 'https://vueschool.io/',
    tags: ['Vue.js', 'Frontend', 'JavaScript']
  },
  {
    id: 8,
    title: 'Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    date: 'July 2023',
    image: 'https://images.pexels.com/photos/11035226/pexels-photo-11035226.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Hands-on certification demonstrating skills in Kubernetes cluster administration.',
    credentialUrl: 'https://www.cncf.io/certification/cka/',
    tags: ['Kubernetes', 'Container Orchestration', 'DevOps']
  },
  {
    id: 9,
    title: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: 'June 2023',
    image: 'https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Demonstrated proficiency in building and deploying machine learning models using TensorFlow.',
    credentialUrl: 'https://www.tensorflow.org/certificate',
    tags: ['TensorFlow', 'Deep Learning', 'AI']
  }
]
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
}

.achievement-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px var(--shadow);
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
</style>