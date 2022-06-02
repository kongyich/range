
export type TYPE_ABSOLUTE = (scope_date: string | Date, target_num: number, scope_type: string, target_type: string) => string

interface Params_deal_targetDate {
  scope_type: string,
  scope_date: string,
  is_order: boolean,
  target_type: string,
  target_num: number
}
export type TYPE_DEAL_TARGET = (options: Params_deal_targetDate) => string


export interface FN_ENABLE {
  [key: string]: Function, // 字段扩展声明
};
