

//this code prevents empty fields being submitted to the databse

const usernameField = document.querySelector('#emailInput');
const signUpSubmit = document.querySelector('#signUpButton');
const password = document.querySelector('#passwordInput');
const confirmPassword = document.querySelector('#confirmPasswordInput');
// var noUsername = false;



if(typeof (signUpSubmit) != 'underfined' && signUpSubmit != null){
  signUpSubmit.addEventListener('click', (e) => {
      if(usernameField.value === ''){
          e.preventDefault();
          var noUsernameAlert = document.getElementsByClassName("hiddenUsernameErrorAlert");
          // toggle class to show 'no username' alert
            noUsernameAlert[0].style.display = "inline-block";
            
      }
      if(password.value != confirmPassword.value){
          e.preventDefault();
          var noPasswordAlert = document.getElementsByClassName("hiddenPasswordErrorAlert");
          // toggle class to show 'passwords dont match' alert
            noPasswordAlert[0].style.display = "inline-block";
      }
  });
}


// const messageContainer = document.querySelector('.messageContainer');
// //whatever is on the end of the url after the ?
// const queryString = window.location.search;

// if(queryString == '?incorrectLogin'){
//     messageContainer.innerHTML = `<div class="errorAlert">Incorect Login Details</div>`;
// }

// if(queryString == '?taskadded'){
//     messageContainer.innerHTML = `<div class="successAlert">task added</div>`;
// }







//--------- CALENDER JS-----------

!function() {

    var today = moment();
  
    function Calendar(selector) {
      this.el = document.querySelector(selector);
      this.current = moment().date(1);
      this.draw();
      var current = document.querySelector('.today');
      if(current) {
        var self = this;
      }
    }
  
    Calendar.prototype.draw = function() {
      //Create Header
      this.drawHeader();
  
      //Draw Month
      this.drawMonth();
    }
  
    Calendar.prototype.drawHeader = function() {
      var self = this;
      if(!this.header) {
        //Create the header elements
        this.header = createElement('div', 'header');
        this.header.className = 'header';
  
        this.title = createElement('h1');
        //buttons to navigate months
        var right = createElement('div', 'right');
        right.addEventListener('click', function() { self.nextMonth(); });
  
        var left = createElement('div', 'left');
        left.addEventListener('click', function() { self.prevMonth(); });
  
        //Append the Elements
        this.header.appendChild(this.title); 
        this.header.appendChild(right);
        this.header.appendChild(left);
        this.el.appendChild(this.header);
      }
  
      this.title.innerHTML = this.current.format('MMMM YYYY');
    }
  
    Calendar.prototype.drawMonth = function() {
      var self = this;
      
      if(this.month) {
        this.oldMonth = this.month;
        this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
        this.oldMonth.addEventListener('webkitAnimationEnd', function() {
          //If months are clicked too fast - error here
          //removes old month 
          self.oldMonth.parentNode.removeChild(self.oldMonth);
          self.month = createElement('div', 'month');
          self.backFill();
          self.currentMonth();
          self.fowardFill();
          self.el.appendChild(self.month);
          window.setTimeout(function() {
            self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
          }, 16);
        });
      } else {
          this.month = createElement('div', 'month');
          this.el.appendChild(this.month);
          //backFill is the dates from the previous months 
          //that fill up the first week before the current 
          //month starts
          this.backFill();
          //currentMonth displays current month dates 
          this.currentMonth();
          //forwardfill are the next months dates that fill up
          //the last week of the current months
          this.fowardFill();
          this.month.className = 'month new';
      }
    }
  
    //visibe dates from previous month
    Calendar.prototype.backFill = function() {
      var clone = this.current.clone();
      var dayOfWeek = clone.day();
  
      if(!dayOfWeek) { return; }
  
      clone.subtract('days', dayOfWeek+1);
  
      for(var i = dayOfWeek; i > 0 ; i--) {
        this.drawDay(clone.add('days', 1));
      }
    }
  
    //visible dates from next month
    Calendar.prototype.fowardFill = function() {
      var clone = this.current.clone().add('months', 1).subtract('days', 1);
      var dayOfWeek = clone.day();
      //dayOfWeek = how many of the last 6 items in the last row of the month 
      //are part of the current month  
      if(dayOfWeek === 6) { return; }
  
      for(var i = dayOfWeek; i < 6 ; i++) {
        this.drawDay(clone.add('days', 1));
      }
    }
  
    Calendar.prototype.currentMonth = function() {
      var clone = this.current.clone();
  
      while(clone.month() === this.current.month()) {
        this.drawDay(clone);
        clone.add('days', 1);
      }
    }
  
  
    Calendar.prototype.getWeek = function(day) {
      if(!this.week || day.day() === 0) {
        this.week = createElement('div', 'week');
        this.month.appendChild(this.week);
      }
    }
  
    Calendar.prototype.drawDay = function(day) {
      var self = this;
      this.getWeek(day);
  
      //Outer Day
      var outer = createElement('div', this.getDayClass(day));
     
  
      //Drawing the day Name above the date
      var name = createElement('div', 'day-name', day.format('ddd'));
  
      //Drawing the day Number
      var number = createElement('div', 'day-number', day.format('DD'));

  
      outer.appendChild(name);
      outer.appendChild(number);
      this.week.appendChild(outer);
      return outer

    }
  

  
    Calendar.prototype.getDayClass = function(day) {
      classes = ['day'];
      if(day.month() !== this.current.month()) {
        classes.push('other');
      } else if (today.isSame(day, 'day')) {
        classes.push('today');
      }
      return classes.join(' ');
    }
  
    //going to the next month
    Calendar.prototype.nextMonth = function() {
      this.current.add('months', 1);
      this.next = true;
      this.draw();
      setTimeout(function(){
        dateSelector();
        console.log("loaded");
      },500);
    }
  
    //going to the previous month
    Calendar.prototype.prevMonth = function() {
      this.current.subtract('months', 1);
      this.next = false;
      this.draw();
      setTimeout(function(){
        dateSelector();
        console.log("loaded");
      },500);
    }
  
  
    window.Calendar = Calendar;
  
    function createElement(tagName, className, innerText) {
      var ele = document.createElement(tagName);
      if(className) {
        ele.className = className;
      }
      if(innerText) {
        ele.innderText = ele.textContent = innerText;
      }
      return ele;
    }
  }();
  
  !function() {
    var data = [];
    var calendar = new Calendar('#calendar', data);
  
  }();


dateSelector();

function dateSelector(){
  var dateSelects = document.querySelectorAll(".day:not(.other)");

// Loop through the buttons and add the active class to the current/clicked button
  for (var i = 0; i < dateSelects.length; i++) {
  dateSelects[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("day active");
  
    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace("day active", "day");
      
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}

}





