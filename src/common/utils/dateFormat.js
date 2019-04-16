
/**
 * 日期格式转化：2019-04-23T04:05:17.000Z => 2019-04-23 04:05:17
 *
 * @export
 * @param {*} date
 * @returns
 */
export function dateFormat(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}