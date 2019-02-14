(() => {
  const { leancloud } = window.AD_CONFIG;

  function getPsgID(pathname) {
    if(!pathname) {
      pathname = window.location.pathname;
    }

    let names = pathname.split('/');
    for(let i = names.length - 1; i >= 0; --i) {
      let name = names[i].trim();
      if(name.length > 0 && name !== '/' && name !== 'index.html') {
        return name;
      }
    }
    return '/';
  }

  function _updateCommentNum() {
    const infoDOM = document.querySelector('#site-comment-info'),
      url = getPsgID(),
      _ts = 1000;
    let running = false;

    return (ts = _ts) => {
      if(running) {
        return;
      }
      setTimeout(() => {
        running = true;
        let query = new AV.Query('Comment');
        query.equalTo('url', url);
        query.count()
          .then(num => {
            infoDOM.innerHTML = `共${num}条评论`;
            running = false;
          });
      }, ts);
    }
  }

  function active() {
    if(leancloud.comment === false && leancloud.count === false) {
      return false;
    }
    return true;
  }

  function init() {
    try {
      window.AV.init(leancloud.appid, leancloud.appkey);
      return true;
    } catch(error) {
      return false;
    }
  }

  function log() {
    let pathname = decodeURIComponent(window.location.pathname);
    !pathname.endsWith('/') && (pathname = pathname + '/');

    let Counter = AV.Object.extend('Counter');
    let counter = new Counter();
    counter.set('visit_time', new Date().getTime().toString());
    counter.set('user_agent', window.navigator.userAgent);
    counter.set('identity_path', pathname);
    counter.set('more_info', JSON.stringify(window.location));

    let acl = new AV.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);

    counter.setACL(acl);
    counter.save();
  }

  function count() {
    let query = new AV.Query('Counter');
    return new Promise(resolve => {
      query
        .count()
        .then(
          res => resolve(res + 1), 
          error => {
            console.log('Error occurs when count in leancloud.js:', error.message);
            resolve(0);
          }
        );
    });
  }

  if(!active()) {
    return;
  }

  if(!init()) {
    return;
  }

  if(leancloud.count === true) {
    count().then(res => document.querySelector('#site-count').innerHTML = res);
    log();
  }

  if(leancloud.comment === true) {
    const commentDOM = document.querySelector('#site-comment');
    if(!commentDOM) {
      return;
    }

    const updateCommentNum = _updateCommentNum();
    updateCommentNum(0);

    new Valine({
      el: '#site-comment',
      appId: leancloud.appid,
      appKey: leancloud.appkey,
      notify: false,
      verify: false,
      avatar: "robohash",
      placeholder: "正确填写邮箱, 才能及时收到回复哦♪(^∇^*)",
      path: getPsgID()
    });

    document.querySelector('.vsubmit.vbtn').addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      updateCommentNum(1000);
    });
  }
})();