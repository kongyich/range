type Type_getDay = (now_day: Date, dis: number) => Array<number>

export const getDay: Type_getDay = function(now_day, dis) {
  if(dis === 0) {
    return [now_day.getFullYear(), now_day.getMonth()+1, now_day.getDate()]
  }

  if(dis < 0) {
    dis = Math.abs(dis)
    now_day.setTime(now_day.getTime() - ((24 * 60 * 60 * 1000) * dis));
  } else {
    now_day.setTime(now_day.getTime() + ((24 * 60 * 60 * 1000) * dis));
  }

  return  [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate()]
}
