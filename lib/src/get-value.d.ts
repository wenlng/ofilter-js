/**
 * getValue 获取属性，不存在则取默认值，支持多个值优先获取
 * @param source      源数据对象
 * @param name        名称  'a.b.c' 或 'a.b.c|a.b.d'
 * @param defaultVal  默认值
 * @return {*}
 */
export declare function getValue(source: any, name: string, defaultVal?: any): any;
