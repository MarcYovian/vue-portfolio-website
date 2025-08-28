<template>
  <span class="typing-container">
    <span class="typing-text">{{ displayText }}</span>
    <span class="cursor" :class="{ blink: showCursor }">|</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}>()

const displayText = ref('')
const showCursor = ref(true)
const currentWordIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)
let timeoutId: number | null = null

const type = () => {
  const currentWord = props.words[currentWordIndex.value]
  
  if (isDeleting.value) {
    displayText.value = currentWord.substring(0, currentCharIndex.value - 1)
    currentCharIndex.value--
    
    if (currentCharIndex.value === 0) {
      isDeleting.value = false
      currentWordIndex.value = (currentWordIndex.value + 1) % props.words.length
      timeoutId = window.setTimeout(type, 200)
    } else {
      timeoutId = window.setTimeout(type, props.deleteSpeed || 50)
    }
  } else {
    displayText.value = currentWord.substring(0, currentCharIndex.value + 1)
    currentCharIndex.value++
    
    if (currentCharIndex.value === currentWord.length) {
      isDeleting.value = true
      timeoutId = window.setTimeout(type, props.pauseTime || 2000)
    } else {
      timeoutId = window.setTimeout(type, props.typeSpeed || 150)
    }
  }
}

onMounted(() => {
  type()
  
  // Cursor blink animation
  setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<style scoped>
.typing-container {
  display: inline-block;
}

.typing-text {
  color: var(--accent);
  font-weight: 600;
}

.cursor {
  color: var(--accent);
  font-weight: 300;
  opacity: 1;
  transition: opacity 0.1s ease;
}

.cursor.blink {
  opacity: 0;
}
</style>