type Type_getNumDate = (now_day: Date, dis: number, format: string | Function | undefined) => string | number[]
type Type_formater = (now_day: Date, date_ary: number[], format: string | Function) => string

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
        console.log(format, '<-----format')
        return format
    }
}

// 格式化-月日补0
const formatNumber = function (n: number | string): string {
    let n_str = n.toString()
    return n_str.length > 1 ? n_str : '0' + n;
}

// export const set_add = function (type: string, tit: string): boolean {
//     return type === tit
// }

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
    now_day.setTime(now_day.getTime() + ((30 * 24 * 60 * 60 * 1000) * dis));
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
