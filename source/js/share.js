(() => {
  function stringfy(params = {}) {
    let str = '?';
    for(let key of Reflect.ownKeys(params)) {
      let value = !!params[key] ? encodeURIComponent(params[key]) : ''; 
      str = `${str}${key}=${value}&`;
    }
    return str.slice(0, str.length - 1);
  }

  function toggleShareBtn() {
    let show = false;
    const shareBtnDOM = document.querySelector('#share-btn');

    return (e) => {
      e.stopPropagation();
      e.preventDefault();
      show = !show;
      shareBtnDOM.style.display = show ? 'flex' : 'none';
    };
  }

  const mapSocialToUrl = (() => {
    const baseUrls = {
      twitter: 'https://twitter.com/intent/tweet',
      facebook: 'https://www.facebook.com/sharer/sharer.php',
      qq: 'http://connect.qq.com/widget/shareqq/index.html',
      weibo: 'http://service.weibo.com/share/share.php'
    };

    const title = document.title;
    const description = document.querySelector("meta[name='description']").getAttribute('content');
    const url = `${window.location.origin}${window.location.pathname}`;

    const params = {
      twitter: {
        url,
        text: `${title}\n\n${description}\n\n`,
        via: window.location.origin
      },
      facebook: {
        u: url
      },
      weibo: {
        url,
        title: `${title}\n\n${description}`
      },
      qq: {
        url,
        title,
        desc: description
      },
    };

    return {
      twitter: `${baseUrls.twitter}${stringfy(params.twitter)}`,
      facebook: `${baseUrls.facebook}${stringfy(params.facebook)}`,
      weibo: `${baseUrls.weibo}${stringfy(params.weibo)}`,
      qq: `${baseUrls.qq}${stringfy(params.qq)}`,
    }
  })();

  const pfxCls = '#share-btn';
  const { share } = window.AD_CONFIG;
  const socials = Reflect.ownKeys(share).filter(social => share[social]);

  for(let social of socials) {
    if(social === 'wechat') {
      continue;
    }
    document
      .querySelector(`${pfxCls}-${social}`)
      .setAttribute('href', mapSocialToUrl[social]);
  }

  if(!socials.includes('wechat')) {
    return;
  }

  // wechat share by qrcode
  document.querySelector('#share-btn-wechat').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const layer = document.querySelector('#site-layer'),
      container = document.querySelector('#site-layer-container'),
      title = document.querySelector('#site-layer-title'),
      newDOM = document.createElement('div');

    layer.style.display = 'block';
    title.innerHTML = '微信分享';
    container.appendChild(newDOM);

    const qrcode = new QRCode(newDOM, {
      text: `${window.location.origin}${window.location.pathname}`,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });

    window.AD_CONFIG.layer.add(() => {
      title.innerHTML = '';
      qrcode.clear();
      newDOM.remove();
    });
  });

  // control btn panel if show in mobile phone
  if(socials.length > 0) {
    document.querySelector('#site-toggle-share-btn').addEventListener('click', toggleShareBtn());
  }
})();