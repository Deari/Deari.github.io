export function leftpad(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return String(num);
}

export function formatTime(time) {
  const h = (time / 3600) >> 0;
  const m = ((time%3600) / 60) >> 0;
  const s = time%60;

  return [
    leftpad(h),
    leftpad(m),
    leftpad(s)
  ].join(':');
}