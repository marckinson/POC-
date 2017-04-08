

// BlockBuster load modal

var USER_SELECTION_ID = 'userSelection';
var USER_INFO_ID = 'currentUserName';

var DEFAULT_USER_NAME = 'Anonymous';
var CURRENT_USER_NAME = DEFAULT_USER_NAME;


$(document).ready(function() {
	$('#loadingModal').load('../modals/loading.html', function() {
		console.log("loadingModal was loaded !");
	});
	startLoading();
	
	$('#eventModal').load('../modals/eventModal.html', function() {
		console.log("eventModal was loaded !");
	});

	$('#jsonResult').load('../modals/jsonResult.html', function() {
		console.log("jsonResult was loaded !");
	});

	$('#changeCurrentUser').load('../modals/changeUser.html', function() {
		console.log("changeCurrentUser was loaded !");
	});

	$('#createPaymentInstructionModal').load('../modals/createPaymentInstructionModal.html', function() {
		console.log("createPaymentInstructionModal was loaded !");
	});

	$('#updatePaymentInstructionModal').load('../modals/updatePaymentInstructionModal.html', function() {
		console.log("updatePaymentInstructionModal was loaded !");
		$('#updateTable').bootstrapTable();
		$("#updateReceived").click({status: "1"}, updatePayment);//Payment validate cf handlingFormatter
		$("#updateCorrupted").click({status: "2"}, updatePayment);//Payment corrupted cf handlingFormatter
		$("#updateCustom").click({status: "3"}, updatePayment);
	});

	$('#handlePaymentInstructionModal').load('../modals/handlePaymentInstructionModal.html', function() {
		console.log("handlePaymentInstructionModal was loaded !");
	});

	$('#uploadModal').load('../modals/uploadModal.html', function() {
		console.log("uploadModal was loaded !");
	});

	$('#downloadModal').load('../modals/downloadModal.html', function() {
		console.log("downloadModal was loaded !");
	});


	$('#historicModal').load('../modals/historicModal.html', function() {
		console.log("historicModal was loaded !");
	    $('#historyTable').bootstrapTable();
	    console.log("bootstrapTable #historyTable");
	});
	
	refreshUserName();
	
	requestMembers(function(data) {
		var members = JSON.parse(data);
		var select = $('#' + USER_SELECTION_ID);
		select.html('<option value=""></option>')
		var option, member;
		for (var idx in members) {
			member = members[idx];
			option  = $('<option>');
			option.html(member.name);
			option.attr('value', member.name);
			select.append(option);
		}
	});

	$('body').on('submit', 'form[data-async]', function(e) {
		startAsynTreatment(this);
		e.preventDefault();
	});
	
	stopLoading();

});

//-----------------------------




// BlockBuster util functions

//Use in bootstrap-table
function dateFormatter(value) {
    return value ? new Date(Number(value)).toLocaleString('en-EN'):"";
}

function hashFormatter(value) {
	return '<a href="/api/download?ui8=' + encodeURIComponent(value) + '" title="'+value+'" target="_blank">Payment file</a>';
}

function handlingFormatter(value){
	let stringValue;
	switch (value) {
    case 0:
        stringValue = "0:Send";
        break;
    case 1:
        stringValue = "1:Validated";
        break;
    case 2:
        stringValue = "2:Corrupted";
        break;
    case 3:
        stringValue = "3:Custom Bank Status";
        break;
    default:
        stringValue = "*:Bad Input";

	}
	return stringValue;
}


function startLoading() {
	$('#loadingModal').fadeIn();
}

function stopLoading() {
	$('#loadingModal').fadeOut();
}

function refreshUserName() {
	$('#' + USER_INFO_ID + ' > a').html(getCurrentUser());
}

function changeCurrentUserSubmit() {
	currVal = $('#' + USER_SELECTION_ID).val();
	CURRENT_USER_NAME = currVal.length > 0 ? currVal : DEFAULT_USER_NAME;
	refreshUserName();
	$('#' + USER_SELECTION_ID).closest('.api-modal.modal.fade').modal('hide');
	return false;
}

function getCurrentUser() {
	return CURRENT_USER_NAME;
}

function requestMembers(callback) {
	$.ajax({
		url: '/info/members',
		success: function (d) {
			callback(d);
		},
		async: true,
		crossDomain: true,
		method: "GET",
		headers: {}
	});
}

