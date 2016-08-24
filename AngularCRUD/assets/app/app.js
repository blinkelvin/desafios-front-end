
var data = [];

var situation =
				[
					{"id":1, "nome": "Finalizada"},
					{"id":2, "nome": "Pendente"}
				];

if (localStorage.getItem('todo') != null) {
	data = JSON.parse(localStorage.getItem('todo'));
}
if (localStorage.getItem('sit') != null) {
	situation = JSON.parse(localStorage.getItem('sit'));
}
//localStorage.clear();

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
		};
	};
	return null;
};

var app = angular.module('ToDo', []);

app.controller('ToDoController',function($scope) {
    $scope.setData = {};
    $scope.setData.situation = "Finalizada";

	$scope.setSituation = {};

	$scope.getSituation = situation;

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
        localStorage.setItem('todo', JSON.stringify(data));

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
        localStorage.setItem('todo', JSON.stringify(data));
    };

	$scope.addSit = function() {
		$scope.setSituation.id = generateUUID();
		situation.push($scope.setSituation);
		$scope.setSituation = {};
        localStorage.setItem('sit', JSON.stringify(situation));
	};

    $scope.deleteSit = function(id) {
        var i = findIndexByKeyValue(situation,"id",id);
        data.splice(i, 1);
        localStorage.setItem('sit', JSON.stringify(situation));
    };

    $scope.filter = function() {

    };
	$scope.getStatus = function(status) {
		$scope[status+"GetStatus"] = 0;
		$.map(data, function(val, i) {
			val.situation == status ? $scope[status+"GetStatus"]++ : null;
		});
		return $scope[status+"GetStatus"];
	};

	//console.log($scope.getStatus("Finalizada"));
	//console.log($scope.getStatus("Pendente"));

	console.log($scope.FinalizadaGetStatus);
});
