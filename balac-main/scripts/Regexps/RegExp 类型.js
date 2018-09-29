/**
 * pattern 正则表达式
 * flags 表明正则表达式的行为（值：g, i, m。可一个或多个）
 *      g - 表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；
 *      i - 表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；
 *      m - 表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。
 */
var expression = / pattern / flags;     // 字面量形式

var expression2 = new RegExp("\\[bc\\]at\]", "gim");   // 构造函数形式

// 元字符（都必须转义）：{ ( [ \ ^ $ | ] ) ? * + . }
var pat = /\[bc\]at/gim;

var pat = new RegExp("name\\/age", "i");    // 构造函数的字符串参数，需要双重转义

// 实列属性：
pat.global;         // 布尔值，表示是否设置了g 标志。
pat.ignoreCase;     // 布尔值，表示是否设置了i 标志。
pat.lastIndex;      // 整数，表示开始搜索下一个匹配项的字符位置，从0 算起。
pat.multiline;      // 布尔值，表示是否设置了m 标志。
pat.source;         // 正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

// 实列方法
var result = pat.exec("params"); // 为捕获组而设计，返回第一个匹配项信息的数组或 null
    // result 是 Array 的实列，包含额外属性：index, input
    result.index;   // 表示匹配项在字符串中的位置
    result.input;   // 表示应用正则表达式的字符串
    result[0];      // 第一项是与整个模式匹配的字符串
    result;         // result 数组其他项是与模式中的捕获组匹配的字符串（如果模式中没有捕获组，则该数组只包含一项）。
