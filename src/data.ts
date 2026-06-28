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
    imgBeforeLabel: "정비사업 컨셉",
    imgAfterLabel: "3번구역 대표 파사드",
    additionalImages: [
      { id: "mansu-img-1", url: "/만수3.jpg", label: "사이니지배치도" },
      { id: "mansu-img-2", url: "/만수4.jpg", label: "세부사양 디테일" },
      { id: "mansu-img-3", url: "/만수5.jpg", label: "1번구역" },
      { id: "mansu-img-4", url: "/만수6.jpg", label: "2번구역" }
    ],
    detailImages: [
      { id: "mansu-img-1", url: "/만수3.jpg", label: "사이니지배치도" },
      { id: "mansu-img-2", url: "/만수4.jpg", label: "세부사양 디테일" },
      { id: "mansu-img-3", url: "/만수5.jpg", label: "1번구역" },
      { id: "mansu-img-4", url: "/만수6.jpg", label: "2번구역" }
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
    imgBeforeLabel: "복도 리모델링 변경",
    imgAfterLabel: "메인 파사드 사이니지",
    additionalImages: [
      { id: "seongmo-img-1", url: "/성모3.jpg", label: "내부 각종 사이니지" },
      { id: "seongmo-img-2", url: "/성모4.jpg", label: "각종 내부 안내사인" },
      { id: "seongmo-img-3", url: "/성모5.jpg", label: "접객실 휴게공간 썬팅" },
      { id: "seongmo-img-4", url: "/성모6.jpg", label: "병원동별 유도 지주사인" },
      { id: "seongmo-img-5", url: "/성모7.jpg", label: "화살표 안내사인" }
    ],
    detailImages: [
      { id: "seongmo-img-1", url: "/성모3.jpg", label: "내부 각종 사이니지" },
      { id: "seongmo-img-2", url: "/성모4.jpg", label: "각종 내부 안내사인" },
      { id: "seongmo-img-3", url: "/성모5.jpg", label: "접객실 휴게공간 썬팅" },
      { id: "seongmo-img-4", url: "/성모6.jpg", label: "병원동별 유도 지주사인" },
      { id: "seongmo-img-5", url: "/성모7.jpg", label: "화살표 안내사인" }
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
    imgBeforeLabel: "CI 제안",
    imgAfterLabel: "메인 파사드",
    additionalImages: [
      { id: "cks-img-2", url: "/씨케이3.jpg", label: "타 위치 공장 간판 제안" },
      { id: "cks-img-3", url: "/씨케이4.jpg", label: "입구간판" },
      { id: "cks-img-4", url: "/씨케이5.jpg", label: "지주형 유도사인A" },
      { id: "cks-img-5", url: "/씨케이6.jpg", label: "지주형 유도사인B" },
      { id: "cks-img-6", url: "/씨케이7.jpg", label: "지주형 유도사인C" },
      { id: "cks-img-7", url: "/씨케이8.png", label: "타 위치 입구간판" }
    ],
    detailImages: [
      { id: "cks-img-2", url: "/씨케이3.jpg", label: "타 위치 공장 간판 제안" },
      { id: "cks-img-3", url: "/씨케이4.jpg", label: "입구간판" },
      { id: "cks-img-4", url: "/씨케이5.jpg", label: "지주형 유도사인A" },
      { id: "cks-img-5", url: "/씨케이6.jpg", label: "지주형 유도사인B" },
      { id: "cks-img-6", url: "/씨케이7.jpg", label: "지주형 유도사인C" },
      { id: "cks-img-7", url: "/씨케이8.png", label: "타 위치 입구간판" }
    ],
    result: "바이어 방문 시 기업 신뢰도 평가 최상위 등급 획득 및 공장 단지 유동 안전성 45% 향상",
    isPremium: false,
    splitViewerEnabled: false,
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
    imgBeforeLabel: "외부 지주형 게사판 제안2",
    imgAfterLabel: "외부 지주형 게사판 제안1",
    additionalImages: [
      { id: "board-img-2", url: "/게시판3.jpg", label: "게시판 내용 디자인" },
      { id: "board-img-3", url: "/게시판4.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-4", url: "/게시판5.jpg", label: "게시판 내용 디자인" },
      { id: "board-img-5", url: "/게시판6.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-6", url: "/게시판7.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-7", url: "/게시판8.jpg", label: "타 동 게시판 제안" },
      { id: "board-img-8", url: "/게시판9.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-9", url: "/게시판10.jpg", label: "현장 시뮬레이션" }
    ],
    detailImages: [
      { id: "board-img-2", url: "/게시판3.jpg", label: "게시판 내용 디자인" },
      { id: "board-img-3", url: "/게시판4.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-4", url: "/게시판5.jpg", label: "게시판 내용 디자인" },
      { id: "board-img-5", url: "/게시판6.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-6", url: "/게시판7.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-7", url: "/게시판8.jpg", label: "타 동 게시판 제안" },
      { id: "board-img-8", url: "/게시판9.jpg", label: "현장 시뮬레이션" },
      { id: "board-img-9", url: "/게시판10.jpg", label: "현장 시뮬레이션" }
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
      { id: "ksp-img-2", url: "/케이에스2.jpg", label: "내부 로비 및 공장동 상세 시안" },
      { id: "ksp-img-3", url: "/케이에스4.jpg", label: "사이니지 시공 및 상세 디테일" }
    ],
    detailImages: [
      { id: "ksp-img-1", url: "/케이에스3.jpg", label: "외부 메인 파사드 사이니지 전경" },
      { id: "ksp-img-2", url: "/케이에스2.jpg", label: "내부 로비 및 공장동 상세 시안" },
      { id: "ksp-img-3", url: "/케이에스4.jpg", label: "사이니지 시공 및 상세 디테일" }
    ],
    result: "방문 바이어 및 거래처의 기업 신뢰도 만족도 96% 달성 및 물류 차량 진출입 효율성 대폭 개선",
    isPremium: false,
    splitViewerEnabled: false,
    x: 85,
    y: 25
  },
  {
    id: "international-st-marys-hospital",
    title: "국제성모병원 내외부 사이니지 제안",
    category: "병원",
    tagline: "대학병원의 신뢰감과 스마트 의료 환경을 체계적으로 안내하는 통합 웨이파인딩",
    problem: "기존 대학병원 특유의 복잡하고 분산된 동선 구조와 규격화되지 않은 안내 사인물들로 인해 내원객 및 고령 환자들의 진료센터 탐색에 혼선이 잦았으며, 외부 파사드의 야간 식별성이 낮아 응급센터 및 주차장 진입 구분이 불명확했습니다.",
    strategy: [
      "환자 중심의 직관적 컬러 인덱스 시스템과 시인성이 높은 대형 모듈형 간판 설계.",
      "의료진과 방문객의 동선을 명확히 분리하고 야간 응급 가시성을 극대화한 고휘도 LED 면발광 적용.",
      "외부 메인 게이트부터 로비, 진료센터 및 병동까지 유기적으로 연결되는 스마트 웨이파인딩 구축."
    ],
    logoText: "INTERNATIONAL ST. MARY'S HOSPITAL",
    colors: [
      { name: "Medical Trust Navy", hex: "#003A70" },
      { name: "Clean Cyan Blue", hex: "#00A3E0" },
      { name: "Warm White Pearl", hex: "#F8FAFC" }
    ],
    fontFamily: "Pretendard Bold & Neo Sans Medical",
    fontDescription: "대학병원의 격조와 오차 없는 정밀 의료의 신뢰감을 명료하고 가독성이 뛰어난 모던 산세리프 비례로 강조함.",
    layoutDesc: "병원 본동 진입로 게이트 상단 및 전면에 대형 메인 파사드 사인을 정렬하여 환자들에게 즉각적인 위치 인지성과 안정감 제공.",
    imgBefore: "/국제2.jpg",
    imgAfter: "/국제1.jpg",
    imgBeforeLabel: "외부사이니지1",
    imgAfterLabel: "지주형 유도사인 대표 제안",
    additionalImages: [
      { id: "st-mary-img-3", url: "/국제3.jpg", label: "외부사이니지2" },
      { id: "st-mary-img-4", url: "/국제4.jpg", label: "지하 안내 웨이파인딩" },
      { id: "st-mary-img-5", url: "/국제5.jpg", label: "지하 안내 웨이파인딩" },
      { id: "st-mary-img-6", url: "/국제6.jpg", label: "내부 호실 사이니지" },
      { id: "st-mary-img-7", url: "/국제7.jpg", label: "내부 호실 표찰" }
    ],
    detailImages: [
      { id: "st-mary-img-3", url: "/국제3.jpg", label: "외부사이니지2" },
      { id: "st-mary-img-4", url: "/국제4.jpg", label: "지하 안내 웨이파인딩" },
      { id: "st-mary-img-5", url: "/국제5.jpg", label: "지하 안내 웨이파인딩" },
      { id: "st-mary-img-6", url: "/국제6.jpg", label: "내부 호실 사이니지" },
      { id: "st-mary-img-7", url: "/국제7.jpg", label: "내부 호실 표찰" }
    ],
    result: "내원객 진료과 탐색 소요 시간 40% 단축 및 환자 만족도 평가에서 웨이파인딩 부문 최우수 등급 달성",
    isPremium: false,
    splitViewerEnabled: false,
    x: 55,
    y: 65
  },
  {
    id: "daewoo-interior-car",
    title: "대우인테리어 차량썬팅 및 랩핑 광고",
    category: "차량광고",
    tagline: "이동하는 비즈니스 카드 // 세련된 기업 아이덴티티 차량 랩핑",
    problem: "기존 업무용 차량 외관에 텍스트만 투박하게 붙어 있어 브랜드 신뢰도를 주지 못했으며, 주행 중 멀리서도 한눈에 인식할 수 있는 직관적인 광고 시인성이 부재했습니다.",
    strategy: [
      "차량 측면 및 후면에 고해상도 실사 출력 랩핑 필름을 적용하여 변색 및 스크래치 방지 마감.",
      "브랜드 상징 컬러인 딥 네이비와 에너제틱 골드 포인트 컬러를 조합하여 세련된 시각적 대비 구축.",
      "운전 중이나 주차 시에도 연락처와 핵심 비즈니스 영역이 명확하게 전달되는 타이포그래피 레이아웃 설계."
    ],
    logoText: "DAEWOO INTERIOR DESIGN",
    colors: [
      { name: "Deep Navy", hex: "#1E3A8A" },
      { name: "Energetic Gold", hex: "#D97706" },
      { name: "Clean White", hex: "#FFFFFF" }
    ],
    fontFamily: "Pretendard Bold & Montserrat",
    fontDescription: "속도감 있는 주행 환경에서도 가독성이 뛰어난 산뜻하고 견고한 산스세리프 서체.",
    layoutDesc: "차량 도어 측면 핵심 영역과 후면 범퍼 상단에 브랜드 로고 및 연락처를 최적의 비율로 배치한 이동형 사이니지.",
    imgBefore: "/차량2.jpg",
    imgAfter: "/차량1.jpg",
    imgBeforeLabel: "대우인테리어 차량 썬팅 및 랩핑",
    imgAfterLabel: "차량 전면 및 측면 전경",
    detailImages: [
      { id: "daewoo-car-img-1", url: "/차량2.jpg", label: "대우인테리어 차량 랩핑 완료 및 디테일" }
    ],
    result: "이동 중 문의 전화 접수율 50% 증가 및 현장 방문 고객의 브랜드 신뢰도 대폭 향상",
    isPremium: false,
    splitViewerEnabled: false,
    x: 45,
    y: 80
  },
  {
    id: "pho98-ricenoodle",
    title: "Pho98 쌀국수 전문점 브랜딩",
    category: "음식점",
    tagline: "정통 베트남 쌀국수의 진한 풍미를 담아낸 이국적인 외부 파사드 & 사이니지",
    problem: "기존 골목 상권에서 매장 외관이 특색 없이 평범하여 정통 베트남 쌀국수 전문점만의 전문성과 이국적인 분위기가 전달되지 않았으며, 보행자의 시선을 사로잡을 상징적인 포토존이나 야간 조명 사인이 부재했습니다.",
    strategy: [
      "베트남 현지의 이국적인 정취를 재해석한 따뜻한 우드 톤의 파사드와 간결한 철제 레터링 조합.",
      "야간에도 멀리서 눈에 띄도록 고선명 전구색 LED 후광 간접 조명을 배치하여 은은한 감성 연출.",
      "매장 전면 윈도우에 메뉴 직관성을 높이는 그래픽 시트와 맞춤 제작 입간판으로 고객 유입 동선 강화."
    ],
    logoText: "PHO98 RICE NOODLE",
    colors: [
      { name: "Vietnamese Green", hex: "#065F46" },
      { name: "Warm Wood", hex: "#B45309" },
      { name: "Creamy Broth", hex: "#FEF3C7" }
    ],
    fontFamily: "Pretendard Medium & Montserrat Bold",
    fontDescription: "이국적인 베트남 요리의 감성과 현대적인 모던함을 동시에 보여주는 세련되고 가독성 높은 헤드라인 서체.",
    layoutDesc: "매장 상단 메인 간판에 450x450 크기의 심볼과 돋보이는 영문/한글 조합 레터링을 황금비율로 안착시킨 정면 중앙 중심 레이아웃.",
    imgBefore: "/포2.jpg",
    imgAfter: "/포1.jpg",
    imgBeforeLabel: "시공전후 시뮬레이션",
    imgAfterLabel: "전체 설치 완료",
    detailImages: [
      { id: "pho98-img-3", url: "/포3.jpg", label: "전면 사이니지 제안" },
      { id: "pho98-img-4", url: "/포4.jpg", label: "전체 사이니지 시안" },
      { id: "pho98-img-5", url: "/포5.jpg", label: "배너사인" },
      { id: "pho98-img-6", url: "/포6.jpg", label: "메뉴사인" }
    ],
    additionalImages: [
      { id: "pho98-img-3", url: "/포3.jpg", label: "전면 사이니지 제안" },
      { id: "pho98-img-4", url: "/포4.jpg", label: "전체 사이니지 시안" },
      { id: "pho98-img-5", url: "/포5.jpg", label: "배너사인" },
      { id: "pho98-img-6", url: "/포6.jpg", label: "메뉴사인" }
    ],
    result: "리뉴얼 후 일 평균 방문객 수 80% 증가 및 지역 내 베트남 음식점 핫플레이스로 SNS 후기 다수 공유",
    isPremium: false,
    splitViewerEnabled: false,
    x: 75,
    y: 40
  },
  {
    id: "pc-cafe-exterior-signage",
    title: "PC카페 외부 사이니지",
    category: "유흥시설",
    tagline: "사이버네틱 감성과 화려한 LED 라인발광이 돋보이는 프리미엄 PC카페 파사드 사이니지",
    problem: "기존 상업 건물 2층 전면에 위치하여 주변의 번잡한 간판들에 시선이 묻혔으며, 야간 주요 고객층인 MZ세대와 게이머들의 눈길을 사로잡을 미래지향적이고 강렬한 아이덴티티가 부족했습니다.",
    strategy: [
      "게이밍 하드웨어를 형상화한 다크 네이비 & 메탈릭 실버 베이스의 전면 파사드 구조물.",
      "역동적인 RGB 가변 컬러 라인 조명과 입체 LED 레터링을 결합한 하이테크 감성 연출.",
      "보행자의 시선을 2층으로 자연스럽게 유도하는 돌출 사인 및 계단 입구 연계 웰컴 그래픽 배치."
    ],
    logoText: "CYBER ARENA PC CAFE",
    colors: [
      { name: "Cyber Neon Blue", hex: "#00F0FF" },
      { name: "Mecha Silver", hex: "#9CA3AF" },
      { name: "Dark Void Navy", hex: "#0B0F19" }
    ],
    fontFamily: "Orbitron & Pretendard Bold",
    fontDescription: "미래지향적인 SF 감성과 사이버펑크 무드를 극대화하는 기하학적이고 직선적인 디스플레이 서체.",
    layoutDesc: "건물 2층 전면 윈도우 프레임을 따라 와이드하게 펼쳐지는 가로형 파사드 구조에 중앙 심볼을 강조한 대칭형 비주얼 레이아웃.",
    imgBefore: "/피시2.jpg",
    imgAfter: "/피시1.jpg",
    imgBeforeLabel: "시공 전 파사드 구조 및 외관",
    imgAfterLabel: "PC카페 외부 사이니지 메인 전경",
    detailImages: [
      { id: "pccafe-img-2", url: "/피시2.jpg", label: "매장 진입로 입구 및 사이니지 구조" },
      { id: "pccafe-img-3", url: "/피시3.jpg", label: "야간 LED 점등 및 측면 조명 디테일" }
    ],
    additionalImages: [
      { id: "pccafe-img-2", url: "/피시2.jpg", label: "매장 진입로 입구 및 사이니지 구조" },
      { id: "pccafe-img-3", url: "/피시3.jpg", label: "야간 LED 점등 및 측면 조명 디테일" }
    ],
    result: "리뉴얼 후 야간 시간대 신규 방문객 120% 증가 및 MZ 세대 프리미엄 게이밍 아지트로 입소문 확산",
    isPremium: false,
    splitViewerEnabled: false,
    x: 45,
    y: 65
  },
  {
    id: "bucheon-saemmul-church",
    title: "부천샘물교회 외부사이니지",
    category: "종교시설",
    tagline: "자연친화적인 따뜻한 영성과 은은한 상하부 투광 조명이 조화를 이루는 프리미엄 교회 파사드 사이니지",
    problem: "기존 외벽 간판이 노후화되고 투박하여 주변 도심 경관 속에서 정적인 이미지로 정체되어 있었으며, 성도들과 지역 사회 방문객들이 품격 있고 따뜻하게 마주할 수 있는 현대적이고 영적인 외관 아이덴티티가 필요했습니다.",
    strategy: [
      "자연친화적인 방부목 베이스에 스카시와 알미늄 채널을 조화롭게 배치한 파사드 구조 설계.",
      "상하부 투광기를 적극 사용하여 외벽 질감과 레터링에 은은한 가시성을 더한 라이팅 연출.",
      "건물 진입부 메인 입구와 조화롭게 어우러지는 주간/야간 입체형 브랜딩 사이니지 배치."
    ],
    logoText: "BUCHEON SAEMMUL CHURCH",
    colors: [
      { name: "Natural Wood Warm", hex: "#8B5A2B" },
      { name: "Warm Sanctuary Light", hex: "#FFF8E7" },
      { name: "Sacred Stone Gray", hex: "#4A4A4A" }
    ],
    fontFamily: "Noto Serif & Pretendard Bold",
    fontDescription: "종교적 엄숙함과 품격 있는 정갈함을 담아낸 명조 계열 세리프와 높은 판독성의 모던 산세리프 서체의 조화.",
    layoutDesc: "건물 전면 파사드의 상단 수평축을 중심으로 심볼과 메인 레터링을 조화롭게 배치한 비주얼 레이아웃.",
    imgBefore: "/샘물2.jpg",
    imgAfter: "/샘물1.jpg",
    imgBeforeLabel: "상하부투광기를 활용한 은은한 야간 조명",
    imgAfterLabel: "외부 사이니지 전경",
    detailImages: [
      { id: "saemmul-img-3", url: "/샘물3.jpg", label: "세부디테일 사양" },
      { id: "saemmul-img-4", url: "/샘물4.jpg", label: "지주 및 게시판" }
    ],
    additionalImages: [
      { id: "saemmul-img-3", url: "/샘물3.jpg", label: "세부디테일 사양" },
      { id: "saemmul-img-4", url: "/샘물4.jpg", label: "지주 및 게시판" }
    ],
    result: "시공 후 지역 사회의 따뜻한 영적 랜드마크로 자리매김하며 성도들의 방문 및 만족도 대폭 향상",
    isPremium: false,
    splitViewerEnabled: false,
    x: 60,
    y: 30
  },
  {
    id: "the-philip-hospital",
    title: "더필잎병원 ci 변경 및 내외부 사이니지",
    category: "병원",
    tagline: "따뜻하고 신뢰감 있는 치유의 공간을 완성하는 프리미엄 메디컬 파사드 및 인테리어 사이니지",
    problem: "기존 병원 외관이 복잡한 주변 도심 간판들에 묻혀 시인성이 떨어졌으며, 환자들과 내원객들에게 심리적 안정감과 전문적인 의료 서비스의 신뢰감을 동시에 전달할 수 있는 체계적인 웨이파인딩 및 브랜딩이 필요했습니다.",
    strategy: [
      "청결함과 전문성을 강조하는 메디컬 그린 & 소프트 화이트 베이스의 파사드 구조 설계.",
      "내원객의 진료 동선을 직관적으로 안내하는 체계적인 층별 안내 및 내부 인포그래픽 구축.",
      "눈부심을 최소화한 은은한 간접 LED 조명과 입체 스카시 사인을 조화롭게 배치한 공간 연출."
    ],
    logoText: "THE PHILIP HOSPITAL",
    colors: [
      { name: "Medical Calm Green", hex: "#2E7D32" },
      { name: "Healing Soft White", hex: "#F8FAFC" },
      { name: "Trust Slate Gray", hex: "#475569" }
    ],
    fontFamily: "Pretendard & Montserrat Bold",
    fontDescription: "의료 기관의 높은 신뢰도와 판독성을 보장하는 모던하고 깔끔한 산세리프 기반 디스플레이 서체.",
    layoutDesc: "병원 외부 메인 파사드와 실내 로비 안내 데스크를 연계하여 정돈된 대칭감과 안정감을 주는 비주얼 레이아웃.",
    imgBefore: "/더필잎2.jpg",
    imgAfter: "/더필잎1.jpg",
    imgBeforeLabel: "CI변경 제안",
    imgAfterLabel: "외부 간판 설치",
    detailImages: [
      { id: "philip-img-3", url: "/더필잎3.jpg", label: "외부 입구 시안" },
      { id: "philip-img-4", url: "/더필잎4.jpg", label: "이미지월 변경 설치" },
      { id: "philip-img-5", url: "/더필잎5.jpg", label: "이미지월 변경 시안" },
      { id: "philip-img-6", url: "/더필잎6.jpg", label: "층별안내게시판 시안" },
      { id: "philip-img-7", url: "/더필잎7.jpg", label: "층별안내 행거형 시안" }
    ],
    additionalImages: [
      { id: "philip-img-3", url: "/더필잎3.jpg", label: "외부 입구 시안" },
      { id: "philip-img-4", url: "/더필잎4.jpg", label: "이미지월 변경 설치" },
      { id: "philip-img-5", url: "/더필잎5.jpg", label: "이미지월 변경 시안" },
      { id: "philip-img-6", url: "/더필잎6.jpg", label: "층별안내게시판 시안" },
      { id: "philip-img-7", url: "/더필잎7.jpg", label: "층별안내 행거형 시안" }
    ],
    result: "브랜드 리뉴얼 후 내원 환자 방문 만족도 98% 달성 및 직관적인 안내 체계로 내원객 편의성 대폭 향상",
    isPremium: false,
    splitViewerEnabled: false,
    x: 35,
    y: 75
  },
  {
    id: "other-artworks-collection",
    title: "그외 작품모음",
    category: "기타",
    tagline: "다양한 업종과 공간의 특성을 살린 감각적이고 다채로운 간판 및 디자인 사인 모음",
    problem: "각기 다른 브랜드 고유의 아이덴티티와 공간적 제약 속에서 비즈니스 주목도를 높이고 개성 있는 시각적 포인트를 창출하는 맞춤형 사이니지 솔루션이 필요했습니다.",
    strategy: [
      "업종별 타겟층과 공간 분위기에 맞춘 다채로운 소재 및 컬러 매칭 설계.",
      "시각적 집중도를 높이는 직관적인 타이포그래피 및 라이팅 연출.",
      "브랜드 개성을 극대화하는 맞춤형 오브제 제작 및 정밀 시공."
    ],
    logoText: "VARIOUS SIGNAGE WORKS",
    colors: [
      { name: "Modern Chrome", hex: "#4A5568" },
      { name: "Accent Light", hex: "#E2E8F0" },
      { name: "Deep Solid Gray", hex: "#1A202C" }
    ],
    fontFamily: "Montserrat & Oswald & Pretendard",
    fontDescription: "영문 메인 로고 타이포그래피와 한글 서브 타이틀에 최적화된 높은 균형감의 서체 조화.",
    layoutDesc: "다양한 규격과 서체를 활용한 브랜드 공간 맞춤형 비주얼 레이아웃.",
    imgBefore: "/기타1.jpg",
    imgBeforeLabel: "그외 작품모음 대표 전경",
    imgAfter: "/기타1.jpg",
    imgAfterLabel: "그외 작품모음 대표 전경",
    detailImages: [
      { id: "other-img-1", url: "/기타2.jpg", label: "작품1" },
      { id: "other-img-2", url: "/기타3.jpg", label: "작품2" },
      { id: "other-img-3", url: "/기타4.jpg", label: "작품3" },
      { id: "other-img-4", url: "/기타5.jpg", label: "작품4" },
      { id: "other-img-5", url: "/기타6.jpg", label: "작품5" },
      { id: "other-img-6", url: "/기타7.jpg", label: "작품6" },
      { id: "other-img-7", url: "/기타8.jpg", label: "작품7" },
      { id: "other-img-8", url: "/기타9.jpg", label: "작품8" },
      { id: "other-img-9", url: "/기타10.gif", label: "작품9" },
      { id: "other-img-10", url: "/기타11.jpg", label: "작품10" },
      { id: "other-img-11", url: "/기타12.jpg", label: "작품11" },
      { id: "other-img-12", url: "/기타13.jpg", label: "작품12" },
      { id: "other-img-13", url: "/기타14.jpg", label: "작품13" },
      { id: "other-img-14", url: "/기타15.jpg", label: "작품14" },
      { id: "other-img-15", url: "/기타16.jpg", label: "작품15" }
    ],
    additionalImages: [
      { id: "other-img-1", url: "/기타2.jpg", label: "작품1" },
      { id: "other-img-2", url: "/기타3.jpg", label: "작품2" },
      { id: "other-img-3", url: "/기타4.jpg", label: "작품3" },
      { id: "other-img-4", url: "/기타5.jpg", label: "작품4" },
      { id: "other-img-5", url: "/기타6.jpg", label: "작품5" },
      { id: "other-img-6", url: "/기타7.jpg", label: "작품6" },
      { id: "other-img-7", url: "/기타8.jpg", label: "작품7" },
      { id: "other-img-8", url: "/기타9.jpg", label: "작품8" },
      { id: "other-img-9", url: "/기타10.gif", label: "작품9" },
      { id: "other-img-10", url: "/기타11.jpg", label: "작품10" },
      { id: "other-img-11", url: "/기타12.jpg", label: "작품11" },
      { id: "other-img-12", url: "/기타13.jpg", label: "작품12" },
      { id: "other-img-13", url: "/기타14.jpg", label: "작품13" },
      { id: "other-img-14", url: "/기타15.jpg", label: "작품14" },
      { id: "other-img-15", url: "/기타16.jpg", label: "작품15" }
    ],
    result: "다양한 맞춤형 사이니지 솔루션 제공을 통해 각 브랜드의 시각적 경쟁력 및 고객 인지도 향상",
    isPremium: false,
    splitViewerEnabled: false,
    x: 80,
    y: 80
  }
];



