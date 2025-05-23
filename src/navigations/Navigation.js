import router from "@/router";

export default {

    navigateToErrorView() {
        // router.push({name: 'errorRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
    },

    navigateToLoginView(){
        router.push({name: 'loginRoute'})
    },

    navigateToCalculationView(){
        router.push({name: 'calculationRoute'})
    },

    navigateToNotAuthorizedView() {
        router.push({name: 'notAuthorizedRoute'})
    },

    navigateToUsersView(userId) {
         router.push({
             name: 'usersRoute',
             query: {userId: userId}
         })
     },

 // navigateToUsersView(userId) {
    //     router.push({
    //         name: 'usersRoute',
    //         query: {userId: userId}
    //     })
    // },

    //navigateToPlanningView
    //navigateToSettingsView
    //navigateToDozingView
    //navigateToSecretaryView
}