import { createStore } from 'vuex'
// 从本地存储中获取数据
const storedState = JSON.parse(localStorage.getItem('todos'));

const store = createStore({
    // 状态（数据）
    state() {
        return {
            todos: [
                {text:'唱',id:0,tag:'艺术'},
                {text:'跳',id:1,tag:'艺术'},
                {text:'rwp',id:2,tag:'艺术'},
                {text:'篮球',id:3,tag:'艺术'},
                {text:'鸡',id:4,tag:'艺术'},
                {text:'🍅',id:5,tag:'美食'},
                {text:'🍋',id:6,tag:'美食'},
                {text:'🍬',id:7,tag:'美食'},
                {text:'🍳',id:8,tag:'美食'},
                {text:'🥩',id:9,tag:'美食'},

            ],
            id:0,
            selectTodos:[],
            isSelect:false,
            isAll:false,
        };
    },
    // 修改状态的方法（同步）
    mutations: {
        setTodo: (state, todos) => {
            state.todos = todos
            // console.log(state.todos);
        },

        deleteTodo:(state,id)=>{
            if (id==='all') {
                store.state.isAll = false
                state.todos = state.todos.filter((item)=>!item.line)
                state.selectTodos=state.selectTodos.filter((item)=>!item.line)
            }else{
                state.todos = state.todos.filter((item)=>item.id!==id)
                state.selectTodos=state.selectTodos.filter((item)=>item.id!==id)
            }
            
            // console.log(state.todos);
        },
        selectTodo:(state,text)=>{
            // 正则构造函数查询
            const regex = new RegExp(text,'gim')
            state.selectTodos = state.todos.filter((item)=>{
                // 遇到多个相同的查询结果时总是少一个，加上全等查询的结果就行了
               return (regex.test(item.text)) || (item.text === text)
            })
            state.isSelect =true
            console.log(state.selectTodos,state.isSelect);

        }

    },
    // 触发 mutations 的方法（可以是异步操作）
    actions: {
        addTodo: ({ commit, state }, text) => { 
                const todoData = {}
                todoData.text = text
                todoData.id = state.id++
            // console.log('执行addTodo');
            commit('setTodo', [...state.todos, todoData])
        },
        deleteTodo:({commit} , id)=>{
            commit('deleteTodo',id)
        },
        selectTodo:({commit},text)=>{
            commit('selectTodo',text)
        }
       
    },
    // 获取状态的方法（可以进行计算）
    getters: {
        allTodos:(state)=>{
            return state.todos
        },
        selectTodo:(state)=>{
            return state.selectTodos
        }
        
    },
})

export default store