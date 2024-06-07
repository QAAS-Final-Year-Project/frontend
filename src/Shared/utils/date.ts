import moment from 'moment';

export function getTimeLeft(deadline: moment.Moment): string {
  const now = moment();
  const duration = moment.duration(deadline.diff(now));

  if (duration.asMonths() >= 1) {
    return `${Math.floor(duration.asMonths())} months`;
  } else if (duration.asWeeks() >= 1) {
    return `${Math.floor(duration.asWeeks())} weeks`;
  } else if (duration.asDays() >= 1) {
    return `${Math.floor(duration.asDays())} days`;
  } else if (duration.asHours() >= 1) {
    return `${Math.floor(duration.asHours())} hours`;
  } else if (duration.asMinutes() >= 1) {
    return `${Math.floor(duration.asMinutes())} minutes`;
  } else {
    return `${Math.floor(duration.asSeconds())} seconds`;
  }
}
