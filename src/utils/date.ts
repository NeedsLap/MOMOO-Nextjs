const convertMillisToDatetime = (millis: number) => new Date(millis).toISOString().slice(0, 10);

export default convertMillisToDatetime;
