$(function () {
  $('.header__popup-btn').on('click', function (e) {
    e.preventDefault();
    $('.header__popup-btn').toggleClass('header__popup-btn--active');
  });
});
