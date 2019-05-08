'use strict'
const alfy = require('alfy')
const rgb = alfy.input
	.split(',')
	.filter(Boolean)
	.map(c => Number(c))
	.filter(d => Number.isInteger(d) && d >= 0 && d <= 255)

if (rgb.length === 3) {
	const hex = rgb.reduce((acc, c) => {
		return acc + c.toString(16)
	}, '#')
	alfy.output([
		{
			title: '十六进制颜色',
			subtitle: hex,
			arg: hex
		}
	])
} else {
	alfy.output([
		{
			title: 'waitting....',
			subtitle: alfy.input
		}
	])
}
