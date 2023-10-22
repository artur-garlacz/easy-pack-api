import dayjs from "dayjs";

export const sortDates = ({ dates }: { dates: Date[] }) =>
  dates.sort((a, b) => (a > b ? 1 : -1));

export const dateFormats = {
  common: (date: Date | string) => dayjs(date).format("DD.MM.YYYY HH:mm"),
};

export const getYearQuarter = (date: Date): number => {
  return Math.floor(date.getMonth() / 3 + 1);
};

export function calculateDateDifference(
  startDate: Date,
  endDate: Date
): number {
  const timeDifference = endDate.getTime() - startDate.getTime();

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
