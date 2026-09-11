# Box&Cox

복스앤콕스(Box&Cox) 기업 소개 웹사이트. 정적 HTML/CSS/JS로 제작되었습니다.

## 구조

```
index.html      페이지 셸 (Prologue / Work Scope / Work Process / Projects)
css/style.css   스타일 (미니멀/모던, 라이트·다크 모드 지원)
js/data.js      섹션 콘텐츠 데이터 (추후 React 포팅 시 props로 재사용 가능)
js/main.js      data.js를 DOM에 렌더링, 모바일 메뉴, 프로젝트 아코디언, 스크롤 reveal
```

콘텐츠(사업 영역, 업무 프로세스, 프로젝트 목록)는 `js/data.js`에 구조화된 데이터로
분리되어 있습니다. React로 전환할 때 이 데이터를 그대로 컴포넌트 props로 사용하면 됩니다.

## 로컬에서 보기

별도 빌드 과정 없이 `index.html`을 브라우저로 열거나, 로컬 서버로 실행하세요.

```
python3 -m http.server 8080
```

## 이미지 자료

각 섹션에는 참고 이미지 파일명(`BOX&COX_CRD_XXX.jpg`)이 자리표시자(`.media-frame`)로
표시되어 있습니다. 실제 이미지를 받으면 해당 파일을 `assets/`에 넣고
`.media-frame` 자리에 `<img>` 태그로 교체하세요.

## 콘텐츠 수정

프로젝트 항목, 사업 영역, 업무 프로세스 단계는 모두 `js/data.js`의
`SITE_DATA` 객체를 수정하면 반영됩니다.
