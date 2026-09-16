# Box&Cox

복스앤콕스(Box&Cox) 기업 소개 웹사이트. 정적 HTML/CSS/JS로 제작되었습니다.

- **라이브:** https://yunacmoon.github.io/boxandcox/
- **저장소:** https://github.com/yunacmoon/boxandcox (`main` 브랜치 → GitHub Pages 자동 배포)

## 구조

```
index.html              메인 페이지 (Hero / Prologue / Projects / Punch / Work Scope / Work Process / Clients / CTA)
contact.html            연락처 페이지 (본사 · 팩토리 · 디자인 랩)
css/style.css           스타일 (다크 에디토리얼, 반응형)
js/data.js              섹션 콘텐츠 데이터 (추후 React 포팅 시 props로 재사용 가능)
js/main.js              data.js를 DOM에 렌더링, 히어로 영상/로고 슬라이드, 프로젝트 카드, 마키, 스크롤 reveal
assets/
  logo.png              헤더 · 히어로 로고 워드마크
  hero-video-{00..04}.mp4  히어로 배경 영상, 00→04 순으로 이어 재생 (00은 앞 5.3초만, 03은 앞 2.6초 트림) (원본: ../assets/03_Videos, ffmpeg 1080p CRF26)
  hero-poster.jpg       영상 로드 전 첫 화면 (hero-video-00에서 추출)
  placeholders/         실제 프로젝트 사진을 받기 전까지 쓰는 임시 이미지
  01_Content/           원문 콘텐츠 텍스트 (참고용)
  02_Graphic devices/   로고 원본 (BC_Logo.svg, .ai) — 사이트에서 직접 참조하지 않음
scripts/git-hooks/      pre-commit 훅 (300KB 초과 애셋 커밋 차단)
CLAUDE.md               작업 규칙 (한국어 응답, 브랜치/애셋 커밋 규칙)
.nojekyll               GitHub Pages에서 Jekyll 처리 건너뜀
```

콘텐츠(소개, 사업 영역, 업무 프로세스, 프로젝트, 클라이언트)는 `js/data.js`의
`SITE_DATA` 객체에 구조화되어 있습니다. React로 전환할 때 이 데이터를 그대로
컴포넌트 props로 사용하면 됩니다.

## 로컬 폴더 구성

이 폴더(`_boxandcox-full_latest/`)만 git 저장소이며 배포 기준입니다.
상위 `BOXandCOX/` 폴더에는 다음이 함께 있습니다.

```
BOXandCOX/
├── _boxandcox-full_latest/   ← 이 저장소 (현재 사이트, 여기서만 수정)
├── _old/                     ← 사용하지 않는 이전 인덱스 시안 (참고용, 배포 안 됨)
└── assets/                   ← 원본 소스: 클라이언트 제공 프로젝트 사진, 영상, 로고 원본
```

사이트에 새 사진을 쓸 때는 상위 `assets/04_Photos/`의 원본을 웹용(1600px 이하, 300KB 이하 권장)으로
리사이즈한 뒤 이 저장소의 `assets/`에 넣고 `js/data.js`에서 참조합니다.

## 로컬에서 보기

별도 빌드 과정 없이 `index.html`을 브라우저로 열거나, 로컬 서버로 실행하세요.

```
python3 -m http.server 8080
```

## 배포

`css/style.css`나 `js/*.js`를 고쳤을 때는 `index.html` / `contact.html`의 `?v=...` 버전 값을 함께 올려야
GitHub Pages 캐시(10분)를 우회해 방문자에게 바로 반영됩니다.

`main`에 푸시하면 GitHub Pages가 1~2분 내에 자동 반영합니다.

```
git push origin main
```

처음 클론한 머신에서는 애셋 가드 훅을 한 번 켜두세요.

```
git config core.hooksPath scripts/git-hooks
```

300KB가 넘는 애셋을 의도적으로 추가할 때만 `ALLOW_ASSET_COMMIT=1 git commit -m "..."`으로 예외 허용합니다.
(자세한 규칙은 `CLAUDE.md` 참고)

## 콘텐츠 수정

프로젝트 항목, 사업 영역, 업무 프로세스 단계, 클라이언트 목록은 모두 `js/data.js`의
`SITE_DATA` 객체를 수정하면 반영됩니다. 연락처 정보는 `contact.html`에서 직접 수정합니다.
