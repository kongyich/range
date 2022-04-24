import { getDate_format } from '../utils/index'
// import { rg_getSecond } from '../utils/second'
import { getDay } from '../utils/day'
import { getYear } from '../utils/year'

const now_day = new Date()
/**
 * @param {string} type
 * @param {number} distance
 * @param {string | function} format
 * @return {any}
 */

// interface Type_options{
//     distance?: number,
//     format?: string | Function
// }

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

    console.log(now_day)
    distance = distance || 0

    let result: Array<number> = []

    switch (type) {
        case 'second':
            break
        case 'minute':
            break
        case 'hour':
            break
        case 'day':
            result = getDay(now_day, distance)
            break
        case 'month':
            break
        case 'year':
            result = getYear(now_day, distance)
            break
        case 'week':
            break;
    }

    console.log(result, '<----result')

    if (!format) {
        return result
    }

    if (typeof format === 'string') {
        format = getDate_format
    }

    return format(result)
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
