
// 获取第几周
// from：yyyy   yyyy-mm

import { judge_type, simple_format } from "../utils/basic"
import { getWeeks } from "../utils/week"

// is_first
export const weekNo = function(date: string | Date, from: string, is_first: boolean = false) {

  date = judge_type(date) === 'string' ? new Date(date) : date
  let date_obj: Date = date as Date

  
  let weks: object = {}
  if(from === 'yyyy') {
    weks = getWeeks.run(date_obj.getFullYear())
  } else if(from === 'yyyy-mm') {
    weks = getWeeks.run(date_obj.getFullYear(), date_obj.getMonth() + 1)
  }

  let wek_ary = Object.values(weks)
  let index = -1
  if(!is_first) {
    if(wek_ary[0].length < 7) {
      wek_ary.splice(0, 1)
    }
  } 
  wek_ary.forEach((item, i) => {
    if(item.includes(simple_format(date_obj))) {
      index = i - 1
    }
  })

  return index
}
