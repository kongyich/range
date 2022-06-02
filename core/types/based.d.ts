
type TYPE_DATE = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

interface TYPE_BASED_OPTIONS {
  type: TYPE_DATE,
  date: string | Date,
  distance?: number,
  format?: string | Function
}

export type TYPE_BASED = (options:TYPE_BASED_OPTIONS) => any


export type TYPE_NUMBERDATE = (now_day: Date, dis: number, format: string | Function | undefined) => string | number[]
