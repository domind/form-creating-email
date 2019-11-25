import { convertDate } from './dateconversion.js';

export function createEmail(item, personsList, other) {
  let listOfPersons = ""
  personsList.length > 0 ? listOfPersons = personsList.map(x => "<tr class=styleList><td class=styleList>" + x.id + "</td><td class=styleList>" +
    x.rank + "</td><td class=styleList> " + x.name + "</td><td class=styleList> " +
    (x.remarks ? "Remarks: " + x.remarks + " " : "") +
    (x.checkbox11 ? " Checkbox checkbox11 checked. " : "") +
    (x.checkbox12 ? " Checkbox checkbox12 checked. " : "") + "</td></tr>"
  ) : listOfPersons = ""
  listOfPersons = String(listOfPersons).replace(new RegExp("</tr>,", 'g'), "</tr>")

  return "To:" + item.email + "\r\nSubject: " + item.required_field +
    "\r\nX-Unsent: 1\r\nContent-Type: text/html\r\n\r\n<html><body> <style> .personsList, .styleList{border: 1px solid black;} .personsList{border-collapse: collapse;}</style>  <h3>Good day,</h3> <p>Some text</p><p><br/> " +
    "<p>Text from non mandatory field: " + item.non_mandatory_field + "</p><br/>" +
    "<p>Text from textarea: " + item.textarea + "</p>" +
    "<table><tr><td><b>Date </b></td><td>:</td><td> " + (item.date ? convertDate(item.date) : "") + "</td></tr>" +
    "<tr><td><b>Radio buttons example checked </b></td><td>:</td><td> " + (item.radio ? "Yes</td></tr>" : "No</td></tr>") +
    "<tr><td><b>Additional field on selection checked </b></td><td>:</td><td> " + (item.radio2 ? "Yes. Text from additional field: " + item.additional_field + "</td></tr>" : "No</td></tr>") +
    "<tr><td><b>Radio controlling checkbox checked</b> </td><td>:</td><td> " + (item.radio3 ? "Yes</td></tr>" : "No</td></tr>") +
    "<tr><td><b>Regular checkbock checked</b> </td><td>:</td><td> " + (item.checkbox2 ? "Yes</td></tr>" : "No</td></tr>") +
    "</table>" +
    (personsList.length > 0 ?
      "<p>List of persons: <table class=personsList>  <tr class=styleList><th>No.</th><th class=styleList>Name</th><th class=styleList>Surname</th><th class=styleList>Remarks</th></tr>" +
      listOfPersons + "</table></p>" : "") +
    (item.checkbox12 ? "Number of checkboxes checked - " + item.checkbox12 : "") +

    (other ? "Other " + item.others + "; " : "") +

    "</p><p>Thank you in advance</p></body></html>"
}
