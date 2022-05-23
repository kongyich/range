import { getYear, getMonth, getWeek, getDay, getHour, getMinute, getSecond, } from "../utils/based"

/**
 * @param {string} type
 * @param {number} distance
 * @param {string | function} format
 * @return {any}
 */

// type Type_params = typeof dateType
type TYPE_DATE = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
interface TYPE_BASED_OPTIONS {
    type: TYPE_DATE,
    date?: string | Date,
    distance?: number,
    format?: string | Function
}
type TYPE_BASED = (options:TYPE_BASED_OPTIONS) => any


// 获取基于本日及特定日期的日期
export const based: TYPE_BASED = function (options) {

  let { type, date, distance, format } = options
  const now_day: Date = date ? typeof date === 'string' ? new Date(date) : date : new Date()

  if (typeof distance === 'string' || typeof distance === 'function') {
      format = distance
      distance = undefined
  }

  distance = distance || 0
  let result: string | number[]

  switch (type) {
      case 'second':
          result = getSecond(now_day, distance, format)
          break
      case 'minute':
          result = getMinute(now_day, distance, format)
          break
      case 'hour':
          result = getHour(now_day, distance, format)
          break
      case 'day':
          result = getDay(now_day, distance, format)
          break
      case 'month':
          result = getMonth(now_day, distance, format)
          break
      case 'year':
          result = getYear(now_day, distance, format)
          break
      case 'week':
          result = getWeek(now_day, distance, format)
          break;
  }

  console.log(result, '<----result')
  return result
}
