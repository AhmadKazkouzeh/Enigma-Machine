var out = document.getElementById('out');
var message = document.getElementById('message');
var result = document.getElementById('result');
var alphabets =    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var plugboard = {};
var startingPoint = [1, 1, 1];
//subsitution tabels
var rotorTypeOne = ['B', 'D', 'F', 'H', 'J', 'L', 'C', 'P', 'R', 'T', 'X', 'V', 'Z', 'N', 'Y', 'E', 'I', 'W', 'G', 'A', 'K', 'M', 'U', 'S', 'Q', 'O'];
var rotorTypeTwo = ['A', 'J', 'D', 'K', 'S', 'I', 'R', 'U', 'X', 'B', 'L', 'H', 'W', 'T', 'M', 'C', 'Q', 'G', 'Z', 'N', 'P', 'Y', 'F', 'V', 'O', 'E'];
var rotorTypeThree=['E', 'K', 'M', 'F', 'L', 'G', 'D', 'Q', 'V', 'Z', 'N', 'T', 'O', 'W', 'Y', 'H', 'X', 'U', 'S', 'P', 'A', 'I', 'B', 'R', 'C', 'J'];

var rotorTypeFour =['E', 'S', 'O', 'V', 'P', 'Z', 'J', 'A', 'Y', 'Q', 'U', 'I', 'R', 'H', 'X', 'L', 'N', 'F', 'T', 'G', 'K', 'D', 'C', 'M', 'W', 'B'];
var rotorTypeFive =['V', 'Z', 'B', 'R', 'G', 'I', 'T', 'Y', 'U', 'P', 'S', 'D', 'N', 'H', 'L', 'X', 'A', 'W', 'M', 'J', 'Q', 'O', 'F', 'E', 'C', 'K'];

var reflectorB =   ['E', 'J', 'M', 'Z', 'A', 'L', 'Y', 'X', 'V', 'B', 'W', 'F', 'C', 'R', 'Q', 'U', 'O', 'N', 'T', 'S', 'P', 'I', 'K', 'H', 'G', 'D'];
var reflectorC = ['Y', 'R', 'U', 'H', 'Q', 'S', 'L', 'D', 'P', 'X', 'N', 'G', 'O', 'K', 'M', 'I', 'E', 'B', 'F', 'Z', 'C', 'W', 'V', 'J', 'A', 'T'];
var reflector = reflectorB;
var calc_text = "";

var rotorOne = [];
var rotorTwo = [];
var rotorThree = [];




//setting the three main rotors out of the five
function selectRotors(rotor_one, rotor_two, rotor_three) {
  rotorOne = rotor_one.slice(0);
  rotorTwo = rotor_two.slice(0);
  rotorThree = rotor_three.slice(0);
}


function encrypt() {
//run the enimga machine process


  calc_text = "";
  result.innerText = "";
  for (var x = 0; x < message.value.length; x++) {

    var c = findPlugboardValue(plugboard, message.value.charAt(x).toUpperCase());

    calc_text += findPlugboardValue(plugboard, alphabets[fi(alphabets[fi(alphabets[fi(reflector[fi(rotorThree[fi(rotorTwo[fi(rotorOne[fi(c, alphabets)], alphabets)], alphabets)], alphabets)], rotorThree)], rotorTwo)], rotorOne)]);
    result.innerText = calc_text;
    
    increment();

  }
  updateSP();
}


//findIndex function
function fi(character, from) { 
  for (var i = 0; i < from.length; i++) {
    if (from[i].indexOf(character) != -1) {
      return i;
    }

  }
}





//function to sheft the rotors to the right 
function twistRotor(arr, places) {
  for (var i = 0; i < places; i++) {
    arr.unshift(arr.pop());
  }
}


//updating the three rotors positin on each letter encryption/decryption
function increment() {
  startingPoint[0]++;
  if (startingPoint[0] == 27) {
    startingPoint[0] = 1;
  }
  twistRotor(rotorOne, 1);
  if (18 == startingPoint[0]) {
    startingPoint[1]++;
    if (startingPoint[1] == 27) {
      startingPoint[1] = 1;
    }
    twistRotor(rotorTwo, 1);
    if (23 == startingPoint[1]) {
      startingPoint[2]++;
      if (startingPoint[2] == 27) {
        startingPoint[2] = 1;
      }
      twistRotor(rotorThree, 1);
    }
  }


}
//to find the values that been pluged to eachother
function findPlugboardValue(object, value) {
  if (Object.keys(object).find(key => object[key] === value)) {
    return Object.keys(object).find(key => object[key] === value);
  } else if (plugboard[value]) {
    return plugboard[value];
  } else {
    return value;
  }
}

//go button 
document.getElementById("encryptBtn").addEventListener("click", function () {
  encrypt();
});
//clear button
document.getElementById("clearBtn").addEventListener("click", function () {
  message.value = "";
  result.innerText = "";
  selectRotors(eval($('#rotorOneS').val()), eval($('#rotorTwoS').val()), eval($('#rotorThreeS').val()));
});













