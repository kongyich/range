interface TYPE_OPTIONS {
  scope: 'year' | 'month' | 'week',
  target: 'year' | 'month' | 'week' | 'day'
  start_date: string,
  end_date?: number | string
}

interface TYPE_YEAR {
  [key: number]: TYPE_YEAR_OBJECT
}
export interface DAY_YEAR {
  [key: number]: string[]
}
interface TYPE_YEAR_OBJECT {
  [key: number]: string[]
}

export type TYPE_RANGE = (options: TYPE_OPTIONS) => TYPE_YEAR | DAY_YEAR


interface YEAR_OBJ {
  [key: number]: string[]
}

interface D_YEAR {
  [key: number]: string[]
}

export interface YEAR {
  [key: number]: YEAR_OBJ
}

export type TYPE_YMRANGE = (target: string, start: string, end: string) => YEAR | D_YEAR


export type TYPE_BELONG_YEAR = (years: number[], st_month: number, ed_month: number) => number[]
