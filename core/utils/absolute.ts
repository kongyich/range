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
          else if (scope_type === 'week') {
            let date = new Date(`${scope_date}`)
            get_belong_weeks(date, target_num, is_order)
            //   let date = generate_weekDate(scope_date, target_type, target_num, is_order)
            //   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          } 
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




const get_belong_weeks = function(date: Date, num: number, is_order: boolean) {
    let l_date = date
    let day = date.getDay()
    let weks: string[] = [simple_format(date)]
    if(day === 1) {
        let be_date
        for(let i = 1; i < 7; i++) {
            be_date =  new Date(date.getTime()+computed_week(1))
            weks.push(`${simple_format(be_date)}`)
            date = be_date
        }
    } else if(day === 0) {
        let be_date

        for(let i = 1; i < 7; i++) {
            be_date =  new Date(date.getTime()-computed_week(1))
            weks.unshift(`${simple_format(be_date)}`)
            date = be_date
        }
    } else {
        let be_date
        for(let i = 1; i < day; i++) {
            be_date =  new Date(date.getTime()-computed_week(1))
            weks.unshift(`${simple_format(be_date)}`)
            date = be_date
        }

        date = l_date

        for(let i = day; i < 7; i++) {
            be_date =  new Date(date.getTime()+computed_week(1))
            weks.push(`${simple_format(be_date)}`)
            date = be_date
        }
    }
    console.log(weks)
}


const computed_week = (num: number) => 1000 * 60 * 60 * 24 * num

const simple_format = function(date: Date) {
    return `${date.getFullYear()}-${formatNumber(date.getMonth()+1)}-${formatNumber(date.getDate())}`
}


// // 生成week日期对象
// const generate_weekDate = function (scope_date: string, target_type: string, target_num: number, is_order: boolean): Date {
//     let date = new Date(scope_date)
//     let weeks_ary = GETWEEKS.run(date.getFullYear(), date.getMonth() + 1)
//     let be_weeks = getBelongWeeks(weeks_ary, scope_date)
//     console.log(be_weeks, '<----be_weeks')
//     let time_num = 0
//     switch (target_type) {
//         case 'day':
//             time_num = (24 * 60 * 60 * 1000)
//             break
//         case 'hour':
//             time_num = (60 * 60 * 1000)
//             break
//         case 'minute':
//             time_num = 60 * 1000
//             break
//         case 'second':
//             time_num = 1000
//             break
//     }

//     if (is_order) {
//         date = new Date(`${be_weeks[0]} 00:00:00`)
//         date.setTime(date.getTime() + (time_num * (target_type === 'day' ? (target_num - 1) : target_num)))
//     } else {
//         date = new Date(`${be_weeks[be_weeks.length - 1]} 00:00:00`)
//         date.setTime(date.getTime() - (time_num * target_num))
//     }
//     return date
// }








// 处理年月粒度下的周
const get_targetWeekData = function(date: string, num: number, is_order: boolean) {
    let [year, month] = date.split('-').map(d=>Number(d))
      if (!month) {
        return get_year_from_day(year, num, is_order)
      } else {
        return get_month_from_day(year, month, num, is_order)
      }
}

// 获取月粒度的指定周
const get_month_from_day = function(year: number, month: number, num: number, is_order: boolean) {
    let days = getDays(year, month)
    let first_mon = 1
    let res = 1

    if(is_order) {
        for(let d = 1; d < 7; d++) {
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
    return `${year}-${formatNumber(month)}-${formatNumber(res)}` 
}

// 获取年粒度的指定周
const get_year_from_day = function(year: number, num: number, is_order: boolean) {
    let first_mon: number = 0
    let res: number

    if(is_order) {
        for(let d = 1; d < 7; d++) {
            if(new Date(`${year}-1-${d}`).getDay() === 1) {
                first_mon = new Date(`${year}-1-${d}`).getTime()
                break
            }
        }

    } else {
        let days = getDays(year, 12)
    
        for(let d = days; d > days - 7; d--) {
            if(new Date(`${year}-1-${d}`).getDay() === 1) {
                first_mon = new Date(`${year}-1-${d}`).getTime()
                break
            }
        }
        
    }

    res = first_mon
    while(--num) {
        is_order ? res += (1000 * 60 * 60 * 24 * 7) : res -= (1000 * 60 * 60 * 24 * 7)
        
        if(new Date(res).getFullYear() !== year) {
            res = first_mon
        }
    }

    let new_date = new Date(res)
    return `${new_date.getFullYear()}-${formatNumber(new_date.getMonth()+1)}-${formatNumber(new_date.getDate())}`
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