export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    title: "현장실측",
    subtitle: "STREET ANALYSIS & LASER MEASUREMENT",
    desc: "현장 외장재 성분 파악, 외장재 타일 크기를 이용한 실측 적용, 추가적인 레이저 실측 및 사다리/크레인 사용을 통해 오차 없는 정밀 데이터를 도출합니다.",
    details: [
      "현장 외장재 성분 파악 및 고정 부위 구조 확인",
      "외장재 타일 크기를 이용한 규격 실측 정밀 적용",
      "추가적인 레이저 실측 및 사다리/크레인 사용을 통한 고소 부위 체크"
    ]
  },
  {
    id: 2,
    title: "컨셉 및 브랜드화 시안",
    subtitle: "CONCEPT DEVELOPMENT & 3D RENDERING",
    desc: "공간의 역사성과 브랜드 본질을 조립하여 폰트 에디팅, 맞춤 일러스트, 입체 두께(D) 시안을 가상 환경에 올립니다.",
    details: [
      "한글 및 영문 폰트 자간/두께 미세 모디파이 커스텀 서체 설계",
      "실제 건물 텍스처와 등색 맵을 복사해 주간/야간 전구색 온도 대비 3D 렌더 제공",
      "우면/좌면/보행 등 각 동선별 동선 조감도 및 시인거리별 가독 점수 진단표 산출"
    ]
  },
  {
    id: 3,
    title: "재료매칭",
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
    title: "자재가공",
    subtitle: "CNC PRECISION MANUFACTURING",
    desc: "플렉스 프레임, 갈바절곡, 스텐절곡, 아크릴 등 용접 및 레이저 가공을 하여 설계한 대로 시공일정에 맞춰 준비합니다.",
    details: [
      "부식 방지를 위한 친환경 정전식 분체 열처리 특수 외장 코팅 적용",
      "금속 접합부 아르곤 고정밀 용접 및 흠집 소거용 헤어라인 샌딩 마무리 공정",
      "IP67 방수성 보강 회로 설계로 장마철 수분 및 습기 누전 완벽 방어 수립"
    ]
  },
  {
    id: 5,
    title: "고소장비 사용 및 설치",
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
  { 
    name: "일러스트 (Adobe Illustrator)", 
    level: 98,
    desc: "색상설정, 컨셉도출 아이디어 설계, 현장사진을 이용한 3D 시뮬레이션 도출"
  },
  { 
    name: "포토샵 (Adobe Photoshop)", 
    level: 98,
    desc: "3D 시뮬레이션 라이팅, 배경 수정, 왜곡된 사진의 평면화, 생략, 삽입 컨셉에 다가가는 다양한 표현"
  }
];

export const CERTIFICATIONS: Certification[] = [];
