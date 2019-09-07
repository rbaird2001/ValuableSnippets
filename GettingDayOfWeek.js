
var presentTime = new Date()

//USE Objects
var weekday = {0:"Sunday",
               1:"Monday",
               2:"Tuesday",
               3:"Wednesday",
               4:"Thursday",
               5:"Friday",
               6:"Saturday"};
undefined
console.log(weekday[presentTime.getDay()]);

//USE Switch
switch(presentTime.getDay()){
    case 0: 
        dow = "Sunday";
        break;
    case 1:
        dow = "Monday";
        break;
    case 2:
        dow = "Tuesday";
        break;
    case 3:
        dow = "Wednesday";
        break;
    case 4:
        dow = "Thursday";
        break;
    case 5:
        dow = "Friday";
        break;
    case 6: 
        dow = "Saturday";
        break;
    default:
        dow = "undefined";
        break;
}
console.log(dow);