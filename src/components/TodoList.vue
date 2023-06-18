<template>
    <!-- 显示代办事项 -->
    <el-card class="box-card" v-if="todos.length == 0 ? false : true">
        <div v-for="(todo,index) in todos" :key="todo.id" class="item ">
            <div class="list-box" @keydown.enter="editTodo(todo.id,todo.text),isEditing=!isEditing">
                <el-tag style="margin-right: 10px;">{{ index +1 }}</el-tag>
                <span class="list" @dblclick="isEditing=!isEditing" 
                v-show="isEditing" :style="todo.line" >
                {{ todo.text==='' ? NaN :todo.text }}
                </span>
                <input style="border: none; outline: none; font-size: 15px;" type="text" v-model="todo.text" v-if="!isEditing" @blur="editTodo(todo.id,todo.text),isEditing=!isEditing">
            </div>
            <div class="alter-box">
                <el-icon size="20" color="#337ecc"  ><Select @click="addLine(todo.id)"/></el-icon>
                <!-- <el-button class="delete"  @click="editTodo(todo.id)" style="margin-left: 10px;">编辑</el-button> -->
                <el-button class="delete"  @click="deleteTodo(todo.id)" style="margin-left: 10px;">删除</el-button>
            </div>

        </div>
    </el-card>
    <!-- <ul>
        <li v-for="todo in todos" :key="todo.id" >
            <span>{{ todo.text}}</span>
            <button @click="deleteTodo(todo.id)" >删除</button>
        </li>
    </ul> -->
</template>

<script setup>
import { useStore } from 'vuex'
import { computed,ref} from 'vue';
const store = useStore()
const isEditing =ref(true)
const todos = computed(() => {
    // console.log(todos);
    return store.getters.allTodos
})
// 删除
const deleteTodo = (id) => {
    
    store.dispatch('deleteTodo', id)
    // console.log(todos.value);
}
// 当todo.text为空时删除该条事项
const editTodo = (id,text)=>{
    if (text.trim()==='') {
        deleteTodo(id)
    }
} 
// 添加删除线
const addLine = (id) => {
    const todo = todos.value.find((item)=>item.id === id)
    todo.line = todo.line ? '': 'text-decoration: line-through #337ecc 3px'
    console.log(todos.value);
}
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.item {
    font-size: 14px;
    margin-bottom: 18px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.box-card {
    width: 480px;
}

.line {
    text-decoration: line-through #337ecc 3px
}
.list-box{
    display: flex; 
    align-items: center;
}
.list{
    flex-shrink: 0;
    width: 170px;
}
.alter-box{
    display: flex;
    align-items: center;
}
</style>