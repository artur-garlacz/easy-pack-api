import dayjs from 'dayjs';

export const calculateDatesDifferenceInMonths = ({
  firstDate,
  secondDate,
}: {
  firstDate: Date;
  secondDate: Date;
}) => {
  return Math.abs(
    firstDate.getMonth() -
      secondDate.getMonth() +
      12 * (firstDate.getFullYear() - secondDate.getFullYear()),
  );
};

export const sortDates = ({ dates }: { dates: Date[] }) =>
  dates.sort((a, b) => (a > b ? 1 : -1));

export const dateFormats = {
  common: (date: Date | string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
};

export const getYearQuarter = (date: Date): number => {
  return Math.floor(date.getMonth() / 3 + 1);
};

export function calculateDateDifference(
  startDate: Date,
  endDate: Date,
): number {
  const timeDifference = endDate.getTime() - startDate.getTime();

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export function getDateFullMonthsAgo(monthsCount: number, dateSource?: Date) {
  let date = new Date();
  if (dateSource) {
    date = new Date(dateSource); // we must clone it so we don't mutate source
  }
  date.setMonth(date.getMonth() - monthsCount, 1); // First number set month, second day

  return date;
}
