<template>
  <div class="contacts">
    <div class="container">
      <header class="page-header fade-in-up">
        <h1>Get In Touch</h1>
        <p>
          Let's discuss your next project or just say hello. I'm always excited
          to connect with fellow developers and potential collaborators.
        </p>
      </header>

      <div class="contacts-content">
        <div class="contact-info">
          <div class="info-card card">
            <div class="info-header">
              <Mail :size="32" class="info-icon" />
              <h3>Email Me</h3>
            </div>
            <p>Feel free to reach out directly</p>
            <div class="email-section">
              <span class="email">marcellinusyovian@gmail.com</span>
              <button @click="copyEmail" class="copy-btn" :title="copyMessage">
                <Copy v-if="!copied" :size="16" />
                <Check v-else :size="16" />
              </button>
            </div>
          </div>

          <div class="info-card card">
            <div class="info-header">
              <MessageCircle :size="32" class="info-icon" />
              <h3>Let's Connect</h3>
            </div>
            <p>Find me on social platforms</p>
            <div class="social-links">
              <a
                href="https://github.com/MarcYovian/"
                target="_blank"
                class="social-link"
                ><Github :size="24" /><span>GitHub</span></a
              >
              <a
                href="https://linkedin.com/in/marcellinus-yovian-indrastata"
                target="_blank"
                class="social-link"
                ><Linkedin :size="24" /><span>LinkedIn</span></a
              >
              <a
                href="https://instagram.com/marcyovian/"
                target="_blank"
                class="social-link"
                ><Instagram :size="24" /><span>Instagram</span></a
              >
            </div>
          </div>

          <div class="info-card card">
            <div class="info-header">
              <MapPin :size="32" class="info-icon" />
              <h3>Location</h3>
            </div>
            <p>Currently based in</p>
            <span class="location">Sidoarjo, Indonesia</span>
          </div>
        </div>

        <div class="contact-form">
          <div class="form-card card">
            <h3>Send a Message</h3>
            <p>Have a project in mind? Let's discuss it!</p>
            <form @submit.prevent="submitForm" class="form">
              <div class="form-group">
                <label for="name">Name *</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Your full name"
                />
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="form-input"
                  placeholder="your.email@example.com"
                />
              </div>
              <div class="form-group">
                <label for="subject">Subject *</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Project inquiry, collaboration, etc."
                />
              </div>
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  class="form-textarea"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-primary form-submit"
                :disabled="isSubmitting"
              >
                <Send v-if="!isSubmitting" :size="20" />
                <div v-else class="spinner"></div>
                {{ isSubmitting ? "Sending..." : "Send Message" }}
              </button>

              <div
                v-if="submissionMessage"
                class="form-feedback"
                :class="{
                  success: submissionStatus === 'success',
                  error: submissionStatus === 'error',
                }"
              >
                <Check v-if="submissionStatus === 'success'" :size="20" />
                <XCircle v-if="submissionStatus === 'error'" :size="20" />
                <p>{{ submissionMessage }}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import {
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-vue-next";
import { reactive, ref } from "vue";

const copied = ref(false);
const copyMessage = ref("Copy to clipboard");

const isSubmitting = ref(false);
const submissionStatus = ref(""); // 'success', 'error', atau ''
const submissionMessage = ref("");

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText("marcellinusyovian@gmail.com");
    copied.value = true;
    copyMessage.value = "Copied!";

    setTimeout(() => {
      copied.value = false;
      copyMessage.value = "Copy to clipboard";
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email:", err);
  }
};

const submitForm = async () => {
  isSubmitting.value = true;
  submissionStatus.value = "";
  submissionMessage.value = "";

  try {
    await axios.post("https://panel.marcyovian.my.id/api/messages", form);

    submissionStatus.value = "success";
    submissionMessage.value =
      "Message sent successfully! I'll get back to you soon.";

    Object.assign(form, {
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    submissionStatus.value = "error";
    if (axios.isAxiosError(error) && error.response) {
      submissionMessage.value =
        error.response.data.message ||
        "Failed to send message. Please try again later.";
    } else {
      submissionMessage.value =
        "Failed to send message. Please try again later.";
    }
    console.error("Error submitting form:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contacts {
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

.contacts-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  text-align: center;
}

.info-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.info-icon {
  color: var(--accent);
  margin-bottom: 1rem;
}

.info-card h3 {
  margin-bottom: 0.5rem;
}

.info-card p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.email-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--bg-tertiary);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
}

.email {
  font-family: var(--font-mono);
  color: var(--accent);
  font-weight: 500;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: var(--accent);
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn:hover {
  background-color: var(--accent-hover);
  transform: scale(1.05);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: var(--accent);
  color: #000;
  transform: translateX(5px);
}

.location {
  font-weight: 500;
  color: var(--accent);
}

.form-card {
  width: 100%;
}

.form-card h3 {
  margin-bottom: 0.5rem;
}

.form-card p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
}

.form-input,
.form-textarea {
  padding: 1rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-submit {
  width: 100%;
  justify-content: center;
  position: relative;
}

.form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.email {
  word-break: break-all;
}
.form-feedback {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 500;
}
.form-feedback.success {
  background-color: rgba(4, 120, 87, 0.1);
  color: #065f46;
  border: 1px solid #064e3b;
}
.form-feedback.error {
  background-color: rgba(185, 28, 28, 0.1);
  color: #991b1b;
  border: 1px solid #7f1d1d;
}
.form-feedback p {
  margin: 0;
  line-height: 1.4;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .contacts-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 2.5rem;
  }

  .contacts-content {
    gap: 2rem;
  }

  .contact-info {
    gap: 1.5rem;
  }

  .email-section {
    flex-direction: column;
    gap: 0.75rem;
  }

  .social-links {
    gap: 0.75rem;
  }

  .social-link {
    padding: 0.75rem;
  }
}
</style>
