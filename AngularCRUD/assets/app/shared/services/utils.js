(function (angular) {

	'use strict'

	angular.module('app.services')
		.service('$utils', $utils);
	function $utils($http) {

		var utils = {};

        utils.getUUID = function $getUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            	var r = (d + Math.random()*16)%16 | 0;
            	d = Math.floor(d/16);
            	return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        };

        utils.getIndexByID = function $getIndexByID(arraytosearch, key, valuetosearch) {
            for (var i = 0; i < arraytosearch.length; i++) {
            	if (arraytosearch[i][key] == valuetosearch) {
            		console.log(arraytosearch[i][key]);
            		return i;
            	};
            };
            return null;
        };

        utils.getLS = function $getLS(key) {

            if (localStorage.getItem(key) != null )
				return JSON.parse(localStorage.getItem(key));
			else{
				return null;
			}
        }

        utils.setLS = function $setLS(key,data) {
            localStorage.setItem(key, JSON.stringify(data));
        }

		utils.modal = function $modal(id) {
            angular.element('#'+id).modal('show');
		}

		return utils;
	};
	$utils.$inject = ['$http'];

})(angular);
