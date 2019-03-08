(() => {
  function openGoogle(keywords) {
    keywords = `site:${window.location.hostname} ${decodeURIComponent(keywords)}`;
    let href = `https://www.google.com/search?q=${keywords}`;
    window.open(href);
  }

  const searchBtn = document.querySelector('#site-search'),
    nav = document.querySelector('#site-nav'),
    navBtn = document.querySelector('#site-nav-btn'),
    layer = document.querySelector('#site-layer'),
    layerContent = layer.querySelector('.site-layer-content'),
    title = document.querySelector('#site-layer-title'),
    searchDOM = document.querySelector('#site-layer-search');

  const inputDOM = searchDOM.querySelector('input'),
    iconDOM = searchDOM.querySelector('i');

  searchBtn.addEventListener('click', (e) => {
    layer.style.display = 'block';
    searchDOM.style.display = 'flex';
    inputDOM.focus();
    title.innerHTML = '搜索';

    window.AD_CONFIG.layer.add(() => {
      title.innerHTML = '';
      inputDOM.blur();
      searchDOM.style.display = 'none';
    });
  });

  inputDOM.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode,
      value = inputDOM.value.trim();

    if(key === 13 && value.length > 0) {
      openGoogle(value);
    }
  });

  iconDOM.addEventListener('click', (e) => {
    inputDOM.focus();
    let value = inputDOM.value.trim();
    if(value.length > 0) {
      openGoogle(value);
    }
  });

  navBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    layer.style.display = 'block';
    layerContent.style.display = 'none';
    nav.style.right = '0';

    window.AD_CONFIG.layer.add(() => {
      nav.style.right = '';
      layer.style.display = 'none';
      layerContent.style.display = '';
    });
  });
  
})();