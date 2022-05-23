// 获取每月几天
export const month_num = function (year: number, month: number): number {
  let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)) {
      days[1] = 29
  } return days[month - 1]
}
