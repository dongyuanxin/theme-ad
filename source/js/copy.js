(() => {
  const { author } = window.AD_CONFIG;

  document.addEventListener('copy', e => {
    let clipboardData = e.clipboardData || window.clipboardData;
    if(!clipboardData) {
      return;
    }

    const selection = window.getSelection().toString();
    if(selection.length <= 42) {
      return;
    }

    e.preventDefault();

    const textData = selection + '\n\n'
      + (author ? `作者: ${author}\n` : '')
      + '链接: ' + window.location.href + '\n'
      + '来源: ' + window.location.host + '\n'
      + '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。\n\n';

    const htmlData = selection + '<br/><br/>'
      + (author ? `<b>作者</b>: ${author}<br/>` : '')
      + `<b>链接</b>: <a href="${window.location.href}">${window.location.href}</a><br/>`
      + `<b>来源</b>: <a href="${window.location.origin}">${window.location.host}</a><br/>`
      + '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br/>';

      clipboardData.setData('text/html', htmlData);
      clipboardData.setData('text/plain', textData);
  });
})();