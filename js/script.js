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


// =============================================================

// 하단 패밀리 펼침 기능
// 목록 열기 버튼
const openBt = document.querySelector(".footer-link");
// 목록 닫기 버튼
const closeBt = document.querySelector(".family-close");
// 보여질 패밀리 목록
const family = document.querySelector(".family");
// 기능처리
openBt.addEventListener("click", function(){
    family.classList.add("active");
    this.classList.add("active");
});
closeBt.addEventListener("click", function(){
    family.classList.remove("active");
    openBt.classList.remove("active");
})

// 위로가기 기능
const fixTopBt = document.querySelector(".fix-top")
fixTopBt.addEventListener("click", function(){
    // window.scrollTo(0, 0)
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})



// =====================///////////========================================
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
        RECOMMEND_GOOD = obj.recommendgood;
        POPULAR_ICON = obj.popularicon;
        POPULAR_GOOD = obj.populargood;
        BRAND_ARR = obj.brandarr;
        BANNER_ARR = obj.bannerarr;
        SEASON_GOOD = obj.seasongood;
        REVIEW_ARR = obj.review;
        NOTICE_ARR = obj.notice;
        GOODNEWS_ARR = obj.goodnews;
        
        showVisual(); // 비주얼을 화면에 배치
        showTodayGood(); // 오늘의 물품을 화면에 배치
        showSaleGood(); // 할인 물품을 화면에 배치
        showNewGood(); // 새물품을 화면에 배치
        showRecommendGood(); // 추천 물품을 화면에 배치
        showPopularIcon(); // 인기 물품 아이콘을 화면에 배치
        showPopularGood(); // 인기 물품을 화면에 배치
        showBrandArr(); // 브랜드관을 화면에 배치
        showBannerArr(); // 배너를 화면에 배치
        showSeasonGood(); // 제철요리를 화면에 배치
        showReview(); // 리뷰를 화면에 배치
        showNotice(); // 커뮤니티 공지사항 목록을 화면에 배치
        showGoodNews(); // 커뮤니티 물품소식 목록을 화면에 배치
    }
}
// 자료를 호출한다.
xhttp.open("GET", "data.json")
// 웹브라우저 기능 실행 할 수 있도록 요청.
xhttp.send();
// 비주얼 슬라이드
let VISUAL_ARR;
let visualTag = document.getElementById("data-visual"); // 슬라이드 바로 위 요소
// 오늘의 물품
let TODAY_GOOD;
let todayTag = document.getElementById("data-today");
let todayTag2 = document.getElementById("data-today2");
// 할인 물품
let SALE_GOOD;
let saleTag = document.getElementById("data-sale");
// 새물품
let NEW_GOOD;
let newTag = document.getElementById("data-new");
let newListTag = document.getElementById("data-new-list");
// 추천물품
let RECOMMEND_GOOD;
let recommendTag = document.getElementById("data-recommend");
// 인기물품 아이콘
let POPULAR_ICON;
let popularIconTag = document.getElementById("data-popular-icon");
// 인기물품 화면 출력
let POPULAR_GOOD;
let popularShow = 1; // 목록 중에 먼저 1번을 보여줌.
let popularTag = document.getElementById("data-popular");
// 브랜드관 화면 출력
let BRAND_ARR;
let brandTag = document.getElementById("data-brand");
// 배너 화면 출력
let BANNER_ARR;
let bannerTag = document.getElementById("data-banner");
// 제철 요리 화면 출력
let SEASON_GOOD;
let seasonTag = document.getElementById("data-season");
// 리뷰 화면 출력
let REVIEW_ARR;
let reviewTag = document.getElementById("data-review");
// 커뮤니티 공지사항 목록 화면 출력
let NOTICE_ARR;
let noticeTag = document.getElementById("data-notice");
// 커뮤니티 물품소식 목록 화면 출력
let GOODNEWS_ARR;
let goodNewsTag = document.getElementById("data-goodnews");



//// 비주얼 ////

