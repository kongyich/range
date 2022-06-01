import { getYear, getMonth, getWeek }  from "../utils/based"
import { get_ym_range } from '../utils/range'


interface TYPE_DATE {
  start_date: string,
  end_date?: number | string
}

interface TYPE_TYPE {
  scope: 'year' | 'month' | 'week',
  target: 'year' | 'month' | 'week' | 'day'
}

interface YEAR {
  [key: number]: YEAR_OBJ
}
interface D_YEAR {
  [key: number]: string[]
}
interface YEAR_OBJ {
  [key: number]: string[]
}


// is_pane 是否展开
// is_first 周 是否计算不满7天的日期
// use_cn 是否使用中文描述

type TYPE_RANGE = (types: TYPE_TYPE, dates: TYPE_DATE) => YEAR | D_YEAR

export const range: TYPE_RANGE  = function(types, dates) {
  const fn_target = {
    'year': getYear,
    'month': getMonth
    }

    let { start_date, end_date } = dates
    let date_obj = new Date(start_date)


    switch(types.scope) {
      case 'year':
      case 'month':
          if (end_date) {
              if (typeof end_date === 'number') {
                  let end_year = fn_target[types.scope](date_obj, end_date, 'yyyy-MM-dd')

                  end_date = end_year as string
              } else if (typeof end_date === 'string') {
                  // 格式化日期
                  let end_date_obj = new Date(end_date)
                  end_date = `${end_date_obj.getFullYear()}-${end_date_obj.getMonth() + 1}-${end_date_obj.getDate()}`
              }
          } else {
              end_date = `${date_obj.getFullYear()}-12-31`
          }

          return get_ym_range(types.target, start_date, end_date)
      case 'week':

          if(!end_date) end_date = `${date_obj.getFullYear()}-12-31`

          if(typeof end_date === 'number') {
              let end = getWeek(date_obj, end_date, 'yyyy-MM-dd') as string
              console.log(get_ym_range(types.target, start_date, end), '990000')
              
          } else if(typeof end_date === 'string') {
              return get_ym_range(types.target, start_date, end_date)
          }
          break
  }


  return []
}
