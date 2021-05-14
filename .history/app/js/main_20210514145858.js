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

  // $('.quiz__link').on('click', function () {
  //   $('.quiz__test--one').slideToggle();
  //   $('.quiz__test--two').slideToggle();
  //   $('.quiz__test--three').slideToggle();
  // });

  var selector = {
    $button: document.querySelector('.quiz__link'),
    $one: document.querySelector('.quiz__test--one'),
    $two: document.querySelector('.quiz__test--two'),
    $three: document.querySelector('.quiz__test--three'),
  };

  selector.$button.addEventListener('click', function (event) {
    event.preventDefault();
    if (isHidden(selector.$one)) {
      changeDisplay(selector.$one, 'block');
      changeDisplay(selector.$two, 'none');
      changeDisplay(selector.$three, 'none');
    }

    if (isHidden(selector.$two)) {
      changeDisplay(selector.$one, 'none');
      changeDisplay(selector.$two, 'block');
      changeDisplay(selector.$three, 'none');
    }

    if (isHidden(selector.$three)) {
      changeDisplay(selector.$one, 'none');
      changeDisplay(selector.$two, 'none');
      changeDisplay(selector.$three, 'block');
    }
    // else {
    //   changeDisplay(selector.$one, 'none');
    //   changeDisplay(selector.$two, 'block');
    // }
  });

  function changeDisplay($node, value) {
    $node.style.display = value;
    return $node;
  }

  function isHidden($node) {
    return window.getComputedStyle($node).display === 'none';
  }
});
