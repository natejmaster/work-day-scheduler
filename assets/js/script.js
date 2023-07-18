// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let today = dayjs();
  let workDaySchedule = $('#work-day-schedule');
  //The line below populates the h3 element at the top of the daily schedule with an up-to-date date and time
  $('#currentDay').text(today.format('[Today is] MMM D, YYYY [ at ] h:mm a'));
  //Code that populates the workDayCalendar with workHour divs that have all the content appended as children
  //Ensures that the for loop begins at 9 and ends after 17 (the 24 hour clock version of 5)
  for (let i = 9; i <= 17; i++) {
    (function () {
      //For each index above, a div element is created for that specific hour
      let workHour = document.createElement('div');
      workHour.id = `hour-${i}`;
      //Within each workHour div, there is a specific box for the name of the hour
      let hourDiv = document.createElement('div');
      hourDiv.className = 'col-2 col-md-1 hour text-center py-3';
      //Formula to convert 24 hour times to 12 hour times taken from Stack Overflow: https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
      hourDiv.textContent = `${i % 12 === 0 ? 12 : i % 12}${i < 12 ? 'AM' : 'PM'}`;
      //Within each workHour div, there is a textarea that the user can populate with text
      let textarea = document.createElement('textarea');
      textarea.className = 'col-8 col-md-10 description';
      textarea.rows = 3;
      //Within each workHour div, there is a button that will trigger saving the text to localStorage (event listener added later)
      let button = document.createElement('button');
      button.className = 'btn saveBtn col-2 col-md-1';
      button.setAttribute('aria-label', 'save');
      //Each button uses the 'save' icon, so an icon must be added to each div that contains the icon
      let icon = document.createElement('i');
      icon.className = 'fas fa-save';
      icon.setAttribute('aria-hidden', 'true');
      //Append the icon to the button
      button.append(icon);
      //Append the box that names the hour, the textarea, and the button to the workHour div
      workHour.append(hourDiv);
      workHour.append(textarea);
      workHour.append(button);
      //Append the newly-created workHour div to the larger container, workDaySchedule
      workDaySchedule.append(workHour);

      function setHourClass() {
        let currentHour = today.format('H');
        if (currentHour > i) {
          workHour.setAttribute('class', 'row time-block past');
        } else if (currentHour == i) {
          workHour.setAttribute('class', 'row time-block present');
        } else {
          workHour.setAttribute('class', 'row time-block future');
        }
      }
      setHourClass();
    })();
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  let saveButton = $('.saveBtn');
  saveButton.on('click', function () {
    window.alert('Click!');
  });
});
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?