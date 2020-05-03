$(document).ready(function(){

var maxsizeplant = 0.0;
var maxsizeservice = 0.0;
var plantarea = 0.0;

$("#roofarea").on("blur",function()
{
    var isEmpty = CheckIfEmpty($("#roofarea"));

    if(isEmpty)
    {
      var isNumber = CheckIfNumeric($("#roofarea"));
      if(isNumber)
      {
        plantarea  = $(this).val() / 80;
         $("#plantarea").val(plantarea.toFixed(2) + " KWp" );
      }
    }
});

$("#serviceload").on("blur",function()
{
    var isEmpty = CheckIfEmpty($("#serviceload"));

    if(isEmpty)
    {
      var isNumber = CheckIfNumeric($("#serviceload"));
      if(isNumber)
      {
         maxsizeservice  = ($(this).val() * 90)/100;
         $("#maxsizeservice").val(maxsizeservice.toFixed(2)+ " KWp" );
      }
    }
});

$("#monthlyunits").on("blur",function()
{
   var isEmpty = CheckIfEmpty($("#monthlyunits"));

    if(isEmpty)
    {
      var isNumber = CheckIfNumeric($("#monthlyunits"));
      if(isNumber)
      {
         maxsizeplant  = $(this).val()/150;
         var isOtherFieldsEmpty = CheckIfEmptyEx();
        // console.log(isOtherFieldsEmpty);
         if(!isOtherFieldsEmpty)
         {
            $("#maxsizeplant").val(maxsizeplant.toFixed(2) + " KWp" );
         
         $("#optimumsize").html("<p style='color:black;font-size:medium;font-weight:bolder;'>Optimum Size based on your usage: <span sytle='color:black;font-size:larger;font-weight:bolder;'>" + Math.min(maxsizeplant,maxsizeservice,plantarea) + " KWp</span></p>");
         }
         
        
         
      }
    }

});

function CheckIfEmpty(IDofObject)
{
   var isValid = false;
  if($.trim($(IDofObject).val()) == '')
    {
         isValid = false;
         $(IDofObject).attr("placeholder", "Please input an integer value");
          $(IDofObject).focus();
        $(IDofObject).css({
				"border": "1px solid red",
				"background": "#FFCECE"
			});
    }
    else
    {
        isValid = true; 
     $(IDofObject).css({
			"border": "",
			"background": ""
		});
    }
    return isValid;
}
function CheckIfNumeric(IDofObject)
{
    var isValid = false;
   if($.isNumeric($(IDofObject).val()))
   {
     isValid = true;
     $(IDofObject).css({
			"border": "",
			"background": ""
		});
   }
   else
   {
       isValid = false;
       $(IDofObject).val("");
       $(IDofObject).focus();
       $(IDofObject).attr("placeholder", "Please input an integer value");
       $(IDofObject).css({
				"border": "1px solid red",
				"background": "#FFCECE"
			});
   }
   return isValid;
}

function CheckIfEmptyEx()
{
  var isEmpty = false;
  $('#roofarea,#serviceload').each(function()
		{
			if($.trim($(this).val()) == '')
			{
				isEmpty = true;
				$(this).attr("placeholder", "Please input an integer value");
				$(this).css({
					"border": "1px solid red",
					"background": "#FFCECE"
				});
			}
			else
			{
			      isEmpty = false;
				$(this).css({
					"border": "",
					"background": ""
				});					
				
			}
		});
		
		return isEmpty;
}

function CheckAllFields()
{
  var isValid = false;
  $('#roofarea,#serviceload,#monthlyunits,#name,#email').each(function()
		{
			if($.trim($(this).val()) == '')
			{
				isValid = false;
				$(this).css({
					"border": "1px solid red",
					"background": "#FFCECE"
				});
			}
			else
			{
			      isValid = true;
				$(this).css({
					"border": "",
					"background": ""
				});					
				
			}
		});
		
		return isValid;
}

$("#email").on("blur",function()
{
       var userinput = $(this).val();
	var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
	
	if(!pattern.test(userinput))
	{
	   $(this).css({
					"border": "1px solid red",
					"background": "#FFCECE"
				});
	}
	else
	{
	 $(this).css({
					"border": "",
					"background": ""
				});
	}
 });

$("#BtnSendMsg").on("click",function(e)
{
   e.preventDefault();
   
   var IsEmpty = CheckAllFields();
   if(IsEmpty)
   {
     var type="AddEnquiry";
     var custname = $("#name").val();
     var custmail = $("#email").val();
     var roofarea = $("#roofarea").val();
      var serviceload= $("#serviceload").val();
       var monthlyunits = $("#monthlyunits").val();
     $.post("CRUD.php",{type:type,custname:custname,custmail:custmail,roofarea:roofarea,serviceload:serviceload,monthlyunits:monthlyunits},function(response,status)
     {
     console.log(response);
     	if (response.toLowerCase().indexOf("failed") >= 0)
     	{
     	    $("#MsgStatus").html("<p>We are facing some technical issues. Sorry for the inconvenience</p>");
     	}
     	else
     	{
     	   $("#MsgStatus").html("<p>Thank you so much for your interest. We will get back to you shortly</p>");
     	}
     });
     
   }
   else
   {
     $("#MsgStatus").html("<p>Please fill up all the details so that we can get back to you with precise information</p>");
   }
   
});
	

});