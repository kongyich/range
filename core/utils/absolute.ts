import { formatNumber, getDays } from "./basic"
import { getYear, getMonth, getWeek, getDay, getHour, getMinute } from "./based"
import { getWeeks } from "./week"


interface Params_deal_targetDate {
  scope_type: string,
  scope_date: string,
  is_order: boolean,
  target_type: string,
  target_num: number
}
type Type_deal_targetDate = (options: Params_deal_targetDate) => string




// 处理target子集
export const deal_targetDate: Type_deal_targetDate = function (options) {

  let { scope_type, scope_date, is_order, target_type, target_num } = options

  switch (target_type) {
      case 'year':
          throw new Error('The type expected to be converted should not be passed into the year!')
      case 'month':
          if (scope_type === 'year') {
              let date, data_params
              data_params = `${scope_date}-${is_order ? target_num : (12 - target_num)}`
             
              date = new Date(data_params)
              return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}`
              
          } else {
              throw new Error('The original type should contain the type expected to be converted!')
          }
      case 'week':
          if (scope_type === 'year' || scope_type === 'month') {
            let date = new Date(scope_date)
            let deal_date = scope_type === 'year' ? date.getFullYear().toString() : `${date.getFullYear()}-${date.getMonth()+1}`

            return get_targetWeekData(deal_date, target_num, is_order)
          } else {
              throw new Error('The original type should contain the type expected to be converted!')
          }
      case 'day':
          if (scope_type === 'year' || scope_type === 'month') {
              let date = new Date(`${scope_date}`)
              if (is_order) {
                  date.setTime(date.getTime() + ((24 * 60 * 60 * 1000) * (target_num - 1)))
                  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              } else {
                  date = choice_get(scope_type, date) as Date
                  date.setTime(date.getTime() - ((24 * 60 * 60 * 1000) * target_num))
                  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
              }
          } 
          // else if (scope_type === 'week') {
          //     let date = generate_weekDate(scope_date, target_type, target_num, is_order)
          //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          // } 
          else {
              throw new Error('The original type should contain the type expected to be converted!')
          }

      case 'hour':
          if (scope_type === 'minute' || scope_type === 'second') {
              throw new Error('The original type should contain the type expected to be converted!')
          } else {
              if (scope_type === 'year' || scope_type === 'month' || scope_type === 'day') {
                  let date = new Date(`${scope_date}`)
                  if (is_order) {
                      date.setTime(date.getTime() + ((60 * 60 * 1000) * (target_num - 1)))
                      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}`
                  } else {
                      date = choice_get(scope_type, date) as Date
                      date.setTime(date.getTime() - ((60 * 60 * 1000) * target_num))
                      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}`
                  }
              } 
              // else if (scope_type === 'week') {
              //     let date = generate_weekDate(scope_date, target_type, target_num, is_order)
              //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
              // }
          }
      case 'minute':
          if (scope_type === 'second') {
              throw new Error('The original type should contain the type expected to be converted!')
          } else {
              if (scope_type === 'year' || scope_type === 'month' || scope_type === 'day' || scope_type === 'hour') {
                  let date = new Date(`${scope_date}`)
                  if (is_order) {
                      date.setTime(date.getTime() + ((60 * 1000) * (target_num - 1)))
                      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                  } else {
                      date = choice_get(scope_type, date) as Date
                      date.setTime(date.getTime() - ((60 * 1000) * target_num))
                      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                  }
              } 
              // else if (scope_type === 'week') {
              //     let date = generate_weekDate(scope_date, target_type, target_num, is_order)
              //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
              // }
          }
      case 'second':
          if (scope_type === 'year' || scope_type === 'month' || scope_type === 'day' || scope_type === 'hour' || scope_type === 'minute') {

              let date = new Date(`${scope_date}`)
              if (is_order) {
                  date.setTime(date.getTime() + (1000 * (target_num - 1)))
                  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
              } else {
                  date = choice_get(scope_type, date) as Date
                  date.setTime(date.getTime() - 1000 * target_num)
                  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}-${date.getMinutes()}:${date.getSeconds()}`
              }
          } 
          // else if (scope_type === 'week') {
          //     let date = generate_weekDate(scope_date, target_type, target_num, is_order)
          //     return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
          // }
  }
  return ''
}


const get_targetWeekData = function(date: string, num: number, is_order: boolean) {
    let [year, month] = date.split('-').map(d=>Number(d))
    //   let weeks_ary: String[] = [];

      if (!month) {
        // weeks_ary = Object.values(getWeeks.run(year))
      } else {
        get_mons(year, month, num, is_order)
        // weeks_ary = Object.values(getWeeks.run(year, month))
      }
    
    
    //   if (weeks_ary[0].length < 7) {
    //     weeks_ary.splice(0, 1)
    //   }
    //   let i = num % weeks_ary.length
    //   if (i === 0) i = weeks_ary.length
    
    //   if(!is_order) {
    //     weeks_ary = weeks_ary.reverse()
    //   } 
    //   i = i - 1
    //   return weeks_ary[i][0]
    return ''
}

// 获取月粒度的指定周
const get_mons = function(year: number, month: number, num: number, is_order: boolean) {
    let days = getDays(year, month)
    let first_mon = 1
    let res = 1

    if(is_order) {
        for(let d = 1; d < days; d++) {
            if(new Date(`${year}-${month}-${d}`).getDay() === 1) {
                first_mon = d
                break
            }
    
        }

        res = first_mon

        while(--num) {
            res += 7
            if(res > days) {
                res = first_mon
            }
        }
    } else {
        for(let d = days; d > 1; d--) {
            if(new Date(`${year}-${month}-${d}`).getDay() === 1) {
                first_mon = d
                break
            }
    
        }

        res = first_mon

        while(--num) {
            res -= 7
            if(res < 0) {
                res = first_mon
            }
        }
    }
    

    console.log(res, 'pppppp')
    return res
}






interface FN_ENABLE {
    [key: string]: Function, // 字段扩展声明
};

let FN_MAP: FN_ENABLE = {
    'year': getYear,
    'month': getMonth,
    'day': getDay,
    'hour': getHour,
    'minute': getMinute
}

// 处理
const choice_get = function (scope_type: string, date: Date) {
    return new Date(FN_MAP[scope_type](date, 1, 'yyyy-MM-dd HH:mm:ss') as string)
}
