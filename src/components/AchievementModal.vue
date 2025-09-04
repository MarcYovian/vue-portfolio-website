<template>
  <Transition name="modal-fade">
    <div class="modal-overlay" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <button
          @click="$emit('close')"
          class="modal-close"
          aria-label="Close modal"
        >
          <X :size="24" />
        </button>

        <div class="modal-body">
          <div class="achievement-image-wrapper">
            <img :src="achievement.image_url" :alt="achievement.title" />
          </div>

          <div class="achievement-details">
            <h2 class="modal-title">{{ achievement.title }}</h2>
            <p class="issuer">
              <Award :size="16" />
              <span>{{ achievement.issuer }}</span>
            </p>
            <p class="date">
              <Calendar :size="16" />
              <span>{{ achievement.date }}</span>
            </p>
            <p class="description">{{ achievement.description }}</p>

            <div class="modal-actions">
              <a
                v-if="achievement.credential_url"
                :href="achievement.credential_url"
                target="_blank"
                rel="noopener noreferrer"
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
  </Transition>
</template>

<script setup lang="ts">
import { Award, Calendar, ExternalLink, X } from "lucide-vue-next";

defineProps<{
  achievement: {
    id: number;
    title: string;
    issuer: string;
    date: string;
    image_url: string;
    description: string;
    credential_url?: string;
  };
}>();

defineEmits<{
  close: [];
}>();
</script>

<style scoped>
/* MODAL TRANSITIONS */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s ease;
}
.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.95);
}

/* MODAL OVERLAY & CONTENT */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
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
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
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
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.modal-close:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  transform: rotate(90deg);
}

/* MODAL BODY LAYOUT */
.modal-body {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2.5rem;
  padding: 2.5rem;
}

.achievement-image-wrapper {
  background-color: var(--bg-secondary);
  border-radius: 12px;
  overflow: hidden;
  align-self: start;
}

.achievement-image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

/* ACHIEVEMENT DETAILS */
.modal-title {
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.3;
}

.issuer,
.date {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}
.issuer span,
.date span {
  font-size: 0.95rem;
}
.issuer svg {
  color: var(--accent);
}
.date svg {
  color: var(--text-secondary);
}

.description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 1.5rem 0 2rem 0;
}

.modal-actions {
  text-align: left;
}
.modal-actions .btn {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

/* RESPONSIVE DESIGN FOR MODAL */
@media (max-width: 768px) {
  .modal-body {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
  .modal-title {
    font-size: 1.5rem;
  }
  .modal-close {
    top: 0.75rem;
    right: 0.75rem;
  }
}
</style>
