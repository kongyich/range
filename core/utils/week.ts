import { formatNumber } from "./basic"


interface WEEK_ENABLE {
  [key: number]: string[], // 字段扩展声明
};

export const getWeeks = {
  run: function (year: number, month?: number) {
    let days = getWeeks.getDate(Number(year) || new Date().getFullYear(), month)
    let weeks: WEEK_ENABLE = {};

    for (let i = 0; i < days.length; i++) {
      let weeksKeyLen = Object.keys(weeks).length;
      let daySplit = days[i].split('_');

      if (weeks[weeksKeyLen] == undefined) {
        weeks[weeksKeyLen + 1] = [daySplit[0]]
      } else {
        if (daySplit[1] == '1') {
          weeks[weeksKeyLen + 1] = [daySplit[0]]
        } else {
          weeks[weeksKeyLen].push(daySplit[0])
        }
      }
    }
    return weeks
  },
  getDate: function (year: number, month?: number) {
    let dates = []
    let start_index = 1
    let end_index = 12
    if (month) {
      start_index = month
      end_index = month
    }
    for (let i = start_index; i <= end_index; i++) {
      for (let j = 1; j <= new Date(year, i, 0).getDate(); j++) {
        let par = [year, String(i).length < 2 ? `0${i}` : i, String(j).length < 2 ? `0${j}` : j].join('-')
        dates.push(year + '-' + formatNumber(i) + '-' + formatNumber(j) + '_' + new Date(par).getDay())
      }
    }
    return dates
  }
}
