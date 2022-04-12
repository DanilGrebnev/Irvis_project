'use strict'
//=================================================Modal: open/close logic================================================================
let popupModal = getBySelector('.popup');
let modalEng = getBySelector('.popup_engineer');
let popupCalcModal  = getBySelector('.popup_calc')
let popupCalcProfile = getBySelector('.popup_calc_profile') 
let popupCalcEnd = getBySelector('.popup_calc_end')
let body = getBySelector('body');

function displayBlock (item) {
    item.style.display = 'block'
}
function displayNone(item){
    item.style.display ='none'
}
function getTrueByTagName(item, tag, index = null){
    if(item == document.getElementsByTagName(tag)[index]){
        return true
    }
}
function getTrueByClass(item, className){
    if(item.classList.contains(className)){
        return true
    }
}
function getBySelector(className){
    return document.querySelector(className)
}
function getAllByClass(className){
    return document.querySelectorAll(className)
}
function removeClass(item, className){
    item.forEach(item => item.classList.remove(className))
}

body.addEventListener('click', (e)=> {
    let target = e.target

    if(getTrueByClass(target, 'popup_engineer_btn')){
        displayBlock(modalEng)
        }else if(getTrueByTagName(target, 'strong', 1) || getTrueByClass(target, 'popup_engineer')){
           displayNone(modalEng) 
        }else if(getTrueByClass(target, 'phone_link')){
            displayBlock(popupModal)
        }else if (getTrueByTagName(target, 'strong', 0) || getTrueByClass(target, 'popup')){
            displayNone(popupModal)
        }else if(getTrueByClass(target, 'glazing_price_btn')){
            displayBlock(popupCalcModal)
        }else if(getTrueByTagName(target, 'strong', 2) ||  getTrueByClass(target, 'popup_calc')){
            displayNone(popupCalcModal)
        }else if(getTrueByTagName(target, 'strong', 4)||  getTrueByClass(target, 'popup_calc_profile')){
            displayNone(popupCalcProfile)
        }else if(getTrueByClass(target, 'popup_calc_profile_button')){
            displayBlock(popupCalcEnd)
        }else if(getTrueByTagName(target, 'strong', 5) ||getTrueByClass(target, 'popup_calc_end')){
            displayNone(popupCalcEnd)
        }
        
})

//==================================================Tabs==================================================================================

let tabs = getAllByClass('.glazing_block');
let glazingContent = getAllByClass('.glazing_content')
let tabsName;

function tabsRemoveClassActive () {//Функция удаляет класс Activ у tabs 
    tabs.forEach(item => item.querySelector('a').classList.remove('active'))
}

function glazingContentDisplayNone(){
    glazingContent.forEach(item => displayNone(item))
}

function changeTabs (item, case1, case2, case3, case4, case5) {
    if(getTrueByClass(item, case1)){
            tabsName = 'tree'
        }else if(getTrueByClass(item, case2)){
            tabsName =  'aluminum'
        }else if(getTrueByClass(item, case3)){
            tabsName =  'plastic';
        }else if(getTrueByClass(item, case4)){
            tabsName ='french'
        }else if(getTrueByClass(item, case5)){
            tabsName ='rise'
        }
}

function changeActiveClass (item) {
    tabsRemoveClassActive ();
    item.classList.add('active')
    glazingContent.forEach(item => {
        if(item.classList.contains(tabsName)){
            glazingContentDisplayNone()
            item.style.display ="block"
        }
    })
}

tabs.forEach(item => item.addEventListener('click', (e) => {
    e.preventDefault()
    changeTabs(e.target, 'tree_link', 'aluminum_link', 'plastic_link', 'french_link', 'rise_link')
    changeActiveClass(e.target)
}))
//=========================================================================popup_calc ============================================================

let value;
let bigImg = getAllByClass('.big_img img')
let wrapperImg = getAllByClass('.balcon_icons_img');

function removeClass (item, className){
    item.forEach(item => item.classList.remove(className))
}
let typeGlass;
let height;
let width;
let formControl = getBySelector('.form-control');
let formControlValue;
let buttonEndCalc = popupCalcEnd.querySelectorAll('button')[1];
buttonEndCalc.addEventListener('click', () => {
    
})
popupCalcModal.addEventListener('click', (e) => {
    e.preventDefault()
    value = e.target.getAttribute('alt');
    
    
    removeClass (wrapperImg, 'do_image_more')
    wrapperImg.forEach(item => {
        if(item.getAttribute('data-atribute') === value){
            item.classList.add('do_image_more')
        }
    })

    bigImg.forEach(item => {
        if(item.getAttribute('alt')===value){
            bigImg.forEach(item => displayNone(item))
            displayBlock(item)
        }
    })


})
//===============================================================================================popup_calc_profile =================================================================
let buttonNext = getBySelector('.popup_calc_button')
buttonNext.addEventListener('click', () => {
    displayBlock(popupCalcProfile)
})

//==========================================================================================Last Tabs================================================================================
const decorationSlider = getBySelector('.decoration_slider');
const decorationContent = getBySelector('.decoration_content')
const noClickClass = decorationSlider.querySelectorAll('.no_click')
const arrElement =[];

let tabsData;
decorationSlider.addEventListener('click', (e) => {
    e.stopPropagation()
    if(e.target.getElementsByTagName('a') && e.target.getAttribute(['data-set'])){
        e.preventDefault()
        removeClass(noClickClass, "after_click")
        tabsData = e.target.getAttribute(['data-set'])
        e.target.closest('div').classList.add('after_click')
        
    }
    changeEndTabs(`.${tabsData}`)
    
})

getElement('.internal')
getElement('.external')
getElement('.rising')
getElement('.roof')

function getElement (className) {
    let element = document.querySelector(className)
    arrElement.push(element)
}

function changeEndTabs(element){
    arrElement.forEach(item => item.style.display='none')
    decorationContent.querySelector('.row').querySelector(element).style.display='block'
}


//===================================================================timer=======================================
let userTime = document.querySelector('.sale_subtitle');
let deadLineValue = 8
let dateDay = new Date().getDate() + deadLineValue

function setLocalStorage() {
    localStorage.setItem('userDate', deadLineValue)
}


userTime.innerText= `Успей сэкономить на остеклении! Только до ${dateDay} апреля`

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
   
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('#days');
    var hoursSpan = clock.querySelector('#hours');
    var minutesSpan = clock.querySelector('#minutes');
    var secondsSpan = clock.querySelector('#seconds');
   
    function updateClock() {
      var t = getTimeRemaining(endtime);
   
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
   
      if (t.total <= 0) {
        clearInterval(timeinterval);
        localStorage.clear()
      }
    }
   
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
    
  }
   
  var deadline = new Date(Date.parse(new Date()) + deadLineValue * 24 * 60 * 60 * 1000); // for endless timer
  initializeClock('timer', deadline);

let balconType;
let arr =[]
let selectedGlazz = getBySelector('.do_image_more')

document.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.getElementsByTagName('button')){
        console.log(e.target)
    }
})
let ar = [];
let button =document.querySelectorAll('button');