/*-------CODE FOR GUI-------*/
for (let index = 0; index < alphabets.length; index++) {
  document.getElementById('rotorOneSP').innerHTML += "<option value='" + index + "'>" + alphabets[index] + "</option>";//selcting start position from the GUI for the first rotor
  document.getElementById('rotorTwoSP').innerHTML += "<option value='" + index + "'>" + alphabets[index] + "</option>";//selcting start position from the GUI for the second rotor
  document.getElementById('rotorThreeSP').innerHTML += "<option value='" + index + "'>" + alphabets[index] + "</option>";//selcting start position from the GUI for the third rotor
  //selcting pluged values from the GUI 
  document.getElementsByClassName('plugboard-selection')[0].innerHTML += '<div class="uk-width-auto">' + alphabets[index] + ': <input id="' + alphabets[index] + '" type="text"maxlength="1"value=""></div>'
}
//event listeners for drop down rotor starting position, rotor type, reflector and error input monitering 
$('#rotorOneS').change(function () {
  rotorSelectionError();
});
$('#rotorTwoS').change(function () {
  rotorSelectionError();
});
$('#rotorThreeS').change(function () {
  rotorSelectionError();
});

$('#rotorOneSP').change(function () {
  updateSP();

});
$('#rotorTwoSP').change(function () {
  updateSP();

});
$('#rotorThreeSP').change(function () {
  updateSP();

});
$('#reflectorS').change(function () {
  reflector = eval($('#reflectorS').val());
});
function selectReflector(reflector){

}
// function to keep updating the start positions while data in process 
function updateSP() {
  startingPoint = [parseInt($('#rotorOneSP').val()) + 1, parseInt($('#rotorTwoSP').val()) + 1, parseInt($('#rotorThreeSP').val()) + 1];
  selectRotors(eval($('#rotorOneS').val()), eval($('#rotorTwoS').val()), eval($('#rotorThreeS').val()));
  twistRotor(rotorOne, 26 - startingPoint[0] + 1);
  twistRotor(rotorTwo, 26 - startingPoint[1] + 1);
  twistRotor(rotorThree, 26 - startingPoint[2] + 1);
}
//function for selecting rotors if they are not unique 
function rotorSelectionError() {
  if (($('#rotorOneS').val() == $('#rotorTwoS').val()) || ($('#rotorThreeS').val() == $('#rotorTwoS').val()) || ($('#rotorOneS').val() == $('#rotorThreeS').val())) {
    $('#rotorSelectionError').fadeIn();
    $('#message').prop('disabled', true);
  } else {
    $('#rotorSelectionError').fadeOut();
    $('#message').prop('disabled', false);

    startingPoint = [1, 1, 1];
    updateSP();
  }
}
//wait for all the document elements to be loaded and ready the run the following functions 
$(document).ready(function () {
  rotorSelectionError();
  encrypt();
  plugError(false);
  var regExp = /[a-zA-Z ]/i;
  $('#message').on('keydown keyup', function(e) {
    var value = String.fromCharCode(e.which) || e.key;

    // No other than letters & backspace
    if (!regExp.test(value) && e.keyCode != 8) {
      e.preventDefault();
      return false;
    }
  });
});





/* ------ Plugboard Stuff ------*/

var plugboardinputs = document.querySelectorAll('.plugboard-selection input');
//For each plugboard letter add an event listener that validates and update plugboard object while giving error messages if needed
plugboardinputs.forEach(function (elem) {
  elem.addEventListener("keyup", function (event) {
    var inputedValue = elem.value.toUpperCase().toString();
    var inputedValueField = elem.id.toUpperCase().toString();
    
    console.log(event.keyCode);
    if(event.keyCode == 8){ //backspace
      if(plugboard[inputedValueField]){document.getElementById(plugboard[inputedValueField]).value = ""};
      if(plugboard[inputedValueField]){document.getElementById(plugboard[inputedValueField]).disabled = false};
      delete plugboard[inputedValueField];
      console.log('deleted entry');
      plugError(false);
    }
    else if(event.keyCode >= 65 && event.keyCode <= 90){ //alpha letters
      if (((findPlugboardValue(plugboard, inputedValue) == inputedValue) && (findPlugboardValue(plugboard, inputedValueField) == inputedValueField)) && (inputedValue != inputedValueField)) {
        console.log("letter is not used");
        plugboard[inputedValueField] = inputedValue;
        document.getElementById(elem.value.toUpperCase()).value = elem.id.toUpperCase();
        document.getElementById(elem.value.toUpperCase()).disabled = true;
       plugError(false);
        
      }
      else{
        console.log("letter is used");
        plugError(true);
        elem.value = findPlugboardValue(plugboard, elem.id);
      }
    }
    else{
      if (!((findPlugboardValue(plugboard, inputedValue) == inputedValue) && (findPlugboardValue(plugboard, inputedValueField) == inputedValueField)) && !(inputedValue != inputedValueField)) {
        elem.value = "";
      }
      elem.value = findPlugboardValue(plugboard, elem.id);
    }

  });

});

//a function to toggle plugboard error using jQuery
function plugError(show){
  if(show){
    $('#plugError').fadeIn();
    $('#message').prop('disabled', true);
  }
  else{
    $('#plugError').fadeOut();
    $('#message').prop('disabled', false);
  }
}