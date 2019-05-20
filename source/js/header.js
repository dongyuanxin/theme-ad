(() => {
  const searchBtn = document.querySelector('#site-search'),
    searchListBtn = document.querySelector('.site-layer-input-choose > a'),
    nav = document.querySelector('#site-nav'),
    navBtn = document.querySelector('#site-nav-btn'),
    layer = document.querySelector('#site-layer'),
    layerContent = layer.querySelector('.site-layer-content'),
    title = document.querySelector('#site-layer-title'),
    searchDOM = document.querySelector('#site-layer-search');

  const inputDOM = searchDOM.querySelector('input'),
    iconDOM = searchDOM.querySelector('i');

  let platformIndex = 0,
    platforms = [
      'Google',
      'BaiDu',
      'Bing'
    ];

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

  searchListBtn.addEventListener('click', (e) => {
    platformIndex = (platformIndex + 1) % platforms.length
    searchListBtn.innerHTML = platforms[platformIndex] + ''
  })

  inputDOM.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode,
      value = inputDOM.value.trim();

    if(key === 13 && value.length > 0) {
      openSearch(value);
    }
  });

  iconDOM.addEventListener('click', (e) => {
    inputDOM.focus();
    let value = inputDOM.value.trim();
    if(value.length > 0) {
      openSearch(value);
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

  function openSearch(keywords) {
    keywords = `site:${window.location.hostname} ${decodeURIComponent(keywords)}`;
    let href = null;
    switch (platforms[platformIndex]) {
      case 'BaiDu':
        href = `https://www.baidu.com/s?wd=${keywords}`;
        break;
      case 'Bing':
        href = `https://cn.bing.com/search?q=${keywords}&FORM=BESBTB&ensearch=1`;
        break;
      default:
        href = `https://www.google.com/search?q=${keywords}`;
        break;
    }
    window.open(href);
  }
})();