import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        user:{
            userName:'',
            passWord:''
        },
    },
    getters:{
        user:( state ) => {
            console.log(JSON.parse(localStorage.getItem('user')))
            return state.user=JSON.parse(localStorage.getItem('user'));
        },
    },
    mutations:{
        setUserInfo(state,user){
            state.user=user
            localStorage.setItem("user", JSON.stringify(user));
        },
    },
    actions:{
        setUserInfo(context,user){
            context.commit('setUserInfo',user)
        },
    }
});
