import Vue from 'vue'
import * as types from './types'
import api from '../api'

export default {
    UserLogin ({ commit }, data) {
        commit(types.LOGIN, data)
    },
    UserLogout ({ commit }) {
        commit(types.LOGOUT)
    },
    UserName ({ commit }, data) {
        commit(types.USERNAME, data)
    }
}