; (function (window) {
  let middleContainer = document.querySelector('#middle_container'),
    mobileTitleContainer = middleContainer.querySelector('div'),
    theSame = middleContainer.querySelectorAll('div')[0],
    addMore = document.querySelector('.add-more'),
    mobileAddMore = document.querySelector('.mobile-add-more'),
    str = '',
    tempData = null;

  //=>请求数据
  let result = axios.get("/fgo/json/article.json");


  //=>渲染页面
  let bindHtml = (result, num = 0) => {
    return new Promise((resolve, reject) => {
      str += `<ul class="nationalRaider-title">
        <li><a href="/fgo"><i class="iconfont icon-shouye"></i> 首页</a></li>
        <li><a href="javascript:;">${result.id}</a></li>
      </ul><hr>`;
      if (result.type === '游戏动态' || result.type === '游戏攻略') {
        if (result.id === '日服攻略' || result.id === '国服攻略') {
          if (num === 0) {
            num = 4;
          } else {
            num = num + 4 > result.data.length ? result.data.length : num + 4 ;
          }
          for (let i = 0; i < num; i++) {
            let { id, img, title, author, writed, link } = result.data[i];
            str += `<section class="article-container">
            <h2><a href="${link}" title="${title}">${title}</a></h2>
            <p class="author">${author}</p>
            <p class="img"><a href="${link}"><img src="${img}" alt></a></p>
            <p class="writed" title="${writed}">${writed}</p>
          </section>
          <hr>`
          }
          if (num === result.data.length) {
            addMore.style.display = 'none';
          }
        } else {
          result.data.forEach(item => {
            let { id, img, title, author, writed, link } = item;
            str += `<section class="article-container">
            <h2><a href="${link}" title="${title}">${title}</a></h2>
            <p class="author">${author}</p>
            <p class="img"><a href="${link}"><img src="${img}" alt></a></p>
            <p class="writed" title="${writed}">${writed}</p>
          </section>
          <hr>`
          });
        }
        middleContainer.innerHTML = str;
      };
      if (result.type === '图鉴大全') {     
        // console.log('join in');  
        if (parseFloat(document.documentElement.offsetWidth) < 660) {
          mobileServentContainer = document.querySelector('.list-container-mobile').querySelector('ul');
          mobileTitleContainer.innerHTML = str;
          str = ``;
          if (num === 0) {
            for (let i = 0; i < 16; i++) {
              let { id, name, img, job, stars, unique, link } = result.data[i];
              str += `<li><a href="${link}"><img src="${img}" alt="${name}">${name}</a></li>`
            };
            num = 16;
          } else {
            num = num + 16 > result.data.length ? result.data.length : num + 16;
            for (let i = 0; i < num; i++) {
              let { id, name, img, job, stars, unique, link } = result.data[i];
              str += `<li><a href="${link}"><img src="${img}" alt="${name}">${name}</a></li>`
            };
          }
          mobileServentContainer.innerHTML = str;
          if (num === result.data.length) {
            mobileAddMore.style.display = 'none';
          }
        } else {
          let serventContainer = document.querySelector('.list-container').querySelector('ul');
          theSame.innerHTML = str;
          str = ''
          if (num === 0) {
            for (let i = 0; i < 10; i++) {
              let { id, name, img, job, stars, unique } = result.data[i];
              str += `<li>
            <div class="servent-id"><div>${id}</div></div>
            <div class="servent-head"><div><a href="/fgo/servent/list/servent.html?servent=${id}"><img src="${img}" alt="${name}"></a></div></div>
            <div class="servent-name"><div><a href="/fgo/servent/list/servent.html?servent=${id}">${name}</a></div></div>
            <div class="servent-job"><div><img src="${job}" alt=""></div></div>
            <div class="servent-stars"><div><i class="iconfont icon-xingxing"></i>${stars}</div></div>
            <div class="servent-unique"><div><img src="${unique}" alt=""></div></div>
          </li>`
            };
          } else {
            num = num + 10 > result.data.length ? result.data.length : num + 10;
            for (let i = 0; i < num; i++) {
              let { id, name, img, job, stars, unique } = result.data[i];
              str += `<li>
              <div class="servent-id"><div>${id}</div></div>
              <div class="servent-head"><div><a href="/fgo/servent/list/servent.html?servent=${id}"><img src="${img}" alt="${name}"></a></div></div>
              <div class="servent-name"><div><a href="/fgo/servent/list/servent.html?servent=${id}">${name}</a></div></div>
              <div class="servent-job"><div><img src="${job}" alt=""></div></div>
              <div class="servent-stars"><div><i class="iconfont icon-xingxing"></i>${stars}</div></div>
              <div class="servent-unique"><div><img src="${unique}" alt=""></div></div>
            </li>`
            };
          }
          serventContainer.innerHTML = str;
          // console.log(num ,result.data.length);
          if (num === result.data.length) {
            addMore.style.display = 'none';
          } else {
            addMore.style.display = 'block';
          }
        }
      }

      str = ``;
      setHeight();
      resolve();
    })
  }

  //=>处理数据
  //str:标题 i:已经加载了多少项数据 keyword:搜索关键字 flag:是否倒序
  let handleResult = (str, i, keyword = '', flag = true) => {
    return new Promise((resolve, reject) => {
      axios.get("/fgo/json/article.json").then(result => {         
        let relevantData = result.data.find(item => item.id === str);
        tempData = relevantData;
        str = ``;
        // console.log(relevantData.data);
        relevantData.data = relevantData.data.filter(item => {
          // console.log(typeof item.id);
          return item.id.indexOf(keyword) > -1 || item.name.indexOf(keyword) > -1
        });
        if (!flag) {
          relevantData.data = relevantData.data.reverse();
        };
        bindHtml(relevantData, i).then(result => {
          resolve();
        });
      });
    })
  };

  window.handleResult = handleResult;
})(window)