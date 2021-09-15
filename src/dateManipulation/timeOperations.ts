import addMinutes from 'date-fns/addMinutes'
import format from 'date-fns/format';
import set from 'date-fns/set'

const timeOperation = (() => {

const createDate = (hours: number, minutes: number, seconds: number) => {
    const newDate = set(new Date(), {hours: hours, minutes: minutes, seconds: seconds});  
    return newDate
};

const convertToAmPm = (date: Date) => {
    const formatedDate = format(date, 'p'); 
    return formatedDate
};

const addMinutesToDate = (originalDate: Date, minutesToAdd: number) => {
    const manipulatedDate = addMinutes(originalDate, minutesToAdd);
    return manipulatedDate
};

    return {
        createDate,
        convertToAmPm,
        addMinutesToDate: addMinutesToDate,
    }

})();

export default timeOperation