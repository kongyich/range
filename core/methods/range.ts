// 获取时间范围

import { getYear, getMonth, getWeek } from "../utils/based"
import { get_ym_range } from '../utils/range'
import type { TYPE_RANGE } from "../types/range"

/**
 * @param { object } options {}
 * @param { scope } scope 'year' | 'month' | 'week'
 * @param { target } target 'year' | 'month' | 'week' | 'day'
 * @param { string } start_date xxxx-xx-xx xx:xx:xx
 * @param { number | string } end_date xxxx-xx-xx xx:xx:xx / number
 * @return { object } 
 */


export const range: TYPE_RANGE = function (options) {

  const fn_target = {
    'year': getYear,
    'month': getMonth
  }

  let { scope, target, start_date, end_date } = options
  let date_obj = new Date(start_date)

  switch (scope) {
    case 'year':
    case 'month':
      if (end_date) {
        if (typeof end_date === 'number') {
          let end_year = fn_target[scope](date_obj, end_date, 'yyyy-MM-dd')

          end_date = end_year as string
        } else if (typeof end_date === 'string') {
          // 格式化日期
          let end_date_obj = new Date(end_date)
          end_date = `${end_date_obj.getFullYear()}-${end_date_obj.getMonth() + 1}-${end_date_obj.getDate()}`
        }
      } else {
        end_date = `${date_obj.getFullYear()}-12-31`
      }

      return get_ym_range(target, start_date, end_date)
    case 'week':

      if (!end_date) end_date = `${date_obj.getFullYear()}-12-31`
      if (typeof end_date === 'number') {
        let end = getWeek(date_obj, end_date, 'yyyy-MM-dd') as string
        return get_ym_range(target, start_date, end)

      } else if (typeof end_date === 'string') {
        return get_ym_range(target, start_date, end_date)
      }
      break
  }

  return []
}




// 待开发
// is_pane 是否展开 0
// is_first 周 是否计算不满7天的日期 0
// use_cn 是否使用中文描述 0
