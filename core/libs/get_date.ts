import { getYear, getMonth, getWeek, getDay, getHour, getMinute, getSecond, deal_targetDate } from '../utils/index'

/**
 * @param {string} type
 * @param {number} distance
 * @param {string | function} format
 * @return {any}
 */

// enum dateType {
//     second,
//     house,
//     day,
//     week,
//     month,
//     year
// }

// type Type_params = typeof dateType
type Type_params = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
interface Param_getDate {
    type: Type_params, 
    date?: string | Date, 
    distance?: number, 
    format?: string | Function
}
type Type_getDate = (options: Param_getDate) => any

// 获取基于本日及特定日期的日期
export const rg_getDate: Type_getDate = function(options) {

    let { type, date, distance, format } = options
    const now_day: Date = date ? typeof date === 'string' ? new Date(date) : date : new Date()

    if (typeof distance === 'string' || typeof distance === 'function') {
        format = distance
        distance = undefined
    }

    distance = distance || 0
    let result: string | number[]

    switch (type) {
        case 'second':
            result = getSecond(now_day, distance, format)
            break
        case 'minute':
            result = getMinute(now_day, distance, format)
            break
        case 'hour':
            result = getHour(now_day, distance, format)
            break
        case 'day':
            result = getDay(now_day, distance, format)
            break
        case 'month':
            result = getMonth(now_day, distance, format)
            break
        case 'year':
            result = getYear(now_day, distance, format)
            break
        case 'week':
            result = getWeek(now_day, distance, format)
            break;
    }

    console.log(result, '<----result')
    return result
}

/**
 * @param {string} type
 * @param {number} distance
 * @param {object} range
 * @return {array}
 */

interface Type_range {
    start_date: string,
    end_date: string
}

// 获取时间范围
type Type_getRange = (type: Type_params, distance?: number, range?: Type_range) => Date[]
export const rg_getRange: Type_getRange = function (type, distance, range) {
    return []
}

// 获取周
type Type_getWeekText = (date: string | Date) => string
export const rg_getWeekText: Type_getWeekText = function(date) {
    let val = typeof date === 'string' ? new Date(date) : date
    let day = val.getDay()
    let text_ary = ['一', '二', '三', '四', '五', '六', '日']

    console.log(`周${day === 0 ? text_ary[6] : text_ary[day - 1]}`, '<----rg_getWeekText result')
    return `周${day === 0 ? text_ary[6] : text_ary[day - 1]}`
}



// 第。。。+正 -倒序
/**
 * @param {string} scope_date xxxx-xx-xx xx:xx:xx / Date
 * @param {number} target_num
 * @param {string} type
 * @return {string}
 */
type Type_getNoDat = (scope_date: string, target_num: number, scope_type: string, target_type: string) => string
export const rg_getNoDate: Type_getNoDat = function(scope_date, target_num, scope_type, target_type) {
    let assign_date = new Date(scope_date)
    let is_order = target_num >= 0
    
    target_num = Math.abs(target_num)
    let result = ''
    let obj  = {
        scope_type,
        // assign_date,
        is_order, 
        target_type,
        target_num
    }

    // result = deal_targetDate(obj)



    switch(scope_type) {
        case 'year':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: assign_date.getFullYear().toString()
            }))
            break
        case 'month':
            result = deal_targetDate(Object.assign(obj, {
                scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth()+1}`
            }))
            break
        case 'week':
        case 'day':
        case 'hour':
        case 'minute':
        case 'second':
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













// 倒计时+ -



// get第12周，传入任意日期

// 
