(function () {
    'use strict';

    angular
        .module('app.services')
        .service('$Promisses', $Promisses);

    $Promisses.$inject = ['$q'];

    function $Promisses($q) {
        var service = {
            request: request
        };

        function request(model, params) {
            var deferred = $q.defer();

            model(params).then(function (data) {
                deferred.resolve(data);
            },
            function (data) {
                data.status == 404 ? console.error("Metodo não encontrado") : deferred.reject(data);
            });

            return deferred.promise;
        };

        return service;
    };
})();
