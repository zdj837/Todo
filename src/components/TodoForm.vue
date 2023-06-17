<template>
    <!-- 输入表单 -->
    <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodo">
        <button type="submit">添加</button>
    </form>
</template>
<script setup>
    import {ref} from 'vue'
    import {useStore} from 'vuex'

    let newTodo=ref('')
    const store = useStore()
   const addTodo = ()=>{
    if(newTodo.value.trim()!==''){
    store.dispatch('addTodo' ,newTodo.value)
    }
    newTodo.value = '' 
   }
   
</script>