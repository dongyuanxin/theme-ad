(() => {
  const backTopBtn = document.querySelector('#back-top-btn');

  const backTop = () => {
    const delay = 10, 
      time = 200;
    let running = false;

    return () => {
      if(running) return;
      running = true;

      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  
      if(scrollTop <= 10) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        running = false;
        return;
      }
  
      let step = Math.ceil(scrollTop * delay / time);
  
      let timer = setInterval(() => {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        if(scrollTop <= step) {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          running = false;
          clearInterval(timer);
        } else {
          document.documentElement.scrollTop = scrollTop - step;
          document.body.scrollTop = scrollTop - step;
        }
      }, delay);
    };
  };

  backTopBtn.addEventListener('click', backTop(), false);
  
})();