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

const addMinutes = (originalDate: Date, minutesToAdd: number) => {
    const manipulatedDate = <Date> addMinutes(originalDate, minutesToAdd);
    return manipulatedDate
};

    return {
        createDate,
        convertToAmPm,
        addMinutes,
    }

})();

export default timeOperation