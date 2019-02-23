(() => {
  function handleImgClick(event) {
    window.open(event.target.getAttribute('src'), '_blank');
  }

  document
    .querySelectorAll('.passage-article')
    .forEach(
      passage => 
        passage
          .querySelectorAll('img')
          .forEach(image => image.addEventListener('click', handleImgClick))
    );
})();
