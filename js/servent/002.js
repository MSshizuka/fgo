;(function (window) {
  menuClick();
  let index = window.location.search.match(/NO\.\d+/g)[0],
      middleContainer = document.querySelector('.middle_container'),
      str = ``;

  // function format(str) {
  //   if (str.length === 1) return str;
  //   if (str[0] == 0) {
  //     str = str.slice(1);
  //     return format(str);
  //   } else {
  //     return str
  //   }
  // }

  // index = format(index);

  axios.get('/fgo/json/article.json').then(data => { 
    result = data.data[6].data.filter(item => {
      return item.id === index
    });
    console.log(result[0]);
    let {video:videoSrc ,name, uniqueName} = result[0];
  
    str = `<div class="title"><span>${name}宝具展示</span></div>
    <div class="uniue-name"><span><${uniqueName}></span></div>
    <video class="unique-video" controls autoplay preload="auto" x5-video-player-type="h5" x5-video-orientation="portraint" x5-video-player-fullscreen="true">
      <source src="${videoSrc}" type="video/mp4">
    </video>`
    middleContainer.innerHTML = str;
    str = ``;
  })
  

})(window)

// function format(str) {
//   if (str.length === 1) return str;
//   if (str[0] == 0) {
//     str = str.slice(1);
//     console.log(str);
//     return format(str);
//   }
//   return str


//   00010

//   第一次： format(0010)
//   第二次： 010
//   ：10