// 获取绝对日期，基于特定日期开始

import { deal_targetDate } from "../utils/absolute"
import { formatNumber } from "../utils/basic"
import type { TYPE_ABSOLUTE } from "../types/absolute"

/**
 * @param {string} scope_date xxxx-xx-xx xx:xx:xx / Date
 * @param {number} target_num + / -
 * @param {string} type
 * @return {string}
 */
 export const absolute: TYPE_ABSOLUTE = function (scope_date, target_num, scope_type, target_type) {

     // 处理参数为字符串/时间对象的情况
     let assign_date = typeof scope_date === 'string' ? new Date(scope_date) : scope_date
     // 处理target_num是否为正数/负数，决定是从时间范围的开始/结束开始查找
     let is_order = target_num >= 0
 
     // 求差值
     target_num = Math.abs(target_num)
     let result = ''

     // 处理参数
     let params_obj = {
         scope_type,
         is_order,
         target_type,
         target_num
     }
 
     // 范围为秒级别的情况不做处理
     if(scope_date === 'second') {
         throw new Error('scope_date should not be assigned the value second!')
     }
     
     // 整合参数对象与不同类型的数据，调用处理函数
     switch (scope_type) {
         case 'year':
             result = deal_targetDate(Object.assign(params_obj, {
                 scope_date: assign_date.getFullYear().toString()
             }))
             break
         case 'month':
             result = deal_targetDate(Object.assign(params_obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}`
             }))
             break
         case 'week':
             result = deal_targetDate(Object.assign(params_obj, {
                 scope_date: `${assign_date.getFullYear()}-${formatNumber(assign_date.getMonth() + 1)}-${formatNumber(assign_date.getDate())}`
             }))
             break
         case 'day':
             result = deal_targetDate(Object.assign(params_obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()}`
             }))
             break
         case 'hour':
             result = deal_targetDate(Object.assign(params_obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}`
             }))
             break
         case 'minute':
             result = deal_targetDate(Object.assign(params_obj, {
                 scope_date: `${assign_date.getFullYear()}-${assign_date.getMonth() + 1}-${assign_date.getDate()} ${assign_date.getHours()}:${assign_date.getMinutes()}`
             }))
             break
     } 
     return result
 }
 