/**
 * 重置数据对象值，可以自动根据值类型重置，也可以手动配置指定重置
 * @param source  源数据对象, 注意：如果是以 "_" 前缀的为私有属性，不会自动重置，请使用手动配置重置
 * @param arg     参数： true | false 表示是否深度重置，false为第一层重置
 *                            当为true时深度重置，也可以传递重置的深度值控制，false默认的深度值为1
 *                            如：resetValue(source, true, 1, 0), 深度从0开始，深度为1的范围，
 *                      ['user.info.name', 'user.info.account'] 重置的点式字段名
 *                      {'user.info.name': 'ofilterjs', 'user.info.account': 0}
 * @param args     args[0]深度值，默认值为0、args[1]起始值，默认值为0
 * @returns {*}
 */
export declare function resetValue(source: any, arg: any, ...args: any): boolean;
