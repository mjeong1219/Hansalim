const wrap = document.querySelector(".wrap");
const header = document.querySelector(".header");
let scy = 0;
window.addEventListener("scroll", function () {
    scy = this.document.documentElement.scrollTop;
    if (scy > 0) {
        wrap.classList.add("active");
        header.classList.add("active");
    }
    else {
        wrap.classList.remove("active");
        header.classList.remove("active"); 
    }
});

// 콤마 기능
function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// data.json을 로딩. 연결시켜준다.
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(event){
    const req = event.target;
    if(req.readyState === XMLHttpRequest.DONE){
        const str = req.response;
        // 글자로 온 데이터를 객체로 변환
        // 글자가 json 규칙대로 만들어진 문자열.
        // 그러므로 json 글자를 객체로 변환해서 활용한다.
        let obj = JSON.parse(str);

        VISUAL_ARR = obj.visual;
        TODAY_GOOD = obj.todaygood;
        SALE_GOOD = obj.salegood;
        NEW_GOOD = obj.newgood;
        
        showVisual(); // 비주얼을 화면에 배치한다.
        showTodayGood(); // 오늘의 상품을 화면에 배치
        showSaleGood(); // 할인 상품을 화면에 배치
        showNewGood(); // 신상품을 화면에 배치
    }
}
// 자료를 호출한다.
xhttp.open("GET", "data.json")
// 웹브라우저 기능 실행 할 수 있도록 요청.
xhttp.send();
// 비주얼 슬라이드
let VISUAL_ARR;
let visualTag = document.getElementById("data-visual"); // 슬라이드 바로 위 요소
// 오늘 상품
let TODAY_GOOD;
let todayTag = document.getElementById("data-today");
let todayTag2 = document.getElementById("data-today2");
// 할인 상품
let SALE_GOOD;
let saleTag = document.getElementById("data-sale");
// 신상품
let NEW_GOOD;
let newTag = document.getElementById("data-new");
let newListTag = document.getElementById("data-new-list");

// ==============================================================================

//// 헤더 ////

// 펼침 목록들 보기 기능
// 더보기 목록기능
const menuBt = document.getElementById("menu-bt");
const menuList = document.getElementById("menu-list");
// 참여 목록기능
const joinBt = document.getElementById("join-bt");
const joinList = document.getElementById("join-list");
//  조합원센터 목록기능
const centerBt = document.getElementById("center-bt");
const centerList = document.getElementById("center-list");
//  배열 순서번호가 주어진다. (배열순서번호 index)
const toggleListArr = [menuList, joinList, centerList];
const toggleBtArr = [menuBt, joinBt, centerBt];
// 펼침 목록 모두!!!!!! 닫기
document.addEventListener("click", function () {
    toggleListArr.forEach(function (item) {
        item.style.display = "none";
    });
    // 버튼 초기화
    toggleBtArr.forEach(function (item) {
        item.classList.remove("active");
    });
});

// 목록 전체를 클릭해도 이벤트 전달을 막아줌.
toggleListArr.forEach(function (item) {
    item.addEventListener("click", function (event) {
        event.stopPropagation();
    });
});

// 코드 블럭이 같은 기능 반복된다.
// 기능을 만들어서 쓴다.
function listToggle(버튼, 목록) {
    // 처음에는 목록을 보여주지 않는다.
    목록.style.display = "none";

    // click 이벤트가 발생하면 함수 실행.
    버튼.addEventListener("click", function (event) {

        // 클릭이 되었다면 이벤트는 아래 전달된다.
        // 클릭된 이벤트를 아래로 전달하지 못하도록 막아준다.
        event.stopPropagation();
        toggleBtArr.forEach(function (item) {
            item.classList.remove("active");
        });

        // 체크한 나머지 두개는 넣기
        // console.log(목록);
        const nowListId = 목록.getAttribute("id");
        const hideArr = toggleListArr.filter(function (item) {
            let id = item.getAttribute("id");
            // console.log(id);
            if (id !== nowListId) {
            return this;
            }
        });

        // 새로 저장된 배열의 목록은
        console.log(hideArr);
        hideArr.forEach(function (item) {
            item.style.display = "none";
        });
        const css = getComputedStyle(목록).display;
        // display값 비교한다.
        if (css === "none") {
            목록.style.display = "block";
            // 클래스를 강제로 추가한다
            버튼.classList.add("active");
        } else {
            목록.style.display = "none";
            // 클래스 강제로 추가한다.
            버튼.classList.remove("active");
        }
    });
}
listToggle(menuBt, menuList);
// toggleListArr[0] = menuList
listToggle(joinBt, joinList);
// toggleListArr[1] = joinList
listToggle(centerBt, centerList);
// toggleListArr[2] = centerList

