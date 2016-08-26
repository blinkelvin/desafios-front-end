(function () {
    'use strict';

    angular
        .module('app.services')
        .service('$Promisses', $Promisses);

    $Promisses.$inject = ['$q','$http'];

    function $Promisses($q,$http) {
        var service = {
            request: request
        };

        function request(path) {
            var deferred = $q.defer();

            $http.get(path)
                .then(function (data) {
                    deferred.resolve(data);
                },
                function (data) {
                    data.status == 404 ? console.error("Metodo não encontrado") : deferred.reject(data);
                }
            );

            return deferred.promise;
        };

        return service;
    };
})();
