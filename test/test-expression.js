{
	let test = `
		<side-bar @onclick="handleClick" :class="first {{jrs}}">
			<span>{{jrs}}</span>
			<div class="name"></div>
		</side-bar>
		<div @onmouseover="handlemouseover">
			<span>{{ jrs1 }} {{jrs2}}</span>
			<div class="name"></div>
		</div>
		{{ jrs3 }}
	`
	let reg = /\{\{\s*(.*?)?\s*\}\}/g
	let data = {
		jrs: 0,
		jrs1: 1,
		jrs2: 2,
		jrs3: 3
	}

	// test = test.replace(reg, ($0, $1, $2) => {
	// 	console.log('<---------')
	// 	console.log($0)
	// 	console.log($1)
	// 	console.log('===========>')
	// 	if($1) 
	// 	return `<j-el>${data[$1]}</j-el>`
	// 	return $0
	// })

	// console.log(test)

	let field = '(jrs|jrs1|jrs2|jrs3)'
	let reg1 = new RegExp(`\\{\\{\\s*${field}\\s*\\}\\}`, 'g')
	test = test.replace(reg, ($0, $1) => {
		// console.log('m0', $0)
		// console.log('m1', $1)
		return data[$1]
	})

	console.log(test)
}

// {

// 	let data = {
// 		d1: function(){console.log(1)}, 
// 		d2: {e: 5, v:{z:function(){return 1}}}, 
// 		d3: "3", d4: 4, d5: true, d6:null, d7:undefined
// 	}
	
// 	let test = `
// 		d1 + "," + d2.v.z
// 	`
	
// 	let fnText = [`let fields = []`]
// 	for(let key in data) {
// 		let value = data[key]
// 		if (typeof value == 'function') {
// 			value = `"${value.toString()}"`
// 		}
// 		else if (typeof value == 'string') {
// 			value = `"${value}"`
// 		}
// 		else if (typeof value == 'object') {
// 			value = `JSON.parse(\'${JSON.stringify(value, (k, v)=>{
// 				if (typeof v == 'function') return v.toString()
// 				return v
// 			})}\')`
// 		}
// 		fnText.push(`
// 		var ${key} = ${value}`)
// 	}
// 	fnText.push(` 
// 		console.log('d2', d2)
// 		return {
// 			value: (${test}),
// 			fields: fields.join()
// 		}`
// 	)
// 	console.log(fnText.join(''))
// 	let fn = new Function('', fnText.join(''))
// 	fn()
	
// }

// 解析{{expression}}中表达式运算用到的数据字段，用于绑定对应视图
{
	var data_ = {
		d1: function(){console.log(1)}, 
		d2: {v:{z: "coming", x:function(){return 1}}}, 
		d3: "3", 
		d4: 4, 
		d5: true, 
		d6: null, 
		d7: undefined, 
		d8: [8,8,9],
		d9: {}
	}
	
	var execFields = {}
	
	
	var walk = function(obj, prix = []) {
		for(let key in obj) {
			let value = obj[key]
			let _prix = [...prix]
			_prix.push(key)
			if (value && typeof value === 'object') {
				console.log('walk continue...')
				walk(value, _prix)
			}
			else {
							console.log('leaf,', key, value, prix)
							obj[key] = {
									__jkey__: key,
									toString() {
											console.log('value,',key, value, prix)
											execFields[[...prix,key].join()] = 1
						if (typeof value == 'function') {
													value = `[object Function]`
							console.log('hhhh--------', value)
											}
											return value
									}
							}
			}
		}
	}
	
	
	walk(data_)
	
	
	let test = ` d3 + d5 + d3*19 + d6 + d7 + d4 * 9 + d2.v.z + d8[2] + d8[1] + d9 + d1 + d2`
	let fnText = []
	for(let key in data_) {
		fnText.push(`
		var ${key} = data_["${key}"]`)
	}
	fnText.push(` 
		var result = (${test})
		if (result.__jkey__) return result.toString()
		return result`)
	console.log(fnText.join(''))
	let fn = new Function('', fnText.join(''))
	console.log(fn())
	console.log('execFields', execFields)
}
			