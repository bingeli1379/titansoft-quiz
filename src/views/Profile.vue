<template>
  <div class="profile">
    <div class="profile-card">
      <img
        class="profile-photo"
        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS1TTHZiu4zTDCtRsJaDz7r2WwObPkGpX46r_IQDhLb5ZIywFz4UGkd5_5sy1lEH5WYRIbsbSdwW42HJVnJDhnIgvzAJfhh0vlmY_rj_Q"
        alt="user photo"
      />

      <div class="profile-card-content">
        <p class="profile-quote">
          123132132
          <!-- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum nulla laborum perspiciatis
          animi, obcaecati cum accusamus quas magnam in qui similique iusto necessitatibus, minima
          vitae! Velit culpa illum in nesciunt. -->
        </p>
        <span class="profile-name">name</span>
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
  padding: 2rem;
}

.profile-quote {
  color: #ffffff;
  margin: 0 0 1rem;
}

.profile-name {
  color: #0ea5e9;
}
</style>
