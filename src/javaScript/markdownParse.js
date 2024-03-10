const PARSESENTENCE = {
    HEAD: /^(#{1,6})\s*(.*)/,
    ITALIC: /(?:\*|_)(.+?)(?:\*|_)/,
    QUOTE: /(>+)\s*(.*)/,
    CODE: /(`{3})/,
    ODLIST: /^(1.{1})\s*(.*)/,
    UODLIST: /^(-{1})\s*(.*)/,
}


//markdown解析器入口
export const parseMarkdown = (content) => {
    let result = parseLine(content); //按照行来进行处理
    return result;
}
//解析行
const parseLine = (content) => {
    let line = textHandler(content);
    for (let i = 0; i < line.length; i++) {
        line[i] = parseRegex(line[i]); //每一行都解析
    }
    //替换之后合并
    line = line.join("\n");
    return line;
}
//解析块 传入的是一行中出现的markdown语法数组 识别数组里面有什么替换成对应的html 返回成blocks 拼接成一行就行
const parseBlock = (array) => {
    let blocks = [];
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
        blocks[i] = replaceHtml(array[i]);
    }
    line = blocks.join(" ");
    return line;
}
//解析text里面的内容 目前text是指每一行
const parseRegex = (text) => {
    let array = []; //解析出来的行数组

    let head = PARSESENTENCE.HEAD.exec(text);
    let italic = PARSESENTENCE.ITALIC.exec(text);
    let quote = PARSESENTENCE.QUOTE.exec(text);
    let code = PARSESENTENCE.CODE.exec(text);
    let odlist = PARSESENTENCE.ODLIST.exec(text);
    let uodlist = PARSESENTENCE.UODLIST.exec(text);
    if (head != null) {
        array.push(head);
    }
    if (italic != null) {
        array.push(italic);
    }
    if (quote != null) {
        array.push(quote);
    }
    if (code != null) {
        array.push(code);
    }
    if (odlist != null) {
        array.push(odlist);
    }
    if (uodlist != null) {
        array.push(uodlist);
    }
    //每一行里面有两种markdown语法 可以进行block划分来进行替换
    if (array.length >= 2) {
        console.log("一行有两种markdown语法");
        let line = parseBlock(array); //传入识别出来的array 返回替换成html的一行
        return line;
    }
    // 没有大于两种markdown语法 就正常把一行的markdown解析出来
    else {
        console.log("一行有一种markdown语法");
        return replaceHtml(array); //一行只有一种markdown语法 只需要返回替换后的html的一行 相当于一行只有一个block
    }
}
//处理掉多余的字符 如\n 注释
const textHandler = (content) => {
    let contentHandled = content.split("\n");
    return contentHandled;
}
//识别是什么类型的block 替换成html
const replaceHtml = (markdown) => {
    let length = markdown.length;
    if (length == 1) {
        let head = PARSESENTENCE.HEAD.exec(markdown[0]);
        let italic = PARSESENTENCE.ITALIC.exec(markdown[0]);
        let quote = PARSESENTENCE.QUOTE.exec(markdown[0]);
        let code = PARSESENTENCE.CODE.exec(markdown[0]);
        let odlist = PARSESENTENCE.ODLIST.exec(markdown[0]);
        let uodlist = PARSESENTENCE.UODLIST.exec(markdown[0]);

    }
    else {
        for (let i = 0; i < length; i++) {
            let head = PARSESENTENCE.HEAD.exec(markdown[i]);
            let italic = PARSESENTENCE.ITALIC.exec(markdown[i]);
            let quote = PARSESENTENCE.QUOTE.exec(markdown[i]);
            let code = PARSESENTENCE.CODE.exec(markdown[i]);
            let odlist = PARSESENTENCE.ODLIST.exec(markdown[i]);
            let uodlist = PARSESENTENCE.UODLIST.exec(markdown[i]);
        }
    }
}


