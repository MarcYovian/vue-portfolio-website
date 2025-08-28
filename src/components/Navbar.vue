<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <Code class="logo-icon" />
          <span>MarcYovian</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="nav-links desktop-nav">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="nav-link"
            :class="{ active: $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Right Side -->
        <div class="nav-right">
          <!-- Social Links -->
          <a
            href="https://github.com/MarcYovian/"
            target="_blank"
            class="social-link"
            aria-label="GitHub"
          >
            <Github :size="20" />
          </a>
          <a
            href="https://linkedin.com/in/marcellinus-yovian-indrastata"
            target="_blank"
            class="social-link"
            aria-label="LinkedIn"
          >
            <Linkedin :size="20" />
          </a>

          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="theme-toggle"
            :aria-label="
              themeStore.isDark
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            "
          >
            <Sun v-if="themeStore.isDark" :size="20" />
            <Moon v-else :size="20" />
          </button>

          <!-- Mobile Menu Toggle -->
          <button
            @click="toggleMobileMenu"
            class="mobile-menu-toggle mobile-only"
            aria-label="Toggle menu"
          >
            <Menu v-if="!showMobileMenu" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="mobile-nav" :class="{ active: showMobileMenu }">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="mobile-nav-link"
          @click="showMobileMenu = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Code, Github, Linkedin, Menu, Moon, Sun, X } from "lucide-vue-next";
import { ref } from "vue";
// import { useRoute } from "vue-router";
import { useThemeStore } from "../stores/theme";

// const route = useRoute();
const themeStore = useThemeStore();
const showMobileMenu = ref(false);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  // { name: 'Achievements', path: '/achievements' },
  { name: "Projects", path: "/projects" },
  { name: "Contacts", path: "/contacts" },
];

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
}

.logo-icon {
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--accent);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--accent);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-link,
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--text-secondary);
  background: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-link:hover,
.theme-toggle:hover {
  color: var(--accent);
  background-color: var(--bg-secondary);
}

.mobile-menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.mobile-nav {
  display: none;
  flex-direction: column;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 1rem 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.mobile-nav.active {
  max-height: 300px;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.mobile-nav-link:hover {
  color: var(--accent);
  background-color: var(--bg-tertiary);
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .mobile-nav {
    display: flex;
  }
}
</style>
