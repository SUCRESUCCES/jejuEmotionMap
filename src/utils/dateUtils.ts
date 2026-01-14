//날짜를 YYYY-MM-DD 형식으로 변환

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 기본 날짜 범위 반환 (오늘부터 7일 전)

export const getDefaultDates = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  return {
    start: formatDate(sevenDaysAgo),
    end: formatDate(today),
  };
};
