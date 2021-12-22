# shoppingbag-react-app

** 장바구니 샘플 앱  구현**


<br>

<br>

## 목차

### 1. [개발 환경](#dev-environment)

### 2. [설치 및 실행 방법](#installation)

### 3. [Dependencies](#dependencies)

### 4. [과제 요구사항](#requirement)

### 5. [구현 기능](#solution)





<br>

<br>

<h2 id="dev-environment">1. 개발 환경</h2>

####

#### ## Framework

- Javascript(ES6), React

#### ## Libraries

- react-router, react-router-dom (페이지 라우팅)
- redux, redux-persist (상태관리)
- styled-component (컴포넌트 스타일 inline 지정)
- react-paginate (pagination 구현)




### 1.1 Src Folder Structure

```bash
.
├── App.css
├── App.js
├── App.test.js
├── assets
│   └── images
│       ├── ico-heart.png
│       ├── logo.png
│       └── shopping-cart.png
├── components
│   ├── CartItem.js
│   ├── ItemList.js
│   ├── MenuTitle.js
│   ├── Paginator.js
│   └── Payment.js
├── index.css
├── index.js
├── layouts
│   ├── Cart.js
│   ├── Header.js
│   └── Products.js
├── managers
│   └── DataManager.js
├── resources
│   ├── Strings.js
│   ├── coupons.js
│   └── productItems.js
├── setupTests.js
└── store
    ├── actions
    │   └── index.js
    └── reducers
        ├── cartReducer.js
        └── index.js

```

<br>

<br>

<h2 id="installation">2. 설치 및 실행 방법</h2>



### 2.1 설치 방법

1. node.js 설치

: 실행 환경에 따라 터미널 혹은 https://nodejs.org/ko/download/ 에서 다운로드 하여 설치.

2. install dependency

~~~
$> npm install
~~~



### 2.2 실행 방법

dev server 실행. `http://localhoost:3000(port는 가변)'`' 으로 접속

~~~
$> npm start
~~~


<br>

<br>

<h2 id="dependencies"> 3.Dependencies </h2>


- @testing-library/jest-dom               | 5.16.1 |
- @testing-libraty/react                  | 11.2.7 |
- @testing-libraty/user-event             | 12.8.3 |
- react                                   | 17.0.2 |
- react-dom                               | 17.0.2 |
- react-paginate                          | 8.1.0  |
- react-redux                             | 8.1.0  |
- react-router-dom                        | 5.2.0  |
- react-scripts                           | 2.1.3  |
- redux                                   | 4.1.2  |
- redux-persist                           | 8.1.0  |
- styled-components                       | 5.3.0  |


<br>

<br>

<h2 id="requirement">4. 과제 요구사항</h2>

<br>

<br>


<h2 id="solution">5. 구현 기능</h2>

### 페이지 상단  "상품목록", "장바구니 아이콘" 을 이용하여 각 클릭 시 각 페이지 이동 가능

### 상품 목록 페이지 (/products)

- 상품 목록 표시 (인기도 순 내림차순 정렬) 기능
- 상품 정보 표기 (사진, 가격, 인기도, 쿠폰 적용 가능 여부) 기능
- 한 페이지 당 5개 씩 목록 노출 
- 장바구니 담기 / 장바구니 뺴기 버튼 추가 기능 
--> 담기 / 빼기 버튼 클릭 시 좌 상단 장바구니 아이콘 갯수 증가 / 감소 기능  

- 장바구니 3개 초과 시 장바구니 추가 불가 알림 팝업 노출 기능 

### 장바구니 페이지 (/cart)

- 장바구니 에 담긴 상품 목록 표시 
- 장바구니 상품 정보 표기 (사진, 상품명, 가격, 수량, 주문금액)
- 삭제 버튼 선택 시 각 항목별 삭제 가능
- 수량 + - 클릭 시 주문 금액 증가 / 감소 기능
- 체크 박스 선택 시 최종 결제 항목 포함 / 제외 기능 
- 체크박스 전체선택/전체해제/부분선택 기능 
- 전체 삭제 버튼 선택 시 장바구니 비우기 기능

- 선택 된 장바구니 항목 별 총 주문 금액 / 할인금액 / 총 결제 금액 계산 기능
- 쿠폰 선택 가능한 상품이 장바구니에 포함 된 경우, 쿠폰 선택 시 해당 금액에 대한 할인 적용 
- 할인 최종 적용 후 옵션 값 변경 시 변경된 옵션으로 재계산 하여 안내하는 기능
- 장바구니 페이지 / 상품 목록 페이지의 제품 추가 / 삭제 시 페이지 정보 동기화 기능 



