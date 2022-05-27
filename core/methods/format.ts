
import { get_replace_date } from "../utils/basic"
import { date_parse } from "../utils/format"

type TYPE_FORMAT = (date: string | Date, format: string, adz: boolean) => object

export const format: TYPE_FORMAT = function(date, format, adz=true) {

  if(typeof date !== "string") {
    console.log(get_replace_date(date, format))
  } else {
    // 解析字符串 -> 对象数据结构

    let date_ary = date_parse(date, adz)

    if(Array.isArray(date_ary)) {
      console.log(get_replace_date(date_ary, format, adz))
    }


    
  }

  console.log(date, format)
  
  return {}
}
