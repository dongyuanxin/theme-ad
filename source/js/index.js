(() => {
  window.AD_CONFIG.layer = (() => {
    let cbs = [];
    
    return {
      add: (cb) => {
        if(cbs.includes(cb)) {
          return false;
        }
        cbs.push(cb);
        return true;
      },
      remove: (cb) => {
        let index = cbs.indexOf(cb);
        if(index === -1) {
          return false;
        }
        cbs.splice(index, 1);
        return true;
      },
      // trigger before layer to be closed
      trigger: () => {
        cbs.forEach(cb => cb());
        cbs = [];
      }
    }
  })();

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
      script.async = 'async';
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

  const { root } = window.AD_CONFIG;

  // load after DOM built
  const documentSrcs = [
    'js/copy.js',
    'js/layer.js',
    'js/scroll.js',
    'js/backTop.js',
    'js/time.js',
    'js/header.js',
    'js/passage.js',
    'js/share.js',
    'js/reward.js',
  ].map(item => `${root}${item}`);

  // load after all srcs loaded
  const windowSrcs = [
    'js/leancloud.js',
    'js/mathjax.js',
  ].map(item => `${root}${item}`);

  const documentSrcScripts = documentSrcs.map(src => loadScript(src));
  const windowSrcScripts = windowSrcs.map(src => loadScript(src));

  document.addEventListener('DOMContentLoaded', () => {
    documentSrcScripts.forEach(script => script());
  });

  window.addEventListener('load', () => {
    windowSrcScripts.forEach(script => script());
  });
})();