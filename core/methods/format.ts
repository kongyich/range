// 格式化日期格式

import { formatNumber, judge_type } from "../utils/basic"

/**
 * @param { date } year xxxx-xx-xx xx:xx:xx / Date
 * @param { string } format any
 * @return { string }
 */

type TYPE_FORMAT = (date: string | Date, format: string) => string
export const format: TYPE_FORMAT = function (date, format) {
  let date_obj: Date
  if (judge_type(date) === 'string') {
    date_obj = new Date(date)
  } else if (judge_type(date) === 'date') {
    date_obj = date as Date
  }

  return format.replace(/(yyyy)|(M)|(MM)|(d)|(dd)|(H)|(HH)|(m)|(mm)|(s)|(ss)/g, function (val) {
    if (val === 'yyyy') {
      return date_obj.getFullYear().toString()
    } else if (val === 'M') {
      return (date_obj.getMonth() + 1).toString()
    } else if (val === 'MM') {
      return formatNumber(date_obj.getMonth() + 1)
    } else if (val === 'd') {
      return date_obj.getDate().toString()
    } else if (val === 'dd') {
      return formatNumber(date_obj.getDate())
    } else if (val === 'H') {
      return date_obj.getHours().toString()
    } else if (val === 'HH') {
      return formatNumber(date_obj.getHours())
    } else if (val === 'm') {
      return date_obj.getMinutes().toString()
    } else if (val === 'mm') {
      return formatNumber(date_obj.getMinutes())
    } else if (val === 's') {
      return date_obj.getSeconds().toString()
    } else if (val === 'ss') {
      return formatNumber(date_obj.getSeconds())
    } else {
      return ''
    }
  })
}
