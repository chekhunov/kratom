$(function () {
  $('.header__popup-btn').on('click', function (e) {
    e.preventDefault();
    $('.menu__items').toggleClass('menu__items--active');
  });
});
