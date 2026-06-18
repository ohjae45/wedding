import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  /** 예식일이 지났는지 */
  isPast: boolean;
}

function diff(target: Date): Countdown {
  const now = Date.now();
  const delta = target.getTime() - now;
  if (delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const totalSeconds = Math.floor(delta / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  };
}

/** 예식일까지 남은 시간을 1초마다 갱신합니다. */
export function useCountdown(target: Date): Countdown {
  const [countdown, setCountdown] = useState<Countdown>(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setCountdown(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return countdown;
}
