export function getOnlyKey(){
    return Math.random();
}//随机生成一个key进行绑定。

/**
 * 深克隆一个对象
 * 函数和undefined无法拷贝
 * @param {obj} obj 
 * @returns {obj}
 */
export function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
}