
import { json } from "stream/consumers"
import { get_replace_date } from "../utils/basic"
import { date_parse } from "../utils/format"

type TYPE_FORMAT = (date: any, format: string, adz: boolean) => object

export const format: TYPE_FORMAT = function(date, format, adz=true) {

  // 时间对象
  if(date instanceof Date) {
    console.log(get_replace_date(date, format))
  } else {

    //  else {
      // 解析字符串 -> 对象数据结构

    let date_ary = date_parse(date, adz)

    // if(Array.isArray(date_ary) && date_ary.length !== 0) {
    //   console.log(get_replace_date(date_ary, format, adz))
    // }
    // }
    
  }

  // console.log(date, format)
  
  return {}
}
