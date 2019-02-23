(() => {
  const rewardDOM = document.querySelector('#site-reward');
  if(!rewardDOM) {
    return;
  }

  const layer = document.querySelector('#site-layer'),
    title = document.querySelector('#site-layer-title'),
    rewardContainerDOM = document.querySelector('#site-layer-reward');

  rewardDOM.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    layer.style.display = 'block';
    title.innerHTML = '打赏赞助';
    rewardContainerDOM.style.display = 'flex';

    window.AD_CONFIG.layer.add(() => {
      title.innerHTML = '';
      rewardContainerDOM.style.display = 'none';
    });
  });
})();