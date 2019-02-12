(() => {
  const { leancloud } = window.AD_CONFIG;

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
    // TODO
  }
})();