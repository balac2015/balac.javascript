
// var factor =  document.documentElement.clientWidth / 1920;

var menu_play_interval = 10000;   // 菜单播放的间隔时长

// 显示文字的最大长度
var show_name_length = 4;


/******************************* 柱状图 ***********************************/
var bar_x_font_size = 0;
var bar_x_font_2_size = 0;
var bar_x_font_color = '#fff';
var bar_x_margin = 0;
var bar_y_font_size = 0;
var bar_y_font_color = '#8393aa';
var bar_y_margin = 0;
var bar_label_font_size = 0;
var bar_label_font_2_size = 0;
var bar_label_font_color = '#fff';
var bar_y_top_height = 0;
var bar_y_bottom_height = 0;

var bar_splitline_color = '#2c3343';
var bar_splitarea_color1 = 'rgba(255,255,255,0.02)';
var bar_splitarea_color2 = 'rgba(255,255,255,0)';

var chart_ff = 'Helvetica Neue';

var bar_animate = true;
var bar_animte_time = 3000;
var bar_animte_2_time = 2000;

/******************************* 饼状图 ***********************************/
var pie_label_font_size = 0;
var pie_label_font_color = '#fff';
var pie_animate = true;
var pie_animte_time = 3000;


///////////////////////////////////////// 公用方法 ////////////////////////////////////////////////////////

// 初始化所有与比例相关的数据
function initAllFontSize() {
    bar_x_font_size = 40*winFactor;
    bar_x_font_2_size = 36*winFactor;
    bar_x_margin = 36*winFactor;
    bar_y_font_size = 30*winFactor;
    bar_y_margin = 40*winFactor;
    bar_label_font_size = 30*winFactor;
    bar_label_font_2_size = 25*winFactor;
    bar_y_top_height = 60*winFactor;
    bar_y_bottom_height = 80*winFactor;

    /******************************* 饼状图 ***********************************/
    pie_label_font_size = 40*winFactor;
}
initAllFontSize();

/**
 * 设置某项的渐变色
  */
function setGradientColor(item, x1, y1, x2, y2, color1, color2) {
    item.color = (function () {
        var zrColor = require('zrender/tool/color');
        return zrColor.getLinearGradient(
            x1, y1, x2, y2,
            [[0, color1], [1, color2]]
        );
    })();
}

