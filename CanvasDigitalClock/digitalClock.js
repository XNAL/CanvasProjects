'use strict'

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 400;
const MARGIN_LEFT = 30;
const MARGIN_TOP = 50;
const RADIUS = 8;
const MARGIN_YEAR_TOP = 300;
const MARGIN_YEAR_LEFT = 540;
const YEAR_RADIUS = 2;

// 第一次运行时的当前【天】，【天】改变时刷新日期区域
var currentDay = 0;

window.onload = function() {
	var canvas = document.getElementById('digitalClock');
	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;

	var context = canvas.getContext('2d');
	setInterval(function() {
		drawClock(context);
	}, 1000);
}
// 绘制时钟
function drawClock(ctx) {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth();
	var day = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	// 只需清空时分秒区域即可
	ctx.clearRect(0, 0, CANVAS_WIDTH, MARGIN_YEAR_TOP);

	drawTime(MARGIN_LEFT, MARGIN_TOP, RADIUS, parseInt(hour / 10), ctx);
	drawTime(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, RADIUS, parseInt(hour % 10), ctx);
	drawTime(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, RADIUS, 10, ctx);
	drawTime(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, RADIUS, parseInt(minute / 10), ctx);
	drawTime(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, RADIUS, parseInt(minute % 10), ctx);
	drawTime(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, RADIUS, 10, ctx);
	drawTime(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, RADIUS, parseInt(second / 10), ctx);
	drawTime(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, RADIUS, parseInt(second % 10), ctx);

	// 判断当前日期是否改变
	if (currentDay !== day) {
		currentDay = day;
		// 年月日改变时只需清空日期所在区域
		ctx.clearRect(0, MARGIN_YEAR_TOP, CANVAS_WIDTH, CANVAS_HEIGHT);
		drawTime(MARGIN_YEAR_LEFT + 15 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt(year / 1000), ctx);
		drawTime(MARGIN_YEAR_LEFT + 30 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt(year % 1000 / 100), ctx);
		drawTime(MARGIN_YEAR_LEFT + 45 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt(year % 1000 % 100 / 10), ctx);
		drawTime(MARGIN_YEAR_LEFT + 60 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt(year % 1000 % 100 % 10), ctx);		
		drawTime(MARGIN_YEAR_LEFT + 75 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, 11, ctx);
		drawTime(MARGIN_YEAR_LEFT + 84 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt((month + 1) / 10), ctx);
		drawTime(MARGIN_YEAR_LEFT + 99 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt((month + 1) % 10), ctx);
		drawTime(MARGIN_YEAR_LEFT + 114 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, 11, ctx);		
		drawTime(MARGIN_YEAR_LEFT + 123 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt(day / 10), ctx);
		drawTime(MARGIN_YEAR_LEFT + 138 * (YEAR_RADIUS + 1), MARGIN_YEAR_TOP, YEAR_RADIUS, parseInt(day % 10), ctx);
	}
}

// 画出具体的时间数字
function drawTime(x, y, r, num, ctx) {
	ctx.fillStyle = "rgb(69, 188, 249)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] === 1) {
				ctx.beginPath();
				ctx.arc(x + j * 2 * (r + 1) + (r + 1), y + i * 2 * (r + 1) + (r + 1), r, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
	}
}
