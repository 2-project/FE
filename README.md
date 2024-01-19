##src/api/instance/axios.js

1. axios instance를 만들고 api baseURL을 세팅
2. 요청 인터셉터에서 토큰을 요청헤더에 세팅
3. 응답 인터셉터에서 response status 별로 401는 로그인 페이지로 넘어가고 나머지 에러는 토스트만 띄워줌.
4. export instance

##src/api/instance/index.js

1. axios.js에서 instance를 임포트해서 각 메서드마다 config 기본 세팅 해줌
2. 동적으로 넣을 수 있는 params (url, data, headers...)
3.

##src/api/xxxApi.js

1. 페이지별로 api 정리
2. index.js를 import 해서 필요한 메서드를 꺼내서 사용하면 됨.

##페이지에서 api 요청을 보낼 때

1. import { xxx } from "src/api/xxxApi";
2. xxx(파라미터)
