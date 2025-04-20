<template>
    <form class="feedback-form" @submit.prevent="submitForm">
        <pre>
            {{ form }}
            {{ errors }}
        </pre>
        <textarea v-model="form.message" class="feedback-form__textarea" cols="30" rows="4"></textarea>
        <shared-input-ui 
            v-model="form.tel" 
            :value="form.tel" 
            parentClass="feedback-form__input" 
            type="tel" 
            placeholder="Телефон" 
            v-input-mask="'+7(###)-###-##-##'"
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

        <button class="feedback-form__button">Отправить</button>

        <p class="feedback-form__error" v-if="errorMessage">{{ errorMessage }}</p>
        <div v-if="isPending">Отпрвка: {{ form }}</div>
    </form>
</template>

<script lang="ts" setup>
const form = reactive({
    tel: '',
    email: '',
    telegram: '',
    checkbox: false,
    message: '',
})

const isPending = ref(false);
const errorMessage = ref('');
const errors: { [key: string]: string } = reactive({
    email: '',
    telegram: '',
})

const validateForm = () => {
    Object.keys(errors).forEach(key => errors[key] = '');

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
};

const submitForm = async () => {
    console.log(1);
    
    if (!validateForm()) return;
    console.log(2);
    
    try {
        console.log(3);
        isPending.value = true
    } catch (error) {
        console.log(4);
        errorMessage.value = (error as Error).message
    } finally {
        console.log(5);
        isPending.value = false
    }
}
</script>

<style lang="scss" scoped>
@use 'index' as *;
</style>