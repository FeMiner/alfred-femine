/**
 * 16进制颜色转RGB颜色
 */
const alfy = require("alfy");
const hexRgb = require("hex-rgb");

let rgba = null;
try {
	rgba = hexRgb(alfy.input);
} catch (error) {
	alfy.log(error);
}

if (rgba) {
	const { red, green, blue, alpha } = rgba;
	const showAlpha = alpha !== 1;
	const rgbaStr = `${showAlpha ? "rgba" : "rgb"}(${red},${green},${blue}${
		showAlpha ? "," + alpha.toFixed(2) : ""
	})`;
	alfy.output([
		{
			title: "RGB[A]颜色值",
			subtitle: rgbaStr,
			arg: rgbaStr
		}
	]);
} else {
	alfy.output([
		{
			title: "waitting....",
			subtitle: alfy.input
		}
	]);
}
