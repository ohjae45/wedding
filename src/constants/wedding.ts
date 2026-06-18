// =============================================================
// 청첩장 데이터 — 실제 정보로 이 파일만 교체하면 전체 화면에 반영됩니다.
// 이름/부모님/계좌/연락처 등은 모두 예시(placeholder) 값입니다.
// =============================================================

export interface Person {
  /** 성 (예: 김) */
  lastName: string;
  /** 이름 (예: 민준) */
  firstName: string;
  /** 영문 이름 (커버 표기용, 선택) */
  englishName?: string;
  /** 관계 표기 (장남/차남/장녀/차녀 등) */
  relation: string;
}

export interface Parent {
  father: string;
  mother: string;
}

export interface Account {
  /** 표시 라벨 (예: 신랑) */
  label: string;
  bank: string;
  number: string;
  holder: string;
  /** 카카오페이 송금 링크 (있으면 버튼 노출) */
  kakaopayUrl?: string;
}

export interface Contact {
  label: string;
  name: string;
  tel: string;
}

export const GROOM: Person = {
  lastName: '오',
  firstName: '재환',
  englishName: 'Jaehwan Oh',
  relation: '장남',
};

export const BRIDE: Person = {
  lastName: '송',
  firstName: '유라',
  englishName: 'Yura Song',
  relation: '장녀',
};

export const GROOM_PARENTS: Parent = { father: '故 오진천', mother: '이래옥' };
export const BRIDE_PARENTS: Parent = { father: '이아버지', mother: '최어머니' };

/** 예식 일시: 2026년 10월 3일(토) 오후 1시 20분 */
export const WEDDING_DATE = new Date(2026, 9, 3, 13, 20); // month 는 0-base (9 = 10월)

export const VENUE = {
  name: '분당앤스퀘어',
  hall: '4층', // 정확한 홀명이 있으면 교체 (예: 4층 그랜드홀)
  address: '경기 성남시 분당구 탄천상로151번길 20 4층',
  tel: '031-728-5300',
  /** 지도 좌표 — 임베드 지도 연동 시 사용 (추후 정확한 값 입력) */
  lat: 0,
  lng: 0,
};

/** 오시는 길 안내 (지하철 출구·소요시간 등 세부는 확정 후 업데이트) */
export const DIRECTIONS = [
  { label: '지하철', desc: '수인·분당선 오리역 인근 · 신분당선 동천역 인근' },
  { label: '버스', desc: '오리역 정류장 하차 (노선은 확정 후 안내)' },
  { label: '자가용', desc: '내비게이션에 "분당앤스퀘어" 또는 "탄천상로151번길 20" 검색' },
  { label: '주차', desc: '건물 주차장 이용 (주차 안내는 확정 후 업데이트)' },
];

/** 인사말 */
export const GREETING = {
  poem: ['서로가 마주보며 다져온 사랑을', '이제 함께 한 곳을 바라보며', '걸어가고자 합니다.'],
  body: [
    '저희 두 사람이 사랑과 믿음으로',
    '하나가 되는 자리에 귀한 걸음 하시어',
    '축복해 주시면 더없는 기쁨으로',
    '간직하겠습니다.',
  ],
};

/** 마음 전하실 곳 — 신랑측 부모님 계좌는 추후 추가 예정 */
export const GROOM_ACCOUNTS: Account[] = [
  { label: '신랑', bank: '농협', number: '207054-56-356055', holder: '오재환' },
];

export const BRIDE_ACCOUNTS: Account[] = [
  { label: '신부', bank: '○○은행', number: '000-0000-0000-00', holder: '송유라' },
  { label: '신부 아버지', bank: '○○은행', number: '000-0000-0000-00', holder: '이아버지' },
  { label: '신부 어머니', bank: '○○은행', number: '000-0000-0000-00', holder: '최어머니' },
];

/** 혼주 / 신랑신부 연락처 */
export const CONTACTS: Contact[] = [
  { label: '신랑', name: '오재환', tel: '010-2079-4542' },
  { label: '신부', name: '송유라', tel: '010-0000-0000' },
];

/** 갤러리 이미지 개수 (실제 이미지 준비 전, placeholder 개수) */
export const GALLERY_COUNT = 9;

/** ABOUT US — 신랑/신부 소개 카드 */
export interface Profile {
  /** 역할 라벨 (신랑/신부) */
  role: string;
  name: string;
  /** 소개 문구 (줄 단위) */
  lines: string[];
}

export const ABOUT = {
  intro: ['평생을 함께할 두 사람,', '서로를 소개합니다.'],
  groom: {
    role: '신랑',
    name: '오재환',
    lines: ['언제나 든든한 사람,', '한결같은 미소로 곁을 지키는', 'OO년생 재환입니다.'],
  } as Profile,
  bride: {
    role: '신부',
    name: '송유라',
    lines: ['작은 것에도 행복을 찾는,', '따뜻한 마음을 가진', 'OO년생 유라입니다.'],
  } as Profile,
};

/** OUR TIMELINE — 두 사람의 이야기 */
export interface TimelineItem {
  date: string;
  title: string;
  desc: string;
}

export const TIMELINE: TimelineItem[] = [
  { date: '2021. 03', title: '첫 만남', desc: '봄날, 우연한 만남으로 인연이 시작되었어요.' },
  { date: '2021. 07', title: '연애 시작', desc: '서로의 마음을 확인하고 함께 걷기 시작했어요.' },
  { date: '2025. 12', title: '프로포즈', desc: '평생을 함께하자는 약속을 나눴어요.' },
  { date: '2026. 10', title: '결혼식', desc: '이제 부부가 되어 새로운 시작을 함께합니다.' },
];
