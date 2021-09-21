import addMinutes from "date-fns/addMinutes";
import format from "date-fns/format";
import set from "date-fns/set";
import subMinutes from "date-fns/subMinutes";

export const createDate = (hours: number, minutes: number, seconds: number) => {
  const newDate = set(new Date(), {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  });
  return newDate;
};

export const convertToAmPm = (date: Date) => {
  const formatedDate = format(date, "p");
  return formatedDate;
};

export const addMinutesToDate = (originalDate: Date, minutesToAdd: number) => {
  const manipulatedDate = addMinutes(originalDate, minutesToAdd);
  return manipulatedDate;
};

export const subtrackMinutesFromDate = (
  originalDate: Date,
  minutesToSubtrack: number
) => {
  const manipulatedDate = subMinutes(originalDate, minutesToSubtrack);
  return manipulatedDate;
};
