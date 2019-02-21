(() => {
  function handleImgClick(event) {
    window.open(event.target.getAttribute('src'), '_blank');
  }

  document
    .querySelectorAll('.passage')
    .forEach(
      passage => 
        passage
          .querySelectorAll('img')
          .forEach(image => image.addEventListener('click', handleImgClick))
    );
})();
