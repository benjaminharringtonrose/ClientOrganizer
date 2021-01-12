import { parse, format, isToday, isValid } from "date-fns";

export const formatDateForDisplay = (dateString?: string, dateFormat: "descriptive" | "short" = "descriptive") => {
  if (!dateString) {
    return;
  }
  const dateValue = parse(dateString);
  if (!dateValue || !isValid(dateValue)) {
    return;
  }
  if (dateValue) {
    if (dateFormat === "descriptive") {
      const dateFormatted = format(dateValue, "MMMM Do, YYYY");
      if (isToday(dateValue)) {
        return `${dateFormatted} (Today)`;
      } else {
        return dateFormatted;
      }
    } else if (dateFormat === "short") {
      return format(dateValue, "MM/DD/YYYY");
    }
  }
  return;
};
