var data = []
var app = angular.module('ToDo', []);

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

function findIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][key] == valuetosearch) {
            console.log(arraytosearch[i][key]);
            return i;
        }
    }
    return null;
}

app.controller('ToDoController',function($scope) {
    $scope.setData = {};
    $scope.setData.situation = "Finalizada";

// C
    $scope.add = function() {
        var id = $scope.setData.id;

        if (id != null){
            var i = findIndexByKeyValue(data,"id",id);
            data[i] = $scope.setData;
        }else{
            $scope.setData.id = generateUUID();
            data.push($scope.setData);
        }

        $scope.setData = {};
        $scope.setData.situation = "Finalizada";
    };

// R
    $scope.getData = data;

// U
    $scope.edit = function(id) {
        var i = findIndexByKeyValue(data,"id",id);
        $scope.setData = data[i];
    };

// D
    $scope.delete = function(id) {
        var i = findIndexByKeyValue(data,"id",id);
        data.splice(i, 1);
    };

    $scope.finalizadas = function(e) {
        console.log(e);
    }
});
