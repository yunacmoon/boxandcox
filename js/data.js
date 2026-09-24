/*
 * Structured content for the site. Kept separate from rendering logic so it
 * can be reused as-is (or lightly adapted) as props/data when this site is
 * ported to React.
 */
window.SITE_DATA = {
  cta: {
    headingEn: "Let's create together",
    headingKo: "전략적인 공간창출, 지금 함께 시작하세요.",
    ctaLabel: "프로젝트 문의하기",
    // Opens the visitor's mail app with the subject pre-filled.
    ctaHref:
      "mailto:jei.chagh@ascenderbranding.com?subject=" +
      encodeURIComponent("[Box&Cox] 프로젝트 문의"),
  },

  prologue: {
    reference: "BOX&COX_CRD_018.jpg",
    hero: {
      eyebrow: "SPACE COMMUNICATION STUDIO",
      heading: "Creation of space value",
      sub:
        "지난 30여년간 아이덴티티 개발과 디자인 마케팅을 통해 기업의 가치를 극대화해온 스페이스 커뮤니케이션 스튜디오.",
      ctaLabel: "프로젝트 보기",
      ctaHref: "#projects",
    },
    tagline: "공간에 브랜드를 담습니다.",
    body:
      "1992년 시작한 복스앤콕스는 공간과 브랜딩을 함께 다루는 스페이스 커뮤니케이션 스튜디오입니다. " +
      "아이덴티티 개발과 디자인 마케팅에서 출발해 1999년부터 전시·환경·사인시스템 등 환경디자인 전반으로 영역을 넓혔고, " +
      "브랜드의 메시지가 공간에서 온전히 읽히도록 전략과 디자인을 하나로 엮습니다.",
    // Project hero photos that crossfade in the prologue's rounded frame.
    slides: [
      { src: "assets/projects/haesley.jpg", alt: "나인브릿지 해슬리 클럽하우스" },
      { src: "assets/projects/smtown.jpg", alt: "SMTOWN 코엑스아티움 파사드" },
      { src: "assets/projects/seetec.jpg", alt: "현대석유화학 대산 컴플렉스 슈퍼그래픽" },
      { src: "assets/projects/wtc-seoul.jpg", alt: "월드트레이드센터 서울 사인" },
      { src: "assets/projects/rolling-hills.jpg", alt: "롤링힐스 호텔 사인" },
    ],
  },

  punch: {
    en: "Leader of space communication",
    ko: "환경디자인 업계의 중추적 역할을 수행합니다.",
  },

  workScope: {
    reference: "BOX&COX_CRD_014.jpg",
    intro:
      "21세기 공간문화에 대한 '새로운 이해' 로부터 출발한 복스앤콕스는 다음과 같은 사업을 전개하고 있습니다.",
    categories: [
      {
        id: "exhibition",
        en: "Exhibition",
        ko: "전시",
        description:
          "메시지가 분명하게 읽히는 전시공간. 기업관·박물관·파빌리온을 전략에서 연출까지 설계합니다.",
        scope: [
          "Space Planning",
          "Exhibition Graphic",
          "Showcase",
          "Kiosk",
          "Multimedia",
          "Diorama",
        ],
        services: [
          "Exposition",
          "Heritage Museum",
          "Corporate Museum",
          "Pavilion",
          "Science Museum",
          "Temporary Exhibition",
          "Promotion Center",
        ],
      },
      {
        id: "environment",
        en: "Environment",
        ko: "환경",
        description:
          "사인시스템과 환경그래픽, 색채계획으로 건물과 단지, 거리에 질서와 표정을 더합니다.",
        scope: [
          "Space Planning",
          "Signage System",
          "Street Furniture",
          "Super Graphic",
          "Color Scheme",
          "Symbolic Sculpture",
        ],
        services: [
          "Public Space",
          "Retail Area",
          "Office Building",
          "Apartment Complex",
          "Sports Complex",
          "Cultural Center",
          "Healthcare",
        ],
      },
    ],
  },

  workProcess: {
    reference: "BOX&COX_CRD_013.jpg",
    intro:
      "복스앤콕스는 어떠한 프로젝트도 소홀히 하지 않습니다. 시대의 트렌드를 정확히 파악하여 기업이 원하는 전략적인 공간창출에 최선을 다할 것입니다.",
    label: "Exhibition Design Process",
    steps: [
      {
        step: "01",
        title: "기본사업계획 수립",
        desc: "사업목적 설정, 예산 및 일정 수립",
      },
      {
        step: "02",
        title: "기획",
        desc: "자료수집, 사례연구, 워크샵, 전문가문단 구성, 전시방향 결정",
      },
      {
        step: "03",
        title: "기본설계",
        desc: "전시컨셉에 따른 주제 전개, 공간구성 및 연출계획 확정",
      },
      {
        step: "04",
        title: "실시설계",
        desc: "도면제작, 전시운영계획 확정, Contents 확정",
      },
      { step: "05", title: "제작", desc: "각 공정별 제작" },
      { step: "06", title: "설치", desc: "전시물 설치, 시공, 운영상태 점검" },
      {
        step: "07",
        title: "관리 / 운영",
        desc: "관리운영 매뉴얼, 매뉴얼 제작",
      },
    ],
  },

  /*
   * Projects are ordered by the numbered folders in the client-provided
   * photo archive (001-006 first), then the rest. Every entry has a real
   * photo under assets/projects/. Only the first two carry the full
   * year / location / scope / description from the original brief;
   * for the others the client / location are our best reading of the
   * photos and public knowledge, year is left empty until confirmed, and
   * the scope is what the photos show. Empty facts are simply not rendered.
   */
  projects: [
    {
      title: "제네시스하우스",
      reference: "GENESIS HOUSE",
      photo: "assets/projects/genesis-house.jpg",
      streamPhoto: "assets/stream/genesis-house.jpg",
      photos: [
        "assets/projects/genesis-house-2.jpg",
        "assets/projects/genesis-house-3.jpg",
        "assets/projects/genesis-house-4.jpg",
      ],
      client: "제네시스",
      year: "",
      location: "",
      scope: "Brand Collateral, Packaging, Print",
      description:
        "제네시스하우스의 브랜드 경험을 오브제로 확장한 작업. 쇼핑백과 티 패키지, 큐레이션 카드와 도서에 이르기까지 절제된 컬러와 소재로 공간의 톤을 손에 잡히는 사물로 이어갔다.",
    },
    {
      title: "현대석유화학 대산 컴플렉스",
      reference: "BOX&COX_CRD_004.jpg",
      photo: "assets/projects/seetec.jpg",
      streamPhoto: "assets/stream/seetec.jpg",
      photos: [
        "assets/projects/seetec-2.jpg",
        "assets/projects/seetec-3.jpg",
        "assets/projects/seetec-4.jpg",
      ],
      client: "현대석유화학",
      year: "1998",
      location: "충청남도 서산",
      scope:
        "Sign System, Super Graphic, Conceptual Design, Schematic Design, Development Design, Construction Review",
      description:
        "현대석유화학의 심볼이 'SEETEC'으로 새롭게 개발되면서 이와 함께 공업단지의 시각적인 질을 높이고자 환경개선사업을 추진하였다. " +
        "공업단지와 부합되는 이미지와 한편으로는 환경친화적이고 친근한 이미지로 타공업단지와의 차별적인 환경을 도출하고자 우선 외부의 주요단지에 슈퍼그래픽을 도입하고 심볼과 어린이들의 천진난만한 이미지로 인간을 먼저 생각하는 현대석유화학의 정신을 전달했다. " +
        "넓은 대지위에 놓여진 각각의 단지들은 채도가 높은 비비드(Vivid)계열의 색채로 구별하여 시설이용을 용이하도록 하였다. 또한 각각의 공용시설들은 알파벳 첫글자를 모티브로 차별적인 아이콘으로 구별하였고 이에 따라 단지내에서의 동선이 명확하게 구별된다.",
    },
    {
      title: "수원월드컵경기장",
      reference: "BOX&COX_CRD_002.jpg",
      photo: "assets/projects/suwon.jpg",
      streamPhoto: "assets/stream/suwon.jpg",
      photos: [
        "assets/projects/suwon-2.jpg",
        "assets/projects/suwon-3.jpg",
        "assets/projects/suwon-4.jpg",
      ],
      client: "삼성물산",
      year: "2001",
      location: "경기도 수원시",
      scope: "Environmental Graphic Development, Sign System",
      description:
        "수원월드컵경기장은 축구전용경기장으로 2002년 월드컵을 개최하기 위해 건설된 국내 10개 경기장 중 하나로서 4만3천138석 규모로 연습경기장 3곳과 보조경기장, 홍보관 등 보조시설을 갖추고 2001년 5월 그 모습을 드러냈다. " +
        "스탠드 칼라계획은 월드컵의 축제분위기를 연출할 목적으로 환호와 열기, 역동성을 느낄 수 있게 계획, 디자인 되었다. 본부석 오른쪽 스탠드는 수원시, 정면은 경기도의 상징을 표현하고, 왼쪽 스탠드는 선수가 헤딩골을 넣는 모습을 형상화하였다. " +
        "사인시스템은 경기장의 건축적 특성을 살려 기능적이면서 한국적 이미지에 부합하는 색채와 디자인을 지향하였다. 또 안내사인의 첫번째 목적인 인지도를 최우선적으로 고려하여 독특한 디자인보다 일반적이고 실용적인 디자인을 모색하였고, " +
        "문자와 색상에서도 가시도에 우선적인 목적을 두었다. 전체적으로 통일감을 주면서도 각 구역의 개별성과 차별성을 유지하도록 계획되었다.",
    },
    {
      title: "NEATT 동북아트레이드타워",
      reference: "NEATT",
      photo: "assets/projects/neatt.jpg",
      streamPhoto: "assets/stream/neatt.jpg",
      photos: [
        "assets/projects/neatt-2.jpg",
        "assets/projects/neatt-3.jpg",
        "assets/projects/neatt-4.jpg",
      ],
      client: "동북아트레이드타워",
      year: "",
      location: "인천 송도",
      scope: "Sign System Design",
      description:
        "송도 국제업무지구의 랜드마크 타워를 위한 사인시스템. 타워의 사선 실루엣을 사인 패밀리의 형태 언어로 옮겨 주차·출구·방향 안내에 이르는 사인 체계를 설계하였다.",
    },
    {
      title: "나인브릿지 해슬리",
      reference: "HAESLEY NINE BRIDGES",
      photo: "assets/projects/haesley.jpg",
      streamPhoto: "assets/stream/haesley.jpg",
      photos: [
        "assets/projects/haesley-2.jpg",
        "assets/projects/haesley-3.jpg",
        "assets/projects/haesley-4.jpg",
      ],
      client: "CJ",
      year: "",
      location: "경기도 여주",
      scope: "Brand Identity, Sign System",
      description:
        "목구조 클럽하우스로 잘 알려진 해슬리 나인브릿지의 아이덴티티와 사인 작업. 구릉과 물을 담은 엠블럼을 개발하고, 이를 스테이셔너리와 클럽하우스 사인으로 일관되게 전개하였다.",
    },
    {
      title: "SMTOWN 코엑스아티움",
      reference: "SMTOWN",
      photo: "assets/projects/smtown.jpg",
      streamPhoto: "assets/stream/smtown.jpg",
      photos: [],
      client: "SM엔터테인먼트",
      year: "",
      location: "서울 삼성동",
      scope: "Facade Graphic, Signage",
      description:
        "코엑스아티움 파사드의 SMTOWN 사인과 미디어 매트릭스 그래픽. 야간에 빛으로 읽히는 입체 로고와 패턴으로 건물 자체를 브랜드의 얼굴로 만들었다.",
    },
    {
      title: "K-live 홀로그램 전용관",
      reference: "KLIVE",
      photo: "assets/projects/klive.jpg",
      streamPhoto: "assets/stream/klive.jpg",
      photos: [
        "assets/projects/klive-2.jpg",
        "assets/projects/klive-3.jpg",
        "assets/projects/klive-4.jpg",
      ],
      client: "K-live",
      year: "",
      location: "서울 을지로",
      scope: "Sign System, Wayfinding, Pictogram, Print",
      description:
        "K-POP 홀로그램 공연장의 전체 사인 체계. 입구 그래픽월과 갤러리 사인, 층별 안내와 픽토그램, 포스터·티켓 등 인쇄물까지 하나의 비주얼 언어로 묶었다.",
    },
    {
      title: "SK텔레콤 T world",
      reference: "SKT",
      photo: "assets/projects/skt.jpg",
      streamPhoto: "assets/stream/skt.jpg",
      photos: [
        "assets/projects/skt-2.jpg",
        "assets/projects/skt-3.jpg",
        "assets/projects/skt-4.jpg",
      ],
      client: "SK텔레콤",
      year: "",
      location: "",
      scope: "Retail Signage, Brand Application",
      description:
        "SK텔레콤 대리점과 T world 매장의 외부 사인 및 파사드, 그리고 T 브랜드 심볼의 카드·아이콘 등 다양한 접점 적용 작업.",
    },
    {
      title: "월드트레이드센터 서울",
      reference: "WTC SEOUL",
      photo: "assets/projects/wtc-seoul.jpg",
      streamPhoto: "assets/stream/wtc-seoul.jpg",
      photos: [
        "assets/projects/wtc-seoul-2.jpg",
        "assets/projects/wtc-seoul-3.jpg",
        "assets/projects/wtc-seoul-4.jpg",
      ],
      client: "한국무역협회",
      year: "",
      location: "서울 삼성동",
      scope: "Sign System, Environmental Graphic",
      description:
        "무역센터·아셈타워·코엑스몰을 아우르는 종합 사인시스템. 단지 진입부의 석재 사인에서 타워 앞 파일런, 몰 내부 종합안내판과 코엑스몰 상징 조형 사인까지 위계에 따라 체계화하였다.",
    },
    {
      title: "롤링힐스 호텔",
      reference: "ROLLING HILLS",
      photo: "assets/projects/rolling-hills.jpg",
      streamPhoto: "assets/stream/rolling-hills.jpg",
      photos: [
        "assets/projects/rolling-hills-2.jpg",
        "assets/projects/rolling-hills-3.jpg",
        "assets/projects/rolling-hills-4.jpg",
      ],
      client: "롤링힐스",
      year: "",
      location: "경기도 화성",
      scope: "Sign System, Pictogram, Environmental Graphic",
      description:
        "구릉을 따라 흐르는 워드마크를 건물 사인과 픽토그램, 실내 안내 사인으로 일관되게 전개하였다. 벽돌과 석재 위에 올린 금속 입체 사인이 호텔의 차분한 톤을 완성한다.",
    },
    {
      title: "이마트24",
      reference: "EMART24",
      photo: "assets/projects/emart24.jpg",
      streamPhoto: "assets/stream/emart24.jpg",
      photos: [
        "assets/projects/emart24-2.jpg",
        "assets/projects/emart24-3.jpg",
        "assets/projects/emart24-4.jpg",
      ],
      client: "이마트24",
      year: "",
      location: "",
      scope: "Store Signage, Pictogram System",
      description:
        "편의점 브랜드 이마트24의 매장 파사드 사인과 픽토그램 시스템. 브랜드 컬러를 유지하면서 매장 유형별로 적용 가능한 사인 패밀리를 구성하였다.",
    },
    {
      title: "정부대전청사",
      reference: "GOVERNMENT COMPLEX DAEJEON",
      photo: "assets/projects/gov-daejeon.jpg",
      streamPhoto: "assets/stream/gov-daejeon.jpg",
      photos: [
        "assets/projects/gov-daejeon-2.jpg",
        "assets/projects/gov-daejeon-3.jpg",
        "assets/projects/gov-daejeon-4.jpg",
      ],
      client: "정부청사관리본부",
      year: "",
      location: "대전",
      scope: "Sign System",
      description:
        "정부대전청사 외부 사인시스템. 진입로 유도 사인, 동별 종합안내판, 주차·방문객 안내 사인을 하나의 모듈로 설계해 넓은 청사 단지의 동선을 명확히 하였다.",
    },
    {
      title: "타워팰리스",
      reference: "TOWER PALACE",
      photo: "assets/projects/tower-palace.jpg",
      streamPhoto: "assets/stream/tower-palace.jpg",
      photos: [
        "assets/projects/tower-palace-2.jpg",
        "assets/projects/tower-palace-3.jpg",
        "assets/projects/tower-palace-4.jpg",
      ],
      client: "삼성물산",
      year: "",
      location: "서울 도곡동",
      scope: "Sign System",
      description:
        "주거 타워의 실내 사인시스템. 금속과 유리에 절제된 서체로 층·호수 안내를 새겨 로비의 격조를 해치지 않는 사인을 계획하였다.",
    },
    {
      title: "제이드팰리스 골프클럽",
      reference: "JADE PALACE",
      photo: "assets/projects/jade-palace.jpg",
      streamPhoto: "assets/stream/jade-palace.jpg",
      photos: ["assets/projects/jade-palace-2.jpg"],
      client: "제이드팰리스 골프클럽",
      year: "",
      location: "",
      scope: "Entrance Signage",
      description:
        "골프클럽 진입부의 석재 담장 위에 엠블럼과 로고타입을 입체로 얹은 진입 사인. 주변 수목과 잔디에 어울리는 소재와 색을 택하였다.",
    },
    {
      title: "현대 홈타운",
      reference: "HYUNDAI HOMETOWN",
      photo: "assets/projects/hyundai-hometown.jpg",
      streamPhoto: "assets/stream/hyundai-hometown.jpg",
      photos: [
        "assets/projects/hyundai-hometown-2.jpg",
        "assets/projects/hyundai-hometown-3.jpg",
      ],
      client: "현대건설",
      year: "",
      location: "",
      scope: "Apartment Complex Signage",
      description:
        "아파트 단지의 종합안내도와 동 표시, 진입부 사인. 단지 이름과 동번호가 멀리서도 읽히도록 크기와 대비를 우선하여 설계하였다.",
    },
    {
      title: "프랑크푸르트공항 삼성 상징조형물",
      reference: "FRANKFURT AIRPORT",
      photo: "assets/projects/frankfurt-airport.jpg",
      streamPhoto: "assets/stream/frankfurt-airport.jpg",
      photos: ["assets/projects/frankfurt-airport-2.jpg"],
      client: "삼성전자",
      year: "",
      location: "독일 프랑크푸르트",
      scope: "Symbolic Sculpture",
      description:
        "프랑크푸르트공항 터미널 앞에 세워진 삼성 휴대전화 상징조형물. 유선형 지지 구조 위에 제품을 올려 멀리서도 식별되는 랜드마크로 계획하였다.",
    },
  ],
};
