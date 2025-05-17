import router from "@/router";

export default {

    navigateToErrorView() {
        router.push({name: 'errorRoute'})
    },

    navigateToHomeView() {
        router.push({name: 'homeRoute'})
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