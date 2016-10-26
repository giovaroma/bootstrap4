


//Start Changes nav color on scroll
/////////////////////////////////////////////////////
$(window).scroll(function() {
  var scrollPosition = $(this).scrollTop();
  if (scrollPosition > 0) {
    // $('nav').css("background-color", "black");
    $('nav').removeClass('navbar-default-color').addClass('navbar-scroll-color');
  } else {
    // $('nav').css("background-color", "transparent");
    $('nav').removeClass('navbar-scroll-color').addClass('navbar-default-color');
  }
});
//End Changes nav color on scroll




//Toggle for old mobile nav sub-menu within side nav(temp)
    $( "#verticals-mobile" ).click(function() {
        $( "#sub-menu-toggle" ).toggle( "slow", function() {
            // Mobile menu toggle animation
        });
    });
//End toggle for industries





//Pricing table toggle yearly and monthly
var proMonthly = 99;
var businessMonthly = 249;
var premierMonthly = 499;
var proYearly = 999;
var businessYearly = 2499;
var premierYearly = 4999;

//Need numbers to calculate annual amounts
function annualCost(monthly, numMonths) {
  var annualTotal = monthly * numMonths;
  return annualTotal;
}
// annualCost(proMonthly, 10)+ ' / yr')
$( ".toggle-btn" ).click(function() {
    if (document.getElementById('monthly').checked) {

         $( "#save-annual" ).removeClass( "hidden-savings" );

         $('.price-pro').text('$' + proMonthly);
         $('.pro-annual-total').hide();

         $('.price-business').text('$' + businessMonthly);
         $('.business-annual-total').hide();

         $('.price-premier').text('$' + premierMonthly);
         $('.premier-annual-total').hide();

         $('.price-monthly').text('/mo');

    } else if (document.getElementById('annual').checked){
        $( "#save-annual" ).addClass( "hidden-savings" );
         $('.price-pro').text('$' + proYearly);
         $('.pro-annual-total').show();
         $('.pro-annual-total').text('16% Savings');

         $('.price-business').text('$' + businessYearly);
         $('.business-annual-total').show();
         $('.business-annual-total').text('16% Savings');

         $('.price-premier').text('$' + premierYearly);
         $('.premier-annual-total').show();
         $('.premier-annual-total').text('16% Savings');

         $('.price-monthly').text('/yr');
    }
  });

 //Sign Up page error validation
 var $name = $("#name");
 var $last = $("#last");
 var $email = $("#username");
 var $password = $("#password");
 var $confirmPassword = $("#confirm_password");
 //industry var
 var $companyName = $("#company");
 var $selectIndustry = $("#select_industry");

 function isNameValid() {
 return $name.val().length > 0;
 }

 function isLastValid() {
 return $last.val().length > 0;
 }

 function isEmailValid() {
      var expr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if (expr.test($email.val())) {
    return true;
   }
 }

 function isCompanyValid() {
 return $companyName.val().length > 0;
 }

 //industry Validation
 function isIndustryValid() {
   if ($selectIndustry.val() === "industryDefault") {
       return false;
      } else {
       return true;
   }
 }

 function industryEvent() {
   if(isIndustryValid()) {
       $("#industryError").hide();
   } else {
       $("#industryError").show();
   }
 }

 function emailEvent() {

   if (isEmailValid()) {

       $email.next().hide();
   } else {
       $email.next().show();
   }
 }

 function nameEvent() {

   if (isNameValid()) {

       $name.next().hide();
   } else {
       $name.next().show();
   }
 }

 //Last Name Event
 function lastEvent() {

   if (isLastValid()) {

       $last.next().hide();
   } else {
       $last.next().show();
   }
 }

 function companyEvent() {

   if (isCompanyValid()) {

       $companyName.next().hide();
   } else {
       $companyName.next().show();
   }
 }


 function isPasswordValid() {
 return $password.val() && $password.val().length >= 8;
 }

 function arePasswordsMatching () {
 return $confirmPassword.val() === $password.val();
 }

 function emailEvent() {

   if (isEmailValid()) {

       $email.next().hide();
   } else {
       $email.next().show();
   }
 }

 function passwordEvent() {
  //If password matches more than 8 characters
 if (isPasswordValid()) {
   //Hide hint if valid
   $password.next().hide();
 } else {
   //Show hint if invalid
   $password.next().show();
 }//end else
 }//end function

 function confirmPasswordEvent() {
 //When event happens on confirmation input

 // Find out if password and confirmation match
 if (arePasswordsMatching()) {
   //Hide hint if valid
   $confirmPassword.next().hide();
 } else {
   //Show hint if invalid
   $confirmPassword.next().show();
 }
 // Hide hint if match
 //Else show hint if it does not match
 } // end function

 function canSubmit() {
   return isPasswordValid() && arePasswordsMatching();
   return isEmailValid();
   return isIndustryValid();
 }

 function enableSubmitEvent() {
 $('#submit').prop('disabled', !canSubmit())
 }


