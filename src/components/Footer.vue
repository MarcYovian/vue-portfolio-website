<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>&copy; 2025 MarcYovian. All rights reserved.</p>
        <a
          href="https://github.com/MarcYovian"
          target="_blank"
          class="source-link"
        >
          Built with ❤️
          <ExternalLink :size="16" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ExternalLink } from "lucide-vue-next";
</script>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.source-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
