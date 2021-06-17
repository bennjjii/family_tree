import moment from "moment-timezone";

const dateSanitiser = (date) => {
  moment.tz.setDefault("UTC");
  if (date) {
    return moment(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      "YYYY-MM-DD"
    ).toISOString();
  } else {
    return undefined;
  }
};

export default dateSanitiser;
