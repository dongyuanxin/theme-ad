(() => {
  const auth = () => {
    const day = 60 * 60 * 24 * 1000;
    const config = window.AD_CONFIG;
    const { is_post, lock, passwords } = config;

    if(is_post === false || lock === false) {
      return;
    }

    let [password, expires] = atob(window.localStorage.getItem('auth')).split(':'),
      now = new Date().getTime();

    if(passwords.includes(password) && now < expires) {
      return; 
    }

    password = prompt('输入您的名称小写全拼 (例如: 李三 => lisan)');

    if(passwords.includes(password)) {
      expires = now + day * 3;
      window.localStorage.setItem('auth', btoa(`${password}:${expires}`));
    } else {
      alert('您没有阅读权限');
      window.location.href = '/';
    }
  };

  auth();
})();