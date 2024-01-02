
const dateInRange = (date:Date, rangeStart:Date, rangeEnd:Date) => {
    return date.getTime() >= rangeStart.getTime() && date.getTime() <= rangeEnd.getTime();
};

const formatTimestampYMDHMS = (timestamp:number) => {
    let date = new Date(timestamp)
    if (timestamp == null) {
        return '';
    }
    return `${formatDateYMD(date)} ${formatDateHMS(date)}`;
};

const formatDateYMDHMS = (date:Date) => {
    return `${formatDateYMD(date)} ${formatDateHMS(date)}`;
};

const formatDateYMD = (date:Date) => {
    return `${date.getFullYear()}-${formatNumber2(date.getMonth() + 1)}-${formatNumber2(date.getDate())}`;
};

const formatDateHMS = (date:Date) => {
    return `${formatNumber2(date.getHours())}:${formatNumber2(date.getMinutes())}:${formatNumber2(date.getSeconds())}`;
};

const parseDateYMD = (dateStr:string) => {
    return parseDateYMDHMS(dateStr + ' 00:00:00');
};

const parseDateHMS = (dateStr:string) => {
    return parseDateYMDHMS('2000-01-01 ' + dateStr);
};

const parseDateYMDHMS = (dateStr:string) => {
    let year = parseInt(dateStr.substr(0, 4));
    let month = parseInt(dateStr.substr(5, 2));
    let day = parseInt(dateStr.substr(8, 2));
    let hour = parseInt(dateStr.substr(11, 2));
    let min = parseInt(dateStr.substr(14, 2));
    let sec = parseInt(dateStr.substr(17, 2));
    return new Date(year, month - 1, day, hour, min, sec);
};

const addDay = (date:Date, day:number) => {
    let newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + day);
    return newDate;
};

const isSameDay = (date1:Date, date2:Date) => {
    if (date1 === date2) {
        return true;
    }
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
};



const formatNumber2 = (n:number) => {
    return n > 9 ? n : '0' + n
};


export default {
    dateInRange,
    formatTimestampYMDHMS,
    formatDateYMDHMS,
    formatDateYMD,
    formatDateHMS,
    parseDateYMDHMS,
    parseDateYMD,
    parseDateHMS,
    addDay,
    isSameDay
}
