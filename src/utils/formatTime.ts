type TimeFormats = 'Message' | 'ChatCard';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDateDestructed(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthDay = date.getDate();
  const weekDay = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return {
    year,
    month,
    monthDay,
    weekDay,
    hours,
    minutes,
  };
}

export function formatTime(time: string, format: TimeFormats) {
  const date = new Date(time);
  const { year, monthDay } = getDateDestructed(date);
  const timeFormatter = new Intl.DateTimeFormat('ru', {
    hour: '2-digit',
    minute: '2-digit',
  });

  switch (format) {
    case 'Message': {
      return timeFormatter.format(date);
    }
    case 'ChatCard': {
      const currentDate = new Date();
      const { monthDay: currentMonthDay } = getDateDestructed(currentDate);
      const daysDiff = Math.ceil(
        (+currentDate - +date) / (1000 * 60 * 60 * 24),
      );

      if (daysDiff <= 1 && currentMonthDay === monthDay) {
        return timeFormatter.format(date);
      } else if (daysDiff < 7) {
        const weekDateFormatter = new Intl.DateTimeFormat('ru', {
          weekday: 'short',
        });
        return `${capitalizeFirstLetter(weekDateFormatter.format(date))}`;
      }

      const monthDateFormatter = new Intl.DateTimeFormat('ru', {
        month: 'short',
      });
      return `${monthDay} ${capitalizeFirstLetter(monthDateFormatter.format(date))} ${year}`;
    }
  }
}
