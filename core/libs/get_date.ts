import { getYear, getMonth, getWeek, getDay, getHour, getMinute, getSecond } from '../utils/index'

const now_day = new Date()
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
type Type_getDate = (type: Type_params, distance?: number, format?: string | Function) => any

// 获取特定日期
export const rg_getDate: Type_getDate = function (type, distance, format) {
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

type Type_getRange = (type: Type_params, distance?: number, range?: Type_range) => Date[]

export const rg_getRange: Type_getRange = function (type, distance, range) {
    return []
}
