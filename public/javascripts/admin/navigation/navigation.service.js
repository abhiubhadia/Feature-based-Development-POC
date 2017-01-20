/**
 * Created by kishore on 12/11/15.
 */
angular.module("admin").factory("navigationService", NavigationService);

NavigationService.$inject = [ "$http" ];

function NavigationService($http) {
    var navigationService = {
        saveNavigation : saveNavigation,
        fetchNavigations : fetchNavigations,
        findNavigation : findNavigation,
        deleteNavigation: deleteNavigation
    }

    return navigationService;

    function saveNavigation(navigation) {
        if(navigation['_id']){
            return $http.put("/admin/navigation/"+navigation['_id'], navigation);
        }else
            return  $http.post("/admin/navigation/save", navigation);
    }
    function fetchNavigations() {
        return  $http.get("/admin/navigation/list");
    }
    function findNavigation(navigationId){
        return $http.get("/admin/navigation/"+navigationId);
    }
    function deleteNavigation(navigationId) {
        return $http.delete("/admin/navigation/"+navigationId);
    }

}