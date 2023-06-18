import { createStore } from 'vuex'
// 从本地存储中获取数据
const storedState = JSON.parse(localStorage.getItem('todos'));

const store = createStore({
    // 状态（数据）
    state() {
        return {
            todos: [],
            id:0,
        };
    },
    // 修改状态的方法（同步）
    mutations: {
        setTodo: (state, todos) => {
            state.todos = todos
            // console.log(state.todos);
        },

        deleteTodo:(state,id)=>{
            state.todos = state.todos.filter((item)=>item.id!==id)
            console.log(state.todos);
        }

    },
    // 触发 mutations 的方法（可以是异步操作）
    actions: {
        addTodo: ({ commit, state }, todo) => { 
                const todoData = {}
                todoData.text = todo
                todoData.id = state.id++
            // console.log('执行addTodo');
            commit('setTodo', [...state.todos, todoData])
        },
        deleteTodo:({commit} , id)=>{
            commit('deleteTodo',id)
        },
       
    },
    // 获取状态的方法（可以进行计算）
    getters: {
        allTodos:(state)=>{
            return state.todos
        },
        
    },
})

export default store