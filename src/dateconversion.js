export function convertDate(myDate) {
  console.log(myDate)
  const current_myDatetime = new Date(myDate)
  return (current_myDatetime.getDate()<10 ?"0" +current_myDatetime.getDate():current_myDatetime.getDate() )+ "-" +
    ((current_myDatetime.getMonth() + 1 < 10) ? "0" + (parseInt(current_myDatetime.getMonth())+1) : (current_myDatetime.getMonth())+1) + "-" +
    current_myDatetime.getFullYear()
}