function padTime(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

export function minutes(miliseconds: number) {
  if (miliseconds < 0) return '00:00'
  const ceil = Math.ceil(miliseconds / 1000)
  const hours = Math.floor(ceil / 3600)
  const minutes = Math.floor((ceil - (hours * 3600)) / 60)
  const seconds = ceil % 60
  return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`
}