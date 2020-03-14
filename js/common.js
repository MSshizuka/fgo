; (function (window) {
  let aside_left = document.querySelector('#aside_left'),
    aside_right = document.querySelector('#aside_right'),
    aside_middle = document.querySelector('#main_body'),
    mark = document.querySelector('#mark'),
    header = document.querySelector('#header'),
    middle_container = document.querySelector('#middle_container'),
    menuContainer = document.querySelector('.menu_container'),
    asideMenu = document.querySelector('.aside_menu'),
    navImg = document.querySelector('.nav_img'),
    navList = document.querySelector('.nav_list'),
    asideLeft = document.querySelector('.aside_left'),
    menuUl = menuContainer.querySelector('ul'),
    versionContainer = document.querySelector('.version_container'),
    newContainers = document.querySelectorAll('.new_servant'),
    str = ``;

  //=>获取数据
  let queryData = axios('/fgo/json/index.json');

  //=>绑定数据
  queryData.then(totalData => {
    let [navData, leftData, middleData, rightData, menuData] = totalData.data;
    //=>nav-------------------------------------------------------------------
    let { bigImg } = navData.data[0];
    let itemAry = navData.data.slice(1);
    str = `<img src="${bigImg}" alt="">`;
    navImg.innerHTML = str;
    str = '';

    itemAry.forEach(item => {
      let { title, link } = item;
      str += `<li class="item"><a href="${link}">${title}</a><span>|</span></li>`
    });
    navList.innerHTML = str;
    str = '';

    //=>left----------------------------------------------------------------
    leftData.data.forEach(item => {
      let { primaryTitle } = item,
        secondaryTitleAry = [];
      item.data.forEach((value, index) => {
        secondaryTitleAry.push(value.link, value.secondaryTitle);
        if (index == item.length) {
          return secondaryTitleAry
        };
      });
      str += `<div class="aside_left_container"><span class="aside_title_first">${primaryTitle}</span><ul>`;
      secondaryTitleAry.forEach((val, index) => {
        if (index % 2 === 0) {
          str += `<li class="aside_title_second"><a href="${val}">`;
        } else {
          str += `${val}</a></li>`
        }
      })
      str += `</ul></div>`
    });
    asideLeft.innerHTML = str;
    str = '';


    //=>right
    let versionDownload = rightData.data[0].data,
      [newServant, newEquipment, newTags] = rightData.data.slice(1);
    versionDownload.forEach(item => {
      let { version, apple, appleLink, android, androidLink } = item;
      str += `<div class="version_info">
    <h5 class="title">${version}</h5>
    <div class="version_download">
      <a href="${appleLink}"><i>${apple}</i></a>
      <a href="${androidLink}"><i>${android}</i></a>
    </div>
  </div>`;
    });
    if (versionContainer) {
      versionContainer.innerHTML = str;
    }
    str = ``;

    //=>servent
    str += `<h3 class="title"><span>${newServant.title}</span></h3><div class="servant_container">
  <ul>`;
    newServant.data.forEach(item => {
      let { id, name, img, link } = item;
      str += `
        <li class="servant_item">
          <a href="${link}"><img src="${img}" alt="" title="${name}"></a>
        </li>`
    });
    str += `</ul></div>`;
    if (newContainers[`${newServant.id - 1}`]) {
      newContainers[`${newServant.id - 1}`].innerHTML = str;
    }
    str = ``;

    //=>equipment
    str += `<h3 class="title"><span>${newEquipment.title}</span></h3>
  <div class="servant_container">
    <ul>`
    newEquipment.data.forEach(item => {
      let { id, name, img, link } = item;
      str += `<li class="servant_item">
      <a href="${link}"><img src="${img}" alt="" title="${name}"></a>
    </li>`
    });
    str += `</ul></div>`;
    if (newContainers[`${newEquipment.id - 1}`]) {
      newContainers[`${newEquipment.id - 1}`].innerHTML = str;
    }
    str = ``;

    //=>tags
    str += `<h3 class="title"><span>${newTags.title}</span></h3>
  <div class="hot_tag"><ul>`
    newTags.data.forEach(item => {
      let { title, link } = item;
      str += `<li class="tag_item"><a href="${link}">${title}</a></li>`;
    });
    str += `</ul></div>`;
    if (newContainers[`${newTags.id - 1}`]) {
      newContainers[`${newTags.id - 1}`].innerHTML = str;
    }
    str = ``;

    //=>asideMenu------------------------------------------------------------------
    //=>aside_menu
    menuData.data.forEach(item => {
      let { id, title, icon, link } = item;
      if (icon) {
        str += `<li><a href="${link}" id="${id}"><i class="${icon}"></i> ${title}</a></li>`;
      } else {
        str += `<li><a href="${link}" id="${id}">${title}</a></li>`;
      };
    });
    menuUl.innerHTML = str;
    str += ``
    setHeight();
  })


  let eleAry = [aside_left, aside_middle, aside_right],
    maxHeight = null;
  let computedHeight = function (arr = []) {
    let heightAry = [];
    arr.forEach(item => {
      item.style.height = 'auto';
      // console.log(item.offsetHeight);
      heightAry.push(item.scrollHeight);
    })
    return Math.max(...heightAry);
  };

  let setHeight = () => {
    let i = 0;
    let timer = setInterval(() => {
      ++i === 10 ? clearInterval(timer) : null;
      maxHeight = computedHeight(eleAry);
      eleAry.forEach(item => item.style.height = maxHeight + 'px');
    }, 100);
  }

  let slideIn = e => {
    header.style.marginLeft = 170 + 'px';
    middle_container.style.marginLeft = 170 + 'px';
    asideMenu.style.left = 0 + 'px';
    document.body.style.overflow = 'hidden';
    mark.style.display = 'block';
    document.body.style.position = 'fixed'
    document.body.style.top = 0
    document.body.style.bottom = 0
    document.body.style.width = '100%'
    document.body.style.height = '100%'
  }

  let slideOut = e => {
    header.style.marginLeft = 0 + 'px';
    middle_container.style.marginLeft = 0 + 'px';
    asideMenu.style.left = -170 + 'px';
    document.body.style.overflow = 'auto';
    mark.style.display = 'none';
    document.body.style.position = 'static'
  }

  let markClick = e => {
    slideOut(e);
  }

  let menuClick = () => {
    let menuBtn = header.querySelector('i');
    if (menuBtn) {
      menuBtn.onclick = e => {
        if (document.body.style.overflow !== 'hidden') {
          slideIn(e);
          mark.addEventListener('click', markClick);
        } else {
          slideOut(e);
        }
      }
    }
  }

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

  window.onresize = () => {
    setHeight();

  };

 

  window.setHeight = setHeight;
  window.slideIn = slideIn;
  window.slideOut = slideOut;
  window.menuClick = menuClick;
  window.addClass = addClass;
  window.markClick = markClick;
  window.removeClass = removeClass;
})(window)