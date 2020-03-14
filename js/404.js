; (function (window) {
  window.onload = () => {
    let pc = document.querySelector('.pc'),
      mobile = document.querySelector('.mobile');
    let hasClass = (ele, str) => {
      return ele.className.indexOf(str) > -1 ? true : false;
    }

    let addClass = (ele, str) => {
      if (hasClass(ele, str)) return;
      ele.className += ` ${str}`;
    }

    let removeClass = (ele, str) => {
      if (!hasClass(ele, str)) return;
      ele.className = ele.className.replace(str, '');
    }

    let pcShow = () => {
      removeClass(pc, 'hide');
      removeClass(mobile, 'show');
      addClass(pc, 'show');
      addClass(mobile, 'hide');
    }

    let mobileShow = () => {
      removeClass(pc, 'show');
      removeClass(mobile, 'hide');
      addClass(mobile, 'show');
      addClass(pc, 'hide');
      
    }

    if (parseFloat(document.documentElement.clientWidth) <= 660) {
      mobileShow()
    } else {
      pcShow()
    }

    window.onresize = () => {
      console.log(document.documentElement.clientWidth);
      if (parseFloat(document.documentElement.clientWidth) <= 660) {
        mobileShow()
      } else {
        pcShow()
      }
    }
  }
})(window)