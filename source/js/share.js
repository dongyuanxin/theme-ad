(() => {
  function stringfy(params = {}) {
    let str = '?';
    for(let key of Reflect.ownKeys(params)) {
      let value = !!params[key] ? encodeURIComponent(params[key]) : ''; 
      str = `${str}${key}=${value}&`;
    }
    return str.slice(0, str.length - 1);
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

})();