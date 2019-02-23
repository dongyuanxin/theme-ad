(() => {
  const handleScoll = (() => {
    const process = document.querySelector('#site-process');
    let isRunning = false;
    
    return () => {
      if (isRunning) return;
      isRunning = true;

      window.requestAnimationFrame(ts => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
          scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight,
          clientHeight = document.documentElement.clientHeight || document.body.clientHeight;

        isRunning = false;

        let percent = 100 * scrollTop / (scrollHeight - clientHeight);
        if(percent > 99) {
          percent = 100;
        } else if (percent < 1) {
          percent = 0;
        }

        process.style.width = `${percent}%`;
      });
    };
  })();

  // Refresh Page
  handleScoll();

  document.addEventListener('scroll', handleScoll, false);
})();