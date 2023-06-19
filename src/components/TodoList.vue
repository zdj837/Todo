<template>
    <!-- 显示代办事项 -->
    <el-card class="box-card" v-if="todos.length == 0 ? false : true">
        <template #header>
            <div class="card-header">
                <span>任务</span>
                <div>
                    <el-button class="button" v-show="!store.state.isAll" @click="addLine('all')">全选</el-button>
                    <el-button class="button" v-show="store.state.isAll" @click="addLine('cancelAll')">取消</el-button>
                    <el-button class="button" @click="deleteTodo('all')">全部删除</el-button>
                </div>
            </div>
        </template>
        <!--  -->
        <div v-for="(todo, index) in paginatedTodos" :key="todo.id" class="item ">
            <div class="list-box"  @keydown.enter="editTodo(todo.id, todo.text), isEditing = !isEditing">
                <el-tag style="margin-right: 10px;">{{ index + 1 }}</el-tag>
                <!-- 重要标签 -->
                <el-icon style="margin-right: 10px;" v-show="!todo.important" color="#337ecc"
                    @click="addImportant(todo.id)">
                    <Star />
                </el-icon>
                <el-icon style="margin-right: 10px;" v-if="todo.important" color="#337ecc" @click="addImportant(todo.id)">
                    <StarFilled />
                </el-icon>
                <!-- 分类标签 -->
                <el-tag @dblclick="isEditing = !isEditing" v-show="isEditing" type="danger">
                    {{ todo.tag }}
                </el-tag>
                <el-input v-if="!isEditing" v-model="todo.tag" size="small" @keyup.enter="isEditing = !isEditing"
                    @blur="isEditing = !isEditing" />
                <!-- 内容和删除 -->
                <el-tag class="list" @dblclick="isEditing = !isEditing" v-show="isEditing" :style="todo.line">
                    {{ todo.text }}
                </el-tag>
                <el-input style="border: none; outline: none; font-size: 15px;" type="text" v-model="todo.text"
                    v-if="!isEditing" @keyup.enter="isEditing = !isEditing"
                    @blur="editTodo(todo.id, todo.text), isEditing = !isEditing" />
            </div>
            <div class="alter-box">
                <!-- 备注 -->
                <el-icon style="margin-right: 10px;" v-show="!todo.document" color="#337ecc" @click="addDocument(todo.id)">
                    <DocumentAdd />
                </el-icon>
                <el-icon style="margin-right: 10px;" v-if="todo.document" color="#337ecc" @click="addDocument(todo.id)">
                    <Document />
                </el-icon>
                <!-- <el-card   v-if="true" style="display: flex; align-items: start;" class="box-card">
                    <div>{{ todo.document }}</div>
                </el-card> -->
              
                <el-icon size="20" color="#337ecc"><Select @click="addLine(todo.id)" /></el-icon>
                <el-button class="delete" @click="deleteTodo(todo.id)" style="margin-left: 10px;">删除</el-button>

            </div>
        </div>
        
    </el-card>
    
    <!-- 分页 -->
    <el-pagination small background layout="prev, pager, next" v-if="todos.length == 0 ? false : true" 
        :page-count="pages"
        v-model:current-page="page"  />
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, ref } from 'vue';
const store = useStore()
// 修改显示切换
const isEditing = ref(true)

// 分页
// 当前页
const page = ref(1)
// 每页显示多少条数据
const pageSize = 5
// 总页数
const pages = computed(() => { return Math.ceil(todos.value.length / pageSize) })
// 当前页数据
const paginatedTodos = computed(() => {
    const startIndex = (page.value - 1) * pageSize
    const endIndex = page.value * pageSize
    return todos.value.slice(startIndex, endIndex)
})
// 获取数据
const todos = computed(() => {
    // 切换显示state中 todos / selectTodos 的数据
    if (store.state.isSelect) {
        return store.getters.selectTodo
    } else {
        return store.getters.allTodos
    }


})
// 删除
const deleteTodo = (id) => {
    console.log(todos.value);
    store.dispatch('deleteTodo', id)
}
// 当todo.text为空时删除该条事项
const editTodo = (id, text) => {
    if (text.trim() === '') {
        deleteTodo(id)
    }
}
// 添加重要标记
const addImportant = (id) => {
    const todo = paginatedTodos.value.find((item) => item.id === id)
    todo.important = todo.important ? '' : 'important'
}
// 添加备注
const addDocument = (id) => {
    const todo = paginatedTodos.value.find((item) => item.id === id)
    todo.document = todo.document ? '' : 'document'
}
// 添加删除线
const addLine = (id) => {
    if (id === 'all') {
        store.state.isAll = !store.state.isAll
        paginatedTodos.value.forEach((todo) => {
            todo.line = 'text-decoration: line-through #337ecc 3px';
        });
    } else if (id === 'cancelAll') {
        store.state.isAll = !store.state.isAll
        paginatedTodos.value.forEach((todo) => {
            todo.line = ''
        });
    }
    else {
        const todo = paginatedTodos.value.find((item) => item.id === id)
        todo.line = todo.line ? '' : 'text-decoration: line-through #337ecc 3px'
    }
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

.list-box {
    display: flex;
    align-items: center;
}

.list {
    flex-shrink: 0;
    width: 170px;
}

.alter-box {
    display: flex;
    align-items: center;
}</style>