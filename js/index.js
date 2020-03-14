; (function (window) {
  window.onload = () => {
    let header = document.querySelector('#header'),
      navImg = document.querySelector('.nav_img'),
      navList = document.querySelector('.nav_list'),
      asideLeft = document.querySelector('.aside_left'),
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
      menuContainer = document.querySelector('.menu_container'),
      menuUl = menuContainer.querySelector('ul'),
      str = ``;

    left_arrow.style.display = 'none';
    right_arrow.style.display = 'none';

    //=>获取数据
    let queryData = axios('./json/index.json');

    //=>渲染页面
    let bindHtml = totalData => {
      let [navData, leftData, middleData, rightData, menuData] = totalData;
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
      <a href="${appleLink}"><i>${apple}</i></a>
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
          <a href="${link}"><img src="${img}" alt="" title="${name}"></a>
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
      <a href="${link}"><img src="${img}" alt="" title="${name}"></a>
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

    queryData.then(result => {
      bindHtml(result.data);
      startSlide();
      setHeight();
      menuClick();
    }).catch(reason => console.log(reason));
  };
})(window)