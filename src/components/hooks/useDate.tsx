const useDate = (dateTimeString: string): string => {
  // 替换日期部分的 "-" 为 "/" 并解析日期和时间
  const fullDateTime = new Date(dateTimeString.replace(/-/g, "/").replace("T", " "));

  // 提取日期和时间组件
  const year = fullDateTime.getFullYear();
  const month = fullDateTime.getMonth() + 1; // getMonth() 返回 0-11
  const day = fullDateTime.getDate();
  const hours = fullDateTime.getHours();
  const minutes = fullDateTime.getMinutes();

  // 格式化为 MM/DD/YYYY HH:MM 格式
  const dateFormatted = `${year}/${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  return dateFormatted;
};


export default useDate;
