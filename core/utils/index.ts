import { getDays } from "../libs/get_date"
import { getWeeks as GETWEEKS, getBelongWeeks, get_targetWeekData } from "../utils/week"

type Type_getNumDate = (now_day: Date, dis: number, format: string | Function | undefined) => string | number[]
type Type_formater = (now_day: Date, date_ary: number[], format: string | Function) => string

interface Params_deal_targetDate {
    scope_type: string,
    scope_date: string,
    is_order: boolean,
    target_type: string,
    target_num: number
}
type Type_deal_targetDate = (options: Params_deal_targetDate) => string

// return 格式化
const getDate_format: Type_formater = function (now_day, date_ary, format) {
    if (typeof format === 'function') {
        return format(date_ary)
    } else {
        format = format.replace(/(yyyy)|(MM)|(dd)|(HH)|(mm)|(ss)/g, function (val) {
            if (val === 'yyyy') {
                return now_day.getFullYear().toString()
            } else if (val === 'MM') {
                return formatNumber(now_day.getMonth() + 1)
            } else if (val === 'dd') {
                return formatNumber(now_day.getDate())
            } else if (val === 'HH') {
                return formatNumber(now_day.getHours())
            } else if (val === 'mm') {
                return formatNumber(now_day.getMinutes())
            } else if (val === 'ss') {
                return formatNumber(now_day.getSeconds())
            } else {
                return ''
            }

        })
        // console.log(format, '<-----format')
        return format
    }
}

// 格式化-月日补0
export const formatNumber = function (n: number | string): string {
    let n_str = n.toString()
    return n_str.length > 1 ? n_str : '0' + n;
}

// 获取指定数字的年
export const getYear: Type_getNumDate = function (now_day, dis, format) {
    let date_ary = [now_day.getFullYear() + dis]
    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}

// 获取指定数字的月数
export const getMonth: Type_getNumDate = function (now_day, dis, format) {
    // if(typeof now_day === 'string') now_day = new Date(now_day)
    //8      -5
    let mon = (now_day.getMonth() + 1)
    let num = 0
    let mon_num = 0

    let end_num = mon + dis
    if (end_num < mon) [end_num, mon] = [mon, end_num]

    for (let i = mon; i < end_num; i++) {
        if (i > 12) {
            i = 1
            end_num = end_num - 12
        }
        mon_num += getDays(now_day.getFullYear(), i)
    }

    if (dis > 0) {
        num = now_day.getTime() + (mon_num * (24 * 60 * 60 * 1000))
    } else {
        num = now_day.getTime() - (mon_num * (24 * 60 * 60 * 1000))
    }

    now_day.setTime(num);
    let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1)]

    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}

// 获取指定数字的周数
export const getWeek: Type_getNumDate = function (now_day, dis, format) {
    let day_num = 24 * 60 * 60 * 1000
    let now_week_num = (now_day.getDay() === 0 ? 7 : now_day.getDay()) - 1

    let diff_num = dis * (day_num * 7)
    now_day.setTime((now_day.getTime() - (day_num * now_week_num)) + diff_num);

    let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate()]

    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}

// 获取指定数字的天数
export const getDay: Type_getNumDate = function (now_day, dis, format) {
    now_day.setTime(now_day.getTime() + ((24 * 60 * 60 * 1000) * dis));

    let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate()]
    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}

// 获取指定数字的小时数
export const getHour: Type_getNumDate = function (now_day, dis, format) {
    now_day.setTime(now_day.getTime() + ((60 * 60 * 1000) * dis));
    let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate(), now_day.getHours(), now_day.getMinutes(), now_day.getSeconds()]

    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}

// 获取指定数字的分钟数
export const getMinute: Type_getNumDate = function (now_day, dis, format) {
    now_day.setTime(now_day.getTime() + ((60 * 1000) * dis));
    let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate(), now_day.getHours(), now_day.getMinutes(), now_day.getSeconds()]

    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}


// 获取指定数字的秒数
export const getSecond: Type_getNumDate = function (now_day, dis, format) {
    now_day.setTime(now_day.getTime() + (1000 * dis));

    let date_ary = [now_day.getFullYear(), (now_day.getMonth() + 1), now_day.getDate(), now_day.getHours(), now_day.getMinutes(), now_day.getSeconds()]
    if (format) {
        return getDate_format(now_day, date_ary, format)
    }
    return date_ary
}

// 处理target子集
export const deal_targetDate: Type_deal_targetDate = function (options) {

    let { scope_type, scope_date, is_order, target_type, target_num } = options
    console.log(scope_date)

    switch (target_type) {
        case 'year':
            throw new Error('The type expected to be converted should not be passed into the year!')
        case 'month':
            if (scope_type === 'year') {
                let date
                if (is_order) {
                    date = new Date(`${scope_date}-${target_num}`)
                    return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}`
                } else {
                    date = new Date(`${scope_date}-${12 - target_num}`)
                    return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}`
                }
            } else {
                throw new Error('The original type should contain the type expected to be converted!')
            }
        case 'week':
            if (scope_type === 'year' || scope_type === 'month') {
                return get_targetWeekData(scope_type, scope_date, target_num, is_order)
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
            } else if (scope_type === 'week') {
                let date = generate_weekDate(scope_date, target_type, target_num, is_order)
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            } else {
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
                } else if (scope_type === 'week') {
                    let date = generate_weekDate(scope_date, target_type, target_num, is_order)
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                }
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
                } else if (scope_type === 'week') {
                    let date = generate_weekDate(scope_date, target_type, target_num, is_order)
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                }
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
            } else if (scope_type === 'week') {
                let date = generate_weekDate(scope_date, target_type, target_num, is_order)
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
    }
    return ''
}

// 生成week日期对象
const generate_weekDate = function (scope_date: string, target_type: string, target_num: number, is_order: boolean): Date {
    let date = new Date(scope_date)
    let weeks_ary = GETWEEKS.run(date.getFullYear(), date.getMonth() + 1)
    let be_weeks = getBelongWeeks(weeks_ary, scope_date)
    console.log(be_weeks, '<----be_weeks')
    let time_num = 0
    switch (target_type) {
        case 'day':
            time_num = (24 * 60 * 60 * 1000)
            break
        case 'hour':
            time_num = (60 * 60 * 1000)
            break
        case 'minute':
            time_num = 60 * 1000
            break
        case 'second':
            time_num = 1000
            break
    }

    if (is_order) {
        date = new Date(`${be_weeks[0]} 00:00:00`)
        console.log(date)
        date.setTime(date.getTime() + (time_num * (target_type === 'day' ? (target_num - 1) : target_num)))
    } else {
        date = new Date(`${be_weeks[be_weeks.length - 1]} 00:00:00`)
        date.setTime(date.getTime() - (time_num * target_num))
    }
    return date
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

// 首字母大写
const ucfirst = function (str: string) {
    var str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str
}

interface Type_range {
    start_date: string,
    end_date?: number | string
}
// 获取scope为年的时间范围
export const get_yearRangeData = function(target: string, range: Type_range): string[] {
    let { start_date: start, end_date: end } = range
    if(end) {
        if(typeof end === 'number') {

        } else if(typeof end === 'string') {

        }
    }
    // console.log(start)
    
    // 'month' | 'week' | 'day'
    switch(target) {
        case 'month':
        case 'week':
        case 'day':
    }
    return []
}
// 获取scope为月的时间范围
export const get_monthRangeData = function() {}
// 获取scope为周的时间范围
export const get_weekRangeData = function() {}
