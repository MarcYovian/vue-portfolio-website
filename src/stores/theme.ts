import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(true) // Default to dark theme
  
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateDocumentTheme()
  }
  
  const updateDocumentTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }
  
  // Initialize theme on store creation
  updateDocumentTheme()
  
  return {
    isDark,
    toggleTheme
  }
})