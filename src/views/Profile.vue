<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const profile = ref(authStore.profile)

function logout() {
  authStore.logoutHandler()
  router.push({ name: 'Otp' })
}
</script>

<template>
  <div class="profile">
    <div class="profile-card">
      <img class="profile-photo" :src="profile?.photo" alt="user photo" />

      <div class="profile-card-content">
        <p class="profile-quote">
          {{ profile?.quote }}
        </p>
        <span class="profile-name">{{ profile?.username }}</span>
        <button class="profile-logout" @click="logout">logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  width: 100%;
  margin: 2rem;
}

.profile-card {
  width: 50%;
  border: 1px solid #30538d;
  border-radius: 1rem;
  background-color: #1e293b;
  display: flex;
  margin: auto;
}
@media (max-width: 640px) {
  .profile-card {
    width: 100%;
    flex-direction: column;
  }
}

.profile-photo {
  max-width: 30%;
  aspect-ratio: 1 / 1.75;
  object-fit: contain;
  border-radius: 1rem;
}
@media (max-width: 640px) {
  .profile-photo {
    margin: auto;
  }
}

.profile-card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 2rem;
  margin-top: 7%;
}
@media (max-width: 640px) {
  .profile-card-content {
    margin-top: 0;
  }
}

.profile-quote {
  color: #ffffff;
  margin: 0;
}

.profile-name {
  color: #0ea5e9;
}

.profile-logout {
  display: block;
  background-color: #0ea5e9;
  color: #ffffff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-top: auto;
}
.profile-logout:hover {
  background-color: #028ac7;
}
.profile-logout:active {
  background-color: #0370a1;
}
</style>
