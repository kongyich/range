// 获取基于本日及特定日期的日期

import { getYear, getMonth, getWeek, getDay, getHour, getMinute, getSecond, } from "../utils/based"
import type { TYPE_BASED } from "../types/based"
 
/**
 * @param {string} type
 * @param {number} distance
 * @param {string | function} format
 * @return {any}
 */

export const based: TYPE_BASED = function (options) {
  // 解构参数
  let { type, date, distance, format } = options
  // 判断date是否为字符串，格式化字符串日期
  const now_day: Date = date ? typeof date === 'string' ? new Date(date) : date : new Date()

  // 处理未传入distance，但是传入了format的情况
  if (typeof distance === 'string' || typeof distance === 'function') {
      format = distance
      distance = undefined
  }

  // 处理distance未传入的情况，默认为0
  distance = distance || 0

  // type -> function 映射
  let map_fn = {
      'second': getSecond,
      'minute': getMinute,
      'hour': getHour,
      'day': getDay,
      'week': getWeek,
      'month': getMonth,
      'year': getYear
  }

  // 根据不同的类型，调用不同日期的处理函数
  return map_fn[type](now_day, distance, format)
}
