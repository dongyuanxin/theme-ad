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

  const layerDOM = document.querySelector('#site-layer');
  const { layer } = window.AD_CONFIG;

  layerDOM.addEventListener('click', (e) => {
    if(!e.target.matches('#site-layer-close')) {
      return;
    }

    layer.trigger();
    layerDOM.style.display = 'none';
  });
})();