import { getDate_format, getDays } from "./basic"


type Type_getNumDate = (now_day: Date, dis: number, format: string | Function | undefined) => string | number[]
// 获取指定数字的年
export const getYear: Type_getNumDate = function (now_day, dis, format) {
  let date_ary = [now_day.getFullYear() + dis]
  if (format) {
      now_day = new Date(`${date_ary}-${now_day.getMonth() + 1}-${now_day.getDate()}`)
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}

// 获取指定数字的月数
export const getMonth: Type_getNumDate = function (now_day, dis, format) {
  // if(typeof now_day === 'string') now_day = new Date(now_day)
  //8      -5
  let mon = (now_day.getMonth() + 1)
  let num = 0
  let mon_num = 0

  let end_num = mon + dis
  if (end_num < mon) [end_num, mon] = [mon, end_num]

  for (let i = mon; i < end_num; i++) {
      if (i > 12) {
          i = 1
          end_num = end_num - 12
      }
      mon_num += getDays(now_day.getFullYear(), i)
  }

  if (dis > 0) {
      num = now_day.getTime() + (mon_num * (24 * 60 * 60 * 1000))
  } else {
      num = now_day.getTime() - (mon_num * (24 * 60 * 60 * 1000))
  }

  now_day.setTime(num);
  let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1)]

  if (format) {
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}

// 获取指定数字的周数
export const getWeek: Type_getNumDate = function (now_day, dis, format) {
  let day_num = 24 * 60 * 60 * 1000
  let now_week_num = (now_day.getDay() === 0 ? 7 : now_day.getDay()) - 1

  let diff_num = dis * (day_num * 7)
  now_day.setTime((now_day.getTime() - (day_num * now_week_num)) + diff_num);

  let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate()]

  if (format) {
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}

// 获取指定数字的天数
export const getDay: Type_getNumDate = function (now_day, dis, format) {
  now_day.setTime(now_day.getTime() + ((24 * 60 * 60 * 1000) * dis));

  let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate()]
  if (format) {
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}

// 获取指定数字的小时数
export const getHour: Type_getNumDate = function (now_day, dis, format) {
  now_day.setTime(now_day.getTime() + ((60 * 60 * 1000) * dis));
  let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate(), now_day.getHours(), now_day.getMinutes(), now_day.getSeconds()]

  if (format) {
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}

// 获取指定数字的分钟数
export const getMinute: Type_getNumDate = function (now_day, dis, format) {
  now_day.setTime(now_day.getTime() + ((60 * 1000) * dis));
  let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate(), now_day.getHours(), now_day.getMinutes(), now_day.getSeconds()]

  if (format) {
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}


// 获取指定数字的秒数
export const getSecond: Type_getNumDate = function (now_day, dis, format) {
  now_day.setTime(now_day.getTime() + (1000 * dis));

  let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate(), now_day.getHours(), now_day.getMinutes(), now_day.getSeconds()]
  if (format) {
      return getDate_format(now_day, date_ary, format)
  }
  return date_ary
}
