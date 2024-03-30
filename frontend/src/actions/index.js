export function getAllDatesOfMonth() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }
  return dates;
}
