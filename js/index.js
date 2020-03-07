//#region
/*
let titles = document.querySelectorAll('.title'),
    titles_two = document.querySelectorAll('.title_2'),
    eleArr = [...titles].concat([...titles_two]);

let addClass = (ele, attr) => {
  if (hasClass(ele, attr)) return;
  ele.className = `${ele.className} ${attr}`;
};

let removeClass = (ele, attr) => {
  if (!hasClass(ele, attr)) return;
  ele.className = ele.className.replace(attr, '');
};

let hasClass = (ele, attr) => {
  return ele.className.indexOf(attr) > -1 ? true : false;
};

let toggle = e => {
  let arr = [...e.target.parentElement.children].slice(1),
      icon = e.target.firstChild;
  arr.forEach(item => {
    if (hasClass(item, 'hide')) {
      removeClass(item, 'hide');
      addClass(item, 'show');
      icon.innerText = '-';
    } else {
      removeClass(item, 'show');
      addClass(item, 'hide');
      icon.innerText = '+';
    }
  });
};

eleArr.forEach(item => item.onclick = toggle);
 */
//#endregion

; (function (window) {
  window.onload = () => {
    let aside_left = document.querySelector('#aside_left'),
      aside_right = document.querySelector('#aside_right'),
      aside_middle = document.querySelector('#main_body');

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
      maxHeight = computedHeight(eleAry);
      eleAry.forEach(item => item.style.height = maxHeight + 'px');
    }
    let mark = document.querySelector('#mark'),
      header = document.querySelector('#header'),
      navImg = document.querySelector('.nav_img'),
      navList = document.querySelector('.nav_list'),
      asideLeft = document.querySelector('.aside_left'),
      middle_container = document.querySelector('#middle_container'),
      swiperContainer = document.querySelector('.swiper-container'),
      swiperWrapper = document.querySelector('.swiper-wrapper'),
      left_arrow = document.querySelector('#left_img'),
      right_arrow = document.querySelector('#right_img'),
      masterTask = document.querySelector('.master_task'),
      masterTbody = masterTask.querySelector('tbody'),
      weekBack = document.querySelector('.week_back'),
      weekTbody = weekBack.querySelector('tbody'),
      versionContainer = document.querySelector('.version_container'),
      newContainers = document.querySelectorAll('.new_servant'),
      
      str = ``;

    left_arrow.style.display = 'none';
    right_arrow.style.display = 'none';

    //=>获取数据
    let queryData = () => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', './json/index.json');
      xhr.send();
      return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          };
          if (/^4\d{2}$/.test(xhr.status)) {
            reject(xhr.statusText);
          };
        };
      });
    }

    //=>渲染页面
    let bindHtml = totalData => {
      let [navData, leftData, middleData, rightData] = totalData;
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

      //=>middle------------------------------------------------------------------
      //=>banner
      let [bannerImg, masterTask, weekTask] = middleData.data;
      bannerImg.data.forEach(item => {
        let { link, img } = item;
        str += `<div class="swiper-slide">
      <a href="${link}"><img src="${img}" alt=""></a>
    </div>`;
      });
      swiperWrapper.innerHTML = str;
      str = '';

      //=>master-task
      let masterTaskThead = masterTask.data[0].th,
        masterTaskAry = masterTask.data.slice(1);
      str += `<tr>
    <th colspan="9">${masterTaskThead}</th>
  </tr>`
      masterTaskAry.forEach(item => {
        let { firstTd, secondTd } = item;
        str += `<tr>
    <td colspan="2" rowspan="2">${firstTd}</td>
    <td colspan="7" rowspan="2">${secondTd}</td>
  </tr>
  <tr></tr>`
      });
      masterTbody.innerHTML = str;
      str = ``;

      //=>week-task
      let { firstTh, secondTh, thirdTh } = weekTask.data[0],
        weekTaskAry = weekTask.data.slice(1);
      str += `<tr>
    <th colspan="2" rowspan="2" width="22.22%">${firstTh}</th>
    <th colspan="3" rowspan="2" width="33.33%">${secondTh}</th>
    <th colspan="4" rowspan="2">${thirdTh}</th>
  </tr>
  <tr></tr>`
      weekTaskAry.forEach(item => {
        let { firstTd, secondTd, thirdTd, fourthTd, fifthTd, sixthTd, seventhTd } = item;
        str += `<tr>
      <td colspan="2" rowspan="6">${firstTd}</td>
      <td colspan="3" rowspan="2">${secondTd}</td>
      <td colspan="4" rowspan="2">${thirdTd}</td>
    </tr>
    <tr></tr>
    <tr>
      <td colspan="3" rowspan="2">${fourthTd}</td>
      <td colspan="4" rowspan="2">${fifthTd}</td>
    </tr>
    <tr></tr>
    <tr>
      <td colspan="3" rowspan="2">${sixthTd}</td>
      <td colspan="4" rowspan="2">${seventhTd}</td>
    </tr>
    <tr></tr>`;
      });
      weekTbody.innerHTML = str;
      str = ``;

      //=>right--------------------------------------------------------------
      //=>version
      let versionDownload = rightData.data[0].data,
        [newServant, newEquipment, newTags] = rightData.data.slice(1);
      versionDownload.forEach(item => {
        let { version, apple, appleLink, android, androidLink } = item;
        str += `<div class="version_info">
    <h5 class="title">${version}</h5>
    <div class="version_download">
      <a href="${appleLink}"><i
          class="uk-icon-apple">${apple}</i></a>
      <a href="${androidLink}"><i>${android}</i></a>
    </div>
  </div>`;
      });
      versionContainer.innerHTML = str;
      str = ``;

      //=>servent
      str += `<h3 class="title"><span>${newServant.title}</span></h3><div class="servant_container">
  <ul>`;
      newServant.data.forEach(item => {
        let { id, name, img, link } = item;
        str += `
        <li class="servant_item">
          <a href="${link}"><img src="${img}${id}.jpg" alt="" title="${name}"></a>
        </li>`
      });
      str += `</ul></div>`;
      newContainers[`${newServant.id - 1}`].innerHTML = str;
      str = ``;

      //=>equipment
      str += `<h3 class="title"><span>${newEquipment.title}</span></h3>
  <div class="servant_container">
    <ul>`
      newEquipment.data.forEach(item => {
        let { id, name, img, link } = item;
        str += `<li class="servant_item">
      <a href="${link}"><img src="${img}${id}.jpg" alt="" title="${name}"></a>
    </li>`
      });
      str += `</ul></div>`;
      newContainers[`${newEquipment.id - 1}`].innerHTML = str;
      str = ``;

      //=>tags
      str += `<h3 class="title"><span>${newTags.title}</span></h3>
  <div class="hot_tag"><ul>`
      newTags.data.forEach(item => {
        let { title, link } = item;
        str += `<li class="tag_item"><a href="${link}">${title}</a></li>`;
      });
      str += `</ul></div>`;
      newContainers[`${newTags.id - 1}`].innerHTML = str;
      str = ``;
    };

    //=>实现滑动
    let startSlide = () => {
      let mySwiper = new Swiper(swiperContainer, {
        direction: 'horizontal',
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: true
      });

      swiperContainer.onmouseover = () => {
        mySwiper.autoplay.stop();
        left_arrow.style.display = 'block';
        right_arrow.style.display = 'block';
      }
      swiperContainer.onmouseleave = () => {
        mySwiper.autoplay.start();
        left_arrow.style.display = 'none';
        right_arrow.style.display = 'none';
      }
    };

    queryData().then(result => {
      bindHtml(result);
      startSlide();
      let timer = setTimeout(() => {
        clearInterval(timer);
        setHeight();
      }, 500);
    }).catch(reason => console.log(reason));


    if (parseFloat(document.documentElement.offsetWidth) <= 650) {
      let menuBtn = header.querySelector('i'),
        asideMenu = document.querySelector('.aside_menu');
      if (menuBtn) {
        menuBtn.onclick = () => {
          if (document.body.style.overflow !== 'hidden') {
            console.log(mark);
            header.style.marginLeft = 170 + 'px';
            middle_container.style.marginLeft = 170 + 'px';
            asideMenu.style.left = 0 + 'px';
            document.body.style.overflow = 'hidden';
            mark.style.display = 'block';
          } else {
            header.style.marginLeft = 0 + 'px';
            middle_container.style.marginLeft = 0 + 'px';
            asideMenu.style.left = -170 + 'px';
            document.body.style.overflow = 'auto';
            mark.style.display = 'none';
          }
        }
      }
    }

    window.onresize = () => {
      let timer = setTimeout(() => {
        clearInterval(timer);
        setHeight();
      }, 300);
    };
  };
})(window)