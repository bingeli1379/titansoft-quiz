<template>
  <div class="otp">
    <h1 class="otp-title">Enter verification</h1>
    <div class="otp-inputs">
      <input type="text" />
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
  </div>
</template>

<style scoped>
.otp {
  margin: 2rem;
}

.otp-title {
  color: #ffffff;
  font-size: 3rem;
  white-space: nowrap;
  margin-bottom: 2rem;
}
@media (max-width: 640px) {
  .otp-title {
    font-size: 2rem;
  }
}

.otp-inputs {
  display: flex;
  gap: 1rem;
}
.otp-inputs input {
  width: 8rem;
  height: 11rem;
  border: 2px solid #626262;
  border-radius: 0.25rem;
  color: #ffffff;
  background-color: #3b3b3b;
  font-size: 8rem;
  text-align: center;
}
@media (max-width: 640px) {
  .otp-inputs input {
    width: 3.5rem;
    height: 6rem;
    font-size: 3.5rem;
  }
}
</style>
