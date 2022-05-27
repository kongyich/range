


export const date_parse = function(date_str: string, adz: boolean) {

  if(date_str[0] === '0') {
    throw new Error('0 cannot be used as the start value of the year')
  }
  let res: string[] | object = []
  
  let is_obj = date_str.length !== 0 && !/^[1-9]{1}$/.test(date_str[0])
  console.log(is_obj)
  if(is_obj) {

  } else {
    res = get_single_num(date_str, adz)
  } 


  return res
}


const get_single_num = function(date: string, adz: boolean) {
  let date_ary = date.match(/([0-9]{3,4})|([0-9]{1,2})/g) || []
  return adz ? date_ary : date_ary?.map(d=>deal_first_zero(d))
}

// 移除第一个0
const deal_first_zero = function(str: string) {
  if(str[0] === '0') return str.slice(1)
  return str
}
