(() => {
  const backTopBtn = document.querySelector('#back-top-btn');

  const backTop = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
      delay = 10,
      time = 200;

    if (scrollTop <= 10) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      return;
    }

    let step = Math.ceil(scrollTop * delay / time);

    let timer = setInterval(() => {
      scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop - step <= 0) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        clearInterval(timer);
      } else {
        document.documentElement.scrollTop = scrollTop - step;
        document.body.scrollTop = scrollTop - step;
      }
    }, delay);
  };

  backTopBtn.addEventListener('click', backTop, false);
})();