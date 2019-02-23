(() => {
  function handleImgClick(event) {
    window.open(event.target.getAttribute('src'), '_blank');
  }

  document
    .querySelectorAll('.passage-article')
    .forEach(
      passage => 
        passage
          .querySelectorAll('img')
          .forEach(image => image.addEventListener('click', handleImgClick))
    );

  const layer = document.querySelector('#site-layer'),
    layerContent = layer.querySelector('.site-layer-content'),
    toc = document.querySelector('#site-toc'),
    tocShowBtn = document.querySelector('#site-toc-show-btn'),
    tocHideBtn = document.querySelector('#site-toc-hide-btn');

  tocShowBtn && tocShowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    layer.style.display = 'block';
    layerContent.style.display = 'none';
    toc.style.right = '0';
  });
  
  tocHideBtn && tocHideBtn.addEventListener('click', (e) => {
    toc.style.right = '';
    layer.style.display = 'none';
    layerContent.style.display = '';
  });
})();
