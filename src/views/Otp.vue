<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { verifyCode } from '@/servies/auth'

const router = useRouter()
const authStore = useAuthStore()

const inputRef0 = ref<HTMLInputElement | null>(null)
const inputRef1 = ref<HTMLInputElement | null>(null)
const inputRef2 = ref<HTMLInputElement | null>(null)
const inputRef3 = ref<HTMLInputElement | null>(null)

type CodeList = [string, string, string, string]
const codeList = ref<CodeList>(['', '', '', ''])

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

    authStore.loginHandler(res.data.token!)
    router.push({ name: 'Profile' })
  } catch (error) {
    errorMessage.value = 'Server Error'
  } finally {
    isLoading.value = false
    if (errorMessage.value) nextTick(nextStepHandler)
  }
}

function keydownHandler(e: KeyboardEvent, index: number) {
  if (e.code !== 'Backspace') return

  const target = e.target as HTMLInputElement
  const oldValue = codeList.value[index]
  codeList.value[index] = ''
  target.value = ''
  if (oldValue !== '') return

  setTimeout(() => {
    if (index === 0) return
    nextStepHandler(index - 1)
  })
}

function inputHandler(e: Event, index: number) {
  const target = e.target as HTMLInputElement
  const inputValue = (e as InputEvent).data ?? ''
  const oldValue = codeList.value[index]
  const isNumber = /^\d$/.test(inputValue)
  if (isNumber === false) {
    target.value = oldValue
    return
  }

  codeList.value[index] = inputValue
  target.value = inputValue
  setTimeout(() => {
    nextStepHandler(index + 1)
  })
}

function nextStepHandler(index: number = 0) {
  switch (index) {
    case 0:
      inputRef0.value?.focus()
      break
    case 1:
      inputRef1.value?.focus()
      break
    case 2:
      inputRef2.value?.focus()
      break
    case 3:
      inputRef3.value?.focus()
      break
    case 4:
      submit()
      break
  }
}

function pasteHandler(e: ClipboardEvent) {
  const text = e.clipboardData?.getData('text') ?? ''
  const filteredList = text
    .split('')
    .filter((char) => /^\d$/.test(char))
    .slice(0, 4)
  const copyCodeList = filteredList.reduce<CodeList>(
    (list, char, index) => {
      list[index] = char
      return list
    },
    ['', '', '', '']
  )
  codeList.value = copyCodeList
  nextStepHandler(filteredList.length)
}

onMounted(() => {
  nextStepHandler()
  document.addEventListener('paste', pasteHandler)
})
onUnmounted(() => {
  document.removeEventListener('paste', pasteHandler)
})
</script>

<template>
  <div class="otp">
    <h1 class="otp-title">Enter verification</h1>

    <div class="otp-inputs">
      <input
        ref="inputRef0"
        :value="codeList[0]"
        type="text"
        :disabled="isLoading"
        @keydown="keydownHandler($event, 0)"
        @input="inputHandler($event, 0)"
      />
      <input
        ref="inputRef1"
        :value="codeList[1]"
        type="text"
        :disabled="isLoading"
        @keydown="keydownHandler($event, 1)"
        @input="inputHandler($event, 1)"
      />
      <input
        ref="inputRef2"
        :value="codeList[2]"
        type="text"
        :disabled="isLoading"
        @keydown="keydownHandler($event, 2)"
        @input="inputHandler($event, 2)"
      />
      <input
        ref="inputRef3"
        :value="codeList[3]"
        type="text"
        :disabled="isLoading"
        @keydown="keydownHandler($event, 3)"
        @input="inputHandler($event, 3)"
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
