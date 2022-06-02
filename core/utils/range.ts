import { getDays } from "./basic"
import { getWeeks } from "./week"
import type { TYPE_YMRANGE, YEAR, DAY_YEAR, TYPE_BELONG_YEAR } from "../types/range"


// 获取时间范围
export const get_ym_range: TYPE_YMRANGE = function (target, start, end) {

    // let { start_date: start, end_date: end } = range
    // 'month' | 'week' | 'day'
    // {
    //     yyyy: {
    //         MM: ['yyyy-MM-dd']
    //     }
    // }

    let [st_year, st_month, st_day] = start.split('-').map(date => Number(date))
    let [ed_year, ed_month, ed_day] = end.split('-').map(date => Number(date))

    let cope_st_year = st_year
    let cope_st_month = st_month
    let cope_ed_year = ed_year
    let cope_ed_month = ed_month
    let years = []
    while (st_year <= ed_year) {
        years.push(st_year++)
    }

    switch (target) {
        case 'year':
            break
        case 'month':
        case 'day':
            let stack = []
            let res: YEAR = {}
            let d_res: DAY_YEAR = {}

            let month = belong_year(years, st_month, ed_month)
            let pre = 0

            for (let i = 0; i < years.length; i++) {
                stack.push(years[i])
                if (target === 'month') res[years[i]] = {}
                else d_res[years[i]] = []

                for (let j = pre; j < month.length; j++) {
                    stack.push(month[j])
                    let days_num = 0
                    if (stack[stack.length - 2] === cope_st_year && stack[stack.length - 1] === cope_st_month) {
                        days_num = st_day
                    }

                    let days = getDays(stack[stack.length - 2], stack[stack.length - 1])

                    if (stack[stack.length - 2] === cope_ed_year && stack[stack.length - 1] === cope_ed_month) {
                        days = ed_day
                    }
                    if (target === 'month') {
                        res[years[i]][month[j]] = []
                        while (days > days_num) {
                            res[years[i]][month[j]].unshift(`${stack[stack.length - 2]}-${stack[stack.length - 1]}-${days}`)
                            days--
                        }
                    } else {
                        while (days > days_num) {
                            d_res[years[i]].push(`${stack[stack.length - 2]}-${stack[stack.length - 1]}-${days}`)
                            days--
                        }
                    }
                    stack.pop()
                    if (month[j] === 12) {
                        pre = j + 1
                        stack.length = 0
                        break
                    }
                }
            }

            return target === 'month' ? res : d_res
        case 'week':

            let w_res: YEAR = {}
            let kleng
            let week: string[] = []
            let weeks = getWeeks.run(cope_st_year)
            let key = 1

            for (let i = 0; i < years.length; i++) {

                kleng = Object.keys(weeks)

                if (i === 0) {
                    for (let wek in weeks) {
                        let ds = weeks[wek]
                        if (ds.indexOf(start) > -1) {
                            week = ds
                            key = Number(wek)
                        }
                    }


                    if (week.length < 7) {
                        if (key === 1) {
                            let before_weeks = getWeeks.run(years[i] - 1)
                            let week_ary = Object.keys(before_weeks)
                            key = Number(week_ary[week_ary.length - 1])

                            week = [...before_weeks[Number(week_ary[week_ary.length - 1])], ...week]

                            w_res[years[i] - 1] = {
                                [key]: week
                            }
                        }

                        if (key === Number(kleng[kleng.length + 1])) {
                            let after_weeks = getWeeks.run(years[i] + 1)
                            let week_ary = Object.keys(after_weeks)

                            key = 1
                            week = [...week, ...after_weeks[Number(week_ary[1])]]
                            w_res[years[i] + 1] = {
                                [key]: week
                            }
                        }
                    } else {
                        w_res[years[i]] = {
                            [key]: week
                        }
                    }

                    if (years.length === 1) {
                        let lst_wek: number = 0
                        for (let wek in weeks) {
                            let ds = weeks[wek]
                            if (ds.indexOf(end) > -1) {
                                lst_wek = Number(wek)
                            }
                        }

                        for (let l = key + 1; l <= lst_wek; l++) {
                            w_res[years[i]][l] = weeks[l]
                        }
                    } else {
                        for (let l = key + 1; l <= Number(kleng[kleng.length - 1]); l++) {
                            w_res[years[i]][l] = weeks[l]
                        }
                    }


                } else if (i === years.length - 1) {

                    let lst_wek: number = 0
                    if (weeks[1].length < 7) {
                        delete weeks[1]
                    }

                    for (let wek in weeks) {
                        let ds = weeks[wek]
                        if (ds.indexOf(end) > -1) {
                            lst_wek = Number(wek)
                        }
                    }

                    if (lst_wek === 0) continue
                    w_res[years[i]] = {}
                    for (let l = (1 in weeks ? 1 : 2); l <= lst_wek; l++) {
                        w_res[years[i]][(1 in weeks ? l : l - 1)] = weeks[l]
                    }

                    if (w_res[years[i]][(1 in weeks ? lst_wek : lst_wek - 1)].length < 7) {
                        w_res[years[i]][(1 in weeks ? lst_wek : lst_wek - 1)] = [...w_res[years[i]][(1 in weeks ? lst_wek : lst_wek - 1)], ...getWeeks.run(years[i + 1])[1]]
                    }
                    break

                } else {
                    if (weeks[1].length < 7) {
                        delete weeks[1]
                    }

                    w_res[years[i]] = {}

                    for (let j = (1 in weeks ? 1 : 2); j <= Number(kleng[kleng.length - 1]); j++) {
                        w_res[years[i]][(1 in weeks ? j : j - 1)] = weeks[j]
                    }
                }

                let last_key = Object.keys(w_res[years[i]])[Object.keys(w_res[years[i]]).length - 1]
                weeks = getWeeks.run(years[i + 1])

                if (w_res[years[i]][Number(last_key)].length < 7) {
                    w_res[years[i]][Number(last_key)] = [...w_res[years[i]][Number(last_key)], ...weeks[1]]
                }

            }
            return w_res
    }
    return []
}


// // 获取年份列表所有的月
const belong_year: TYPE_BELONG_YEAR = function (years, st_month, ed_month) {
    let month: number[] = []
    for (let i = 0; i < years.length; i++) {
        let mon = []
        if (i === 0) {
            while (st_month < 13) {
                mon.push(st_month++)
            }
            month = month.concat(mon)
            continue
        }

        if (i === years.length - 1) {
            while (ed_month > 0) {
                mon.unshift(ed_month--)
            }
            month = month.concat(mon)
            continue
        }

        let num = 1
        while (num < 13) {
            mon.push(num++)
        }

        month = month.concat(mon)
    }
    return month
}
