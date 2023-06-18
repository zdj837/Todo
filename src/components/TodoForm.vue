<template>
    <!-- 输入表单 -->
    <el-form class="input" @submit.prevent = "addTodo">
        <el-input v-model="newTodo" placeholder="请输入待办事项" style="width: 450px;"/>
        <el-button  type="primary" @click="addTodo"> 添加</el-button>
    </el-form>
    
    <!-- <form @submit.prevent="addTodo">
        <input type="text" v-model="newTodo">
        <button type="submit">添加</button>
    </form> -->
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
<style scoped>

</style>