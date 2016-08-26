/**
 * @author MStech - 01/07/2016
 * */
var HomeBusiness = function ($http) {

  'use strict';

  // repositórios
  var menuREP = new MenuRepository($http);

  /**
   * @description Busca os módulos do sistema
   * */
  this.getMenu = function () {

    menuREP.getMenu().then(
      function (res) {
        console.log(res);
      },
      function (error) {
        console.log(error);
      }
    );
  };
};
