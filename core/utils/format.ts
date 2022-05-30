


export const date_parse = function(date: any, adz: boolean) {
  let res: string[] | object = []
  if(typeof date === 'object') {
    let res_date:any = []
    console.log(traversal_compil_obj(date, res_date), 'date_parse->is_obj')
    console.log(res_date)
  } else {
    if(date[0] === '0') {
      throw new Error('0 cannot be used as the start value of the year')
    }
    
    
    let is_obj = date.length !== 0 && !/^[1-9]{1}$/.test(date[0])
    // 是否为字符串 对象类型 -> 例如："{key: value}"
    if(is_obj) {
      console.log(traversal_compil_str(date), 'date_parse->is_obj') 
      
    } else {
      // "2022-03-12 ,，"
      res = get_single_num(date, adz)
    } 
  }
  
  return res
}


// [[], []]

// 循环编译

const traversal_compil_str = function(str: string) {

}

// 编译处理object类型数据
// [Array(1), '2022-05-30 10:04:10']

const traversal_compil_obj = function(obj: any, res_date: any) {

  if(Array.isArray(obj)) {
    obj.forEach(val=>{
      let o =traversal_compil_obj(val, res_date)
      if(typeof val === 'string') res_date.push(o)
    })
  } else if(typeof obj !== 'string') {
    for(let i in obj) {
      // res_date deal_key_value(i, obj[i])
      res_date.push(deal_key_value(i, obj[i]))
    }
  }

  return obj
}

// 处理object对象中 key->value 关系
const deal_key_value = function(key, val) {
}

// 字符串取值
const get_single_num = function(date: string, adz: boolean) {
  let date_ary = date.match(/([0-9]{3,4})|([0-9]{1,2})/g) || []
  return adz ? date_ary : date_ary?.map(d=>deal_first_zero(d))
}

// 移除第一个0
const deal_first_zero = function(str: string) {
  if(str[0] === '0') return str.slice(1)
  return str
}
