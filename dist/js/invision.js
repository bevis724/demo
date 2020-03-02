'use strict';

$(document).ready(function () {
  $('.header__menu').click(function () {
    $('.header__rwdmenu').toggleClass('header__rwdmenu--open');
    $('.header__menu').toggleClass('header__menu--open');
  });
});