<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { verifyCode } from '@/servies/auth'

const router = useRouter()
const authStore = useAuthStore()

const CODE_NUMBER = 4
function getInitialCodeList() {
  return Array(CODE_NUMBER).fill('')
}

let isComposition = false
const inputRef = ref<(HTMLInputElement | null)[]>([])
const codeList = ref<string[]>(getInitialCodeList())
function beforeInputHandler(index: number) {
  if (isComposition) return

  codeList.value[index] = ''
}
function inputHandler(index: number) {
  if (isComposition) return

  codeList.value[index] = codeList.value[index].match(/\d/)?.[0] ?? ''
  if (!codeList.value[index]) return

  nextStepHandler(index + 1)
}
function backspaceHandler(index: number) {
  if (index === 0) return

  nextStepHandler(index - 1)
}

function compositionstartHandler() {
  isComposition = true
}
function compositionendHandler(e: CompositionEvent, index: number) {
  isComposition = false
  codeList.value[index] = e.data
  inputHandler(index)
}

function nextStepHandler(index: number) {
  const input = inputRef.value[index]
  if (input) {
    input?.focus()
    return
  }

  submit()
}

function pasteHandler(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text') ?? ''
  const filteredText = text.replace(/\D/g, '')
  codeList.value = getInitialCodeList().map((code, index) => filteredText[index] ?? code)
  nextStepHandler(filteredText.length)
}

const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
async function submit() {
  if (isLoading.value) return

  try {
    errorMessage.value = null
    isLoading.value = true
    const data = { code: codeList.value.join('') }
    const res = await verifyCode(data)
    if (res.data.valid === false) {
      errorMessage.value = 'Code Error'
      return
    }

    authStore.loginHandler(res.data.token)
    router.push({ name: 'Profile' })
  } catch (error) {
    errorMessage.value = 'Server Error'
  } finally {
    isLoading.value = false
    nextTick(() => nextStepHandler(0))
  }
}

onMounted(() => nextStepHandler(0))
</script>

<template>
  <div class="otp" @paste="pasteHandler">
    <h1 class="otp-title">Enter verification</h1>

    <div class="otp-inputs">
      <input
        v-for="(code, index) in codeList"
        :key="index"
        ref="inputRef"
        v-model="codeList[index]"
        type="text"
        :disabled="isLoading"
        @beforeinput="beforeInputHandler(index)"
        @input="inputHandler(index)"
        @keyup.backspace="backspaceHandler(index)"
        @compositionstart="compositionstartHandler"
        @compositionend="compositionendHandler($event, index)"
      />
    </div>

    <div class="otp-message">
      <p v-if="isLoading" class="otp-loading">loading...</p>
      <p v-if="errorMessage" class="otp-error">{{ errorMessage }}</p>
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
  text-align: center;
  margin: 0 0 2rem 0;
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

.otp-message {
  height: 2.5rem;
  margin: 2rem 0 0 0;
}
.otp-loading {
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
}

.otp-error {
  font-size: 2rem;
  color: red;
  text-align: center;
}
</style>
