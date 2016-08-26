/**
 * @author MStech - 01/07/2016
 * */
(function (angular,$) {

'use strict';

angular
    .module('ToDo')
    .controller('homeController', homeController);

homeController.$inject = ['$scope', '$http', '$utils','$timeout','$window','$Promisses'];

  /**
   * @constructor
   * */
function homeController($scope, $http, $utils, $timeout, $window, $Promisses) {


    $scope.getList = function $getList() {
        $Promisses.request('assets/app/shared/lista/lista.json')
            .then(function (response) {
                $scope.data = response.data;
                $scope.data = $utils.getLS('todo') != null ? $utils.getLS('todo') : $scope.data;
                $scope.getData = $scope.data;
                $utils.setLS('todo',$scope.data);                
            },
            function (response) {
                console.error("Erro");
            }
        );
    };

    $scope.situation =	[
        					{"id":1, "nome": "Finalizada"},
        					{"id":2, "nome": "Pendente"}
        			    ];


    //localStorage.clear();

    // $scope.homeBO = new HomeBusiness($http);

    $scope.setData = {};
    $scope.setData.situation = "Finalizada";

    $scope.situation = $utils.getLS('sit') != null ? $utils.getLS('sit') : $scope.situation;

    $scope.getSituation = $scope.situation;
    $scope.setSituation = {};

    // C
    $scope.add = function() {
        $timeout(function () {
            angular.element('#myModal').modal('show')
        }, 3000);

        var id = $scope.setData.id;

        if (id != null){
            var i = $utils.getIndexByID($scope.data,"id",id);
            $scope.data[i] = $scope.setData;
        }else{
            $scope.setData.id = $utils.getUUID();
            $scope.data.push($scope.setData);
        }
        $utils.setLS('todo',$scope.data);

        $scope.setData = {};
        $scope.setData.situation = "Finalizada";
    };


    // U
    $scope.edit = function(id) {
        var i = $utils.getIndexByID($scope.data,"id",id);
        $scope.setData = $scope.data[i];
    };

    // D
    $scope.delete = function(id) {
        var i = $utils.getIndexByID($scope.data,"id",id);
        $scope.data.splice(i, 1);
        $utils.setLS('todo',$scope.data);
    };

    $scope.addSit = function() {
        $scope.setSituation.id = $utils.getUUID();
        $scope.situation.push($scope.setSituation);
        $scope.setSituation = {};
        $utils.setLS('sit',$scope.situation);
    };

    $scope.deleteSit = function(id) {
        console.log($scope.getSituation);
        var i = $utils.getIndexByID($scope.getSituation,"id",id);
        $scope.situation.splice(i, 1);
        $utils.setLS('sit',$scope.situation);
    };

    $scope.filter = function() {

    };

    $scope.getStatus = function(status) {
        $scope[status+"GetStatus"] = 0;
        $.map($scope.data, function(val, i) {
            val.situation == status ? $scope[status+"GetStatus"]++ : null;
        });
        return $scope[status+"GetStatus"];
    };

    //console.log($scope.getStatus("Finalizada"));
    //console.log($scope.getStatus("Pendente"));

    // console.log($scope.FinalizadaGetStatus);

    $scope.showLink = function $showlink($event) {
        $event.preventDefault();
        $window.location.href = 'https://www.gitkraken.com/';
    }

    /**
     * @description Configurações iniciais
     * */

    function init() {
    //   $scope.homeBO.getMenu();
        $scope.getList();
        $timeout(function () {
            angular.element('#myModal').modal('show');
        }, 3000);
    }

    init();
  }
})(angular, jQuery);
