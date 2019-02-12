(() => {
  const srcs = [
    '/js/copy.js',
    '/js/scroll.js',
    '/js/backTop.js',
    '/js/time.js'
  ];

  const loadScript = (src) => {
    let exists = false;
  
    return () => new Promise((resolve) => {
      if(exists) return resolve();
      // 防止没有触发下方的onload时候, 又调用此函数重复加载
      exists = true;
      // 开始加载
      let script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.onerror = (ev) => {
        // 加载失败: 允许外部再次加载
        script.remove();
        exists = false;
        resolve(false);
      };
      script.onload = () => {
        // 加载成功: exists一直为true, 不会多次加载
        resolve(true);
      };
      document.body.appendChild(script);
    });
  };

  const mapSrcToScript = srcs.map(src => loadScript(src));

  document.addEventListener('DOMContentLoaded', () => {
    mapSrcToScript.forEach(script => script());
  });
})();