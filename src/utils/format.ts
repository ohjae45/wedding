const WEEKDAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];
const WEEKDAYS_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

/** 2026. 10. 03 */
export function formatDotDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${d}`;
}

/** 2026년 10월 3일 토요일 */
export function formatFullKoDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAYS_KO[date.getDay()]}요일`;
}

/** 오후 1시 20분 */
export function formatKoTime(date: Date): string {
  const h = date.getHours();
  const meridiem = h < 12 ? '오전' : '오후';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const min = date.getMinutes();
  return min === 0 ? `${meridiem} ${h12}시` : `${meridiem} ${h12}시 ${min}분`;
}

/** SAT */
export function weekdayEn(date: Date): string {
  return WEEKDAYS_EN[date.getDay()];
}

/** PM 1:20 */
export function formatEnTime(date: Date): string {
  const h = date.getHours();
  const meridiem = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${meridiem} ${h12}:${min}`;
}

export { WEEKDAYS_KO };
