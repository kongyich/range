// 获取周几
type Type_getWeekText = (date: string | Date) => string
export const week_text: Type_getWeekText = function (date) {
    let val = typeof date === 'string' ? new Date(date) : date
    let day = val.getDay()
    let text_ary = ['一', '二', '三', '四', '五', '六', '日']

    console.log(`周${day === 0 ? text_ary[6] : text_ary[day - 1]}`, '<----rg_getWeekText result')
    return `周${day === 0 ? text_ary[6] : text_ary[day - 1]}`
}
