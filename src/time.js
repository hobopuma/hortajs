
const Time = {
  Day: Date.UTC(1970, 0, 2),
  Hour: Date.UTC(1970, 0, 1, 1)
};

const toPartition = jsd => (
  // eslint-disable-next-line no-restricted-globals
  typeof jsd === 'object' && jsd.getUTCFullYear && !Number.isNaN(jsd.getUTCFullYear())
    ? {
      year: `${jsd.getUTCFullYear()}`.padStart(4, '0'),
      month: `${jsd.getUTCMonth() + 1}`.padStart(2, '0'),
      day: `${jsd.getUTCDate()}`.padStart(2, '0'),
      hour: `${jsd.getUTCHours()}`.padStart(2, '0')
    }
    : { year: '', month: '', day: '', hour: '' }
);

const fromPartition = (year = '1970', month = '01', day = '01', hour = '00') => (
  new Date(Date.UTC(year, month - 1, day, hour))
);

const plusDays = (jsd, n) => new Date(jsd.getTime() + (Time.Day * n));
const minusDays = (jsd, n) => plusDays(jsd, -n);
const plusHours = (jsd, n) => new Date(jsd.getTime() + (Time.Hour * n));
const minusHours = (jsd, n) => plusHours(jsd, -n);

export { Time, toPartition, fromPartition, plusDays, minusDays, plusHours, minusHours };
