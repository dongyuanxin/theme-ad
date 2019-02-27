(() => {
  const layerDOM = document.querySelector('#site-layer');
  const { layer } = window.AD_CONFIG;

  layerDOM.addEventListener('click', (e) => {
    if(!e.target.matches('#site-layer-close') && !e.target.matches('#site-layer')) {
      return;
    }

    layer.trigger();
    layerDOM.style.display = 'none';
  });
})();