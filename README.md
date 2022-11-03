# ZERO PEPSI FINDER

## 개요

개인적으로 제로 펩시를 자주 사먹어서 매달 편의점의 제로 펩시 행사(1+1, 2+1) 정보를 보여주는 페이지를 제작했습니다.

## 사용 기술

front-end: TypeScript, React, Styled-component
back-end: JavaScript, Node.js, express
library:
cors -> api 요청 시 발생하는 cors 문제 해결
cheerio: 할인 정보 크롤링 용도
axios: http 통신을 간단한 문법으로 할 수 있음
concurrently: 개발 단계에서 리액트, 노드 두가지 서버를 동시에 엶

## 구현 설명

[펴늬] (https://pyony.com/) 라는 사이트에서 필요한 정보를 받아옵니다.  
서버 쪽 코드에서 필요한 함수를 만듭니다. 먼저 해당 사이트에서 제로펩시를 검색해 나온 정보를 가져옵니다. 그 후 cheerio로 돔을 구성하고 필요한 노드들만 추려내 배열에 담아 리턴합니다.

`/api/pepsi` 라우트 경로로 api요청을 주면 응답 객체로 해당 함수를 전달합니다.
제로 펩시에 관한 정보만 보여주는 페이지이기 때문에 별도의 동작 없이 렌더링과 동시에 함수를 실행하도록 했습니다. (useEffect를 통해 최초 한번만 실행)

```
   data.sort((a: Pepsi, b: Pepsi) => {
        return Number(a.promo[0]) - Number(b.promo[0]);
      });
```

1+1 행사가 가장 궁금하기 마련이라 sort를 통해 1+1 행사를 하는 상품부터 출력하도록 했습니다. promo는 `"1+1"`이나 `"2+1"` 두가지 문자열을 가지고 있습니다. 그래서 promo의 첫 글자를 숫자로 변환한 후 비교하여 오름차순 정렬하였습니다.
