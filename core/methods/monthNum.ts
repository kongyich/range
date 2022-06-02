// 获取指定月有多少天

/**
 * @param { number } year yyyy
 * @param { number } month mm
 * @return { number }
 */

type TYPE_MONTH_NUM = (year: number, month: number) => number
export const month_num: TYPE_MONTH_NUM = function (year, month) {
  let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
      days[1] = 29
  } return days[month - 1]
}
