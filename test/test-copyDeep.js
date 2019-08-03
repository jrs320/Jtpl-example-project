var obj = {
  v: [1,2,{a:'b'}], 
  z: function(){}, 
  x: null, 
  y () {  }, 
  p: x  => {}, 
  fn: '|||sdfsafasf'
}

var str = JSON.stringify(obj, function(key, value){
	if (typeof value === 'function') {
		return '|||' + value.toString()
	}
	return value
})

var copy = JSON.parse(str,function(key, val){
  let value = val
  let reg = /^\|\|\|/
	if (reg.test(value)) {
		value = value.replace(reg, '')
		if (!/^\s*function/.test(value) && !/^[^\{]*=>/.test(value)) {
			value = 'function ' + value
		}
        let r;
        try{
		  let fn = new Function('',`return ${value}`)
          r = fn()
        }catch(e){
          r = val
        }
		return r
	}
	return value
})
console.log(str)
console.log(obj, copy)