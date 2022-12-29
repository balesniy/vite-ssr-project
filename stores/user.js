import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
        currency: null,
        userProfile: null,
        profileSidebarInfo: {}
    }),
    getters: {
        isUserManager: (state) =>  state.user,
        isUserAuth: (state) =>  state.user,
        isUserIncomplete: (state) => state.userProfile?.roles?.includes('ROLE_INCOMPLETE'),
        userName(state) {
            return this.isUserIncomplete ? '' : state.userProfile.firstname + ' ' + state.userProfile.lastname
        }
    },
    actions: {

    }
})
