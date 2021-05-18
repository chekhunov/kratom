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

  const progressSpan = document.querySelector('.quiz__line');

  function changeNum(value) {
    let className = $('.quiz__line').attr('class');
    $('.quiz__line').text(value);
    return node;
  }

  function changeWidth(value) {
    let nodeWidth = (document.querySelector('.quiz__progress').style.width = value);
    return nodeWidth;
  }

  $('.quiz__link--next').on('click', function () {
    var $selectedQuestions = $('.quiz__questions')
      .children('.quiz__subject--active')
      .removeClass('quiz__subject--active');
    if ($selectedQuestions.length == 0 || $selectedQuestions.next().length == 0) {
      $('.quiz__questions').children('quiz__subject:eq(0)').addClass('quiz__subject--active');
    } else {
      $selectedQuestions.next().addClass('quiz__subject--active');
    }

    var $selectedOptions = $('.quiz__items')
      .children('.quiz__test--active')
      .removeClass('quiz__test--active');
    if ($selectedOptions.length == 0 || $selectedOptions.next().length == 0) {
      $('.quiz__items').children('quiz__test:eq(0)').addClass('quiz__test--active');
    } else {
      $selectedOptions.next().addClass('quiz__test--active');
      let at = $('.quiz__test--active').attr('value-progress');
      //сброс до дефолта чекбокс
      // $(':radio').each(function (i, item) {
      //   this.checked = item.defaultChecked;
      // });
      //заполнение шкалы процента и число процента
      changeWidth(at + '%');
      changeNum(at);
    }
  });

  //добавляем active карточке отзыва
  // $('.review-card').on('click', function (e) {
  //   e.preventDefault();
  //   $('.review-card').removeClass('review-card--active');
  //   $(this).addClass('review-card--active');
  // });
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

  // Закрытие по клавише Esc.
  // $(document).on('keydown', function (e) {
  //   if (e.keyCode === 27) {
  //     e.stopPropagation();
  //     $('.review-card').fadeOut();
  //   }
  // });

  // Клик по фону, но не по окну.
  // $('.review-card').on('click', function (e) {
  //   if ($(e.target).closest('.review-card__popup--active').length == 0) {
  //     $(this).fadeOut();
  //   }
  // });

  // добавление в массив значения чекбокса value
  // var checklist = {};

  // $(document).on('change', '.quiz__input-checkbox', function () {
  //   var val = this.value | 0; // to int

  //   if (this.checked) {
  //     checklist.push(val); // если в начало, то .ushift(val)
  //   } else {
  //     var idx = $.inArray(val, checklist);
  //     if (idx > -1) {
  //       checklist.splice(idx, 1);
  //     }
  //   }

  //   $('');

  //   console.log(checklist);
  // });

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
          '  ' +
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
    let code = $(this).attr('code');
    $('.contacts__icon path').removeClass('selected');

    $('.contacts__icon path[id=' + code + ']').addClass('selected');
  });

  $(document).on('click', '.contacts__icon path', function () {
    $('.contacts__icon path').removeClass('selected');
    $(this).addClass('selected');
    let code = $(this).attr('id');
    let selectedCountryHtml = $('.select__list .select__item[code=' + code + ']').html();
    $('.select__head').html(selectedCountryHtml);
  });
});
