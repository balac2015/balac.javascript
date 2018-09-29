const state = {
    count: 0    // store.state.profile.count
};
const getters = {
    dobuleCount (state, getters, rootState) {       // state 是模块的局部状态，rootState 为根节点状态
        return state.count * 2;
    }
};
const actions = {
    incrementIfOdd ({ state, commit }) {    // state 是模块的局部状态
        if (state.count % 2 === 1) {
            commit('increment');
        }
    }
};
const mutations = {
    increment: (state) {        // state 是模块的局部状态
        state.count++;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}