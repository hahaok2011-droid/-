/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, WorkflowStep, ToolSkill, Certification } from "./types";

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "kangchan-taekwondo",
    title: "빛의거리 정비사업 // 특화 거리 간판 리뉴얼 기획안",
    category: "공공 디자인",
    tagline: "도시 미관과 야간 안전을 동시에 높이는 랜드마크 특화 거리",
    problem: "규격화되지 않고 무분별하게 난립한 노후 간판들로 인해 도시 미관이 크게 훼손되었으며, 야간 조도 불균형으로 보행자 가독성과 방범 안전성이 매우 취약했습니다.",
    strategy: [
      "거리 고유의 아이덴티티를 확립하는 파사드 규격 및 가이드라인 선제적 수립.",
      "고효율 친환경 LED 간접 조명 및 채널 간판 적용으로 야간 가독성과 보행 안전성 확보.",
      "주변 보행 동선 및 가로수와 조화를 이루는 프리미엄 컬러 비례 및 내구성 설계."
    ],
    logoText: "빛의거리 STREET RENEWAL",
    colors: [
      { name: "City Deep Navy", hex: "#1E3A8A" },
      { name: "Safety Warm Amber", hex: "#F59E0B" },
      { name: "Clean Off-White", hex: "#F8FAFC" }
    ],
    fontFamily: "Pretendard Bold & Space Grotesk",
    fontDescription: "원거리 보행자 및 차량 운전자의 인지 속도를 극대화한 모던 하이-가독성 서체.",
    layoutDesc: "보행선 기준 눈높이 가시각을 계산한 황금비율 파사드 그리드 배치.",
    imgBefore: "/만수2.jpg",
    imgAfter: "/만수1.jpg",
    imgBeforeLabel: "정비 전 현장 간판",
    imgAfterLabel: "정비 후 대표 파사드",
    additionalImages: [
      { id: "mansu-img-1", url: "/만수3.jpg", label: "거리 파사드 정비 시안" },
      { id: "mansu-img-2", url: "/만수4.jpg", label: "야간 LED 발광 연출" },
      { id: "mansu-img-3", url: "/만수5.jpg", label: "돌출 간판 측면 도면" },
      { id: "mansu-img-4", url: "/만수6.jpg", label: "소재 마감 사양서" }
    ],
    result: "특화 거리 상권 방문객 만족도 88% 향상 및 야간 유동인구 35% 증가 기대",
    isPremium: false,
    splitViewerEnabled: false,
    x: 18,
    y: 42
  },
  {
    id: "seongmo-hospital-funeral",
    title: "성모병원 장례식장 간판정비",
    category: "병원",
    tagline: "엄숙함 속에 절제된 품격과 따뜻한 위로를 담은 프리미엄 웨이파인딩",
    problem: "기존 장례식장 안내 사인물은 차갑고 획일적인 흑백 위주의 경직된 디자인으로 설계되어 유가족들의 심리적 불안감과 피로감을 가중시켰으며, 복잡한 실내 동선 체계로 인해 조문객들의 혼선과 문의가 잦았습니다.",
    strategy: [
      "고인의 마지막 길과 유가족의 깊은 슬픔을 배려한 차분하고 은은한 웜 그레이(Warm Grey) 및 딥 브론즈 톤온톤 배색 설계.",
      "조명 반사를 방지하는 무광(Matte) 아노다이징 금속 소재와 눈부심 없는 면발광 LED를 적용하여 정숙한 상시 시인성 제공.",
      "초행길 조문객도 직관적으로 인식할 수 있도록 '안내데스크-빈소-접객실-발인장'을 연결하는 모듈형 픽토그램 가이드라인 수립."
    ],
    logoText: "성모병원 FUNERAL HALL SIGNAGE",
    colors: [
      { name: "Deep Dignity Bronze", hex: "#4A3B32" },
      { name: "Solemn Warm Grey", hex: "#8E8B82" },
      { name: "Comfort Soft Ivory", hex: "#F5F2EB" }
    ],
    fontFamily: "나눔명조 & Pretendard Medium",
    fontDescription: "전통적 예법의 정중함을 담은 명조체와 높은 가독성을 갖춘 현대적 고딕체의 정교한 비례 조합.",
    layoutDesc: "조문객의 시선 이동 속도와 동선 피로도를 고려해 가시 영역 중심부에 정돈된 1:1.6 황금비율 웨이파인딩 그리드 적용.",
    imgBefore: "/성모2.jpg",
    imgAfter: "/성모1.jpg",
    imgBeforeLabel: "시공 전 내부 전경",
    imgAfterLabel: "메인 파사드 및 로비",
    additionalImages: [
      { id: "seongmo-img-1", url: "/성모2.jpg", label: "안내 데스크 로비" },
      { id: "seongmo-img-2", url: "/성모3.jpg", label: "호실별 입구 사인" },
      { id: "seongmo-img-3", url: "/성모4.jpg", label: "층별 웨이파인딩" },
      { id: "seongmo-img-4", url: "/성모5.jpg", label: "접객실 휴게공간" },
      { id: "seongmo-img-5", url: "/성모6.jpg", label: "야간 간접조명 연출" },
      { id: "seongmo-img-6", url: "/성모7.jpg", label: "소재 마감 도면" }
    ],
    result: "조문객 동선 안내 문의 65% 감소 및 유가족 공간 만족도 조사 '매우 우수' 94% 달성",
    isPremium: true,
    splitViewerEnabled: false,
    x: 48,
    y: 35
  },
  {
    id: "cks-corporate-branding",
    title: "씨케이에스 기업 브랜딩 // 스마트 공장 파사드 및 통합 사이니지",
    category: "기업공장",
    tagline: "첨단 제조 기술력과 기업 신뢰를 상징하는 스마트 공장 외벽 디자인",
    problem: "기존 공장동의 획일적이고 투박한 창고형 외관으로 인해 우수한 제조 역량과 기업 가치가 저평가되었으며, 현장을 방문하는 바이어 및 거래처에 전문적인 인상을 주지 못했습니다.",
    strategy: [
      "첨단 제조 공장의 정체성을 시각화하는 메탈릭 실버와 스마트 딥 블루 베이스의 외벽 파사드 정비.",
      "야간 공장동의 시인성과 상징성을 높이는 고효율 친환경 간접 LED 조명 라인 설계.",
      "공장 정문 메인 게이트부터 생산동 및 물류 입구까지 이어지는 체계적인 대형 기업 사이니지 구축."
    ],
    logoText: "CKS SMART FACTORY",
    colors: [
      { name: "Tech Smart Blue", hex: "#0284C7" },
      { name: "Titanium Silver", hex: "#64748B" },
      { name: "Clean Pure White", hex: "#FFFFFF" }
    ],
    fontFamily: "Space Grotesk & Pretendard Bold",
    fontDescription: "글로벌 스탠다드 제조 기업에 부합하는 현대적이고 견고한 산세리프 타이포그래피.",
    layoutDesc: "공장 메인 게이트 상단 및 공장동 외벽에 대형 채널 레터링을 정돈하여 원거리 인지성 확보.",
    imgBefore: "/씨케이1.jpg",
    imgAfter: "/씨케이2.jpg",
    imgBeforeLabel: "시공 전 공장 전경",
    imgAfterLabel: "스마트 공장 메인 파사드",
    additionalImages: [
      { id: "cks-img-1", url: "/씨케이1.jpg", label: "공장동 메인 파사드" },
      { id: "cks-img-2", url: "/씨케이3.jpg", label: "정문 메인 게이트" },
      { id: "cks-img-3", url: "/씨케이4.jpg", label: "생산동 출입 존" },
      { id: "cks-img-4", url: "/씨케이5.jpg", label: "단지 내 안전 유도" },
      { id: "cks-img-5", url: "/씨케이6.jpg", label: "대형 지주 간판 설계" },
      { id: "cks-img-6", url: "/씨케이7.jpg", label: "야간 외벽 발광 연출" },
      { id: "cks-img-7", url: "/씨케이8.png", label: "소재 마감 그래픽" }
    ],
    result: "바이어 방문 시 기업 신뢰도 평가 최상위 등급 획득 및 공장 단지 유동 안전성 45% 향상",
    isPremium: false,
    splitViewerEnabled: true,
    x: 72,
    y: 58
  },
  {
    id: "mansu3-public-board",
    title: "만수3동 외부게시판 제안",
    category: "공공 디자인",
    tagline: "주민 소통과 도심 미관을 잇는 친근하고 안전한 공공 안내 시스템",
    problem: "기존 거리의 공공 게시판은 비바람에 취약한 노후 철재 구조와 불규칙한 게시물 부착 방식으로 인해 가독성이 낮고 거리를 지저분하게 만들었으며, 게시물이 쉽게 오염되거나 훼손되는 문제가 있었습니다.",
    strategy: [
      "내후성이 우수한 고장력 아연도금 강판과 강화유리 도어를 적용하여 게시물 오염 및 훼손 원천 차단.",
      "보행자의 눈높이와 시선 각도를 고려한 인체공학적 그리드 및 표준 공공 디자인 규격 모듈 구축.",
      "주변 거리 환경 및 도심 미관과 자연스럽게 조화를 이루는 모던 슬림 프레임 마감 설계."
    ],
    logoText: "MANSU 3-DONG PUBLIC BULLETIN",
    colors: [
      { name: "Public Forest Green", hex: "#15803D" },
      { name: "Warm Slate Grey", hex: "#64748B" },
      { name: "Modern Silver", hex: "#E2E8F0" }
    ],
    fontFamily: "Pretendard & Public Gothic Bold",
    fontDescription: "남녀노소 누구나 원거리에서도 명확하게 식별할 수 있는 높은 레지빌리티(Legibility)의 공공 타이포그래피.",
    layoutDesc: "보행 동선 방해를 최소화하는 슬림 프레임 구조와 게시물 크기별 가변형 자석 게시 판넬 레이아웃.",
    imgBefore: "/게시판2.jpg",
    imgAfter: "/게시판1.jpg",
    imgBeforeLabel: "상세 설계 도면 및 시안",
    imgAfterLabel: "외부 게시판 제안 완료 전경",
    additionalImages: [
      { id: "board-img-1", url: "/게시판2.jpg", label: "정면 외부 게시판 메인 시안" },
      { id: "board-img-2", url: "/게시판3.jpg", label: "게시판 프레임 및 도어 개폐 구조 시안" },
      { id: "board-img-3", url: "/게시판4.jpg", label: "측면 슬림 구조 및 개폐 도면" },
      { id: "board-img-4", url: "/게시판5.jpg", label: "상단 타이틀 바 및 규격 시안" },
      { id: "board-img-5", url: "/게시판6.jpg", label: "현장 설치 위치 시뮬레이션 A" },
      { id: "board-img-6", url: "/게시판7.jpg", label: "현장 설치 위치 시뮬레이션 B" }
    ],
    result: "공공 정보 접근성 시인성 90% 향상 및 지역 주민 생활 만족도 최우수 평가 달성",
    isPremium: false,
    splitViewerEnabled: false,
    x: 40,
    y: 65
  },
  {
    id: "sesang-galbi-branding",
    title: "세상갈비 음식점 브랜딩",
    category: "음식점",
    tagline: "정통 갈비의 깊은 맛과 현대적 감성을 잇는 프리미엄 한식 다이닝 브랜딩",
    problem: "기존 고깃집들의 획일적이고 정돈되지 않은 외관 및 내부 비주얼은 프리미엄 식재료와 숙성 갈비의 정성스러운 품격을 제대로 전달하지 못했으며, 고객들에게 차별화된 다이닝 경험을 각인시키기 어려웠습니다.",
    strategy: [
      "한국 정통 기와의 선과 전통 문양을 모티브로 한 세련되고 모던한 브랜드 아이덴티티 설계.",
      "따뜻하고 깊이 있는 우드 톤과 브론즈 골드 소재를 매칭하여 정갈하면서도 고급스러운 파사드 환경 구축.",
      "외부 간판부터 매장 내부 사이니지 및 메뉴 보드까지 일관되게 이어지는 통합 비주얼 경험 강화."
    ],
    logoText: "SESANG GALBI DINING",
    colors: [
      { name: "Charcoal Black", hex: "#1E1E1E" },
      { name: "Deep Wood Brown", hex: "#5C4033" },
      { name: "Warm Gold", hex: "#D4AF37" }
    ],
    fontFamily: "Pretendard & 프리미엄 명조체 Bold",
    fontDescription: "전통 한식의 정통성과 장인 정신을 품격 있는 명조 비례와 모던 산세리프의 조화로 표현함.",
    layoutDesc: "매장 입구 파사드 전면에 개방감 있는 구조와 은은한 브랜딩 요소를 배치하여 미식의 기대감을 높이는 레이아웃.",
    imgBefore: "/sesa1.jpg",
    imgAfter: "/sesa3.jpg",
    imgBeforeLabel: "세상갈비 비주얼 시안",
    imgAfterLabel: "세상갈비 대표 전경",
    additionalImages: [
      { id: "sesang-img-1", url: "/sesa1.jpg", label: "세상갈비 브랜드 메인 비주얼" },
      { id: "sesang-img-2", url: "/sesa2.jpg", label: "실내 사이니지 및 브랜드 연출" },
      { id: "sesang-img-3", url: "/sesa4.jpg", label: "외부 전면 파사드 그래픽" }
    ],
    result: "브랜드 프리미엄 인지도 크게 상승 및 고객 다이닝 만족도 우수 평가 달성",
    isPremium: false,
    splitViewerEnabled: false,
    x: 45,
    y: 50
  },
  {
    id: "tool-complex",
    title: "신축 공구상가 외부 사이니지",
    category: "상업공간",
    tagline: "투박한 공구상가의 인식을 바꾸는 모던 산업형 파사드 시스템",
    problem: "기존 공구상가 특유의 복잡하고 무질서한 간판들로 인해 입점 업체 식별이 어렵고, 상가 전체의 전문성과 외관 심미성이 저하되는 문제가 있었습니다.",
    strategy: [
      "공구 및 기계의 구조적 비례를 모티브로 한 볼드한 메탈릭 모듈러 사인 그리드 구축.",
      "내구성이 뛰어난 산업용 갈바(Galvalume) 도장 프레임과 야간 가시성을 극대화한 전구색 LED 채널 적용.",
      "상가 동선과 업종별 섹션을 직관적으로 구분하는 메인 게이트 파사드 및 체계적인 인덱스 시스템 설계."
    ],
    logoText: "SMART TOOL COMPLEX",
    colors: [
      { name: "Industrial Charcoal", hex: "#27272A" },
      { name: "Safety Orange", hex: "#F97316" },
      { name: "Steel Metallic Grey", hex: "#71717A" }
    ],
    fontFamily: "Space Grotesk Industrial",
    fontDescription: "견고한 기계적 정밀성과 산업용 구조물의 단단함을 직선적인 획과 안정적인 비례로 표현함.",
    layoutDesc: "공구상가 전면 대형 게이트 상단에 1:2.4 비율의 모듈형 파사드 패널을 배치하여 원거리 인지성 확보.",
    imgBefore: "/공구1.jpg",
    imgAfter: "/공구2.jpg",
    imgBeforeLabel: "외부 사이니지 상세 시안",
    imgAfterLabel: "외부 사이니지 대표 전경",
    result: "입점 업체 식별 편의성 92% 향상 및 신축 단지 방문객 만족도 최상위 등급 달성",
    isPremium: false,
    splitViewerEnabled: false,
    x: 31,
    y: 20
  },
  {
    id: "ksp-steel-signage",
    title: "KSP스틸 내외부사이니지",
    category: "기업공장",
    tagline: "철강 제조 기업의 무게감과 정밀성을 시각화하는 메탈릭 사인 시스템",
    problem: "기존 공장 및 사옥 외벽의 노후된 사인물은 기업의 핵심 가치인 철강 가공의 정밀성과 견고함을 전달하지 못했으며, 단지 내 대형 화물 차량과 방문객의 동선 구분이 불명확했습니다.",
    strategy: [
      "구조용 압연 강재와 헤어라인 스테인리스 스틸을 조합한 단단하고 무게감 있는 메인 지주 간판 구축.",
      "주야간 24시간 가동되는 공장 특성에 맞춰 가시성이 탁월한 고도장 피니시 및 내후성 고휘도 LED 면발광 적용.",
      "사옥 로비부터 공장동 내부 안전 동선까지 유기적으로 연결하는 기업 아이덴티티 기반 통합 웨이파인딩 설계."
    ],
    logoText: "KSP STEEL CORPORATION",
    colors: [
      { name: "Steel Navy", hex: "#0F172A" },
      { name: "Titanium Grey", hex: "#475569" },
      { name: "Safety Amber", hex: "#F59E0B" }
    ],
    fontFamily: "Pretendard Heavy & DIN Industrial",
    fontDescription: "구조물의 단단함과 오차 없는 정밀 산업 가공의 신뢰감을 굵고 직선적인 비례의 타이포그래피로 강조함.",
    layoutDesc: "사옥 메인 파사드 상단 및 공장 게이트 출입구에 대형 입체 채널 사인을 정렬하여 압도적인 시각적 무게감 확보.",
    imgBefore: "/케이에스3.jpg",
    imgAfter: "/케이에스1.jpg",
    imgBeforeLabel: "외부 메인 파사드 사이니지 전경",
    imgAfterLabel: "내외부 사이니지 완료 대표 전경",
    additionalImages: [
      { id: "ksp-img-1", url: "/케이에스3.jpg", label: "외부 메인 파사드 사이니지 전경" },
      { id: "ksp-img-2", url: "/케이에스2.jpg", label: "내부 로비 및 공장동 상세 시안" }
    ],
    result: "방문 바이어 및 거래처의 기업 신뢰도 만족도 96% 달성 및 물류 차량 진출입 효율성 대폭 개선",
    isPremium: false,
    splitViewerEnabled: false,
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
    imgBeforeLabel: "리모델링 전 외벽",
    imgAfterLabel: "무광 스테인리스 파사드",
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
    imgBeforeLabel: "설치 전 골목길",
    imgAfterLabel: "테라코타 입간판",
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
