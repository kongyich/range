

type Type_formater = (now_day: Date, date_ary: number[], format: string | Function) => string
// return 格式化
export const getDate_format: Type_formater = function (now_day, date_ary, format) {
    if (typeof format === 'function') {
        return format(date_ary)
    } else {
        return get_replace_date(now_day, format)
    }
}

export const get_replace_date = function (date: Date | string[], format: string, adz: boolean = true) {
    let ay: string[] = []
    if (!Array.isArray(date)) {
        ay = [date.getFullYear().toString(), adz ? formatNumber(date.getMonth() + 1) : (date.getMonth() + 1).toString(), adz ? formatNumber(date.getDate()) : date.getDate().toString(), adz ? formatNumber(date.getHours()) : date.getHours().toString(), adz ? formatNumber(date.getMinutes()) : date.getMinutes().toString(), adz ? formatNumber(date.getSeconds()) : date.getSeconds().toString()]
    } else {
        ay = date
    }


    return format.replace(/(yyyy)|(MM)|(dd)|(HH)|(mm)|(ss)/g, function (val) {
        if (val === 'yyyy') {
            return ay[0]
        } else if (val === 'MM') {
            return ay[1]
        } else if (val === 'dd') {
            return ay[2]
        } else if (val === 'HH') {
            return ay[3]
        } else if (val === 'mm') {
            return ay[4]
        } else if (val === 'ss') {
            return ay[5]
        } else {
            return ''
        }

    })
}


// 格式化-月日补0
export const formatNumber = function (n: number | string): string {
    let n_str = n.toString()
    return n_str.length > 1 ? n_str : '0' + n;
}

// 简单格式化
export const simple_format = function (date: Date, isMini = false) {
    if (isMini) {
        return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())} ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}:${formatNumber(date.getSeconds())}`
    } else {
        return `${date.getFullYear()}-${formatNumber(date.getMonth() + 1)}-${formatNumber(date.getDate())}`
    }
}


// 返回周粒度时间戳
export const computed_week = (num: number) => 1000 * 60 * 60 * 24 * num


// 获取每月几天
export const getDays = function (year: number, month: number): number {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
        days[1] = 29
    } return days[month - 1]
}


// [object Object]
export const judge_type = function (value: any) {
    if (value === null) return null
    let type = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '')
    return type[0].toLowerCase() + type.slice(1)
}   
