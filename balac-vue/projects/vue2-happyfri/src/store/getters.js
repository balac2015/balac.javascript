export default {
    topic (state, getters) {
        let len = state.topics.length,
            num = state.num;
        return len && len >= num ? state.topics[num - 1] : null;
    }
};