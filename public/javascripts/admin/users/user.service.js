/**
 * Created by kishore on 12/11/15.
 */
angular.module("admin").factory("userService", UserService);

UserService.$inject = [ "$http" ];

function UserService($http) {
    var userService = {
        saveUser :saveUser,
        fetchUsers : fetchUsers,
        findUser : findUser,
        deleteUser: deleteUser
    }

    return userService;

    function saveUser(user) {
        if(user['_id']){
            return $http.put("/admin/user/"+user['_id'], user);
        }else
            return  $http.post("/admin/user/save", user);
    }
    function fetchUsers() {
        return  $http.get("/admin/user/list");
    }
    function findUser(userId){
        return $http.get("/admin/user/"+userId);
    }
    function deleteUser(userId) {
        return $http.delete("/admin/user/"+userId);
    }

}