;(function (window) {
  let addMore = document.querySelector('.add-more');
  menuClick();
  handleResult('国服攻略');

  let getMore = e => {
    let len = e.target.previousElementSibling.querySelectorAll('section').length;
    console.log(len);
    handleResult('国服攻略', len)
  }

  addMore.addEventListener('click', getMore);

})(window)