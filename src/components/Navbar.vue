<template>
  <nav class="navbar" :class="{ 'is-scrolled': isScrolled }">
    <div class="container">
      <div class="nav-content">
        <router-link to="/" class="logo">
          <Code class="logo-icon" />
          <span>MarcYovian</span>
        </router-link>

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

        <div class="nav-right">
          <a
            href="https://github.com/MarcYovian/"
            target="_blank"
            class="social-link"
            aria-label="GitHub"
            ><Github :size="20"
          /></a>
          <a
            href="https://linkedin.com/in/marcellinus-yovian-indrastata"
            target="_blank"
            class="social-link"
            aria-label="LinkedIn"
            ><Linkedin :size="20"
          /></a>
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

          <button
            @click="toggleMobileMenu"
            class="mobile-menu-toggle mobile-only"
            aria-label="Toggle menu"
            :aria-expanded="showMobileMenu"
            aria-controls="mobile-nav-menu"
          >
            <Menu v-if="!showMobileMenu" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav-menu"
        class="mobile-nav"
        :class="{ active: showMobileMenu }"
      >
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="mobile-nav-link"
          :class="{ active: $route.path === link.path }"
          @click="showMobileMenu = false"
        >
          {{ link.name }}
        </router-link>

        <div class="mobile-nav-extras">
          <a
            href="https://github.com/MarcYovian/"
            target="_blank"
            class="social-link"
            aria-label="GitHub"
            ><Github :size="20"
          /></a>
          <a
            href="https://linkedin.com/in/marcellinus-yovian-indrastata"
            target="_blank"
            class="social-link"
            aria-label="LinkedIn"
            ><Linkedin :size="20"
          /></a>
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Code, Github, Linkedin, Menu, Moon, Sun, X } from "lucide-vue-next";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useThemeStore } from "../stores/theme";

const themeStore = useThemeStore();
const showMobileMenu = ref(false);
const isScrolled = ref(false);

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Achievements", path: "/achievements" },
  { name: "Projects", path: "/projects" },
  { name: "Contacts", path: "/contacts" },
];

const toggleTheme = () => themeStore.toggleTheme();
const toggleMobileMenu = () => (showMobileMenu.value = !showMobileMenu.value);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(showMobileMenu, (isActive) => {
  document.body.style.overflow = isActive ? "hidden" : "";
});
</script>

<style scoped>
/* Gaya yang sudah ada... */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(var(--bg-primary-rgb), 0.8);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.navbar.is-scrolled {
  background-color: rgba(var(--bg-primary-rgb), 0.95);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.mobile-nav.active {
  max-height: 350px; /* Sedikit diperbesar untuk memberi ruang */
}
.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.2s ease, background-color 0.2s ease;
}
.mobile-nav-link.active {
  color: var(--accent);
}
.mobile-nav-link:hover {
  color: var(--accent);
  background-color: var(--bg-tertiary);
}

/* Bagian baru untuk extra buttons di mobile menu */
.mobile-nav-extras {
  display: none; /* Sembunyikan secara default */
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-top: 1px solid var(--border);
}

/* Tampilkan menu mobile di bawah 768px */
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

/* === MEDIA QUERY BARU === */
/* Aturan khusus untuk layar sangat kecil (< 350px) */
@media (max-width: 349px) {
  /* 1. Sembunyikan ikon di baris utama */
  .nav-right .social-link,
  .nav-right .theme-toggle {
    display: none;
  }

  /* 2. Tampilkan ikon di dalam menu mobile */
  .mobile-nav-extras {
    display: flex;
  }
}
</style>
