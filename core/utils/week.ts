import { formatNumber, getMonth } from './index'


interface WEEK_ENABLE {
  [key: number]: string[], // 字段扩展声明
}; 

export const getWeeks = {
  run: function (year: number, month?: number) {
      var days = getWeeks.getDate(Number(year) || new Date().getFullYear(), month)
      // console.log(days)
      var weeks: WEEK_ENABLE = {};

      for (var i = 0; i < days.length; i++) {
          var weeksKeyLen = Object.keys(weeks).length;
          var daySplit = days[i].split('_');

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
      var dates = []
      let start_index = 1
      let end_index = 12
      if(month) {
        start_index = month
        end_index = month
      }
      for (var i = start_index; i <= end_index; i++) {
          for (var j = 1; j <= new Date(year, i, 0).getDate(); j++) {
              let par = [year, String(i).length < 2 ? `0${i}` : i, String(j).length < 2 ? `0${j}` : j].join('-')
              dates.push(year + '-' + formatNumber(i) + '-' + formatNumber(j) + '_' + new Date(par).getDay())
          }
      }
      return dates
  }
}

// export default getWeeks


// 根据数组获取所属周
export const getBelongWeeks = function(weeks: WEEK_ENABLE, date: string): string[] {
  let be_ary: string[] = [], index: number = 1;
  let length = Object.keys(weeks).length
  console.log(weeks)
  for(let i in weeks) {
    let val = weeks[i]
    // console.log(val, 'val')

    if(val.includes(date)) {
      be_ary = val
      index = Number(i)
      break
    }
  }

  if(be_ary.length < 7) {
    if(index === 1) {
      // console.log(be_ary, 'be_ary')
      let date_str = getMonth(new Date(date), -1, 'yyyy-MM-dd')
      let date_ary: string[] = []
      let after_length = 0
      if(typeof date_str === 'string') {
        date_ary  = date_str.split('-')
      }

      let after_month = getWeeks.run(Number(date_ary[0]), Number(date_ary[1]))
      after_length = Object.keys(after_month).length
      
      be_ary = [...after_month[after_length], ...be_ary]
      console.log(be_ary)
    } else if(index === length) {
      console.log(getMonth(new Date(date), 1, 'yyyy-MM-dd'))
    }

  }


  return be_ary
}
