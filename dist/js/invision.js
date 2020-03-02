'use strict';

$(document).ready(function () {
  $('.header__menu').on('click', function () {
    $('.header__rwdmenu').toggleClass('header__rwdmenu--open');
    $('.header__menu').toggleClass('header__menu--open');
  });
});
// $(document).on("click", function (e) {
//   if ($(e.target).parents(".header__rwdmenu").length == 0) {
//     $(".header__rwdmenu").hide();
//   }
// });