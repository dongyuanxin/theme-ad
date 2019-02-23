const { imgcdn } = require('./../package.json');

function replaceImgPath (str, imgUlr) {
  const set = new Set();
  let re = /<img.*?src="(\/[^\/].*?)"/gim;

  while ((exec = re.exec(str)) !== null) {
    set.add(exec['1']);
  }

  set.forEach(item => {
    re = new RegExp(item, 'g');
    str = str.replace(re, `${imgUlr}${item}`);
  });

  return str;
}

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = replaceImgPath(data.content, imgcdn);
  data.more = replaceImgPath(data.more, imgcdn);
  data.excerpt = replaceImgPath(data.excerpt, imgcdn);
  return data;
});
