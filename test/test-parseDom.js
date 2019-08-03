let test = `
	<side-bar @click="handleClick" :class="first {{}}">
		<span>{{ jrs }}</span>
		<div class="name"></div>
	</side-bar>
	<div @mouseover="handlemouseover">
		<span>jrs</span>
		<div class="name"></div>
	</div>
	{{ jrs }} {{ jrs }}
`

let test2 = `
	<div @mouseover="handlemouseover">
		<span>jrs</span>
		<div class="name"></div>
	</div>
	<div>hello</div>
	{{ jrs }} {{ jrs }}
`

let reg = /(<([A-Z|a-z|\-|\d]+)([\s\S]*?)>)?([\s\S]*?)(<\/\2>)/
let reg2 = /(<([A-Z|a-z|\-|\d]+)([\s\S]*?)>)?(\s*<.*?>[^<]*?<\/.*?>\s*)(<\/\2>)/
let mm = test2.match(reg2)
console.log('m0',mm[0])
console.log('m1',mm[1])
console.log('m2',mm[2])
console.log('m3',mm[3])
console.log('m4',mm[4])
console.log('m5',mm[5])

// let test1 = ` @click="handleClick" :class="first {{jrs}}" :style="color:red"`
// // @click=""
// let regEvent = /@(([a-z]|[A-Z]|_|\$|\d)*)=['"](([a-z]|[A-Z]|_|\$|\d)*)['"]/
// // :classs="", :style=""
// let regAttr = /\:(([a-z]|[A-Z]|_|\$|\d)*)=(['"][\s\S]*?['"])/
// let m = test1.match(regAttr)
// console.log('m0', m[0])
// console.log('m1', m[1])
// console.log('m2', m[2])
// console.log('m3', m[3])
// console.log('m4', m[4])

{
	let test2 = `
		<div ref="ref">
			<div @mouseover="handlemouseover">
					<span>jrs</span>
					<div class="name">{{jrs}}</div>
					<div class="address"></div>
			</div>
		</div>
		<div>hello {{hello }}</div>
		<div class="coming"></div>
		{{ jrs }} {{ jrs }}
	`
	
	let reg = /(<([A-Z|a-z|\-|\d]+)([\s\S]*?)>)?([\s\S]*?)(<\/\2>)/
	let reg2 = /(<([A-Z|a-z|\-|\d]+)([^>]*?)>)([^<]*)(<\/\2>)/g

	let mm = test2.match(reg2)
	// console.log('m0',mm[0])
	// console.log('m1',mm[1])
	// console.log('m2',mm[2])
	// console.log('m3',mm[3])
	// console.log('m4',mm[4])
	// console.log('m5',mm[5])
	
	let mm1 = test2.match(reg2)
	console.log('m0',mm1[0])
	console.log('m1',mm1[1])
	console.log('m2',mm1[2])
	console.log('m3',mm1[3])
	console.log('m4',mm1[4])
	console.log('m5',mm1[5])
	
	}
	

	{
		let test = `
			<div ref="ref">
				<div @mouseover="handlemouseover">
						<div class="name" :src="sdfs{sdf}" >{{jrs}}</div>
						<img src="../../images/logo.png" class="image" />
						<span>jrs</span>
						<div class="address"></div>
						<img src="../../images/logo.png" />
				</div>
			</div>
			<div>hello {{hello }}</div>
			<div class="coming"></div>
			{{ jrs }} {{ jrs }}
		`
		
		let reg = /<([A-Z|a-z|\-|\d]+)([^>]*?)>([^<]*)<\/\1>/g
		let rez = /<([A-Z|a-z|\-|\d]+)([^>]*?)(?:(?:\/>)|(?:>([^<]*)<\/\1>))/
		let mm1 = test.match(rez)
		console.log('m0',mm1[0])
		console.log('m1',mm1[1])
		console.log('m2',mm1[2])
		console.log('m3',mm1[3])
		console.log('m4',mm1[4])
		console.log('m5',mm1[5])
		
	}