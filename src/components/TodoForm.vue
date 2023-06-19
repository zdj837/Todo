<template>
    <!-- 输入表单 -->
    <el-form class="inputForm" @submit.prevent = "addTodo">
        <el-input v-model="newText" placeholder="请输入待办事项" style="width: 450px;"/>
        <el-button  type="primary" @click="addTodo"> 添加</el-button>
        <el-button class="select"  v-show="!store.state.isSelect" @click="selectTodo" style="margin-left: 10px;">查询</el-button>
        <el-button class="select"  v-show="store.state.isSelect"  @click="store.state.isSelect=false" style="margin-left: 10px;">返回</el-button>
    </el-form>
    
</template>
<script setup>
    import {ref} from 'vue'
    import {useStore} from 'vuex'

    let newText=ref('')
    const store = useStore()
    // 添加
   const addTodo = ()=>{
    if(newText.value.trim()!==''){
        store.state.isSelect=false
    store.dispatch('addTodo' ,newText.value)
    }
    newText.value = '' 
   }
   // 查询
const selectTodo =()=>{
    if(newText.value.trim()!==''){
        store.dispatch('selectTodo',newText.value)
    }
    newText.value = '' 
}
</script>
<style scoped>
.inputForm{
    margin-left: 70px;
}
</style>