// =================================////////////===============================

// 전체 메뉴 펼침 기능
const allMenuArea = document.querySelector(".all-menu-area");
const allMenu = document.querySelector(".all-menu");
const cateList = document.querySelector(".all-menu-cate");
// ul인 cate-list로 선언하니 스크롤 부분에 커서올리면 메뉴 사라짐.
const cateListWrap = document.querySelector(".all-menu-cate-wrap");

cateList.addEventListener("mouseleave", function(){
    allMenu.classList.remove("active") // 기능되기 전 가림.
})
cateList.addEventListener("mouseenter", function(){
    allMenu.classList.add("active");
});
cateListWrap.addEventListener("mouseenter", function(){
    allMenu.classList.add("active");
});

// =============================================================

// 서브 카테고리 보여주기
const cateLists = document.querySelectorAll(".cate-list > li")
const cateDepth2 = document.querySelectorAll(".cate-depth2-list")
cateLists.forEach(function(item,index){
    item.addEventListener("mouseenter",function(){
        cateDepth2.forEach(function(itemSub, indexSub){
            itemSub.style.display = "none"
            if(indexSub === index){
                itemSub.style.display = "block"
            }
        })
    console.log
    })
})

// =====================///////////========================================


//// 비주얼 ////

// 비주얼 화면 출력 기능
function showVisual(){
    let html = "";
    VISUAL_ARR.forEach(function(item){
        const tag = `
        <div class="swiper-slide">
        <div class="visual-slide-page">
        <a href="${item.link}">
        <img src="../images/${item.pic}" alt="${item.name}"/>
        </a>
        </div>
        </div>`;
        // json의 변수를 가져와서 item으로 선언.
        html += tag; 
    });
    visualTag.innerHTML = html;


// 비주얼 슬라이드 기능
const swVisual = new Swiper(".sw-visual", {
    loop:true, // loop : 무한으로 도는 것.
    navigation: {
        prevEl: ".visual-prev",
        nextEl: ".visual-next"
    },
    autoplay: {
        delay:2500,
        disableOnInteraction: false, // 상관없이 계속 autoplay.
    },
    pagination: { // 하나하나 넘어가는 것.
        el: ".visual-pg",
        type: "fraction"
    }
});

// 비주얼 슬라이드 멈춤 기능
const swVisualPlay = document.querySelector(".visual-play");
swVisualPlay.addEventListener("click", function(){
    // 현재 active 클래스가 있는지를 확인하고 기능을 설정한다.
    // 만약 classList에 contains가 active라면
    if(swVisualPlay.classList.contains("active")){
        swVisual.autoplay.start(); // 사진이 멈춰야 하므로 swVisual
        swVisualPlay.classList.remove("active");
    }else{
        swVisual.autoplay.stop(); // autoplay가 멈춤
        swVisualPlay.classList.add("active"); // active(정지) 됨.
    }
});
}


////오늘의 상품////

