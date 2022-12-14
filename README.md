# ZERO PEPSI FINDER

### 개요

개인적으로 제로 펩시를 자주 사먹어서 매달 편의점의 제로 펩시 행사(1+1, 2+1) 정보를 보여주는 페이지를 제작했습니다.


### 배포 링크

[배포 페이지](https://pepsi-finder.herokuapp.com/)

[포트폴리오 내 설명 페이지](https://www.jaeeedev.com/pepsi)

## 사용 기술

**client**: TypeScript, React, Styled-component    
**server**: JavaScript, Node.js, express    
**another**   
cors: api 요청 시 발생하는 cors 문제 해결   
cheerio: 할인 정보 크롤링 용도   
axios: api 간편한 문법으로 요청   
concurrently: 개발 단계에서 리액트, 노드 두가지 서버를 동시에 엶   
git: 로컬과 원격 저장소 커밋 용도    
heroku: 배포

## 구현 설명

[펴늬](https://pyony.com/) 라는 사이트에서 필요한 정보를 받아옵니다.  
서버 쪽 코드에서 필요한 함수를 만듭니다. 먼저 해당 사이트에서 제로펩시를 검색해 나온 정보를 가져옵니다. 그 후 cheerio로 돔을 구성하고 필요한 노드들만 추려내 배열에 담아 리턴합니다.

`/api/pepsi` 라우트 경로로 api요청을 주면 응답 객체로 해당 함수를 전달합니다.
제로 펩시에 관한 정보만 보여주는 페이지이기 때문에 별도의 동작 없이 렌더링과 동시에 함수를 실행하도록 했습니다. (useEffect를 통해 최초 한번만 실행)

```
   data.sort((a: Pepsi, b: Pepsi) => {
        return Number(a.promo[0]) - Number(b.promo[0]);
      });
```

1+1 행사가 가장 궁금하기 마련이라 sort를 통해 1+1 행사를 하는 상품부터 출력하도록 했습니다. promo는 `"1+1"`이나 `"2+1"` 두가지 문자열을 가지고 있습니다. 그래서 promo의 첫 글자를 숫자로 변환한 후 비교하여 오름차순 정렬하였습니다.   

![pepsitheme](https://user-images.githubusercontent.com/72128840/199926117-5474f4a7-88b3-4f9b-968d-0326504992a1.gif)



styled-component의 ThemeProvider 기능을 이용하여 `다크모드/라이트모드`를 구현했습니다.
제로 펩시의 색상을 생각하여 디폴트 테마는 다크모드이며 상단 버튼을 클릭하면 라이트 모드로 변경됩니다.
각 배경, 박스, 버튼, 텍스트 색상들을 라이트, 다크모드 두가지 테마로 관리하고 있습니다. 비슷한 톤의 두가지 색상을 배열로 관리하여 라이트 모드에서 배경색-보더 색상으로 사용하고 있습니다.

```
export const lightTheme = {
  bg: "#fff",
  text: "#222",
  itemBox: "#f4f6fa",
  switch: "#222",
  gs: ["#cce9f0", "#18a9ce"],
  cu: ["#ecd4f8", "#75299b"],
  se: ["#abe7d8", "green"],
  em: ["#ffeeb6", "#5b5e4c"],
  mi: ["#8dc1f5", "#1f5fa0"],
  cs: ["#fae594", "#9b6d09"],
  get1: ["#f8a49e", "#c72116"],
  get2: ["#d2d9ff", "#4e5eeb"],
};
```


