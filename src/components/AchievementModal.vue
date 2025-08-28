<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <button @click="$emit('close')" class="modal-close" aria-label="Close modal">
        <X :size="24" />
      </button>
      
      <div class="modal-body">
        <div class="achievement-image">
          <img :src="achievement.image" :alt="achievement.title" />
        </div>
        
        <div class="achievement-details">
          <h3>{{ achievement.title }}</h3>
          <p class="issuer">{{ achievement.issuer }}</p>
          <p class="date">{{ achievement.date }}</p>
          <p class="description">{{ achievement.description }}</p>
          
          <div class="modal-actions">
            <a 
              v-if="achievement.credentialUrl" 
              :href="achievement.credentialUrl" 
              target="_blank" 
              class="btn btn-primary"
            >
              View Credential
              <ExternalLink :size="16" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, ExternalLink } from 'lucide-vue-next'

defineProps<{
  achievement: {
    id: number
    title: string
    issuer: string
    date: string
    image: string
    description: string
    credentialUrl?: string
  }
}>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background-color: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border: none;
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 1;
}

.modal-close:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.modal-body {
  padding: 2rem;
}

.achievement-image {
  text-align: center;
  margin-bottom: 2rem;
}

.achievement-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px var(--shadow);
}

.achievement-details h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.issuer {
  color: var(--accent);
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.date {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.description {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.modal-actions {
  text-align: center;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 0.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
}
</style>