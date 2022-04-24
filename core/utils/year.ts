
type Type_getYear = (now_day: Date, dis: number) => Array<number>

export const getYear: Type_getYear = function(now_day, dis) {
    return [now_day.getFullYear() + dis]
}
