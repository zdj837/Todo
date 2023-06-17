<template>
    <!-- 显示代办事项 -->
    <ul>
        <li v-for="todo in todos" :key="todo.id" >
            <span>{{ todo.text}}</span>
            <button @click="deleteTodo(todo.id)" >删除</button>
        </li>
    </ul>
</template>

<script setup>
import {useStore} from 'vuex'
import { computed } from 'vue';
const store= useStore()
const todos =computed(()=>{
    return store.getters.allTodos
})
const deleteTodo = (id)=>{
    store.dispatch('deleteTodo' ,id)
}
</script>