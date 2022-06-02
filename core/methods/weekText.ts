// 获取指定日期为周几（星期数）

/**
 * @param { number } date xxxx-xx-xx xx:xx:xx
 * @return { string }
 */

type TYPE_WEEK_TEXT = (date: string | Date) => string
export const week_text: TYPE_WEEK_TEXT = function (date) {
    let val = typeof date === 'string' ? new Date(date) : date
    let day = val.getDay()
    let text_ary = ['一', '二', '三', '四', '五', '六', '日']

    return `周${day === 0 ? text_ary[6] : text_ary[day - 1]}`
}