//AJAX submit form
 $('#signup-form').submit(function(event){
   $("#username-used-error").hide();
   enableSubmitEvent();

   $.ajax({

    //  url: '/app/dashboard?new_signup=1',
     url: 'https://test.dronedeploy.com/signin',
     type: 'POST',
     data: $('#signup-form').serialize(),

     error:function() {
       $("#username-used-error").show();
     },

     sucess:function() {
       $('#myModal').modal('show');
     }

   }); //ajax
   event.preventDefault();
 });


//Submit for sign up form modal
 $('#submit-modal').submit(function(event){
   if(canSubmit()){
     window.location = "/app/dashboard?new_signup=1";
   }
 });//submit-modal



 //Hide the hints
 $('form span').hide();

 //On submit errors
 $( "#signup-form" ).submit(function( event ) {
 $('#submit').click(industryEvent());
 event.preventDefault();
 });

 $name.focus(nameEvent).keyup(nameEvent).keyup(enableSubmitEvent);

 $last.focus(lastEvent).keyup(lastEvent).keyup(enableSubmitEvent);

 $email.focus(emailEvent).keyup(emailEvent).keyup(enableSubmitEvent);

 //Here I have one long event of the password and confirm password so it keeps track of both events
 $password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

 //Checks if password matches
 $confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

 $companyName.focus(companyEvent).keyup(companyEvent).keyup(enableSubmitEvent);

 //Industry other value other than "please select your industry"
 $selectIndustry.keyup(enableSubmitEvent);

 enableSubmitEvent(); //disables the submit button even before there is a keyup on the form this is why
 //you call this function and not just use the keyup method.

//Verify if on submit that a dropdown was completed
$( "#submit" ).click(function() {

  if ($selectIndustry.val() === "industryDefault") {
    $("#industryError").show();
    event.preventDefault(); // prevent form submision on error of industry not selected
  } else {
    $("#industryError").hide();
    // alert( "Handler for .click() called." );
  }
});


 //Toggle Checkbox
function toggleCheckbox() {
   $('input[type="checkbox"]').change(function(){
   $('#checkboxTrue').toggle(this.checked);
   }).change();
}

//Scripts at bottom of signup written by ? for coupon and parsing input
function getParameterByName(name) {
   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
   var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
       results = regex.exec(location.search);
   return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var coupon = getParameterByName('coupon');

if (coupon) {
      console.log('Setting coupon: ' + coupon);
      document.getElementById("checkboxTrue").value = coupon;
      document.getElementById("checkboxTrue").style.display = 'block';
      document.getElementById("toggleCoupon").checked = true;
} else {
      console.log('Not setting coupon');
}


/// Webinar form submission event
$('#webinar-form').submit(function(event){
//  $("#username-used-error").hide();
enableSubmitEvent();
if(canSubmit()){
  $.post( "/contact", $( "#webinar-form" ).serialize() ).done(function(response){
    //set localstorage
    var env = window.location.hostname.split(".")[0];
    //redirect
    window.location = "/webinar-thanks.html"
  });
//        .fail(function(){
//      $("#username-used-error").show();
//    });
}
event.preventDefault();
});

//Intercom button
// Intercom('hide');
$( "#intercom-conversation" ).click(function() {
  Intercom('showNewMessage');
}); // click event jquery