// 비주얼 화면 출력 기능
function showVisual(){
    let html = "";
    VISUAL_ARR.forEach(function(item){
        const tag = `
        <div class="swiper-slide">
            <div class="visual-slide-page">
                <a href="${item.link}">
                    <img src="/images/${item.pic}" alt="${item.name}"/>
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


////오늘의 물품////

// 오늘의 물품 화면 출력 기능
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


//// 할인 물품 ////

// 할인 물품 화면 출력 기능
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


//// 새물품 ////

// 새물품 화면 출력 기능
function showNewGood(){
    // 첫번째 화면 출력
    let obj = NEW_GOOD[0]; // obj라는 변수를 0번째로 선언하고 불러옴
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
    NEW_GOOD.forEach(function(item, index){ // item이라는 메서드가 존재.
        // item의 인덱스를 불러온다. 그러나
        let tag = "";
        // 0번은 출력했으므로
        if(index !== 0){
            tag = `
            <div class="new-box">
                <a href="${item.link}" class="new-box-img">
                    <img src="../images/${item.pic}" alt="${item.title}"/>
                </a>
                <a href="${item.link}" class="new-box-title">
                    ${item.title}
                </a>
            </div>
            `;
        }
        html += tag;
    });
    newListTag.innerHTML = html;
}


//// 추천 물품 ////

// 추천 물품 화면 출력 기능
function showRecommendGood(){
    let html = `
    <div class="swiper sw-recommend">
    <div class="swiper-wrapper">
    `;
    
    RECOMMEND_GOOD.forEach(function(item){
        // today와 똑같은 형태이므로 그대로 가져옴.
        let tag = `
        <div class="swiper-slide">
            <div class="good-box">
                <!-- 제품이미지 -->
                <a href="${item.link}" class="good-img">
                    <img src="../images/${item.pic}" alt="${item.name}">
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
    recommendTag.innerHTML = html;
    const swRecommend = new Swiper(".sw-recommend", {
        slidesPerView: 3, // 보여지는 슬라이드 개수
        spaceBetween: 16, // 슬라이드 간의 간격
        slidesPerGroup: 3, // 넘어가는 슬라이드 개수
        navigation: {
            prevEl: ".recommend .slide-prev",
            nextEl: ".recommend .slide-next"
        },
        pagination: {
            // 페이지 수 출력됨.
            el: ".recommend .slide-pg",
            type: "fraction" // type을 하지 않으면 점으로 나옴.
        }
    })
}


//// 인기 물품 ////

// 인기 물품 카테고리 아이콘 화면 출력 기능

function showPopularIcon(){
    let html = `
    <div class = "swiper sw-icon">
    <div class = "swiper-wrapper">
    `;
    // 데이터 처리
    POPULAR_ICON.forEach(function(item){
        const tag = `
        <div class = "swiper-slide">
            <a href = "${item.link}">
                <span class = "popular-cate-icon"
                style = "
                background : url('../images/${item.icon}') no-repeat;
                background-position : 0px 0px;">
                </span>
                <span class = "popular-cate-name">${item.txt}</span>
            </a>
        </div>
        `; // hover 시 변경을 위해 여기서 style을 줌.
        html += tag;
    });
    html += `
    </div>
    </div>
    `;
    popularIconTag.innerHTML = html;
    const swIcon = new Swiper(".sw-icon", {
        slidesPerView: 7, // 보여지는 슬라이드 개수
        spaceBetween: 10, // 슬라이드 간의 간격
        slidesPerGroup: 7, // 넘어가는 슬라이드 개수
        navigation: {
            prevEl: ".popular-cate .popular-slide-prev",
            nextEl: ".popular-cate .popular-slide-next"
        }
    });
    const tag = document.querySelectorAll(".popular-slide a");
    tag.forEach(function(item, index){
        // 호버했을 때 이미지가 변경
        item.addEventListener("mouseover", function(){
            const spanTag = this.querySelector(".popular-cate-icon");
            spanTag.style.backgroundPositionY = "-64px";
        });
        // 마우스 아웃했을 때 이미지 돌아감.
        item.addEventListener("mouseout", function(){
            const spanTag = this.querySelector(".popular-cate-icon");
            spanTag.style.backgroundPositionY = "0";
        });

        // 클릭을 하면 버튼 (.popular-more)의 글자를
        // 클릭된 타이틀의 글자로 변경한다.
        item.addEventListener("click", function(event){
            // a 태그이므로 href="#"이 적용되어 누르면 새로고침이 될 수 있기 때문에
            // 버튼 기능만 하기 위해 preventDefault를 한다.
            event.preventDefault();
            const bt = document.querySelector(".popular-more");
            const title = this.querySelector(".popular-cate-name"); // 왜 this?
            bt.innerHTML = `${title.innerHTML} 물품 더보기`;

            this.style.backgroundColor = "#fff";
            this.style.border = "2px solid #76bd42";

            // 하단의 목록을 갱신한다. 클릭하면 바뀌어야 하므로 이 안에 작성.
            // 현재 클릭된 번호를 popularShow에 담는다.
            popularShow = index; // 위에서 선언한 1이 index 임을 선언.
            showPopularGood();
        });
    });
}

// 인기 물품 화면 출력 기능
function showPopularGood(){
    let html = "";
    let popCate = "populargood-" + (popularShow + 1); // 인덱스 번호에 계속 +1을 함.
    // console.log(POPULAR_GOOD[popCate]);
    POPULAR_GOOD[popCate].forEach(function (item){ // 여러개이므로 foreach
        let tag = `
        <div class="good-box">
            <!-- 제품이미지 -->
            <a href="${item.link}" class="good-img">
                <img src="images/${item.pic}" alt="${item.name}" />
                <span class="good-type">${item.tag}</span>
            </a>
            <!-- 제품정보 -->
            <a href="${item.link}" class="good-info">
                <em>${item.name}</em>(<em>${item.unit}</em>)
            </a>
            <!-- 제품가격 -->
            <a href="${item.link}" class="good-info-price">${priceToString(item.price)}<em>원</em></a>
            <!-- 장바구니 -->
            <button class="good-add-cart"></button>
        </div>
        `;
        html += tag;
        popularTag.innerHTML = html;
    });
}


//// 브랜드관 ////

// 브랜드관 화면 출력 기능
function showBrandArr(){
    let html=`
    <div class="swiper sw-brand">
    <div class="swiper-wrapper">
    `;
    BRAND_ARR.forEach(function(item){
        let tag = `
        <div class="swiper-slide">
            <div class="brand-box">
                <a href="${item.link}">
                    <img src="../images/${item.pic}" alt="${item.name}"/>
                    <p>${item.name}</p>
                    <ul class="brand-info clearfix">
                        <li>
                            <span class="brand-info-title">${item.title1}</span>
                            <span class="brand-info-value">${item.value1}</span>
                        </li>
                        <li>
                            <span class="brand-info-title">${item.title2}</span>
                            <span class="brand-info-value">${item.value2}</span>
                        </li>
                    </ul>
                </a>
            </div>
        </div>
        `;
        html += tag;
    });
    html += `
    </div>
    </div>
    `;
    brandTag.innerHTML = html;
    const swBrand = new Swiper(".sw-brand", {
        slidesPerView: 3, // 보여지는 슬라이드 개수
        spaceBetween: 16, // 슬라이드 간의 간격
        slidesPerGroup: 1, // 넘어가는 슬라이드 개수
        navigation: {
            prevEl: ".brand .slide-prev",
            nextEl: ".brand .slide-next"
        },
        pagination: {
            el: ".brand .slide-pg",
            type: "fraction"
        }
    })
}


/// 배너 ////

// 배너 화면 출력 기능
function showBannerArr() {
    let html = `
    <div class = "swiper sw-banner">
    <div class = "swiper-wrapper">
    `;
    BANNER_ARR.forEach(function(item){
        let tag = `
        <div class="swiper-slide">
            <a href="${item.link}">
                <img src = "../images/${item.image}" alt ="${item.title}"/>
            </a>
        </div>
        `;
        html += tag;
    });
    html += `
    </div>
    </div>
    `;
    bannerTag.innerHTML = html;
    const swBanner = new Swiper(".sw-banner", {
        loop: true,
        autoplay: {
        delay: 2500,
        disableOnInteraction: false
        },
        slidesPerView: 2,
        spaceBetween: 0,
        navigation: {
            prevEl: ".banner .slide-prev",
            nextEl: ".banner .slide-next",
        }
    });
};


/// 제철요리 ////

// 제철요리목록 화면 출력 기능
const buyTotal = document.getElementById("buy-total"); // 총 갯수
const buyTotalMoney = document.getElementById("buy-total-money") // 총 금액
let buyTotalCount = 0; // 기본값
let buyTotalMoneyPrice = 0; // 기본값

function showSeasonGood(item,index){
    let html = "";
    SEASON_GOOD.forEach(function(item, index){
        const tag = `
            <li>
                <div class="season-good clearfix">
                    <input
                        type="checkbox"
                        id="ch${index}"
                        class="season-good-check season-item"
                        value="${item.price}"
                        checked
                    />
                    <label for="ch${index}" class="season-label"></label>
                    <a href="${item.link}" class="season-good-img">
                        <img src="../images/${item.pic}" alt="${item.title}"/>
                    </a>
                    <p class= "season-good-info">
                        <a href="${item.link}" class="season-good-title">${item.title}</a>
                        <a href="${item.link}" class="season-good-price">
                            <em>${priceToString(item.price)}</em>원
                        </a>
                    </p>
                </div>
            </li>
        `; // 후에 계산해야하므로 value를 가격으로 가져옴.
        html += tag;
    });
    seasonTag.innerHTML = html;

    Scrollbar.initAll(); // smooth scrollbar 적용
    checkBoxFn(); // 체크박스 각각의 기능
    showBuyGood(); // 계산 출력
};

// 전체 체크박스 기능
const chkAll = document.getElementById("chkall");
chkAll.addEventListener("change", function(){
    const chkArr = document.querySelectorAll(".season-item");
    if(chkAll.checked){
        // 전체 체크를 해야 하는 경우
        chkArr.forEach(function(item){
            item.checked = true;
        });
    }else{
        // 전체 체크를 해제해야 하는 경우
        chkArr.forEach(function(item){
            item.checked = false;
        })
    }
    showBuyGood(); // 계산 출력
})

// 체크박스 각각의 기능
function checkBoxFn(){
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function(item){
        item.addEventListener("change", function(){
            // 가격을 다시 계산한다.
            showBuyGood();
        })
    })
}

// 계산 출력 기능
function showBuyGood(){
    // 체크가 된 값을 카운팅하고 더한다.
    let count = 0;
    let priceTotal = 0;
    const chkArr = document.querySelectorAll(".season-item");
    chkArr.forEach(function(item){
        const state = item.checked;
        if(state){
            count += 1; // count++ 과 같음.
            const price = parseInt(item.value); // 글자 값을 정수로 변경
            priceTotal += price;
        }
    });
    buyTotalCount = count;
    buyTotalMoneyPrice = priceTotal;
    buyTotal.innerHTML = buyTotalCount;
    buyTotalMoney.innerHTML = priceToString(buyTotalMoneyPrice);

    // 전체 선택 버튼 해제
    if(buyTotalCount === chkArr.length){
        // 전체 체크 버튼 checked 되어야 함.
        chkAll.checked = true;
    }else{
        // 전체 체크 버튼이 해제 되어야 함.
        chkAll.checked = false;
    }
}


/// 리뷰 ////

// 리뷰목록 화면 출력 기능
function showReview() {
    let html = `
    <div class="swiper sw-review">
    <div class="swiper-wrapper">
    `
    // 데이터 처리
    REVIEW_ARR.forEach(function(item){
        const tag = `
        <div class="swiper-slide">
            <div class="review-box">
                <a href="${item.link}">
                    <div class= "review-box-desc">
                        <span class= " review-box-title">
                            ${item.title}
                        </span>
                        <span class="review-box-star"> ${item.star} </span>
                        <span class="review-box-img">
                            <img src="../images/${item.pic}" alt="${item.title}"/>
                        </span>
                    </div>
                    <p class="review-box-txt">
                        ${item.txt}
                    </p>
                    <span class="review-box-user">${item.user} (${item.shop})</span>
                </a>
            </div>
        </div>
        `;
        html += tag;
    });
    html += `
    </div>
    </div>
    `;
    reviewTag.innerHTML = html;
    const swReview = new Swiper(".sw-review",{
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        navigation:{
            prevEl: ".review .slide-prev",
            nextEl: ".review .slide-next"
        },
        pagination:{
            el: ".review .slide-pg",
            type: "fraction"
        }
    })
}


/// 커뮤니티 ////

// 커뮤니티 공지사항 목록 화면 출력 기능
function showNotice(){
    let html = ""
    // 데이터갱신
    NOTICE_ARR.forEach(function(item){
        const tag = `
        <li>
            <a href="${item.link}">
                <span>
                    ${item.title}
                </span><em>${item.date}</em>
            </a>
        </li>
        `;
        html+= tag;
    });
    noticeTag.innerHTML = html;
}

// 커뮤니티 물품소식 목록 화면 출력 기능
function showGoodNews(){
    let html = ""
    // 데이터갱신
    GOODNEWS_ARR.forEach(function(item){
        const tag = `
        <li>
            <a href="${item.link}">
                <span>
                    ${item.title}
                </span><em>${item.date}</em>
            </a>
        </li>
        `;
        html+= tag;
    });
    goodNewsTag.innerHTML = html;
}

// 커뮤니티 탭메뉴
// 탭버튼
const tabBtArr = document.querySelectorAll(".community-bt");
// 탭 내용
const tabConArr = document.querySelectorAll(".community-notice dd");
// 탭포커스
let tabFocusIndex = 0;
// 탭 버튼 클릭 처리
tabBtArr.forEach(function(item, index){
    item.addEventListener("click", function(){
        tabFocusIndex = index;
        tabFocusFn()
    })
})
// 탭포커스 함수 생성
function tabFocusFn(){
    // 포커스 css를 적용 및 제거
    // 일단 모두 제거한다.
    tabBtArr.forEach(function(item){
        item.classList.remove("community-bt-active")
    })
    // 인덱스에 해당하는 것만 적용
    tabBtArr[tabFocusIndex].classList.add("community-bt-active")
    // 아예 없다가 클릭했을 때마다 생성되게 함.
    // 내용도 일단 모두 제거한다.
    tabConArr.forEach(function(item){
        item.classList.remove("community-visible-active")
    })
    tabConArr[tabFocusIndex].classList.add("community-visible-active")
}