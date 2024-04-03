import { Router } from 'express';
var routes = Router();
var locale = 'en-us';
var dayNameByLocale = {
    'en-us': [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    'es-us': [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ]
};
var localeOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    // timeZone: 'Australia/Sydney',
    timeZone: 'UTC'
};
var isIsoDate = function (str) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str))
        return false;
    var d = new Date(str);
    return d instanceof Date && !isNaN(d.getTime()) && d.toISOString() === str;
};
export var getNumberAsString = function (number, digits) {
    if (digits === void 0) { digits = 2; }
    return number.toLocaleString(locale, {
        minimumIntegerDigits: digits,
        useGrouping: false
    });
};
export var formatDateTime = function (dateTime, options) {
    if (options === void 0) { options = localeOptions; }
    var dateTimeFormat3 = new Intl.DateTimeFormat(locale, localeOptions);
    return dateTimeFormat3.format(dateTime);
};
export var changeTimezone = function (date, ianatz) {
    var invdate = new Date(date.toLocaleString('en-US', {
        timeZone: ianatz
    }));
    var diff = date.getTime() - invdate.getTime();
    return new Date(date.getTime() - diff);
};
var getDayOfWeekName = function (locale, day) {
    var _a;
    if ((dayNameByLocale === null || dayNameByLocale === void 0 ? void 0 : dayNameByLocale[locale]) !== null) {
        return (_a = dayNameByLocale === null || dayNameByLocale === void 0 ? void 0 : dayNameByLocale[locale]) === null || _a === void 0 ? void 0 : _a[day];
    }
    return '';
};
var getDates = function (req, res) {
    var _a, _b;
    var dateTimeAsString = (_b = (_a = req.query.dateTime) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    var now;
    if (isIsoDate(dateTimeAsString)) {
        var dateTimeAsStringWithoutMilliseconds = dateTimeAsString.slice(0, -5) + 'Z';
        now = new Date(dateTimeAsStringWithoutMilliseconds);
    }
    else {
        now = new Date();
    }
    var offsetMinutes = now.getTimezoneOffset();
    var localDateTime = new Date(now.getTime() - offsetMinutes * 60 * 1000);
    res.send({
        data: {
            UTCDateTimeAsISO: now,
            UTCDateTimeToUTCString: now.toUTCString(),
            UTCDateTimeTolocaleTimezoneAsString: now.toString(),
            UTCDateTimeToDateString: now.toDateString(),
            UTCDateTimeToISOString: now.toISOString(),
            UTCDateTimeToLocaleDateString: now.toLocaleDateString('en-us'),
            UTCDateTimeToLocaleString: now.toLocaleString('en-us'),
            UTCDateTimeToLocaleTimeString: now.toLocaleTimeString('en-us'),
            UTCdayOfMonth: now.getUTCDate(),
            UTCdayOfWeek: getDayOfWeekName(locale, now.getUTCDay()),
            UTCmonth: now.getUTCMonth(),
            UTCyear: now.getUTCFullYear(),
            UTChours: now.getUTCHours(),
            UTCminutes: now.getUTCMinutes(),
            UTCseconds: now.getUTCSeconds(),
            UTCmilliseconds: now.getUTCMilliseconds(),
            timeZoneOffset: offsetMinutes,
            localDateTimeAsISO: localDateTime,
            localDateTimeDayOfMonth: now.getDate(),
            localDateTimeDayOfWeek: getDayOfWeekName(locale, now.getDay()),
            localDateTimeMonth: now.getMonth(),
            localDateTimeYear: now.getFullYear(),
            localDateTimeHours: now.getHours(),
            localDateTimeMinutes: now.getMinutes(),
            localDateTimeSeconds: now.getSeconds(),
            localDateTimeMilliseconds: now.getMilliseconds()
        }
    });
};
routes.get('/', getDates);
export { routes };
//# sourceMappingURL=dates.js.map