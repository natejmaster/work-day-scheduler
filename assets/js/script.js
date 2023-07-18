// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //We declare today as a variable with the value stored in dayjs() which was linked in the HTML. This will provide our site with an up-to-date date and time
  let today = dayjs();
  //Since it will be appended to, we must declare the element workDaySchedule to append the children to later
  let workDaySchedule = $('#work-day-schedule');
  //The line below populates the h3 element at the top of the daily schedule with an up-to-date date and time
  $('#currentDay').text(today.format('[Today is] MMM D, YYYY [ at ] h:mm a'));
  //Begins a for loop at index 9 and ends after 17 (the 24 hour clock version of 5PM)
  for (let i = 9; i <= 17; i++) {
    (function () {
      //For each iteration, a div element is created for that specific hour
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

      //Then, we declare a function setHourClass that will provide the necessary class for each hour of the day in relation to the current time
      function setHourClass() {
        //This establishes a variable currentHour that will list the current hour as a string value for comparison to the workHour cards
        let currentHour = today.format('H');
        //First, if the currentHour is HIGHER than an hour, it is classed as a past time-block and styled accordingly
        if (currentHour > i) {
          workHour.setAttribute('class', 'row time-block past');
        //If the criteria above isn't fulfilled, then the function checks if the currentHour is the same as the index. If this is true, that workHour card is classed as "present" and styled accordingly
        } else if (currentHour == i) {
          workHour.setAttribute('class', 'row time-block present');
        //If neither of these criteria are true, set the time-block as a future class.
        } else {
          workHour.setAttribute('class', 'row time-block future');
        }
      }
      //This calls the function so the hour classes are set
      setHourClass();
    })();
  }
  //This is a declaration of all of the save buttons as variables that can be acted upon by JavaScript
  let saveButton = $('.saveBtn');
  //This is an event listener any time the button is clicked that runs a function
  saveButton.on('click', function () {
    //This function declares a variable that references the textarea in the row that was clicked
    let textarea = $(this).prevAll('.description').first();
    //Then, we declare a variable description that is assigned the value of any text entered into the textarea.
    let description = textarea.val();
    //This variable declaration makes sure that the hourId is matched to a particular index number, so when information is recalled from localStorage, that information repopulates the correct textarea
    let hourId = $(this).closest('.time-block').attr('id');
    //This sets the text description as a value matched with the key hourId stored in localStorage
    localStorage.setItem(hourId, description);
  });
  //The final function populates the rendered schedule with any text that has been saved in localStorage
  function populateSchedule() {
    //We reuse the for loop that we used the iterate through the creation of the textareas
    for (let i = 9; i <= 17; i++) {
      //We declare hourId as a variable so we can look for it
      let hourId = `hour-${i}`;
      //We declare the variable description as any value found when we search localStorage for a value paired with the corresponding hourId
      let description = localStorage.getItem(hourId);
      //If there is a description stored in localStorage, it is rendered as the value of the textarea with the matching hourId
      if (description) {
        $(`#${hourId} .description`).val(description);
      }
    }
  }
  //The populateSchedule function is called
  populateSchedule();
});