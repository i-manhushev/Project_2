 $(document).ready(function(){

 function validator() {
	var regName = /^[A-Za-z0-9_-]{2,20}$/,
			regEmail = /^([A-Za-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
			regMessage = /^.{1,140}$/,
			regExpArray = [regName, regEmail, regMessage],
			userNameInput = $('#username'),
      userEmailInput = $('#useremail'),
      userMessageInput = $('#usermessage'),
      inputsArray = [userNameInput, userEmailInput, userMessageInput],
      inputsAll = $('#username, #useremail, #usermessage');

  for (var i = 0; i < inputsArray.length; i++){
		inputCheck(inputsArray[i],regExpArray[i]);
	}
		if (inputCheck(inputsArray[0], regExpArray[0]) === true &&
        inputCheck(inputsArray[1], regExpArray[1]) === true &&
        inputCheck(inputsArray[2], regExpArray[2]) === true) {
        inputsAll.removeClass('rejected');
        inputsAll.closest('.form-group').find('span').removeClass('wrong-info');
        return true;
    } else {
        console.log('Sucker, your submitted form failed validation, hahahaha!!!');
        return false;
    }
}    

	function inputCheck(input,regExp){
		input.removeClass('rejected');
		input.closest('.form-group').find('span').text('');
		if (input.val().match(regExp)){
			 input.addClass('accepted');
			 return true;
		} else {
			 input.addClass('rejected');
			 input.focus();
			 //trying out different ELSE cases

			 if (input.val().length == 0) {
					input.closest('.form-group').find('span').addClass('wrong-info').text('* Empty field - empty head, huh?');
					return false;
			 } else if (input.val() !== RegExp) {

			 		//checking why our RegExp is not matched
					if (input.attr('id') == "username") {
             if (input.val().length < 2) {
                input.closest('.form-group').find('span').addClass('wrong-info').text('* OMG! Your name should contain at least 2 symbols!');
                return false;
             } else {
                input.closest('.form-group').find('span').addClass('wrong-info').text('* Dude, use proper symbols for your name, huh?');
                return false;
               } 
        	} else if (input.attr('id') == "useremail") {
              input.closest('.form-group').find('span').addClass('wrong-info').text('* Seriously? Don\'t you know how emails look like. For instance: example@gmail.com');
              return false;
          } else if (input.attr('id') == "usermessage") {
              input.closest('.form-group').find('span').addClass('wrong-info').text('* Can\'t exceed 140 symbols');
              return false;
            }
			 } else {
			 		input.closest('.form-group').find('span').addClass('wrong-info').text('* The input is so INVALID, hopefully you are different');
			 	 }
			}
	}
	//lets finally see what you've got in the form!
	$('form').on("submit",validator);

});




