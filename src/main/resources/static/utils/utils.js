/**
 * 将 2023-06-06T02:49:42.000+00:00 这样的时间字符串转换为北京时间 2023年6月6日XX:XX:XX 的形式
 * @param timeString: String
 */

export const getDateFormat = (timeString) => {
    let date = new Date(timeString);

    // date.setHours(date.getHours() + 8); // 加8小时，转换为北京时间

    // 获取日期和时间信息
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // 月份从0开始，需要加1
    let day = date.getDate();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    // 格式化输出
    return year + "年" + month + "月" + day + "日 " + hours + ":" + minutes + ":" + seconds;
}