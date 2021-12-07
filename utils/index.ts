import dayjs from 'dayjs';

export const toToday = (time: string) => {
  const components = time.split(':').slice(0, 2).map(Number);
  const d = dayjs().set('hour', components[0]).set('minute', components[1]);
  console.log(d);
  return d;
};
