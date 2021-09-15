import addMinutes from 'date-fns/addMinutes'
import format from 'date-fns/format';
import set from 'date-fns/set'

export const createDate = (hours: number, minutes: number, seconds: number) => {
    const newDate = set(new Date(), {hours: hours, minutes: minutes, seconds: seconds});  
    return newDate
};

export const convertToAmPm = (date: Date) => {
    const formatedDate = format(date, 'p'); 
    return formatedDate
};

export const addMinutesToDate = (originalDate: Date, minutesToAdd: number) => {
    const manipulatedDate = addMinutes(originalDate, minutesToAdd);
    return manipulatedDate
};