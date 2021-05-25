$(function () {
  $('.header__popup-btn').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('body--active');
  });

  function getTimeRemaining(endtime) {
    const total = new Date(endtime) - Date.parse(new Date());

    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.querySelector('.proposition__clock');
    const daysSpan = clock.querySelector('.proposition__days');
    const hoursSpan = clock.querySelector('.proposition__hours');
    const minutesSpan = clock.querySelector('.proposition__minutes');

    function updateClock() {
      const t = getTimeRemaining(endtime);
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = $('.proposition__clock').attr('data-time');
  initializeClock('proposition__clock', deadline);

  //достаем модалку
  $('.quiz__link--end').on('click', function () {
    $('.quiz__modal-block').addClass('active');
    $('body').addClass('overflow');
  });

  //прячем модалку
  $('.modal-quiz__link').on('click', function () {
    $('.quiz__modal-block').removeClass('active');
    $('body').removeClass('overflow');
    //сброс radio
    $('input:checked').prop('checked', false);
    //сброс вопросов
    let $selectedQuestions = $('.quiz__questions')
      .children('.quiz__subject')
      .removeClass('quiz__subject--active');

    $selectedQuestions.prev().prev().prev().prev().addClass('quiz__subject--active');
    //сброс вариантов ответов
    let $selectedOptions = $('.quiz__items')
      .children('.quiz__test--active')
      .removeClass('quiz__test--active');

    $selectedOptions.prev().prev().prev().addClass('quiz__test--active');

    $('.quiz__link--end').css('display', 'none');
    $('.quiz__link--end').addClass('disabled');

    $('.quiz__link--next').css('display', 'inline-block');
    $('.quiz__link--next').addClass('disabled');

    //обновляем шкалу и процент
    changeWidth(0 + '%');
    changeNum(0);
  });

  const progressSpan = document.querySelector('.quiz__line');

  //change num
  function changeNum(value) {
    $('.quiz__line').text(value);
  }

  //change line progress
  function changeWidth(value) {
    let nodeWidth = (document.querySelector('.quiz__progress').style.width = value);
  }

  function changeIsPrevStep() {
    // console.log($('.quiz__test--active').prev());
    if ($('.quiz__test--active').prev().length == 0) {
      $('.quiz__link--prev').addClass('disabled');
    } else {
      $('.quiz__link--prev').removeClass('disabled');
    }
  }

  $('.quiz__link--next').on('click', function () {
    let $selectedQuestions = $('.quiz__questions')
      .children('.quiz__subject--active')
      .removeClass('quiz__subject--active');
    if ($selectedQuestions.length == 0 || $selectedQuestions.next().length == 0) {
      $('.quiz__questions').children('quiz__subject:eq(0)').addClass('quiz__subject--active');
    } else {
      $selectedQuestions.next().addClass('quiz__subject--active');
    }

    let $selectedOptions = $('.quiz__items')
      .children('.quiz__test--active')
      .removeClass('quiz__test--active');
    if ($selectedOptions.length == 0 || $selectedOptions.next().length == 0) {
      $('.quiz__items').children('quiz__test:eq(0)').addClass('quiz__test--active');
    } else {
      $selectedOptions.next().addClass('quiz__test--active');
      let at = $('.quiz__test--active').attr('value-progress');
      changeWidth(at + '%');
      changeNum(at);
    }
    changeIsPrevStep();
  });

  $('.quiz__link--prev').on('click', function () {
    let $selectedQuestions = $('.quiz__questions')
      .children('.quiz__subject--active')
      .removeClass('quiz__subject--active');
    if ($selectedQuestions.length == 0 || $selectedQuestions.prev().length == 0) {
      $selectedQuestions.prev().addClass('quiz__subject--active');
    } else {
      $('.quiz__questions').children('quiz__subject:eq(0)').addClass('quiz__subject--active');
    }

    let $selectedOptions = $('.quiz__items')
      .children('.quiz__test--active')
      .removeClass('quiz__test--active');
    if ($selectedOptions.length == 0 || $selectedOptions.prev().length == 0) {
      $('.quiz__items').children('quiz__test:eq(0)').addClass('quiz__test--active');
    } else {
      $selectedOptions.prev().addClass('quiz__test--active');
      let at = $('.quiz__test--active').attr('value-progress');

      changeWidth(at + '%');
      changeNum(at);
    }
    changeIsPrevStep();
  });

  $('.review-card').on('click', function (e) {
    e.preventDefault();

    if (!$(this).hasClass('review-card--active')) {
      $(this).addClass('review-card--active');
    } else {
      if (!e.target.closest('.review-card__wrapper')) {
        $(this).removeClass('review-card--active');
      }
    }
  });

  $('.select').on('click', '.select__head', function () {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $(this).next().fadeOut();
    } else {
      $('.select__head').removeClass('open');
      $('.select__inner').fadeOut();
      $(this).addClass('open');
      $(this).next().fadeIn();
    }
  });

  $('.select').on('click', '.select__item', function () {
    $('.select__head').removeClass('open');
    $(this).parent().parent().fadeOut();
    $(this).parent().parent().prev().text($(this).text());
    $(this).parent().parent().prev().prev().val($(this).text());
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.select').length) {
      $('.select__head').removeClass('open');
      $('.select__inner').fadeOut();
    }
  });

  $.getJSON('db/country.json', function (data) {
    var items = [];
    $.each(data, function (key, val) {
      items.push(
        '<li class="select__item" code="' +
          val.code +
          '" id="' +
          key +
          '">' +
          '<span>' +
          val.emoji +
          '</span>' +
          ' ' +
          val.name +
          '</li>',
      );
    });
    $('<ul/>', {
      class: 'select__list',
      html: items.join(''),
    }).appendTo('.select__inner');
  });

  $(document).on('click', '.select__item', function (event) {
    $('.contacts__box').addClass('active');
    let code = $(this).attr('code');
    $('.contacts__icon path').removeClass('selected');

    $('.contacts__icon path[id=' + code + ']').addClass('selected');
  });

  $(document).on('click', '.contacts__icon path', function () {
    $('.contacts__box').addClass('active');
    $('.contacts__icon path').removeClass('selected');
    $(this).addClass('selected');
    let code = $(this).attr('id');
    let selectedCountryHtml = $('.select__list .select__item[code=' + code + ']').html();
    $('.select__head').html(selectedCountryHtml);
  });

  $('.quiz__link.quiz__link--next').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('disabled');
  });

  $('.quiz__input-checkbox--one').on('click', function () {
    if ($(this).is(':checked')) {
      $('.quiz__link--next').removeClass('disabled');
    } else {
      $('.quiz__link--next').addClass('disabled');
    }
  });

  $('.quiz__input-checkbox--two').on('click', function () {
    if ($(this).is(':checked')) {
      $('.quiz__link--next').removeClass('disabled');
    } else {
      $('.quiz__link--next').addClass('disabled');
    }
  });

  $('.quiz__input-checkbox--three').on('click', function () {
    if ($(this).is(':checked')) {
      $('.quiz__link--next').removeClass('disabled');
    } else {
      $('.quiz__link--next').addClass('disabled');
    }
  });

  $('.quiz__input-checkbox--four').on('click', function () {
    if ($(this).is(':checked')) {
      $('.quiz__link--next').removeClass('disabled');
    } else {
      $('.quiz__link--next').addClass('disabled');
    }
  });

  //после заполнения формы прячем и меняем кнопки
  $('input#name-user,input#mail-user').on('keyup', function (event) {
    var name = $('input#name-user').val();
    var email = $('input#mail-user').val();

    if (name.length > 3 && email.length > 6) {
      // $('.quiz__link--next').css('opacity', '0');
      $('.quiz__link--next').css('display', 'none');
      $('.quiz__link--end').css('display', 'inline-block');
      $('.quiz__link--end').removeClass('disabled');
    }

    $('.quiz__link--prev').on('click', function () {
      $('.quiz__link--next').css('display', 'inline-block');
      $('.quiz__link--end').css('display', 'none');
      $('.quiz__link--end').addClass('disabled');
    });
  });

  //добавление в массив значения чекбокса value
  function appendObjTo(newObj) {
    const frozenObj = Object.freeze(newObj);
    // return Object.freeze(thatArray.concat(frozenObj));
  }
  var checklist = [];

  $(document).on('change', '.quiz__input-checkbox', function () {
    var val = this.value | 0; // to int
    var html = $('.quiz__subject--active').text();

    if (this.checked) {
      const checklist = appendObjTo({ question: html, answer: val });
      // checklist.push(newObj); // если в начало, то .ushift(val)
    } else {
      var idx = $.inArray(val, checklist);
      if (idx > -1) {
        checklist.splice(idx, 1);
      }
    }

    $('');

    console.log(checklist);
  });
});
