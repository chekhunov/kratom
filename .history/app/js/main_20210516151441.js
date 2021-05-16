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

  var className = $('.quiz__line').attr('class');
  $('.quiz__line').text('10');

  function changeWidth(value) {
    var node = (document.querySelector('.quiz__progress').style.width = value);
    return node;
  }

  var n = changeWidth('10' + '%');

  $('.quiz__link').on('click', function () {
    // var $selected = $(this).children('.quiz__test--active').removeClass('quiz__test--active');
    // if ($selected.length == 0 || $selected.next().length == 0) {
    //   $(this).children('quiz__test:eq(0)').addClass('quiz__test--active');
    // } else {
    //   $selected.next().addClass('quiz__test--active');
    // }

    $('.quiz__test').removeClass('quiz__test--active');
    $(this).next().addClass('quiz__test--active');
  });
});
