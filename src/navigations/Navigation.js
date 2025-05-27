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

    navigateToStudyView(studyId, isotopeId, isotopeName) {
        router.push({
            name: 'studyRoute',
            query: {
                studyId: studyId,
                isotopeId: isotopeId,
                isotopeName: isotopeName,
            }
        })
    },
    navigateToPendingStudyView(studyId) {
        router.push({
            name: 'studyRoute',
            query: {
                studyId: studyId,
            }
        })
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

    // navigateTechnicConfigurationView() {
    //     router.push({name: 'technicConfigurationRoute'})
    // },
}