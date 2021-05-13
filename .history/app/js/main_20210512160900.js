$(function () {
  $('.header__popup-btn').on('click', function (e) {
    e.preventDefault();
    $('.header__popup-btn').toggleClass('menu__items--active');
  });
});
