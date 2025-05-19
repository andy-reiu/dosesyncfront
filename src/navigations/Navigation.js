import router from "@/router";

export default {

    navigateToErrorView() {
        router.push({name: 'errorRoute'})
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

    // navigateToLocationView(locationId) {
    //     router.push({
    //         name: 'locationRoute',
    //         query: {locationId: locationId}
    //     })
    // },
}