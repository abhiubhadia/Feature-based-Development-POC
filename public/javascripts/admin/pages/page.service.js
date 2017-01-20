/**
 * Created by kishore on 12/11/15.
 */
angular.module("admin").factory("pageService", PageService);

PageService.$inject = [ "$http" ];

function PageService($http) {
    var pageService = {
        savePage : savePage,
        fetchPages : fetchPages,
        findPage : findPage,
        deletePage: deletePage
    }

    return pageService;



    function savePage(page) {
        if(page['_id']){
            return $http.put("/admin/page/"+page['_id'], page);
        }else
            return  $http.post("/admin/page/save", page);
    }
    function fetchPages() {
        return  $http.get("/admin/page/list");
    }
    function findPage(pageId){
        return $http.get("/admin/page/"+pageId);
    }
    function deletePage(pageId) {
        return $http.delete("/admin/page/"+pageId);
    }

}