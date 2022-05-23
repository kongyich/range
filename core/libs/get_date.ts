import { getYear, getMonth, getWeek, deal_targetDate, formatNumber, get_ymRangeData } from '../utils/index'


/**
 * @param {string} type
 * @param {number} distance
 * @param {object} range
 * @return {array}
 */

interface Type_range {
    start_date: string,
    end_date?: number | string
}

interface Type_rangeType {
    scope: 'year' | 'month' | 'week',
    target: 'year' | 'month' | 'week' | 'day'
}
interface YEAR_OBJ {
    [key: number]: string[]
}

interface YEAR {
    [key: number]: YEAR_OBJ
}
interface D_YEAR {
    [key: number]: string[]
}

// 获取时间范围
type Type_getRange = (type: Type_rangeType, range: Type_range) => YEAR | D_YEAR
export const rg_getRange: Type_getRange = function (type, range) {

    const fn_target = {
        'year': getYear,
        'month': getMonth
    }

    let { start_date, end_date } = range
    let date_obj = new Date(start_date)

    switch(type.scope) {
        case 'year':
        case 'month':
            if (end_date) {
                if (typeof end_date === 'number') {
                    let end_year = fn_target[type.scope](date_obj, end_date, 'yyyy-MM-dd')

                    end_date = end_year as string
                } else if (typeof end_date === 'string') {
                    // 格式化日期
                    let end_date_obj = new Date(end_date)
                    end_date = `${end_date_obj.getFullYear()}-${end_date_obj.getMonth() + 1}-${end_date_obj.getDate()}`
                }
            } else {
                end_date = `${date_obj.getFullYear()}-12-31`
            }

            return get_ymRangeData(type.target, start_date, end_date)
        case 'week':

            if(!end_date) end_date = `${date_obj.getFullYear()}-12-31`

            if(typeof end_date === 'number') {
                let end = getWeek(date_obj, end_date, 'yyyy-MM-dd') as string
                console.log(get_ymRangeData(type.target, start_date, end), '990000')
                
            } else if(typeof end_date === 'string') {
                return get_ymRangeData(type.target, start_date, end_date)
            }

            // let weks = getWeeks.run(date_obj.getFullYear())
            // console.log(weks)

            
            // get_weekRangeData(type.target, start_date, end_date)
            break
    }

    return []
}

// 获取周几
// type Type_getWeekText = (date: string | Date) => string
// export const rg_getWeekText: Type_getWeekText = function (date) {
//     let val = typeof date === 'string' ? new Date(date) : date
//     let day = val.getDay()
//     let text_ary = ['一', '二', '三', '四', '五', '六', '日']

//     console.log(`周${day === 0 ? text_ary[6] : text_ary[day - 1]}`, '<----rg_getWeekText result')
//     return `周${day === 0 ? text_ary[6] : text_ary[day - 1]}`
// }



// 第。。。+正 -倒序
/**
 * @param {string} scope_date xxxx-xx-xx xx:xx:xx / Date
 * @param {number} target_num
 * @param {string} type
 * @return {string}
 */
type Type_getNoDat = (scope_date: string, target_num: number, scope_type: string, target_type: string) => string
export const rg_getNoDate: Type_getNoDat = function (scope_date, target_num, scope_type, target_type) {
    let assign_date = new Date(scope_date)
    let is_order = target_num >= 0

    target_num = Math.abs(target_num)
    let result = ''
    let obj = {
        scope_type,
        // assign_date,
        is_order,
        target_type,
        target_num
    }

    // result = deal_targetDate(obj)
    if(scope_date === 'second') {
        throw new Error('scope_date should not be assigned the value second!')
    }


    switch (scope_type) {
        case 'year':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: assign_date.getFullYear().toString()
            }))
            break
        case 'month':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}`
            }))
            break
        case 'week':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: `${assign_date.getFullYear()}-${formatNumber(assign_date.getMonth() + 1)}-${formatNumber(assign_date.getDate())}`
            }))
            break
        case 'day':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()}`
            }))
            break
        case 'hour':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}`
            }))
            break
        case 'minute':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}:${assign_date.getMinutes()}`
            }))
            break
        // case 'second':
        //     result = deal_targetDate(Object.assign(obj, {
        //         scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}:${assign_date.getMinutes()}:${assign_date.getSeconds()}`
        //     }))
        //     break
    }

    console.log(result, '<-----rg_getNoDate, result')


    // deal_targetDate({
    //     assign_date, 
    //     is_order, 
    //     target_type, 
    //     target_num
    // })

    return result
}



// 获取每月几天
// export const getDays = function (year: number, month: number): number {
//     let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//     if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
//         days[1] = 29
//     } return days[month - 1]
// }





// 倒计时+ -



// get第几周，传入任意日期

// 