// 오늘의 상품 화면 출력 기능
function showTodayGood() {
    let htmlTop = "";
    let htmlBottom = "";
    const topArr = TODAY_GOOD.filter(function (item, index) {
        if (index < 4) {
            return item;
        }
    });

    topArr.forEach(function (item) {
        let tag = `
        <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
                <img src="../images/${item.pic}" alt="${item.name}">
                <span class="good-type">${item.tag}</span>
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
                <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">
            ${priceToString(item.price)}<em>원</em>
            </a>
            <!-- 장바구니 이미지 -->
            <button class="good-add-cart"></button>
        </div>
        `;
        htmlTop += tag;
    });

    // 배열의 일부분 인덱스 4~7까지 배열만들기
    const botArr = TODAY_GOOD.filter(function(item, index){
        if(index > 3){
            return item;
        }
    });
    botArr.forEach(function(item){
        let tag = `
        <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
                <img src="../images/${item.pic}" alt="${item.name}">
                <span class="good-type">${item.tag}</span>
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
                <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">
                ${priceToString(item.price)}<em>원</em>
            </a>
            <!-- 장바구니 이미지 -->
            <button class="good-add-cart"></button>
        </div>
        `;
        htmlBottom += tag;
    })

    todayTag.innerHTML = htmlTop;
    todayTag2.innerHTML = htmlBottom;
}


//// 할인 상품 ////

// 할인 상품 화면 출력 기능
function showSaleGood(){
    let html = `
    <div class="swiper sw-sale">
    <div class="swiper-wrapper">
    `;
    
    SALE_GOOD.forEach(function(item){
        // today와 똑같은 형태이므로 그대로 가져옴.
        let tag = `
        <div class="swiper-slide">
            <div class="good-box">
                <!-- 제품이미지 -->
                <a href="${item.link}" class="good-img">
                    <img src="../images/${item.pic}" alt="${item.name}">
                    <span class="good-type">${item.tag}</span>
                </a>
                <!-- 제품정보 -->
                <a href="${item.link}" class="good-info">
                    <em>${item.name}</em>(<em>${item.unit}</em>)
                </a>
                <!-- 제품가격 -->
                <a href="${item.link}" class="good-info-price">
                    ${priceToString(item.price)}<em>원</em>
                </a>
                <!-- 장바구니 이미지 -->
                <button class="good-add-cart"></button>
            </div>
        </div>
        `;
        html += tag;
    });
    html += `
    </div>
    </div>
    `;
    saleTag.innerHTML = html;
    const swSale = new Swiper(".sw-sale", {
        slidesPerView: 3, // 보여지는 슬라이드 개수
        spaceBetween: 16, // 슬라이드 간의 간격
        slidesPerGroup: 3, // 넘어가는 슬라이드 개수
        navigation: {
            prevEl: ".sale .slide-prev",
            nextEl: ".sale .slide-next"
        },
        pagination: {
            // 페이지 수 출력됨.
            el: ".sale .slide-pg",
            type: "fraction" // type을 하지 않으면 점으로 나옴.
        }
    })
}


//// 신상품 ////

// 신상품 화면 출력 기능
function showNewGood(){
    // 첫번째 화면 출력
    let obj = NEW_GOOD[0]; // 0번째 인 것을 불러옴
    let newGoodFirst = `
    <a href="${obj.link}" class="new-img">
        <img src="../images/${obj.pic}" alt="${obj.title}"/>
    </a>
    <a href="${obj.link}" class="new-title">
        ${obj.title}
    </a>
    <a href="${obj.link}" class="new-txt">
        ${obj.txt}
    </a>
    `;
    newTag.innerHTML = newGoodFirst;

    // 나머지 화면 출력 1~4번
    let html = "";
    NEW_GOOD.forEach(function(item, index){
        let tag = "";

        // 0번은 출력했으므로
        if(index !== 0){
            let newGoodList = `
            <a href="${obj.link}" class="new-img">
                <img src="../images/${obj.pic}" alt="${obj.title}"/>
            </a>
            <a href="${obj.link}" class="new-title">
                ${obj.title}
            </a>
            <a href="${obj.link}" class="new-txt">
                ${obj.txt}
            </a>
            `;
            newTagList.innerHTML = newGoodList;
        }
        
    });
}