/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, WorkflowStep, ToolSkill, Certification } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "kangchan-taekwondo",
    title: "강찬 태권도 브랜딩",
    category: "태권도",
    tagline: "학부모의 마음을 여는 안전하고 세련된 아이덴티티",
    problem: "기존 간판은 피칠갑을 연상시키는 과도한 적색과 블랙, 거친 필체로 설계되어 있어, 초등학교 저학년 학부모들에게 지나치게 위압적이고 공격적인 인상을 남겼습니다. 야간 조명은 어둡고 노후화되어 전혀 눈에 띄지 않았습니다.",
    strategy: [
      "검정+적색의 폭력적인 색감을 지양하고, 신뢰와 안전을 상징하는 포레스트 그린과 크림 소프트 화이트를 조화시킨 안심 톤온톤 배색 설정.",
      "두껍고 딱딱한 고딕체 대신, 끝부분이 둥글게 볼륨 처리된 미디엄 세미-라운드 서체를 개발하여 따뜻하고 체계적인 교육기관 이미지 전달.",
      "도로 시인성을 확보하기 위해 전면 틈새 간판 및 투과형 아크릴 LED 채널을 적용하여 눈 피로도 감소와 야간 상시 조도 25% 극대화."
    ],
    logoText: "강찬 TAEKWONDO",
    colors: [
      { name: "Safety Soft Blue", hex: "#3B82F6" },
      { name: "Forest Trust Green", hex: "#065F46" },
      { name: "Warm Cream Ivory", hex: "#FEF3C7" }
    ],
    fontFamily: "Gmarket Sans Bold",
    fontDescription: "기하학적 구조의 현대성 위에 선의 굵기 변화를 주어 가독성과 현대미를 동시에 저격한 에스테틱 서체.",
    layoutDesc: "빌딩 전면 글자 크기 비율을 기존 대비 15% 줄이되, 사방 20%의 여백율을 확보하여 시인 거리를 1.8배 개선한 미니멀 레이아웃.",
    imgBefore: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    result: "안심 학부모 통학 문의 45% 증가, 브랜드 신뢰 지수 '긍정적' 92%로 상승 (시공 후 3개월 추적 조사 결과)",
    isPremium: false,
    splitViewerEnabled: false,
    x: 18,
    y: 42
  },
  {
    id: "aurum-clinic",
    title: "아우름 내과의원 원스톱 브랜딩",
    category: "병원",
    tagline: "도시의 어지러운 전경 속 마음을 치유하는 투명한 메디컬 사인",
    problem: "주변 상가 밀집지의 형광색 네온사인 공해 속에 파묻혀 정작 '병원'의 위치를 파악하기 어려웠고, 차갑고 엄숙한 전형적인 파란색 십자가 간판으로 인해 내방 전 환자들에게 심리적 불안을 주었습니다.",
    strategy: [
      "환자의 심리 안정을 위해 메디컬 특유의 차가운 시안 블루 대신, 부드러운 올리브 그린과 내추럴 베이지 골드 메탈을 채택.",
      "야간 인지도를 올리고 안개가 낀 날에도 50m 밖 시인성을 확보하도록 확산식 LED 이중 백라이트를 설계.",
      "건물의 유리 벽면과 일체감을 주는 이중 레이어 투명 유리 보드를 기반으로 유기적 타이포그래피 배치."
    ],
    logoText: "아우름 INTERNAL MEDICINE",
    colors: [
      { name: "Healing Olive", hex: "#6B7280" },
      { name: "Beige Gold Metal", hex: "#D97706" },
      { name: "Sanitary White", hex: "#F9FAFB" }
    ],
    fontFamily: "Pretendard Medium & Serif Accents",
    fontDescription: "메마른 본딕 서체 대신, 신뢰감 있고 부드러운 고해상도 한글 가독성 중심 고딕 서체 적용.",
    layoutDesc: "건물 우측 기둥 코너의 90도 앵글을 이용해 돌출형 가변 사인을 설치, 대중교통 이용 보행자의 시선 각도를 고려해 하향 5도 앵핑 레이아웃 설계.",
    imgBefore: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1586773860418-d3b978ec017e?auto=format&fit=crop&w=800&q=80",
    result: "개원 후 목표 신규 초진 환자 수 130% 달성, 주변 약국 및 구내 인지도 만족도 1위 획득",
    isPremium: false,
    splitViewerEnabled: true,
    x: 48,
    y: 35
  },
  {
    id: "oasis-garden-cafe",
    title: "오아시스 가든 가든테라스 카페",
    category: "카페",
    tagline: "식물과 어우러지는 녹슨 입체 동(Copper) 고풍 간판",
    problem: "인위적인 아크릴 라이트박스 간판이 빈티지 정원 인테리어 테마와 완전히 충돌하여 매장 외부가 저렴해 보였으며, 자연광과 노을 하에서 시시각각 변하는 외무 분위기에 녹아들지 못했습니다.",
    strategy: [
      "시간이 지남에 따라 자연적으로 산화되는 특수 브러싱 동(Copper) 바디와 리얼 우드를 채택한 공예 수준의 간판 제작.",
      "직사식 조명이 아닌 은은하게 흘러내리는 웜웜(2700K) LED 라인조명으로 정원의 야경 무드를 유기적으로 서포트.",
      "브랜드 아이덴티티에 맞는 핸드드래프트 로고 드로잉을 간판 전면에 금속 에칭 기술로 정교하게 각인."
    ],
    logoText: "OASIS GARDEN CAFE & TEA",
    colors: [
      { name: "Oxidized Copper", hex: "#B45309" },
      { name: "Rich Forest Bark", hex: "#451A03" },
      { name: "Sunset Gold Warm", hex: "#FBBF24" }
    ],
    fontFamily: "Cinzel Classical Serif",
    fontDescription: "로마 고비문의 비율을 계승하여 클래식함과 진정성이 느껴지도록 장식성을 극도로 제어한 영문 세리프 서체.",
    layoutDesc: "어닝 하부 2.1m 높이에 가로 슬림형 일자 레이아웃으로 부착하여 보행자 눈높이에서 아늑한 출입구 느낌 유도.",
    imgBefore: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80",
    result: "인스타그램 기반 매장 외경 포토존 업로드 300% 증가, 평일 오후 외부 촬영 대기열 생성",
    isPremium: true, // Premium lock!
    splitViewerEnabled: true, // Split fragments vector render
    x: 72,
    y: 58
  },
  {
    id: "yale-academy",
    title: "예일 영수학원 프리미엄 브랜딩",
    category: "학원",
    tagline: "명문가의 서재를 연상시키는 고품격 에듀케이션 클래식",
    problem: "난립하는 인근 경쟁 학원들의 총천연색 원색 간판 공해 속에서, 학원의 차별화된 학문적 깊이와 엘리트주의 교육 환경을 시각적으로 설득하기 어려웠습니다.",
    strategy: [
      "경쟁 학원들의 형광 노랑, 형광 핑크 대신 학문적 정통성을 보여주기 위한 딥 네이비와 마제스티 브론즈 신주 메탈 바디 조합.",
      "내부 로비 대리석 아트월과 유기적으로 조화되는 황동 판재 음각 레이저 가공 간판 기법 연동.",
      "학위 문장을 연상시키는 정교한 문양 엠블럼을 후면 조명 실루엣으로 투과하여 명문가 학원 가치 증폭."
    ],
    logoText: "YALE PRESTIGE ACADEMY",
    colors: [
      { name: "YALE Navy Blue", hex: "#1E3A8A" },
      { name: "Majesty Bronze Gold", hex: "#854D0E" },
      { name: "Parchment Paper Ivory", hex: "#FFFBEB" }
    ],
    fontFamily: "Playfair Display Serif",
    fontDescription: "우아함과 격절함을 지닌 모던 클래식 세리프체의 정수로 신념 서명(Signature)과 같은 무게감을 자아냄.",
    layoutDesc: "전면부 메인 어닝 패널 중앙에 엠블럼과 로고타입을 1:2.4 황금비율로 수평 배치하고 하부 스팟라이트로 음영 강조.",
    imgBefore: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    result: "상위 대학 진학 상담 신청 및 학부모 안심 추천율 전년 대비 68% 신장 및 주변 오피니언 리더 인지도 선점",
    isPremium: false,
    splitViewerEnabled: false,
    x: 31,
    y: 20
  },
  {
    id: "delifresh-brand",
    title: "델리프레시 샌드위치 프랜차이즈 간판 표준 수립",
    category: "프랜차이즈",
    tagline: "전국 가맹점에서 즉각 제작 가능한 모듈러 프레시 사인 시스템",
    problem: "매장 크기와 전면부 파사드 레이아웃이 비정형적인 상황에서 가맹점마다 간판 퀄리티 격차가 심하고, 발광 효율 및 유지보수 비용이 지나치게 높았으며, 건강식 샌드위치의 신선함이 살지 않았습니다.",
    strategy: [
      "어떤 외벽 재질(목재, 석재, 콘크리트)에도 쉽게 도킹 가능하도록 압축 알루미늄 슬라이딩 레일 모듈 프레임 디자인.",
      "신선함을 극한으로 전하는 고선명 아보카도 그린 컬러 가시광선 파장대 LED 광원(5500K) 커스터마이징.",
      "이물질이나 벌레 유입을 원천 차단하는 완전 밀폐형 IP67 등급 초경량 진공성형 루미 글라스 채널 문자 적용."
    ],
    logoText: "delifresh SANDWICH & CO",
    colors: [
      { name: "Avocado Fresh", hex: "#10B981" },
      { name: "Crisp Rye Brown", hex: "#78350F" },
      { name: "Egg Yolk Yellow", hex: "#FBBF24" }
    ],
    fontFamily: "Sulphur Point Bold & Soft Sans",
    fontDescription: "직각 테두리를 모두 둥글게 매만져 신선한 천연 재료의 친근함과 유기농 식자재의 오가닉한 질감을 표현함.",
    layoutDesc: "프랜차이즈 표준 평당 전면 비율 가변 슬라이딩 시스템으로 가로폭 2.4m ~ 6.2m 범용 매핑 가이던스 완료.",
    imgBefore: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    result: "전국 가맹 패널 원가 24% 절감, 시공 소요 기간 5일에서 단 1일로 단축, 가맹점 외형 일관성 100% 충족",
    isPremium: true,
    splitViewerEnabled: true,
    x: 85,
    y: 25
  },
  {
    id: "cheon-dam-dental",
    title: "청담 이안치과 럭셔리 브랜딩",
    category: "병원",
    tagline: "치과의 오랜 공포를 우아한 세리프와 메탈 피니시로 무마하다",
    problem: "소리만으로 압도하는 치과의 차가운 의료 기기 느낌을 외부 사인물이 확대 재생산하고 있었으며, 과도하게 발갛고 번들거리는 이빨 실루엣 간판은 환자들의 진료 거부감을 야기했습니다.",
    strategy: [
      "기괴한 일러스트를 과감하게 소거하고, 주얼리 명품 브랜드 숍의 외경을 오마주한 헤어라인 스테인리스 스틸 무광 간판.",
      "따뜻한 톤의 사이드 간접 조명을 활용해 은은하고 부드러운 화이트닝 이미지 연출.",
      "미세 굴곡과 비정형 에칭 가공을 통해 낮 동안 태양광 각도에 따라 간판 그림자가 서정적으로 다변화되도록 유도."
    ],
    logoText: "Prestige I'AN DENTAL CLINIC",
    colors: [
      { name: "Hairline Silver Metal", hex: "#9CA3AF" },
      { name: "Chic Onyx", hex: "#111827" },
      { name: "Warm Pearl Linen", hex: "#F3F4F6" }
    ],
    fontFamily: "Bodoni Luxury Serif",
    fontDescription: "수직과 수평의 대치 기법을 통해 견고한 기술 정밀성과 우아함을 연출하여, 오차 없는 의술의 권위와 진정성을 증명.",
    layoutDesc: "출입구 전면 필라(Pillar) 중심부에 수직형 럭셔리 매핑으로 배치하여 도심 속 고급스럽고 현대적인 심미성 부각.",
    imgBefore: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    result: "미용/임플란트 고정밀 치료 신규 고수익 환자 유치 건수 85% 폭증, 예술적 공간 연출로 원장 평가 만족",
    isPremium: false,
    splitViewerEnabled: false,
    x: 55,
    y: 65
  },
  {
    id: "raon-pottery",
    title: "라온도예 감성 아틀리에 사그라들지 않는 점토",
    category: "기타",
    tagline: "황토 질감의 고압 테라코타 플레이트와 스텐실의 융합",
    problem: "매쉬망이나 기성품 시트지에 뽑힌 가벼운 글자가 가치 있는 수공예 도예 공방의 철학을 무너뜨리고 있었으며, 빌라 숲 단지 속에서 상징적인 조형물이 부재하여 길 찾기에 곤란을 주었습니다.",
    strategy: [
      "실제 가마에서 고온 소성한 테라코타 슬래브 위에 공방을 상징하는 점토 형상을 입체 음각 수공 제작.",
      "점토가 건조되는 자연스러운 색인 테라코타 어스 브라운 컬러와 철제 프레임 부식 마감 기법 사용.",
      "공방 입구 골목에 입간판 형태로 점토 미어캣 형태의 철제 오브제 설치 및 가로등 겸용 스탠실 조명 매칭."
    ],
    logoText: "LAON CERAMIC STUDY",
    colors: [
      { name: "Terracotta Earth", hex: "#9A3412" },
      { name: "Charcoal Clay", hex: "#1F2937" },
      { name: "Rustic Ash", hex: "#E5E7EB" }
    ],
    fontFamily: "Pretendard Thin & Handdrawn Core",
    fontDescription: "손끝의 손길이 고스란히 묻어나는 투박하지만 정감 있는 가느다란 가변 터치의 독창적 서체 기법.",
    layoutDesc: "공방 외곽 돌담길 정가운데에 600x600 크기로 앙증맞지만 강력한 밀도로 바닥 안착형 미니 기단 스팟라이팅 레이아웃.",
    imgBefore: "https://images.unsplash.com/photo-1576016770956-debb63d900ad?auto=format&fit=crop&w=800&q=80",
    imgAfter: "https://images.unsplash.com/photo-1565192647048-f997ecd879f0?auto=format&fit=crop&w=800&q=80",
    result: "방문 클래스 마감율 3배 연속 기록 달성 및 공방 앞 기념 인지 SNS 공유 빈도 급상승",
    isPremium: false,
    splitViewerEnabled: true,
    x: 10,
    y: 70
  }
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "현장 레이저 실측 & 환경 분석",
    subtitle: "STREET ANALYSIS & LASER MEASUREMENT",
    desc: "현장 외장재 성분 파악 및 고화각 3D 레이저 거리 실측기를 활용하여 왜곡 없는 보행 시선 물리각 데이터를 도출합니다.",
    details: [
      "초정밀 레이저 기반 반경 100m 시선 저해물질 완벽 추적 및 스캐닝",
      "낮, 밤, 석양 등 자연광 가변 각도에 따른 외벽 음영 3D 시뮬레이션",
      "관할 인허가 옥외광고 심의 규정(구청 법안) 선제 분석 및 안전 하중 진단"
    ]
  },
  {
    id: 2,
    title: "브랜드 에스테틱 & 3D 사인 디자인",
    subtitle: "CONCEPT DEVELOPMENT & 3D RENDERING",
    desc: "공간의 역사성과 브랜드 본질을 조립하여 폰트 에디팅, 맞춤 일러스트, 입체 두께(D) 시안을 가상 환경에 올립니다.",
    details: [
      "한글 및 영문 폰트 자간/두께 미세 모디파이 커스텀 서체 설계",
      "실제 건물 텍스처와 등색 맵을 복사해 주간/야간 전구색 온도 대비 3D 렌더 제공",
      "우면/좌면/보행 등 각 동선별 조감도 및 시인거리별 가독 점수 진단표 산출"
    ]
  },
  {
    id: 3,
    title: "재료 매칭, 조명 공학 & 시안 조율",
    subtitle: "SPECIFICATION & CLIENT WORKSHOP",
    desc: "클라이언트와 맞춤형 회의를 통해 황동 신주, 압축 알루 알로이, 동, 아크릴 등 디테일 자재 및 LED 모듈 광도(Lum) 세트를 정비합니다.",
    details: [
      "실제 스케일링 금속 패널 시공 시방서 및 원소재 실물 샘플 직접 기획 제안",
      "발광 밀도를 고려한 국산 고선명 LED 도팅 수량 결정 (음영 및 조도 뭉침 방지)",
      "예산 범위 내 설계 최적화 및 유지 관리 매뉴얼 기반 기술적 절감안 제안"
    ]
  },
  {
    id: 4,
    title: "헤어라인 메탈 용접 & 레이저 정전 가공",
    subtitle: "CNC PRECISION MANUFACTURING",
    desc: "자체 정전 특수 아크 도장 장비와 2.5KW 정밀 레이저 CNC 가공기를 통해 절단면 오차 0.2mm 이하의 명품 간판을 주조합니다.",
    details: [
      "부식 방지를 위한 친환경 정전식 분체 열처리 특수 외장 코팅 적용",
      "금속 접합부 아르곤 고정밀 용접 및 흠집 소거용 헤어라인 샌딩 마무리 공정",
      "IP67 방수성 보강 회로 설계로 장마철 수분 및 습기 누전 완벽 방어 수립"
    ]
  },
  {
    id: 5,
    title: "크레인 스카이 하중 도킹 & 안심 수평 시공",
    subtitle: "PROFESSIONAL SIGNAGE INSTALLATION",
    desc: "옥외광고 전문 라이선스를 가진 고도 로깅 숙련 시공 팀이 도심 번화가에서도 안전 규정을 준수하며 튼튼하게 장착합니다.",
    details: [
      "방진 러버 패드를 이용한 돌풍(초속 35m) 견딤 안전 하중 설계 주축 시공",
      "메인 앵커 본드 주입형 고장력 철물 벽면 볼팅으로 반평생 처짐 방지 완벽 차단",
      "전기 안전 필터 설치 및 전체 야간 조도 센서 타이머 장비 동시 융합 세팅"
    ]
  }
];

