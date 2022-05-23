import { deal_targetDate } from "../utils/assign"
import { formatNumber } from "../utils/basic"

/**
 * @param {string} scope_date xxxx-xx-xx xx:xx:xx / Date
 * @param {number} target_num
 * @param {string} type
 * @return {string}
 */
 type Type_getNoDat = (scope_date: string, target_num: number, scope_type: string, target_type: string) => string
 export const assign: Type_getNoDat = function (scope_date, target_num, scope_type, target_type) {
     let assign_date = new Date(scope_date)
     let is_order = target_num >= 0
 
     target_num = Math.abs(target_num)
     let result = ''
     let obj = {
         scope_type,
         // assign_date,
         is_order,
         target_type,
         target_num
     }
 
     // result = deal_targetDate(obj)
     if(scope_date === 'second') {
         throw new Error('scope_date should not be assigned the value second!')
     }
 
 
     switch (scope_type) {
         case 'year':
             result = deal_targetDate(Object.assign(obj, {
                 scope_date: assign_date.getFullYear().toString()
             }))
             break
         case 'month':
             result = deal_targetDate(Object.assign(obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}`
             }))
             break
         case 'week':
             result = deal_targetDate(Object.assign(obj, {
                 scope_date: `${assign_date.getFullYear()}-${formatNumber(assign_date.getMonth() + 1)}-${formatNumber(assign_date.getDate())}`
             }))
             break
         case 'day':
             result = deal_targetDate(Object.assign(obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()}`
             }))
             break
         case 'hour':
             result = deal_targetDate(Object.assign(obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}`
             }))
             break
         case 'minute':
             result = deal_targetDate(Object.assign(obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}:${assign_date.getMinutes()}`
             }))
             break
     }
 
     console.log(result, '<-----rg_getNoDate, result')
 
     return result
 }
 