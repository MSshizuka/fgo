; (function (window) {
  menuClick();
  handleResult('英灵图鉴');

  let asideRight = document.querySelector('.aside_right'),
    asideMiddle = document.querySelector('#main_body'),
    searchServent = document.querySelector('.search-servent'),
    searchBtn = document.querySelector('.search-btn'),
    forward = document.querySelector('.order-left'),
    reverse = document.querySelector('.order-right');

  asideRight.style.display = 'none';
  asideMiddle.style.width = '60rem';

  let orderServent = document.querySelector('.order-servent'),
    loadMore = document.querySelector('.add-more'),
    mobileLoadMore = document.querySelector('.mobile-add-more');

  let searchEvent = e => {
    if (e.keyCode === 13) {
      console.log(searchServent.value);
      handleResult('英灵图鉴', null, searchServent.value);
    };
    if (!e.keyCode) {
      handleResult('英灵图鉴', null, searchServent.value);
    };
  };

  let direction = e => {
    if (e.toElement.innerText === '倒序') {
      handleResult('英灵图鉴', null, searchServent.value, false);
    } else {
      handleResult('英灵图鉴', null, searchServent.value, true);
    }
  };

  forward.addEventListener('click', direction);
  reverse.addEventListener('click', direction);

  searchServent.addEventListener('keydown', searchEvent);
  searchBtn.addEventListener('click', searchEvent)

  let order = e => {
    let brother = e.target.nextElementSibling || e.target.previousElementSibling;
    addClass(e.target, 'order-active');
    removeClass(brother, 'order-active');
  };

  let showMore = e => {
    let len = e.target.previousElementSibling.children.length;
    if (forward.className.indexOf('order-active') > -1) {
      handleResult('英灵图鉴', len, searchServent.value, true);
    } else {
      handleResult('英灵图鉴', len, searchServent.value, false);
    };

  };

  orderServent.onclick = order;
  loadMore.onclick = showMore;
  mobileLoadMore.addEventListener('click', showMore)

  window.onresize = () => {
    handleResult('英灵图鉴', null, searchServent.value);
  };
})(window)