function startAsynTreatment(f) {
	startLoading();
	var form = $(f);
	var target = $(form.attr('data-target'));
	var parentModal = form.closest('.api-modal.modal.fade');
	var successMsg = form.attr('success-msg');
	var errorMsg = form.attr('error-msg');
	var dataTableId = form.attr('data-table');
	var dataTable;
	if (dataTableId) {
		dataTable = $(dataTableId);
	}
	var enctype = form.attr('enctype');
	var isFormData = enctype === 'multipart/form-data';
	enctype = isFormData ? false : enctype;
	var dataForm = isFormData ? new FormData(f) : JSON.stringify(serializeForm(form));
	
	$.ajax({
		type: form.attr("method"),
		dataType: "JSON",
		url: form.attr('action'),
		data: dataForm,
		async: true,
		crossDomain: true,
		headers: {},
		cache: false,
		processData: false,
		contentType: enctype
	}).catch(function(err) {
		var errMsg = err.responseText;
		if (errMsg) {
			var jsonErrMsg = JSON.parse(errMsg);
			target.find('.json-rest-result').html(JSON.stringify(jsonErrMsg, null, 2));
		}
		target.find('.text-result').html(errorMsg);
		target.modal('show');
		console.error(errorMsg);
		stopLoading();
	}).then(function(d){
		if(typeof d === "string" || d instanceof String){
			d = JSON.parse(d);
		}
		if (d.message === "SUCCESS") {
			parentModal.modal('hide');
			target.find('.text-result').html(successMsg);
			
			var transactionId = d.result.split(" ")[1];
			checkTransaction(transactionId, function(err) {
				var errMsg = err.responseText;
				if (errMsg) {
					var jsonErrMsg = JSON.parse(errMsg);
					target.find('.json-rest-result').html(JSON.stringify(jsonErrMsg, null, 2));
					d = jsonErrMsg;
				}
				target.find('.text-result').html(errorMsg);
				console.error(errorMsg);
				stopLoading();
			}).then(function() {
				f.reset();
			});
			
		} else {
			target.find('.text-result').html(errorMsg);
		}
		target.find('.json-rest-result').html(JSON.stringify(d, null, 2));
		target.modal('show');
		//reset bootstrap table
		if (dataTable) {
			dataTable.bootstrapTable('removeAll');
		}
		stopLoading();
	});
}

function checkTransaction(txId, callbackErr) {
	return $.ajax({
			type: 'GET',
			dataType: "JSON",
			url: '/info/txs/' + txId,
			async: true,
			crossDomain: true,
			headers: {}
		}).catch(function(err) {
			if (callbackErr) {
				callbackErr(err);
			}
		});
}

//
updatePayment = function (event) {
	var data = $('#updateTable').bootstrapTable('getSelections');
	var status;
	if (data && data.length == 1){
		status = event.data.status;
		var payment = data[0];
		var checksum = payment.checksum;
		var f = document.getElementById('updatePaymentInstruction'); // Form
		
		f.status.value = status;
		f.checksum.value = checksum;
		
		startAsynTreatment(f);
	}
	console.log(payment, handlingFormatter(status));
}

function serializeForm(form) {
	var result = {};
	$(form).serializeArray().map(function(x){result[x.name] = x.value;});
	return result;
}

// Get payment information
function getPayments(username, emitter, handler, status){
	return $.ajax({
		url: '/api/payments',
		async: true,
		crossDomain: true,
		method: "GET",
		headers: {},
		data : {
			username: username,
			emitter: emitter,
			handler: handler,
			status: status
		}
		/*,
		error:function(jqXHR, textStatus, errorThrown) {
			stopLoading();
			alert('An error occurred... Error['+jqXHR+']');
		}*/
	});
}

function changeEmitter(elm) {
	startLoading();
	var index = elm.options.selectedIndex;
	var username = elm.options[index].value;
	let successId = "#updateSuccess";
	let tableId = "#updateTable";
	let emitter = "";

	let handler = username;
	let status = "0";
	let captionHTML = "List of payments for " + handler;
	//change emitter from History or update payment
	if (elm.id === "usernameHistory") {
		successId = "#historySuccess";
		tableId = "#historyTable";
		status = "";
		handler = "";
		if(username === "Regulator_A"){
			// REGULATOR VIEW
			// NO FILTER
			emitter = "";
		}else{
			emitter = username;
		}
		captionHTML = "List of payments of " + emitter;
	}


	getPayments(username, emitter, handler, status).catch(function(err){
		var errMsg = err.responseText;
		if (errMsg) {
			var jsonErrMsg = JSON.parse(errMsg);
			pre = $(successId+' > pre')
			pre.html(JSON.stringify(jsonErrMsg, null, 2));
		}
		console.error("An error occured on GetPayments");
		stopLoading();
	}).then(function (d) {
		let payments = JSON.parse(d);
		console.log('Payments: ');
		console.log(payments);
		pre = $(successId+' > pre')
		pre.html(d);
		table = $(tableId);
		caption = table.find('caption');
		caption.html(captionHTML);
		if (payments) {
			$(tableId).bootstrapTable('load', payments);
		} else {
			$(tableId).bootstrapTable('removeAll');
		}
		stopLoading();
	});
}
