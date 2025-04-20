<template>
    <form class="feedback-form" @submit.prevent="submitForm">
        <textarea v-model="form.message" class="feedback-form__textarea" cols="30" rows="4" placeholder="Комментарий"></textarea>
        <shared-input-ui 
            v-model="form.tel" 
            :value="form.tel" 
            parentClass="feedback-form__input" 
            type="tel" 
            placeholder="Телефон" 
            @input="handlePhoneInput"
            ref="phoneInput"
        />
        <shared-input-ui 
            v-model="form.email" 
            parentClass="feedback-form__input"
            :value="form.email"
            type="email" 
            placeholder="E-mail"
            :required="true"
            :errorText="errors.email" 
            :isError="!!errors.email" 
        />
        <shared-input-ui 
            v-model="form.telegram"
            :value="form.telegram"
            parentClass="feedback-form__input" 
            type="text" 
            placeholder="Телеграм"
            :errorText="errors.telegram" 
            :isError="!!errors.telegram" 
        />
        <label class="feedback-form__checkbox">
            <input v-model="form.checkbox" type="checkbox" />
            <span>Прошу не звонить и написать мне в мессенджер</span>
        </label>

        <shared-button-ui class="feedback-form__button">Отправить</shared-button-ui>

        <p class="feedback-form__error" v-if="errorMessage">{{ errorMessage }}</p>
        <div v-if="isPending">Отпрвка: {{ form }}</div>
    </form>
</template>

<script lang="ts" setup>
interface FeedbackForm {
    tel: string;
    email: string;
    telegram: string;
    checkbox: boolean;
    message: string;
    taskId?: number;
}

interface FormErrors {
    email: string;
    telegram: string;
}

const phoneInput = ref<HTMLInputElement | null>(null);
const phoneBuffer = ref('');
const timerRef = ref<ReturnType<typeof setTimeout> | null>(null);
const form = reactive<FeedbackForm>({
    tel: '',
    email: '',
    telegram: '',
    checkbox: false,
    message: '',
});

const isPending = ref(false);
const errorMessage = ref('');
const errors = reactive<FormErrors>({
    email: '',
    telegram: '',
});

const validateForm = (): boolean => {
    (Object.keys(errors) as Array<keyof FormErrors>).forEach(key => errors[key] = '');

    if (!form.telegram.trim()) {
        errors.telegram = 'Обязательное поле';
        return false;
    }

    if (!form.email.trim()) {
        errors.email = 'Электронная почта обязательна';
        return false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        errors.email = 'Некорректная электронная почта';
        return false;
    }
    return true;
};

const formatPhoneNumber = (value: string) => {
    let digits = value.replace(/\D/g, '');
    
    // Если первый символ 8 или 9, заменяем на 7
    if (digits.startsWith('8') || digits.startsWith('9')) {
        digits = '7' + digits.substring(1);
    }
    
    // Всегда возвращаем +7 если нет цифр или только 7
    if (!digits) return '+7';
    
    // Добавляем 7 в начало, если её нет
    if (!digits.startsWith('7')) {
        digits = '7' + digits;
    }
    
    // Ограничиваем длину до 11 цифр
    digits = digits.slice(0, 11);

    if (digits.length <= 1) return '+7';
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
};

const handlePhoneInput = (event: InputEvent) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const cursorPosition = input.selectionStart;
    const previousLength = form.tel.length;
    
    const previousValue = form.tel;
    let currentDigits = value.replace(/\D/g, '');
    
    // Ограничиваем количество цифр до 11
    if (currentDigits.length > 11) {
        currentDigits = currentDigits.slice(0, 11);
    }
    
    // Защита от удаления +7
    if (previousValue.startsWith('+7') && value.length < previousValue.length && cursorPosition !== null && cursorPosition <= 2) {
        form.tel = '+7';
        return;
    }
    
    phoneBuffer.value = currentDigits;
    
    if (timerRef.value) {
        clearTimeout(timerRef.value);
    }
    
    timerRef.value = setTimeout(() => {
        form.tel = formatPhoneNumber(phoneBuffer.value);
        
        if (input === document.activeElement) {
            const newLength = form.tel.length;
            const newPosition = cursorPosition !== null ? cursorPosition + (newLength - previousLength) : 2;
            input.setSelectionRange(Math.max(2, newPosition), Math.max(2, newPosition));
        }
    }, 0);
};

onUnmounted(() => {
    if (timerRef.value) {
        clearTimeout(timerRef.value);
    }
});
const route = useRoute()
const { show } = storeToRefs(useFeedbackModal())

const submitForm = async () => {
    if (!validateForm()) return;
    try {
        isPending.value = true
        form.taskId = Number(route.params.id)
        const response = await $fetch(`/api/tasks/active/${route.params.id}`, {
            method: 'POST',
            body: form
        })
        if (response.success) {
            show.value = false
            await navigateTo('/tasks/active')
        }
    } catch (error) {
        errorMessage.value = (error as Error).message
    } finally {
        isPending.value = false
    }
}
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>