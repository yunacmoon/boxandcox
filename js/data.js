/*
 * Structured content for the site. Kept separate from rendering logic so it
 * can be reused as-is (or lightly adapted) as props/data when this site is
 * ported to React.
 */
window.SITE_DATA = {
  cta: {
    headingEn: "Let's create together",
    headingKo: "전략적인 공간창출, 지금 함께 시작하세요.",
    ctaLabel: "프로젝트 보기",
    ctaHref: "#projects",
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
    blocks: [
      {
        tagline: "Creation of Space Value!",
        body:
          "복스앤콕스는 지난 30여년 동안 기업이미지 구축을 위한 아이덴티티 개발과 디자인 마케팅 사업을 통해 기업의 가치와 효율성을 극대화하는 다양한 디자인 서비스를 제공해 왔습니다. " +
          "이러한 사업의 노하우를 기반으로 성장한 복스앤콕스는 1999년 이후 스페이스 커뮤니케이션으로 그 영역을 전문화하여 환경디자인 전반에 걸쳐 체계적인 디자인 프로세스를 개발 하였으며, " +
          "클라이언트의 요구에 부응하여 커뮤니케이션을 목적으로 하는 전략적인 공간창출을 위해 최선을 다하고 있습니다.",
      },
      {
        tagline: "Leader of Space Communication!",
        body:
          "클라이언트에 대한 깊은 이해를 바탕으로 복스앤콕스는 환경디자인 관련업계의 중추적 역할을 하면서 다양한 프로젝트의 수행을 통해 디자인 경쟁력을 다져왔으며, " +
          "자체전문인력과 국내외 전문협력업체들과의 유기적 네트워크를 구축하여 ISS(Integrated Space design Solution)서비스를 기본으로 클라이언트의 성공을 극대화하기 위한 사업을 전개하고 있습니다.",
      },
    ],
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
          "전시는 과거와 현재의 끊임없는 대화를 통해 미래의 지표를 제시하는 복합적인 커뮤니케이션 행위입니다. " +
          "복스앤콕스는 전략적이고 효율적인 커뮤니케이션 수단을 최대한 활용함으로써 새로운 비전과 가치를 창출하는 전시공간, " +
          "커뮤니케이션 매체로서의 전시공간을 다양한 방법으로 창조합니다.",
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
          "환경시설물과 환경그래픽, 도시, 가로, 공원, 단지, 빌딩 등의 사인시스템 개발에 이르기까지 복스앤콕스는 우리 주변의 환경에 적절한 색채와 그래픽 감각을 적용하여 " +
          "우리의 삶의 터전인 환경에 유기적 질서를 부여함으로써 보다 쾌적하고 아름다운 생활공간과 환경미관을 창조해 나갑니다.",
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

  projects: [
    {
      title: "수원월드컵경기장",
      reference: "BOX&COX_CRD_002.jpg",
      client: "삼성물산",
      year: "2001",
      location: "경기도 수원시",
      scope: "Environmental Graphic Development",
      description:
        "수원월드컵경기장은 축구전용경기장으로 2002년 월드컵을 개최하기 위해 건설된 국내 10개 경기장 중 하나로서 4만3천138석 규모로 연습경기장 3곳과 보조경기장, 홍보관 등 보조시설을 갖추고 2001년 5월 그 모습을 드러냈다. " +
        "스탠드 칼라계획은 월드컵의 축제분위기를 연출할 목적으로 환호와 열기, 역동성을 느낄 수 있게 계획, 디자인 되었다. 본부석 오른쪽 스탠드는 수원시, 정면은 경기도의 상징을 표현하고, 왼쪽 스탠드는 선수가 헤딩골을 넣는 모습을 형상화하였다. " +
        "사인시스템은 경기장의 건축적 특성을 살려 기능적이면서 한국적 이미지에 부합하는 색채와 디자인을 지향하였다. 또 안내사인의 첫번째 목적인 인지도를 최우선적으로 고려하여 독특한 디자인보다 일반적이고 실용적인 디자인을 모색하였고, " +
        "문자와 색상에서도 가시도에 우선적인 목적을 두었다. 전체적으로 통일감을 주면서도 각 구역의 개별성과 차별성을 유지하도록 계획되었다.",
    },
    {
      title: "현대석유화학 대산 컴플렉스",
      reference: "BOX&COX_CRD_004.jpg",
      client: "현대석유화학",
      year: "1998",
      location: "충청남도 서산",
      scope:
        "Sign System, Conceptual Design, Schematic Design, Development Design, Construction Review",
      description:
        "현대석유화학의 심볼이 'SEETEC'으로 새롭게 개발되면서 이와 함께 공업단지의 시각적인 질을 높이고자 환경개선사업을 추진하였다. " +
        "공업단지와 부합되는 이미지와 한편으로는 환경친화적이고 친근한 이미지로 타공업단지와의 차별적인 환경을 도출하고자 우선 외부의 주요단지에 슈퍼그래픽을 도입하고 심볼과 어린이들의 천진난만한 이미지로 인간을 먼저 생각하는 현대석유화학의 정신을 전달했다. " +
        "넓은 대지위에 놓여진 각각의 단지들은 채도가 높은 비비드(Vivid)계열의 색채로 구별하여 시설이용을 용이하도록 하였다. 또한 각각의 공용시설들은 알파벳 첫글자를 모티브로 차별적인 아이콘으로 구별하였고 이에 따라 단지내에서의 동선이 명확하게 구별된다.",
    },
    {
      title: "기아자동차 환경조형물",
      reference: "BOX&COX_CRD_007.jpg",
      client: "기아자동차",
      year: "1991, 1992",
      location: "충청남도 아산군, 경기도 기흥",
      scope:
        "Environmental Object Development, Schematic Design, Construction Review",
      description: "",
    },
    {
      title: '한국야쿠르트홍보관 "VISION HALL"',
      reference: "BOX&COX_CRD_008.jpg",
      client: "한국야쿠르트",
      year: "1997",
      location: "서울시 서초구 잠원동",
      scope:
        "Conceptual Design, Schematic Design, Development Design, Construction",
      description:
        "한국야쿠르트의 앞선 기술력을 바탕으로 고객감동의 실현, 혁신경영 추구, 인간존중 실천의 경영이념과 세계로 도약하는 종합건강기업으로서 21세기 식생활문화를 선도해가는 한국야쿠르트의 기업이미지를 홍보하기위한 전시관으로 " +
        "한국야쿠르트 기업사 및 사업분야, 유산균발효유의 우수성, 기업의 미래비전 등을 소개하고 있다. " +
        "전시연출로는 터널을 따라 기업역사를 볼 수 있는 역사터널, 한국야쿠르트의 재미있는 광고영상모음, 기업홍보 프로젝터 쇼, 과학적인 유산균을 관찰해 볼 수 있는 피핑영상 패널 등이 있다.",
    },
    {
      title: "현대석유화학 / 북경 PETROCHEM EXPO",
      reference: "BOX&COX_CRD_009.jpg",
      client: "현대석유화학",
      year: "1998",
      location: "중국 북경",
      scope:
        "Conceptual Design, Schematic Design, Development Design, Construction",
      description: "",
    },
  ],
};
