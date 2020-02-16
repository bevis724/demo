var checkBtn = document.querySelector('.btn__text');
var bmiList = document.querySelector('.record__list');
var historyBtn = document.querySelector('.record__history');
var listData = JSON.parse(localStorage.getItem('localData')) || [];

var state = '';
var bmi = 0;

checkBtn.addEventListener('click', getBmi, false);
historyBtn.addEventListener('click', delList, false);

updateList(listData);

// 取得input值及判斷並執行其他函式
function getBmi() {
  var hValue = document.querySelector('.input__text--height').value;
  var wValue = document.querySelector('.input__text--weight').value;

  //判斷使用者輸入的數字是否正確
  if (hValue == '' || hValue <= 0) {
    alert('請輸入輸字，數字不可為０');
    return
  } else if (wValue == '' || wValue <= 0) {
    alert('請輸入輸字，數字不可為０');
    return
  }

  getState(hValue, wValue);
  getData(hValue, wValue);
  updateList(listData);
  updateBtn();
}
// 取得時間
function getDate() {
  var time = new Date();
  var date = `${time.getDate()}-${(time.getMonth()+1)}-${time.getFullYear()}`;
  return date
}
// 判斷BMI值
function getState(hValue, wValue) {
  bmi = (wValue / Math.pow(hValue / 100, 2)).toFixed(2)
  if (bmi >= 40) {
    state = '重度肥胖';
  } else if (bmi >= 35) {
    state = '中度肥胖';
  } else if (bmi >= 30) {
    state = '輕度肥胖';
  } else if (bmi >= 25) {
    state = '過重';
  } else if (bmi >= 18.5) {
    state = '標準';
  } else if (bmi <= 16) {
    state = '過輕';
  }
}
// 處理資料
function getData(hValue, wValue) {
  var listContent = {
    s: state,
    b: bmi,
    h: hValue,
    w: wValue,
    d: getDate()
  }
  if(bmi == 'NaN'){return}
  listData.push(listContent);
  localStorage.setItem('localData', JSON.stringify(listData));
}
// 更新介面 判斷state加上class
function updateList(listData) {
  var listStr = '';
  var listLen = listData.length;
  for (let i = 0; i < listLen; i++) {
    listStr += `<li class="record__item">
    <div class="item__text">
      <span class="text__state">${listData[i].s}</span>
    </div>
    <div class="item__text">
      <span class="text__bmi">BMI</span>
      <span class="text__number">${listData[i].b}</span>
    </div>
    <div class="item__text">
      <span class="text__weight">weight</span> 
      <span class="text__number">${listData[i].w}</span>
    </div>
    <div class="item__text">
      <span class="text__height">height</span> 
      <span class="text__number">${listData[i].h}cm</span>
    </div>
    <div class="item__text">
      <span class="text__date">${listData[i].d}</span>
    </div>
  </li>`;
  }
  if(bmi == 'NaN'){return}
  bmiList.innerHTML = listStr;

  // 外層DOM覆寫class用
  var btnWrap = document.querySelector('.header__btn');
  var bmiListItem = document.querySelector('.record__item');
  // 處理顏色 判斷state加上class
  if (state == '重度肥胖') {
    btnWrap.classList.add('header__btn--heavy-over');
    // bmiListItem.classList.add('record__item--heavy-over');
  } else if (state == '中度肥胖') {
    btnWrap.classList.add('header__btn--heavy-medium');
    // bmiListItem.classList.add('record__item--heavy-medium');
  } else if (state == '輕度肥胖') {
    btnWrap.classList.add('header__btn--heavy-slightly');
    // bmiListItem.classList.add('record__item--heavy-slighty');
  } else if (state == '過重') {
    btnWrap.classList.add('header__btn--heavy');
    // bmiListItem.classList.add('record__item--heavy');
  } else if (state == '標準') {
    btnWrap.classList.add('header__btn--ideal');
    // bmiListItem.classList.add('record__item--ideal');
  } else if (state == '過輕') {
    btnWrap.classList.add('header__btn--light');
    // bmiListItem.classList.add('record__item--light');
  }
}
// 更新按鈕
function updateBtn() {
  var btnText = document.querySelector('.btn__text');
  var stateText = document.querySelector('.state__text');
  var btnStr = `<span class="btn__text--result">${bmi}</span>
                <span class="btn__text--str">BMI</span>
                <a class="btn__text--img"></a>`
  if(bmi == 'NaN'){
    alert('請勿輸入全行數字')
    return
  }
  btnText.innerHTML = btnStr;
  stateText.textContent = state;

  // 重新整理鈕
  var refreshBtn = document.querySelector('.btn__text--img');
  refreshBtn.addEventListener('click', refresh, false);
  function refresh (e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.reload();
  }
}
//清除資料
function delList() {
  localStorage.removeItem('localData');
  listData = [];
  updateList(listData);
}

