(() => {
  function openGoogle(keywords) {
    keywords = `site:${window.location.hostname} ${decodeURIComponent(keywords)}`;
    let href = `https://www.google.com/search?q=${keywords}`;
    window.open(href);
  }

  const navBtn = document.querySelector('#site-search'),
    layer = document.querySelector('#site-layer'),
    title = document.querySelector('#site-layer-title'),
    searchDOM = document.querySelector('#site-layer-search');

  const inputDOM = searchDOM.querySelector('input'),
    iconDOM = searchDOM.querySelector('i');

  navBtn.addEventListener('click', (e) => {
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
  
})();