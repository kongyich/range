// 获取指定日期位于 （指定年/年-月）的第几周

import { judge_type, simple_format } from "../utils/basic"
import { getWeeks } from "../utils/week"

/**
 * @param { string | Date } date xxxx-xx-xx xx:xx:xx / Date
 * @param { string } from yyyy / yyyy-mm
 * @param { boolean } is_first true / false
 * @return { number }
 */

type TYPE_WEEKNO = (date: string | Date, from: string, is_first: boolean) => number

export const weekNo: TYPE_WEEKNO = function (date, from, is_first = false) {

  date = judge_type(date) === 'string' ? new Date(date) : date
  let date_obj: Date = date as Date

  let weks: object = {}
  if (from === 'yyyy') {
    weks = getWeeks.run(date_obj.getFullYear())
  } else if (from === 'yyyy-mm') {
    weks = getWeeks.run(date_obj.getFullYear(), date_obj.getMonth() + 1)
  }

  let wek_ary = Object.values(weks)
  let index = -1
  if (!is_first) {
    if (wek_ary[0].length < 7) {
      wek_ary.splice(0, 1)
    }
  }
  wek_ary.forEach((item, i) => {
    if (item.includes(simple_format(date_obj))) {
      index = i - 1
    }
  })

  return index
}
