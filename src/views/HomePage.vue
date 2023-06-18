<template>
     
    
   <div class="box">
    <el-text type="primary"><h1 class="title">待办事项</h1></el-text>
   <TodoForm></TodoForm>
   <TodoList></TodoList>
   </div>
</template>

<script setup>
    import TodoForm from '../components/TodoForm.vue';
    import TodoList from '../components/TodoList.vue';
</script>

<style scoped>
    /* .title{
        display: flex;
        justify-content: center;
    }*/
    .box{
        display: flex;
        flex-direction: column;
        align-items: center;
    
    } 
</style>