export const TOOL_SKILLS: ToolSkill[] = [
  { name: "Adobe Illustrator (간판 벡터 도면 & 시안 설계)", level: 95 },
  { name: "Adobe Photoshop (현장 실사 합성 & 텍스처링 및 라이팅)", level: 90 },
  { name: "AutoCAD / Fusion 360 (입체 사인 정밀 용접/CNC 도면 설계)", level: 85 },
  { name: "Adobe InDesign (가맹 시방서 및 브랜드 가이드북 퍼블리싱)", level: 80 },
  { name: "Figma (상호작용 시뮬레이션 및 공간 브랜딩 웹 프로토타이핑)", level: 80 }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "국가공인 옥외광고물관리사 자격 취득",
    organization: "한국옥외광고협회",
    date: "2015.08",
    category: "자격증"
  },
  {
    title: "컴퓨터그래픽스운용기능사 자격 취득",
    organization: "한국산업인력공단",
    date: "2013.06",
    category: "자격증"
  },
  {
    title: "서울시 우수 공공디자인 옥외광고 부문 대상 수혜",
    organization: "서울특별시",
    date: "2022.11",
    category: "수상"
  },
  {
    title: "K-Design Award 옥외 공간 브랜딩 본상 수상 (Winner)",
    organization: "K-Design 위원회",
    date: "2023.08",
    category: "수상"
  },
  {
    title: "친환경 도시 재생 옥외광고 전문 엔지니어 수료",
    organization: "국토교통 인재개발원",
    date: "2019.04",
    category: "교육이수"
  }
];
