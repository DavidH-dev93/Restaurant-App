$(document).ready(function () {
  transactionValidation();
  selectSingleText();
  setNoOfTable();
  checkNoOfChair();
  voidSelection();
  tableRowSelection();
  addOnItemRightSideSelect();
  update_qty();
  addOnTransaction();
  addCondiment();
  posTableClick();
  allowFloatValue();
  isErrorCheckFunction();
  numericaPadForGuest();
  coverBtnClick();
  showConfirmationPopupFunction();
  submitCoverGuest();
  cancelCoverGuest();
  cancelSidemenu();
  editSeatNumber();
  checkPickupTable();
  beginCheckPopup();
  openFunctionReportTab();
  pickupCheckClick();
  selectSinglePickupCheckRow();
  selectSingleDriverRow();
  okButtonPickupCheck();
  clearNumeberpadSelection();
  changeStatusofCheck();
  selectOrderType();
  transferCheck();
  openDashboardNewTransactipnPopup();
  transferTableDiv();
  setErrorMessageForTransferCheck();
  splitCheckPopupOpen();
  checkTableTrSelect();
  displayEmployeeModalPopup();
  setTransferTable();
  openTableSelection();
  shareItemPopup();
  beginCheckByNamePopup();
  customerSearchBeginCheck();
  customerSearchBeginCheckTextBox();
  openNewCustomerPopup();
  beginCheckByNameOrderTypeBtn();
  backBtnInAddressForm();
  newTransactionPopupData();
  areaSelectionPosCcheck();
  orderTypeSelectionBeginCheckByName();
  bindCheckWithAddress();
  openNewCustomerCheckIdPopup();
  backBtnInAddressFormCheckId();
  saveCheckValidation();
  saveDriver();
  paymentModal();
  referencePromptAlphabetPad();
  doPaymentFromDifferentMethod();
  okBtnOfRemainAmountPopup();
  editClosedCheck();
  okBtnPaymentMethod();
  handleCheckChange();
  handleCheckChangeOffer();
  currencyPopup();
  switchTabReports();
  cashNavigation();
  openOrderAcceptBtn();
  selectPaymentData();
  removeDiscount();
  scheduleCatering();
  posPaymentData();
  payBtnInQuickPay();
  openKDSItem();
  submitColor();
  kdsDivSlot();
  bumpBtnClick();

  $('.seat_no_column').click(function(e){
    e.preventDefault();
  })
  $('.modal').on("hidden.bs.modal", function(e) { 
    if ($('.modal:visible').length) { 
        $('body').addClass('modal-open');
    }
  });

  $('#current_date').empty().text(moment().format('MM-DD-YYYY'));
  $('#current_time, #current_time1').empty().text(moment().format('h:mm A'));
  setInterval(update, 1000);
  $('.sidenav a').on('click', function() {
    $('.sidenav a').removeClass('active-link');
    $(this).addClass('active-link');
  });

  $(".disabled-link-img").on("click", function() {
    if (!$(this).hasClass('pending_transaction')){
      swal("Coming Soon!");
    }
  });

  $(".inactive-coverage-area-link").on("click", function() {
    swal("Please Open Coverage Area First.");
  });

  $(".third-paty-delivery-charge-yes").on("click", function () {
    $("#delivery_charges, #minimum_order_amount").val("0");
    $("#delivery_charges, #minimum_order_amount").prop("readonly", true);
    $(".credit-card-machine-no").prop("checked", true);
    $(".credit-card-machine-yes, .credit-card-machine-no").prop("disabled", true);
    $(".third-paty-delivery-type-option-list").removeClass("hide");
  });

  $(".third-paty-delivery-charge-no").on("click", function () {
    $("#delivery_charges, #minimum_order_amount").prop("readonly", false);
    $(".credit-card-machine-yes, .credit-card-machine-no").prop("disabled", false);
    $(".third-paty-delivery-type-option-list").addClass("hide");
  });

  if($("#delivery_transporter_mobile_number").length > 0) {
    $("#delivery_transporter_mobile_number").intlTelInput({
      allowDropdown: true,
      autoHideDialCode: true,
      autoPlaceholder: "on",
      dropdownContainer: "body",
      excludeCountries: [],
      formatOnDisplay: true,
      geoIpLookup: function(callback) {
        $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      },
      hiddenInput: "full_phone",
      initialCountry: "auto",
      nationalMode: true,
      initialCountry: 'bh',
      onlyCountries: [],
      placeholderNumberType: "MOBILE",
      preferredCountries: ['bh'],
      separateDialCode: true,
      utilsScript: "/assets/telinput/utils.js"
    });
  }

  var telInput = $("#delivery_transporter_mobile_number"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");

  var reset = function() {
    telInput.removeClass("error");
    errorMsg.addClass("hide");
    validMsg.addClass("hide");
  };

  telInput.blur(function() {
    testContact()
  });

  // on keyup / change flag: reset
  telInput.on("keyup change", reset);

  var testContact = function() {
    reset();
    if ($.trim(telInput.val())) {
      if (telInput.intlTelInput("isValidNumber")) {
        validMsg.addClass("hide");
        errorMsg.removeClass("show");
        return true;
      } else {
        err =  telInput.intlTelInput('getValidationError'),
        message = null;

        switch (err) {
          case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:
            message = 'The country code is not valid';
            break;
          case intlTelInputUtils.validationError.TOO_SHORT:
            message = 'The phone number is too short';
            break;

          case intlTelInputUtils.validationError.TOO_LONG:
            message = 'The phone number is too long';
            break;

          case intlTelInputUtils.validationError.NOT_A_NUMBER:
            message = 'The value is not a number';
            break;
          default:
            message = 'The phone number is not valid';
          break;
        }
        telInput.addClass("error");
        errorMsg.removeClass("hide");
        errorMsg.addClass("show");
        errorMsg.text(message);
        return false;
      }
    } else {
      return false;
    }
  }

  $("#add_delivery_trasnporter").on("click",function(){
    var cpr_number= /^\d*$/
    var cpr = $("#cpr_number").val();
    var emp_name = $("#name").val();
    var country_code = $("#delivery_transporter_mobile_number").intlTelInput("getSelectedCountryData");
    var file = document.getElementById('add-img-tag').files[0];

    if (file !== undefined) {
     var file_type = file.type.split('/').pop().toLowerCase();
     var file_size = file.size;
    }

    $("#country-code").val(country_code.dialCode)

    if($.trim(emp_name) === "" || emp_name.length >= 41 || emp_name.length <= 0) {
      swal({
        title: "Please Enter valid Name",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
      }),
      $('#name').focus();
      return false;
    } else if (cpr.length >= 11 || $.trim($('#cpr_number').val()) == '' || !(cpr_number.test($('#cpr_number').val()))) {
      swal({
        title: "Please Enter valid cpr_number",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
      }),
      $('#cpr_number').focus();
      return false;
    } else if($.trim($("#delivery_transporter_mobile_number").val()) === "") {
      $("#delivery_transporter_mobile_number").focus();
      swal("Warning", "Please enter phone number", "warning")
      return false;
    } else if(!testContact()) {
      $("#delivery_transporter_mobile_number").focus();
      swal("Warning", "Please enter a valid phone number", "warning")
      return false;
    } else if($.trim($("#password").val())==="") {
      $("#password").focus();
      swal("Warning","Please enter password","warning")
      return false;
    } else if(file && file_size > 1024000) {
      $("#add-img-tag").focus();
      swal("Warning", "Failed to upload an image. The image maximum size is 1MB.", "warning")
      return false;
    } else if(file && file_type != "jpeg" && file_type != "jpg" && file_type != "png") {
        $("#add-img-tag").focus();
        swal("Warning", "Failed to upload an image. Please upload file having extensions .jpeg/.jpg/.png only.", "warning")
        return false;
    } else {
      return true;
    }
  });

  var country_code = "";

  $(".edit-transporter").on("click", function() {
    var eleId = $(this).attr("id");
    var empname = $("#" + eleId + "-empname").text();
    var cpr_number = $("#" + eleId + "-empemail").text();
    var contact = $("#" + eleId + "-contact").text();
    var image = $("#" + eleId + "-img").attr('src');
    var zoneIds = $("#" + eleId + "-zones").data("id");
    var vehicle_type = $("#"+eleId+"-vehicle_type").text();

    if($.trim(vehicle_type) == "Bike") {
      $("#vehicle_type option[value='false']").prop('selected', true);
    } else if($.trim(vehicle_type) == "Car") {
      $("#vehicle_type option[value='true']").prop('selected', true);
    } else {
      $("#vehicle_type option[value='true']").prop('selected', false);
      $("#vehicle_type option[value='false']").prop('selected', false);
    }

    $("#emp_id").val(eleId);
    $("#name").val(empname);
    $("#email").val(cpr_number);
    $(".select2_zone").val(zoneIds).change();
    $("#delivery_transporter_mobile_number").val(contact.split(' ')[1]);
    country_code = contact.split(' ')[0];
    $(".add-img-tag").attr("src", image);
    $("#edit-content").modal({backdrop: 'static', keyboard: false});
    $("#edit-content").modal("show");
  });

  $(".reset-transporter-password").on("click",function(){
    var eleId = $(this).attr('id');
    $("#transporter_id").val(eleId);
    $('#reset-password').modal({backdrop: 'static', keyboard: false});
    $("#reset-password").modal("show");
  });

  $("#update_transporter").on("click",function(){
    var name = /^([a-zA-Z]+\s)*[a-zA-Z]+$/
    var country_code = $("#delivery_transporter_mobile_number").intlTelInput("getSelectedCountryData");
    var file = document.getElementById("add-img-tag").files[0];

    if (file !== undefined){
     var file_type = file.type.split('/').pop().toLowerCase();
     var file_size = file.size;
    }

    $("#country-code").val(country_code.dialCode)

    if(!name.test($('#name').val())){
      swal({
        title: "Please Enter Name",
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Ok",
      }),
      $('#name').focus();
      return false;
    } else if($.trim($("#delivery_transporter_mobile_number").val()) === "") {
      $('#delivery_transporter_mobile_number').focus();
      swal("Warning", "Please enter phone number", "warning")
      return false;
    } else if(!testContact()) {
      $('#delivery_transporter_mobile_number').focus();
      swal("Warning", "Please enter a valid phone number", "warning")
      return false;
    } else if(file && file_size > 1024000) {
      $('#add-img-tag').focus();
      swal("Warning", "Failed to upload an image. The image maximum size is 1MB.", "warning")
      return false;
    } else if(file && file_type != "jpeg" && file_type != "jpg" && file_type != "png" ) {
        $('#add-img-tag').focus();
        swal("Warning", "Failed to upload an image. Please upload file having extensions .jpeg/.jpg/.png only..", "warning")
        return false;
    } else {
      return true;
    }
  });


  $("#update_driver_password").on("click",function(){
    var passlength = new RegExp("(?=.{6,})");

    if($("#new_password").val().trim() == "") {
      $("#new_password").focus();
      swal("Warning", "New password can't be blank", "error");
      return false;
    } else if(!(passlength.test($("#new_password").val()))) {
      $("#new_password").focus();
      swal("Warning", "Password length should be 6 character long", "error");
      return false;
    } else if($("#new_password").val() != $("#confirm_password").val()) {
      $("#confirm_password").focus();
      swal("Warning", "Password  and confirm password do not match", "error");
      return false;
    } else if($("#new_password").val().length <= 5 || $('#new_password').val().length >= 13 ) {
      $("#new_password").focus();
      swal("Warning", "Please enter new password between length 6 to 12", "error");
      return false;
    } else {
      var new_pass = $('#new_password').val();
      var user_id = $('#transporter_id').val();

      $.ajax({
        method: "POST",
        url: "/delivery_company/change_password",
        data: {
          user_id: user_id,
          new_password: new_pass
        },
        dataType: "JSON",
        success: function(data) {
          if (data.code == 200) {
            swal({
              type: "success",
              title: "Done",
              text: data.message
            },
            function(isConfirm){
              if(isConfirm){
                $("#new_password").val("");
                $("#confirm_password").val("");
                $("#reset-password").modal("hide");
              }
            });
          } else {
            swal("Warning", data.message, "error")
          }
        },
        error: function() {
          swal("error", "Something went wrong", "error")
        }
      });
    }
  });

  $("#update_transporter_password").on("click",function(){
    var passlength = new RegExp("(?=.{6,})");

    if ($("#old_password").val().trim() == "") {
      $("#old_password").focus();
      swal("Warning", "Old password can't be blank", "error");
      return false;
    } else if($("#new_password").val().trim() == "") {
      $("#new_password").focus();
      swal("Warning", "New password can't be blank", "error");
      return false;
    } else if(!(passlength.test($("#new_password").val()))) {
      $("#new_password").focus();
      swal("Warning", "Password length should be 6 character long", "error");
      return false;
    } else if($("#new_password").val() != $("#confirm_password").val()) {
      $("#confirm_password").focus();
      swal("Warning", "Password  and confirm password do not match", "error");
      return false;
    } else if($("#new_password").val().length <= 5 || $('#new_password').val().length >= 13 ) {
      $("#new_password").focus();
      swal("Warning", "Please enter new password between length 6 to 12", "error");
      return false;
    } else {
      var new_pass = $('#new_password').val();
      var user_id = $('#transporter_id').val();
      var old_password = $('#old_password').val();

      $.ajax({
        method: "POST",
        url: "/delivery_company/change_password",
        data: {
          old_password: old_password,
          user_id: user_id,
          new_password: new_pass
        },
        dataType: "JSON",
        success: function(data) {
          if (data.code == 200) {
            swal({
              type: "success",
              title: "Done",
              text: data.message
            },
            function(isConfirm){
              if(isConfirm){
                $("#old_password").val("");
                $("#new_password").val("");
                $("#confirm_password").val("");
                $("#reset-password").modal("hide");
              }
            });
          } else {
            swal("Warning", data.message, "error")
          }
        },
        error: function() {
          swal("error", "Something went wrong", "error")
        }
      });
    }
  });
});

function scheduleCatering(){
  $('#current_time_zone').val(Intl.DateTimeFormat().resolvedOptions().timeZone);
  $('input[type="datetime-local"]').attr('min', moment().format('YYYY-MM-DDT00:00'))
  $('#start_time').change(function(){
    $('#end_time').attr('min', moment($('#start_time').val()).format('YYYY-MM-DDT00:00'))
  })
  $('#schedule_categoring').click(function(){
    if ($('#check_customer_id').val() != ''){
      $('#scheduleCatering').modal();
    }else{
      toastr.error('Please select customer')
    }
  })
}

function removeDiscount() {
  $('#discount_row').click(function(){
    if ($('#discount_row').hasClass('selected_discount')){
      $('#discount_row').removeClass('selected_discount')
    }else{
      $('#discount_row').addClass('selected_discount')
    }
  })
}

function posPaymentData() {
  $('.payment-option').on('click', function(e) {
    if ($(this).hasClass('foodPayment')){
      $('.paymentMethodList').removeClass('hide');      
      $('.discountList').addClass('hide');      
    } else {
      $('.paymentMethodList').addClass('hide');      
      $('.discountList').removeClass('hide');      
    }

  });
}

function openKDSItem() {
  $('.kdsItem').on('click', function(e) {
    $('#kdsMenuPopup').modal('show');
    $('.kds_div_slot').addClass('hide');
    var element = $(this).attr('data-kds-type');
    $("."+element).removeClass('hide');
    $('.pos_kds_data').val(element);
    $('.kds-container').attr("id", "kds-container-" + element);
    $('.kds_div_slot').removeClass('active_kds');
    $('.total_order_count_kds').text($("."+element).length);
    e.stopImmediatePropagation();
  });
}

function kdsDivSlot() {
  $('.kds-container').on('click', " .kds_div_slot", function(e){
    $('.kds_div_slot').removeClass('active_kds');
    $(this).addClass('active_kds');
    e.stopImmediatePropagation();
  });
}

function bumpBtnClick() {
  $('.bump-btn').on('click', function(e){
    if($('.active_kds').length > 0) {
      $.ajax({
        method: "GET",
        url: "/business/partner/change_kds_type",
        data: {
          kds_type: $('.pos_kds_data').val(),
          checkId: $('.active_kds').attr('data-check-id')
        }
      });
    } else {
      toastr.error("Please select check for add it in Expo");
    }
    e.stopImmediatePropagation();
  });
}

function submitColor() {
  $('.submit-color').on('click', function(e){
    $.ajax({
      method: "GET",
      url: "/business/partner/save_kds_color",
      data: {
        color_id: $(this).closest('tr').attr('data-color-id'),
        color_minute: $(this).closest('tr').find('.input-color').val()
      }
    });
    e.stopImmediatePropagation();
  });

  $('.cancel-color').on('click', function(e){
    $(this).closest('tr').find('.color-user-input').addClass('hide');
    $(this).closest('tr').find('.color-text').removeClass('hide');
    e.stopImmediatePropagation();
  });

  $('.fa-pencil.color-text').on('click', function(e){
    $(this).closest('tr').find('.color-user-input').removeClass('hide');
    $(this).closest('tr').find('.color-text').addClass('hide');
    e.stopImmediatePropagation();
  });
}

function payBtnInQuickPay() {
  $('.pay-quick-btn').on('click', function(e){
    $('#quickpayPayment').modal('hide');
    var taxAmount = parseFloat($(this).closest('tr').find('.tax_amt').text());
    var beforetaxAmount = parseFloat($(this).closest('tr').find('.before_tax_amt').text());
    var totalPayment = parseFloat((taxAmount + beforetaxAmount).toFixed(3));
    var afterTaxAmount = parseFloat($(this).closest('tr').find('.after_tax_amt').text());
    var discountAmount = $(this).closest('tr').find('td:nth-child(5)').text().trim();
    $('#quickPayCheckPayment').find('.before_tax_quick_pay').val(beforetaxAmount);
    $('#quickPayCheckPayment').find('.tax_quick_pay').val(taxAmount);
    $('#quickPayCheckPayment').find('.after_tax_quick_pay').val($(this).closest('tr').find('.after_tax_amt').text());
    $('#quickPayCheckPayment .paymentDiv').attr('data-selected-check-id', $(this).closest('tr').attr('data-check-id'));
    if(discountAmount == '0.000BHD') {
      $('.discountAmount').addClass('hide');
    } else {
      $('.discountAmount').removeClass('hide');
      $('.discountAmount').text('Discount: '+discountAmount);
    }
    $('.partialAmount').text("Remaining Amount: "+ afterTaxAmount.toFixed(3)+" BHD");
    $('.fullAmount').text("Total Amount: "+ totalPayment.toFixed(3)+" BHD");
    var discount_href = $('.quickPayDiscount').attr('href');
    var updated_href = discount_href.slice(0,discount_href.indexOf("pos_check_id")) + "pos_check_id="+$(this).closest('tr').attr('data-check-id') + '&is_quick_pay=true';
    $('.quickPayDiscount').attr('href', updated_href);
    if(totalPayment == afterTaxAmount) {
      $('.partialAmount').addClass('hide');
    } else {
      $('.partialAmount').removeClass('hide');
    }
    $('#quickPayCheckPayment').modal('show');
    e.stopImmediatePropagation();
  });
  $('#quickpayPayment').on('hide.bs.modal', function () {
    $('.is_quick_pay').addClass('active-menuon');
  });
  $('#quickPayCheckPayment').on('hide.bs.modal', function () {
    $('.paybtn').trigger('click');
    $('.paybtn').addClass('active-menuon');
  })
}

function handleCheckChange() {
  $('#include_in_pos_checkbox').change(function(e){
    e.stopImmediatePropagation();
    $('#include_in_pos').val($(this).is(':checked'))
  })
  $('#include_in_app_checkbox').change(function(e){
    e.stopImmediatePropagation();
    $('#include_in_app').val($(this).is(':checked'))
  })
}

function selectPaymentData() {
  $('.payment-option').click(function(){
    $('.payment-option').removeClass('active-menuon');
    $(this).addClass('active-menuon');
    if($(this).hasClass('foodPayment')){
      $('.paymentMethodList').removeClass('hide')
      $('.discountList').addClass('hide')
    }
  })
}


function handleCheckChangeOffer() {
  $('#include_in_pos_offer').change(function(e){
    e.stopImmediatePropagation();
    $('#include_in_pos_hidden_offer').val($(this).is(':checked'))
  })
  $('#include_in_app_offer').change(function(e){
    e.stopImmediatePropagation();
    $('#include_in_app_hidden_offer').val($(this).is(':checked'))
  })
}

function printCheck() {
  var divToPrint = document.getElementById('printCheckContent');
  var popupWin = window.open('', '_blank', 'width=300,height=300');
  popupWin.document.open();
  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="/assets/check_styles.css"></head><body onload="window.print()">' + divToPrint.innerHTML + '</html>');
  popupWin.document.close();
}

function update() {
  $('#current_time').html(moment().format('h:mm A'));
  $('#current_time1').html(moment().format('h:mm A'));
}

function saveCheckValidation() {
  $('#pos_check_save').click(function(){
    var order_type = $('#check_order_type_id').val();
    var responseData = checkItemAddon();
    if (responseData['canContinue']){
      if (([2, 4].includes(parseInt(order_type))) && !$('#check_customer_id').val()){
        $('#errorMessageOrderType').modal();
        $('#errorTransactionError').modal('hide')
      }else if(parseInt(order_type) == 2 && $('#check_customer_id').val() && !$('#check_driver_id').val()){
        $.ajax({
          method: "POST",
          url: '/business/partner/pos_menu_categories/pos_check/'+ $('#pos_check_id').val() +'/driver_list',
          button_reference: '#pos_check_save'
        });
      }else if (!order_type || order_type == undefined){
        $('#errorTransactionError').modal('hide');
        toastr.error('Kindly choose order type.')
      }else{
        if ($('#pos_check_save').data('save_check_link') != undefined){
          if($('#check_status').val() == 'closed' || $('#check_status').val() == 'reopened' || $('#check_status').val() == 'reopened_pending'){
            toastr.error('Please settle your bill.');
          }else{
            $.ajax({
              method: "POST",
              url: $('#pos_check_save').data('save_check_link'),
            });
          }
        }
      }
    }else{
      toastr.error(`Please add item addon ${responseData['itemName'] ? 'for ' + responseData['itemName'] : ''}`)
    }
  })
}

function okBtnPaymentMethod() {
  $('.okBtnPaymentMethod').on('click', function(e) {
    if($('.selected_payment_method').val()) {
      if($('.is_third_party_delivery').val() == 'true') {
        $(this).addClass('disabled');
        $.ajax({
          method: "POST",
          url: $('#pos_check_save').data('save_check_link'),
          data: {
            with_driver_save: true,
            amount: $('.transporter_select').find('.iou-amount').val(),
            payment_method_id: $('.selected_payment_method').val(),
            driver_id: $('.transporter_select').data('transporter-id')
          }
        });
      } else {
        $('#paymentMehtodSelection').modal('hide');
        $('.payment_method_name').val($('.selected_payment_method').val());
        if($('.selected_payment_method').val().toLowerCase() == "cash") {
          $('.iou-amount').attr('readonly', false);
          $('.iou-amount').removeClass('disabled');
        } else {
          $('.iou-amount').attr('readonly', true);
          $('.iou-amount').addClass('disabled');
        }
        $('#driverListing').modal();
      }
    } else {
      toastr.error("Please select payment method");
    }
    e.stopImmediatePropagation();
  });
}

function paymentModal() {
  $('.paymentDiv').click(function(e){
    $('.okBtnOfRemainAmountPopup').removeClass('disabled');
    $('.file-upload-form')[0].reset();
    if($('#pos_transactions_list td').length === 0 && !($(this).attr('data-is-gift-card') && $(this).attr('data-is-gift-card') == 'true')) {
        toastr.error("Please add menu item for payment");
    } else {
      const amount = parseFloat($('#selected_qty').val());
      const payment_amount = parseFloat($('#remain_payment_amount').val());
      if (payment_amount != 0.0){
        if ((amount && $(this).attr('data-payment-method-id') == 1) || ($(this).attr('data-payment-method-id') != 1 && $(this).attr('data-payment-method-id') != 4)) {
          if($(this).attr('data-payment-method-id') >= 2) {
            $('#getPaymentModalPopup').find('.selected_payment_id').val($(this).attr('data-payment-method-id'));
            $('.reference_prompt').val('');
            if($(this).attr('data-is-gift-card') && $(this).attr('data-is-gift-card') == 'true') {
              $('.is_gift_card_currency').val('true');
              var checkId = $(this).attr('data-selected-check-id');
              var actualAmount = (selectedQty ? selectedQty : $('#quickPayCheckPayment').find('.after_tax_quick_pay').val());
              $('.quick_pay_check_id').val(checkId);
              $('.quick_pay_amt').val(actualAmount);
            } else {
              $('.is_gift_card_currency').val('false');
            }
            $('#quickPayCheckPayment').modal('hide');
            $('#getPaymentModalPopup').modal('show');
          } else {
            var paymentMethodId = $(this).attr('data-payment-method-id');
            if($(this).attr('data-is-gift-card') && $(this).attr('data-is-gift-card') == 'true') {
              var checkId = $(this).attr('data-selected-check-id');
              var actualAmount = (selectedQty ? selectedQty : $('#quickPayCheckPayment').find('.after_tax_quick_pay').val());
              var is_gift_card = "true"
            } else {
              var checkId = $('#getPaymentModalPopup').find('.check_id').val();
              var actualAmount = (selectedQty ? selectedQty : $('#remain_payment_amount').val());
              var is_gift_card = "false"
            }
            $('.quick_pay_check_id').val(checkId);
            $('.quick_pay_amt').val(actualAmount);
            var selectedQty = parseFloat($('#selected_qty').val());
            $('#remainAmountDetailsPopup').find('.check_id').val(checkId);
            $('#remainAmountDetailsPopup').find('.reference_prompt').val('');
            $('#remainAmountDetailsPopup').find('.selected_payment_id').val(paymentMethodId);
            $('.currency_payment_method_id').val(paymentMethodId);
            $('.currency_payment_amount').val(actualAmount);
            $('.currency_paid_amount').val(actualAmount);
            $('.is_gift_card_currency').val(is_gift_card);
            $('#quickPayCheckPayment').modal('hide');
            $('#currencyTypePopup').modal('show');
            $('.selectCurrencyType').removeClass('disabled');
          }
        }
        else if($(this).attr('data-payment-method-id') == 4) {
          $('#quickPayCheckPayment').modal('hide');
          if($(this).attr('data-is-gift-card') && $(this).attr('data-is-gift-card') == 'true') {
            var checkId = $(this).attr('data-selected-check-id');
            var is_gift_card = "true"
          } else {
            var checkId = $('#check_id').val();
            var is_gift_card = "false"
          }
          $('.is_gift_card_coupon').val(is_gift_card);
          $('.pos_check_id_coupon').val(checkId);
          $('#coupon_modal_popup').modal('show');
          $('.user_coupon_code').val('');
        }
         else {
          toastr.error("Please add amount for payment");
        }
      }else{
        toastr.error("Remaining amount is 0. Please save check to close it.");
      }
    }
    e.stopImmediatePropagation();
  });
}

function switchTabReports() {
  $('.tab-function-and-reports').on('click', function(e) {
    $('.tab-function-and-reports').removeClass('active-menuon');
    $(this).addClass('active-menuon');
    $('.all-functions, .all-reports').toggleClass('hide');
    e.stopImmediatePropagation();
  })
}

function updateOrderStatus() {
  $('.order_status_btn').on('click', function(e) {
    $.ajax({
      method: "POST",
      url: '/business/partner/update_order_status',
      data: {
        order_id: $(this).attr('data-order-id'),
        order_action: $(this).attr('id')
      }
    });
    e.stopImmediatePropagation();
  });
}

function openOrderAcceptBtn() {
  $('.newOrderFoodClub').on('click', function(e) {
    var totalOrder = parseInt($('.fcSpan').text());
    if(totalOrder > 0) {
      $.ajax({
        method: "POST",
        url: '/business/partner/app_orders_list',
        data: {
          branch_id: $('#branch_id').val()
        }
      });
    }
    e.stopImmediatePropagation();
  });
}

function cashNavigation() {
  $('.cashNavigation').on('click', function(e) {
    var selectedAmount = $(this).find('.cash-amount').text().trim();
    var selectCashName = $(this).attr('data-cash-name');
    var actualConversionAmout = parseFloat($(this).attr('data-cash-conversion-amount'));
    var currencyCode = $(this).attr('data-country-currency-code');
    var conversionAmout = parseFloat(selectedAmount)/parseFloat(actualConversionAmout);
    if($('.amountType').length > 0) {
      var isDisplay = true;

      $('.cash-table .amountType').each(function(e){
        if(parseFloat(selectedAmount) == parseFloat($(this).text().trim()) && selectCashName == $(this).closest('tr').find('td:nth-child(3)').text() ) {
          var qty = parseInt($(this).closest('tr').find('td:nth-child(5)').text());
          $(this).closest('tr').find('.counter-text').text((qty + 1));
          $(this).closest('tr').find('.input-box').val((qty + 1));
          var updatedSelectedAmount = (actualConversionAmout * (qty + 1));
          $(this).closest('tr').find('td:nth-child(6)').text(updatedSelectedAmount.toFixed(3));
          isDisplay= false;
        }
      });

      if(isDisplay) {
        $('.cash-table tbody').append("<tr><td class='remove-currency'><i class='fa fa-times' aria-hidden='true'></i></td><td class='edit-currency'><i class='fa fa-pencil' aria-hidden='true'></i></td><td>"+selectCashName+"</td><td class='amountType'>"+$(this).find('.cash-amount').text().trim()+"</td><td><span class='counter-input hide'><input type='number' value='1' class='input-box' style='width: 100%;'><i class='fa fa-check update-count' aria-hidden='true'></i>&nbsp;&nbsp;<i class='fa fa-times cross-count' aria-hidden='true'></i></span><span class='counter-text'>1</span></td><td>"+actualConversionAmout.toFixed(3)+"</td></tr>");
      }
    } else {
      $('.cash-table tbody').append("<tr><td class='remove-currency'><i class='fa fa-times' aria-hidden='true'></i></td><td class='edit-currency'><i class='fa fa-pencil' aria-hidden='true'></i></td><td>"+selectCashName+"</td><td class='amountType'>"+$(this).find('.cash-amount').text().trim()+"</td><td><span class='counter-input hide'><input type='number' value='1' class='input-box' style='width: 100%;'><i class='fa fa-check update-count' aria-hidden='true'></i>&nbsp;&nbsp;<i class='fa fa-times cross-count' aria-hidden='true'></i></span><span class='counter-text'>1</span></td><td>"+actualConversionAmout.toFixed(3)+"</td></tr>");
    }

    var totalAmount = 0;
    $('.cash-table .amountType').each(function(e){
      totalAmount += parseFloat($(this).closest('tr').find('td:nth-child(6)').text());
    });
    $('.currency_paid_amount, .currency_payment_amount, #selected_qty').val(totalAmount.toFixed(3));
    removeCurrency();
    editCurrency();
    crossCount();
    updateCurrency();
    e.stopImmediatePropagation();
  });
}

function removeCurrency() {
  $('.remove-currency').on('click', function(e){
    $(this).closest('tr').remove();
    var totalAmount = 0;
    $('.cash-table .amountType').each(function(e){
      totalAmount += parseFloat($(this).closest('tr').find('td:nth-child(6)').text());
    });
    $('.currency_paid_amount, .currency_payment_amount, #selected_qty').val(totalAmount.toFixed(3));
    e.stopImmediatePropagation();
  });
}

function updateCurrency() {
  $('.update-count').on('click', function(e){
    var qty = parseFloat($(this).closest('tr').find('.input-box').val());
    var oldQty = parseFloat($(this).closest('tr').find('td:nth-child(5)').text());
    var amt = parseFloat($(this).closest('tr').find('td:nth-child(6)').text());
    var perAmt = amt / oldQty;
    var newAmt = perAmt * qty;
    $(this).closest('tr').find('td:nth-child(6)').text(newAmt.toFixed(3));
    $('.counter-input').addClass('hide');
    $('.counter-text').removeClass('hide');
    $(this).closest('tr').find('.counter-text').text(qty);
    var totalAmount = 0;
    $('.cash-table .amountType').each(function(e){
      totalAmount += parseFloat($(this).closest('tr').find('td:nth-child(6)').text());
    });
    $('.currency_paid_amount, .currency_payment_amount, #selected_qty').val(totalAmount.toFixed(3));
    toastr.success('Count updated successfully');
    e.stopImmediatePropagation();
  });
}

function editCurrency() {
  $('.edit-currency').on('click', function(e){
    $('.counter-input').addClass('hide');
    $('.counter-text').removeClass('hide');
    $(this).closest('tr').find('.counter-input').removeClass('hide');
    $(this).closest('tr').find('.counter-text').addClass('hide');
    e.stopImmediatePropagation();
  });
}

function crossCount() {
  $('.cross-count').on('click', function(e){
    $('.counter-input').addClass('hide');
    $('.counter-text').removeClass('hide');
    e.stopImmediatePropagation();
  });
}

function currencyPopup() {
  $('.selectCurrencyType').on('click', function(e){
    $('.selectCurrencyType').addClass('disabled');
    $('#currencyTypePopup').modal('hide');
    $('.cash-table tbody').empty();
    $.ajax({
      method: "POST",
      url: '/business/partner/remain_payment_popup',
      data: {
        pos_check_id: $('#remainAmountDetailsPopup').find('.check_id').val(),
        payment_method_id: $('.currency_payment_method_id').val(),
        payment_amount: $('.currency_payment_amount').val(),
        discounted_amount: 0.0,
        paid_amount: $('.currency_paid_amount').val()
      }
    });
  
    e.stopImmediatePropagation();
  });
}

function okBtnOfRemainAmountPopup() {
  $('.okBtnOfRemainAmountPopup').on('click', function(e) {
    $(this).addClass('disabled');
    var paymentMethodId = $(this).closest('.modal').find('.selected_payment_id').val();
    var selectedQty = parseFloat($('#selected_qty').val());
    var form_data = new FormData();
    var totalfiles = document.getElementById('pos_payment_file').files.length;
    if($('.is_gift_card_currency').val() == 'true') {
      var checkId = $('.quick_pay_check_id').val();
      var amount = selectedQty ? selectedQty : $('.quick_pay_amt').val();
    } else {
      var checkId = $(this).closest('.modal').find('.check_id').val();
      var amount = selectedQty ? selectedQty : $('#remain_payment_amount').val();
    }
    for (var index = 0; index < totalfiles; index++) {
      form_data.append("attachments[]", document.getElementById('pos_payment_file').files[index]);
    }
    form_data.append('pos_check_id', checkId);
    form_data.append('reference_promt', $(this).closest('.modal').find('.reference_prompt').val());
    form_data.append('payment_method_id', paymentMethodId);
    form_data.append('payment_amount', amount);
    form_data.append('currency_type_id', ($('.remain_currency_type_id').val() ? $('.remain_currency_type_id').val() : ''));
    form_data.append('discounted_amount', 0.0);
    form_data.append('is_gift_card', $('.is_gift_card_currency').val());
    form_data.append('paid_amount', amount);
    $.ajax({
      method: "POST",
      url: '/business/partner/pos_payment',
      data: form_data,
      contentType: false,
      processData: false,
    });
    e.stopImmediatePropagation();
  });
}

function editClosedCheck() {
  $('#edit_closed_check').click(function(){
    $('.edit_check').val(true);
    $('.closed_check').val('');
    if(!$(this).hasClass('pending_transaction')) {
      $('#EditClosedCheckPopup').modal();
    } else {
      $('#transaction_confimation').removeClass('splitCheckClick').addClass('editCheckClick');
    }
  });
  $('.open_check_confirmation').click(function(){
    $('#EditClosedCheckPopup').modal('hide');
  })
  $('#reopen_check').click(function(){
    $('.closed_check').val('');
    $('.edit_check').val(false);
    if(!$(this).hasClass('pending_transaction')) {
      $('#EditClosedCheckPopup').modal();
    } else {
      $('#transaction_confimation').removeClass('splitCheckClick').addClass('openCheckClick');
    }
  })
}

function doPaymentFromDifferentMethod() {
  $('.okButtonReferencePrompt').on('click', function(e) {
    if($('.reference_prompt').val().trim()){
      var paymentMethodId = $(this).closest('.modal').find('.selected_payment_id').val();
      var selectedQty = parseFloat($('#selected_qty').val());
      $('#remainAmountDetailsPopup').find('.check_id').val($(this).closest('.modal').find('.check_id').val());
      $('#remainAmountDetailsPopup').find('.reference_prompt').val($(this).closest('.modal').find('.reference_prompt').val());
      $('#remainAmountDetailsPopup').find('.selected_payment_id').val(paymentMethodId);
      if($('.is_gift_card_currency').val() == 'true') {
        var checkId = $('.quick_pay_check_id').val();
        var amount = selectedQty ? selectedQty : $('.quick_pay_amt').val();
      } else {
        var checkId = $(this).closest('.modal').find('.check_id').val();
        var amount = selectedQty ? selectedQty : $('#remain_payment_amount').val();
      }
      $.ajax({
        method: "POST",
        url: '/business/partner/remain_payment_popup',
        data: {
          pos_check_id: checkId,
          reference_promt: $(this).closest('.modal').find('.reference_prompt').val(),
          payment_method_id: paymentMethodId,
          payment_amount: amount,
          discounted_amount: 0.0,
          paid_amount: amount
        }
      });
    } else {
      toastr.error("Please Add Reference Entry Prompt");
    }
    e.stopImmediatePropagation();
  });
}

function saveOutsidePosDriver() {
  $('.okOtherDriverSelect').click(function(e){
    if($('.transporter_select').length > 0) {
      $(this).addClass('disabled');
      $.ajax({
        method: "POST",
        url: '/business/partner/save_other_order_driver',
        data: {
          user_id: $('.transporter_select').data('transporter-id'),
          amount: $('.transporter_select').find('.iou-amount').val(),
          order_id: $('.pos_other_order_id').val()
        }
      });
    } else {
      toastr.error("Please select driver");
    }
    e.stopImmediatePropagation();
  }) 
}

function saveDriver(){
  $('.transporter_detail').click(function(){
    $('.transporter_detail').removeClass('transporter_select');
    $(this).addClass('transporter_select');
  });
  $('.okDriverSelect').click(function(e){
    if ($('#pos_check_save').data('save_check_link') != undefined){
      if($('.transporter_select').length > 0) {
        if($('.selected_payment_method').val()) {
          $(this).addClass('disabled');
          $.ajax({
            method: "POST",
            url: $('#pos_check_save').data('save_check_link'),
            data: {
              with_driver_save: true,
              amount: $('.transporter_select').find('.iou-amount').val(),
              payment_method_id: $('.selected_payment_method').val(),
              driver_id: $('.transporter_select').data('transporter-id')
            }
          });
        } else {
          toastr.error("Please payment method");
        }
      } else {
        toastr.error("Please select driver");
      }
    }
    e.stopImmediatePropagation();
  })
}

function selectSingleText() {
  $('.first-letter-list .blue').on('click', function(){
    var selectedLetter = $(this).text().toUpperCase();
    if(selectedLetter === 'ALL') {
      $(".pos-transaction a").removeClass('hide');
    } else {
      $(".pos-transaction a").each(function(idx) {
          var anchorText = $(this).text().trim().toUpperCase();
          if(anchorText[0] === selectedLetter){
            $(this).removeClass('hide');
          } else {
            $(this).addClass('hide');
          }
      });
    }
  });
}

function setNoOfTable() {
  $('#no_of_table').on('blur', function(){
    var no_of_table = parseInt($(this).val());
    var restaurant_id = $('#resturant_id').val();
    if(no_of_table) {
      $.ajax({
        method: "POST",
        url: "/business/partner/pos_no_of_table",
        data: {
          no_of_table: no_of_table,
          restaurant_id: restaurant_id
        }
      });
    }
  });
}

function checkNoOfChair() {
  $('.no-of-chair').on('submit', function(e) {
    var error = false;
    $('.no-row-chair').each(function(idx) {
      if($(this).find('.chair_details').val() != undefined){
        if($(this).find('.chair_details').val().trim()) {
          $(this).find('.error').addClass('hide');
        } else {
          $(this).find('.error').removeClass('hide');
          error = true;
        }
      }
    });
    if(error) {
      e.preventDefault();
    }
  })
}

function transactionValidation(){
  $('.validated_field').click(function(e){
    if($(this).hasClass('pending_transaction') && !$(this).find('a').hasClass('disabled')){
      $('#errorTransactionError').find('#transaction_confimation').data('clickable-element', $(this).data('element-id'))
      $('#transaction_confimation').removeClass('splitCheckClick editCheckClick openCheckClick');
      if($('#check_status').val() == 'closed' || $('#check_status').val() == 'reopened' || $('#check_status').val() == 'reopened_pending'){
        toastr.error('Please settle your bill.');
      }else{
        $('#errorTransactionError').modal();
      }
      return false;
    }else{
      return true
    }
  });
  $('#transaction_confimation').click(function(e){
    var order_type = $('#check_order_type_id').val();
    var responseData = checkItemAddon();
    if (responseData['canContinue']){
      if (!order_type || order_type == undefined){
        $('#errorTransactionError').modal('hide');
        toastr.error('Kindly choose order type')
      }
      else if (([2, 4].includes(parseInt(order_type))) && !$('#check_customer_id').val()){
        $('#errorMessageOrderType').modal();
        $('#errorTransactionError').modal('hide')
      } else if (parseInt(order_type) == 2 && $('#check_customer_id').val() && !$('#check_driver_id').val()){
        $('#errorTransactionError').modal('hide')
        $.ajax({
          method: "POST",
          url: '/business/partner/pos_menu_categories/pos_check/'+ $('#pos_check_id').val() +'/driver_list',
          button_reference: '#pos_check_save'
        });
      }
      else{
        var thisElement = $(this);
        $.ajax({
          method: "POST",
          url: "/business/partner/pos_menu_categories/"+ $('#pos_restaurant_id').val() + "/restaurant_table/"+ $('#pos_table_id').val() +"/restaurant_check/"+ $('#pos_check_id').val()+ "/save_check",
          data: {
            is_split_check_btn: $(this).hasClass('splitCheckClick')
          },
          success: function(data) {
            if($('#transaction_confimation').attr('class').indexOf('openCheckClick') != -1) {
              $('#reopen_check').click();
            }
            else if($('#transaction_confimation').attr('class').indexOf('editCheckClick') != -1) {
              $('#edit_closed_check').click();
            }
            console.log(thisElement.attr('id'));
            setTimeout(function(){
              if ($("[data-element-id = '" + thisElement.data('clickable-element') + "']").hasClass('sidebar-disable')){
                swal("Coming Soon!");
              }
              else if ($("[data-element-id = '" + thisElement.data('clickable-element') + "']").hasClass('sidebar')){
                window.location.replace($("[data-element-id = '" + thisElement.data('clickable-element') + "']").attr('href'));
              }else{
                $("[data-element-id = '" + thisElement.data('clickable-element') + "'] a").trigger('click');
              }
            }, 1000)
          }
        });
      }
    }
    else{
      $('#errorTransactionError').modal('hide');
      toastr.error(`Please add item addon ${responseData['itemName'] ? 'for ' + responseData['itemName'] : ''}`)
    }
    e.stopImmediatePropagation();
  })
}

function voidSelection() {
  $('.voidSelection').on('click', function(e) {
    if($('#discount_row.selected_discount') && $('#discount_row.selected_discount').length > 0) {
      $.ajax({
        method: "DELETE",
        url: "/business/partner/delete_discount_percentage",
        dataType: 'script',
        data: {
          pos_check_id: $('#discount_row').data('pos-check-id')
        }
      });
    }
    // else{
      if($('.selected_transaction') && $('.selected_transaction').length > 0) {
        const arr = []
        $.each($('.selected_transaction'), function() {
            arr.push($(this).data('transaction-id'));
        })
        $.ajax({
          method: "POST",
          url: "/business/partner/remove_pos_transaction",
          data: {
            transaction_id: arr.join(","),
            menu_item_id: $('#selected_menu_item_id').val()
          }
        });
      }
      if ($('.payment_amount_details .payment_detail, .gift-card-amount .payment_detail').hasClass('selected_payment_detail')) {
        var payment_id =$('.selected_payment_detail').data('payment-id');
        $.ajax({
          method: "DELETE",
          dataType: 'script',
          url: "/business/partner/pos_new_transaction/pos_payment/"+ payment_id +"/delete_payment"
        });
      }
    // }
    e.stopImmediatePropagation();
  });
  $('.payment_detail').on('click', function(e){
    $('.payment_amount_details div').removeClass('selected_payment_detail')
    $(this).addClass('selected_payment_detail');
    e.stopImmediatePropagation();
  })
}

function checkItemAddon() {
  var qty = $('#selected_qty').val() == '' ||  parseFloat($('#selected_qty').val()) < 0 ? 1 : parseFloat($('#selected_qty').val());
  var responseData = {canContinue: true, itemName: ""}
  $.ajax({
    type: "POST",
    url: '/business/partner/pos_menu_categories/'+ $('#table_id').val()+'/menu_item/' + $('#pos_check_id').val() + '/check_item_addon',
    async: false,
    data: {
      qty: qty
    },success: function(response){
      responseData['canContinue'] = response['canContinue'];
      responseData['itemName'] = response['itemName'];
    }
  });
  return responseData;
}

function addOnItemRightSideSelect() {
  $('.add-on-item').on('click', function(e) {
    var categoryId = $(this).attr('data-category');
    $('.add-on-item').removeClass('active-menuon');
    $(this).addClass('active-menuon');
    $('.add-on-card').addClass('hide')
    $('.pos-addon-items').removeClass('hide');
    $('.comment-form').addClass('hide');
    if(categoryId) {
      if(categoryId === 'comment') {
          var menuAddonId = $('#selected_menuaddon_id').val();
          var comments = (menuAddonId && $('[data-menu-item-id='+menuAddonId+']')) ? $('[data-menu-item-id='+menuAddonId+']').attr('data-comments') : '';
          $('#comments').val(comments);
          $('.pos-addon-items').addClass('hide');
          $('.comment-form').removeClass('hide');
      } else {
        var count = $(this).attr('data-current-count');
        var displayed_text = 'Select '+$(this).attr('data-category-min-qty')+' of '+$(this).attr('data-category-max-qty')+' '+$(this).text().trim()+' Current Count: <span class="menuitem_addon_count">'+count+'</span>';
        $('.pos-addon-items .category-heading').html(displayed_text);
        $("."+categoryId).removeClass('hide');
      }
    }
  });
  
}

function tableRowSelection() {
  $('.transaction_selection td').on('click', function(e) {
    if($(this).hasClass('seat_no_column')) {

    }else{
      if ($(this).parent('.transaction_selection').hasClass('selected_transaction')){
        $(this).parent('.transaction_selection').removeClass('selected_transaction');
      }
      else {
        $(this).parent('.transaction_selection').addClass('selected_transaction');
      }
    }
    e.stopImmediatePropagation();
  })
}

function addCondiment(){
  $('#condiments').click(function(){
    $('.menu-list').removeClass('active');
    $(this).addClass('active');
    $('#food_listing').addClass('hide');
    $('#condiments_data').removeClass('hide');
    $('#function_listing').addClass('hide');
    $('#pos_payment').addClass('hide');
  });
  $('#foods').click(function(){
    $('.menu-list').removeClass('active');
    $(this).addClass('active');
    $('#food_listing').removeClass('hide');
    $('#condiments_data').addClass('hide');
    $('#function_listing').addClass('hide');
    $('#pos_payment').addClass('hide');
  });
  $('#payment-tab').click(function(){
    $('.menu-list').removeClass('active');
    $(this).addClass('active');
    $('#pos_payment').removeClass('hide');
    $('#food_listing').addClass('hide');
    $('#condiments_data').addClass('hide');
    $('#function_listing').addClass('hide');
  });
  $('.comment_submit').click(function(){
    var item_comment = $('.item_comment').val();
    var kitchen_instructions = event.target.value
    var duration = $("select#duration option").filter(":selected").val();
    const arr = []
    $.each($('.selected_transaction'), function() {
      arr.push($(this).data('transaction-id'));
    });
    if (arr.length > 1){
      toastr.error('Please select single transaction for comment.')
      // swal("Warning", 'Please select single transaction for comment.', "error")
    }else {
      // $('.add-on-card').attr('data-parent-pos-transaction-id')
      $.ajax({
        method: "POST",
        url: "/business/partner/pos_save_item_comment",
        data: {
          comments: item_comment,
          pos_transaction_id: arr[0],
          kitchen_instructions: kitchen_instructions,
          duration: duration
        }
      });
    }
  });
  $('#con_comment').click(function(){
    $('.condiments-btn').removeClass('active');
    $(this).addClass('active');
    $('.condiment_comment').removeClass('hide');
    $('.comment-text').text("Comments");
    $('.kitchen_list').addClass('hide');
  });
  $('#con_kitchen').click(function(){
    $('.condiments-btn').removeClass('active');
    $(this).addClass('active');
    $('.condiment_comment').addClass('hide');
    $('.comment-text').text("Kitchen Instruction");
    $('.kitchen_list').removeClass('hide');
  });
}

function update_qty(){
  // $('.transaction_selection').click(function(e){
  //   e.preventDefault();
  //   e.stopPropagation();
  //   var qty = $('#selected_qty').val();
  //   $('#selected_qty').val('');
  //   if (parseInt(qty) > 0){
  //     $.ajax({
  //       type: "POST",
  //       url: '/business/partner/pos_menu_categories/'+ $('#table_id').val()+'/menu_item',
  //       data: {
  //         transaction_id: $(this).data('transaction-id'),
  //         qty: qty,
  //       }
  //     });
  //   }
  // })
  $('.add_menu_item').click(function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
    var qty = $('#selected_qty').val() == '' ||  parseFloat($('#selected_qty').val()) < 0 ? 1 : parseFloat($('#selected_qty').val());
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_menu_categories/'+ $('#table_id').val()+'/menu_item',
      data: {
        menu_item_id: $(this).data('menu-item-id'),
        qty: qty,
        pos_table_id: $(this).data('pos-table-id'),
        pos_check_id: $('#pos_check_id').val(),
      }
    });
  })
}

function posTableClick() {
  $('.pos_table_btn').on('click', function(e){
    $('.selected_table_id').val($(this).attr('data-table-id'));
    $('.selected_resturant_id').val($(this).attr('data-restaurant-id'));
    $('.no-guest-error').addClass('hide');
    $('.no-of-guest').val('');
    $('#myModal').modal('show');
    // if (($("[data-table-status='running']").length > 0 && ($(this).data('table-status') == 'running')) || $("[data-table-status='running']").length <= 0){
    // }else{
      // toastr.error('Table Is Busy. Choose Another Table')
    // }
    e.stopImmediatePropagation();
  });
}


function coverBtnClick() {
  $('.coverNavigation').on('click', function(e){
    $('.cover_selected_table_id').val($('#table_id').val());
    $('.no-guest-error').addClass('hide');
    $('.no-of-guest').val('');
    $('#guestCoverModal').modal('show');
    e.stopImmediatePropagation();
  });
}

function allowFloatValue() {
  $('.no-of-guest').keypress(function(eve) {
    if ((eve.which != 46 || $(this).val().indexOf('.') != -1) && (eve.which < 48 || eve.which > 57) || (eve.which == 46 && $(this).caret().start == 0)) {
      eve.preventDefault();
    }

    // this part is when left part of number is deleted and leaves a . in the leftmost position. For example, 33.25, then 33 is deleted
    $('.no-of-guest').keyup(function(eve) {
      if ($(this).val().indexOf('.') == 0) {
        $(this).val($(this).val().substring(1));
      }
    });
  });
}

function numericaPadForGuest() {
  $('.num-button').on('click', function(e) {
    var inputVal = $(this).closest('.modal').find('.no-of-guest').val();
    var userSelectedVal = $(this).text().trim();
    var newVal = '';
    if(userSelectedVal != 'X' && userSelectedVal != '<-') {
      newVal = inputVal + userSelectedVal; 
    } else if (userSelectedVal == '<-') {
      newVal = inputVal.slice(0, (inputVal.length - 1));
    }
    $(this).closest('.modal').find('.no-of-guest').val(newVal);
    e.stopImmediatePropagation();
  });
}


function referencePromptAlphabetPad() {
  $('.alphbet-num').on('click', function(e) {
    var inputVal = $(this).closest('.modal').find('.reference_prompt').val();
    var userSelectedVal = $(this).text().trim();
    var newVal = '';
    if(userSelectedVal != 'X' && userSelectedVal != '<-' && userSelectedVal != 'Shift') {
      if(userSelectedVal == 'Space') {
        userSelectedVal = ' ';
      }
      newVal = inputVal + userSelectedVal;
      $.each($('.can-shift-val') , function(index, val) { 
        $(val).text($(val).text().trim().toLowerCase());
      });
    } else if (userSelectedVal == '<-') {
      newVal = inputVal.slice(0, (inputVal.length - 1));
    } else if (userSelectedVal == 'Shift') {
      $.each($('.can-shift-val') , function(index, val) { 
        var selected_val = $(val).text().trim();
        if(selected_val == selected_val.toLowerCase()){
          $(val).text(selected_val.toUpperCase());
        } else {
          $(val).text(selected_val.toLowerCase());
        }
      });
      newVal = inputVal; 
    }
    $(this).closest('.modal').find('.reference_prompt').val(newVal);
    e.stopImmediatePropagation();
  });
}

function isErrorCheckFunction() {
  $('.save-no-guest-btn').on('click', function(e){
    if($(this).closest('.modal').find('.no-of-guest').val() === '') {
      $(this).closest('.modal').find('.no-guest-error').removeClass('hide');
      e.preventDefault();
    }
  e.stopImmediatePropagation();
  });
  $('.save-check-no-guest-btn').on('click', function(e){
    if($('.check-no-of-guest').val() === '') {
      $('.check-no-guest-error').removeClass('hide');
      e.preventDefault();
    }
  e.stopImmediatePropagation();
  });
}


function showConfirmationPopupFunction() {
  $('.save-button-popup').on('click', function(e){
    if($('.cover-no-of-guest').val() === '') {
      $('.no-guest-error').removeClass('hide');
      e.preventDefault();
    } else {
      if(parseFloat($('.cover-no-of-guest').val()) > 9) {
        $('#userConfirmation').modal('show').fadeIn();
        $('#guestCoverModal').modal('hide').fadeOut();
      } else {
        $('.save-cover-no-guest-btn').click();
      }
    }
  e.stopImmediatePropagation();
  });

  $('.save-guest-popup-begin-check').on('click', function(){
    if ($('.begin_check_guest_no').val() == ''){
      $('.guest-no-guest-error').removeClass('hide');
      e.preventDefault();
    }
  })

  $('#seat_no_submit').on('click', function(e){
    if ($('.seat_no').val() === ''){
      $('.seat_number-error').removeClass('hide');
      e.preventDefault();
    }
  });
  $('#pos_table_no').on('click', function(e){
    if ($('.table_no').val() === ''){
      $('.table_number-error').removeClass('hide');
      e.preventDefault();
    }
  });
}

function selectOrderType(){
  $('.selectOrderType').click(function(){
    $('#selected_check_type').val($('#selected_order_types option:selected').val())
    $('#orderTypeOption').modal('hide');
    $('#checkNoOfGuest').modal();
  })
}

function openDashboardNewTransactipnPopup() {
  $('.openDashboardNewTransactipnPopup').on('click', function(e){
    $('#orderTypeOptionDashboard').modal('show');
    e.stopImmediatePropagation();
  });
}

function submitCoverGuest() {
  $('.okButtonClick').on('click', function(e){
    $('.save-cover-no-guest-btn').click();
    e.stopImmediatePropagation();
  });
}


function cancelCoverGuest() {
  $('.cancelBtnClick').on('click', function(e){
    $('#userConfirmation').modal('hide').fadeOut();
    $('#guestCoverModal').modal('show').fadeIn();
    e.stopImmediatePropagation();
  });
}

function cancelSidemenu() {
  $('.cancelSelection').on('click',function(e) {
    $('#cancelTransaction').modal('show');
    e.stopImmediatePropagation();
  });
}
function editSeatNumber(){
  $('.edit-icon').click(function(){
    $(this).parent('.saved_seat_no').addClass('hide')
    $(this).parent('.saved_seat_no').siblings('.seat_no_edit').removeClass('hide')
  });
  $('.cancel_transaction').click(function(){
    $(this).parents('.seat_no_edit').addClass('hide');
    $(this).parents('form')[0].reset();
    $(this).parents('.seat_no_edit').siblings('.saved_seat_no').removeClass('hide');
  })
}

function beginCheckPopup() {
  $('.beginCheckSideMenuButtonClick, .busyTable').on('click',function(e) {
    if (!$(this).hasClass('pending_transaction')){
      $('.no-of-guest').val('');
      $('#errorMessagePopup').modal('hide');
      $('#beginTablePopup').modal('show');
      e.stopImmediatePropagation();
    }
  });
}

function pickupCheckClick() {
  $('.pickupCheckClick').on('click', function(e){
    if (!$(this).hasClass('pending_transaction')){
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_pickup_check',
        data: {
          branch_id: $(this).data('branch-id'),
        }
      });
      e.stopImmediatePropagation();
    }
  });
}

function transferCheck(){
  $('.DineInError').click(function(){
    toastr.error('Please select check')
  });
  $('#transfer_check_submit').click(function(){
    if($(".check_no[name='selected_check_no']").val() == ''){
      $('.check_number-error').removeClass('hide');
    }
  });
  $('.submitTransferCheck').click(function(){
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_new_transaction/transfer_check',
      data: {
        parent_check_id: $('#parent_check_id').val(),
        child_check_id: $('#child_check_id').val()
      }
    });
  });
}

function splitCheck(){
  $('.check-table').click(function(e){
    if ($('.selected_split_check').length > 0){
      if ($('.selected_split_check').hasClass('addon_item')){
        toastr.error('Please select Menu Item')
      }else{
        var checkId = $(this).data('check-id');
        var fromCheckId = $('.selected_split_check').parents('.check-table').data('check-id');
        var transaction_id = $('.selected_split_check').data('transaction-id');
        var transaction_ids = [transaction_id]
        var tranferable_elem = $('.check-table').find('.parent_id_' + transaction_id)
        tranferable_elem.each(function(){ transaction_ids.push($(this).data('transaction-id'))})
        $("[data-table-check-id='" + fromCheckId +"']").data('transaction-ids', $("[data-table-check-id='" + fromCheckId +"']").data('transaction-ids').filter(function(ele){ return !transaction_ids.includes(parseInt(ele)) }))
        transaction_ids.forEach(function(e){$("[data-table-check-id='" + checkId +"']").data('transaction-ids').push(e)})
        $(this).find('tbody').append($('.selected_split_check'));
        $('tr').removeClass('selected_split_check')
        $('.selected_split_check').remove()
        var tranfer_list = JSON.parse($('.tranfer_check_list_'+ transaction_id).val());
        tranfer_list.push(fromCheckId)
        $('.tranfer_check_list_'+ transaction_id).val(JSON.stringify(tranfer_list))
        var selectedTable = $(this);
        tranferable_elem.each(function(){
          selectedTable.find('tbody').append($(this))
        })
        checkTotal = 0.000
        $('.check_' +checkId).find('.transaction_selection').each(function(){
          checkTotal += parseFloat($(this).find('td:eq(2)').text())
        });
        $('.span_check_' +checkId).text(checkTotal.toFixed(3) + ' BHD');
        fromCheckTotal = 0.000
        $('.check_' +fromCheckId).find('.transaction_selection').each(function(){
          fromCheckTotal += parseFloat($(this).find('td:eq(2)').text())
        });
        $('.span_check_' +fromCheckId).text(fromCheckTotal.toFixed(3) + ' BHD');
      }
    }else {
      toastr.error('Please select transaction')
    }
    e.stopImmediatePropagation();
  });
  $('#add_new_split_check').click(function(e){
    $(this).addClass('disabled')
  })
  $('.submit-split-check').click(function(e){
    e.stopImmediatePropagation();
    var transactionData = {}
    $('.split_selected_transaction').each(function(){
      transactionData[$(this).data('table-check-id')] = $(this).data('transaction-ids').length ? $(this).data('transaction-ids') : ''
    });
    // var share_items = {}
    // $('input[name="shared_ids"]').each(function(){
    //   if (JSON.parse($(this).val()).length){
    //     share_items[$(this).data('share-transaction-id')] = $(this).val();
    //   }
    // });
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_new_transaction/split_checks',
      data: {
        transactions: transactionData,
        // share_items: share_items
      }
    });
  });
  $('.remove_last_split_btn').click(function(e) {
    var $removable_check_id = $('.remove_last_split_btn').data('last-check-id');
    var $check_transaction_ids = [];
    if ($('.check-table').length > 1)
    {
      $('#check_listing').find('.parent_transaction').each(function(){
        $('.parent_transaction').children("input[name='transfer_ids']").each(function(){
          if($(this).val().includes($removable_check_id)){
            data_ids = JSON.parse($(this).val())
            data_ids.splice(data_ids.indexOf($removable_check_id), 1)
            $(this).val(JSON.stringify(data_ids));
          }
        });
        if ($('#check_data_' + $removable_check_id).find('tr.parent_transaction').length){
          $('#check_data_' + $removable_check_id).find('tr.parent_transaction').each(function(){
            // $check_transaction_ids.push($(this).data('transaction-id'))
            var transaction_id = $(this).data('transaction-id');
            var check_ids = JSON.parse($('.tranfer_check_list_' + transaction_id).val());
            if (check_ids.length){
              var last_check_id = check_ids[check_ids.length - 1]
              if (last_check_id && $('.check_' + last_check_id).length){
                total_amount = parseFloat($('.check_' + $removable_check_id).find('tbody').find('td:eq(2)').text())
                $('.check_' + last_check_id).find('tbody').append($(this))
                var all_transaction = [transaction_id]
                $('.check-table').find('.parent_id_' + transaction_id).each(function(){
                  total_amount += parseFloat($('.check_' + $removable_check_id).find('tbody').find('td:eq(2)').text())
                  all_transaction.push($(this).data('transaction-id'))
                  $('.check_' + last_check_id).find('tbody').append($(this))
                })
                total_amount += parseFloat($('.span_check_' + last_check_id).text().replace(' BHD', ''))
                $('.span_check_' + last_check_id).text(total_amount.toFixed(3).toString() + ' BHD' )
                $('#check_data_' + last_check_id).find('.split_selected_transaction').data('transaction-ids', all_transaction)
              } 
            }
          });
        }
      });
      // var check_transaction_ids = [];
      if ($('#check_data_' + $removable_check_id).find('tr.parent_transaction').length){
        $('#check_data_' + $removable_check_id).find('tr.parent_transaction').each(function(){
          $check_transaction_ids.push($(this).data('transaction-id'))
        })
      }
      // if ($('#check_data_' + $removable_check_id).find('tr').length){
      //   $('#check_data_' + $removable_check_id).find('.shared_item').each(function(){
      //     transaction_id = $(this).data('transaction-id')
      //     main_transaction = $('.share_item_check_list_' + transaction_id);
      //     total_shared = JSON.parse(main_transaction.val()).length
      //     total_amount = parseFloat(main_transaction.siblings('td:eq(2)').text());
      //     var main_tr = main_transaction.parent('.main_shared_transaction')
      //     main_tbody = main_tr.parent('tbody')
      //     main_transaction.val([])
      //     main_tr.addClass('transaction_selection parent_transaction')
      //     main_tbody.find('#transaction_data_' + transaction_id).find('td:eq(2)').text((total_shared * total_amount).toFixed(3))
      //     main_tbody.find('.parent_id_' + transaction_id).each(function(){
      //       amount = parseFloat($(this).find('td:eq(2)').text())
      //       $(this).find('td:eq(2)').text((amount * total_shared).toFixed(3))
      //     })
      //   });
      //   $('.parent_id_'+ transaction_id).each(function(){
      //     if(!$(this).hasClass('main_shared_transaction')){
      //       $(this).remove();
      //     }
      //   })
      //   $('.shared_item[data-transaction-id="'+ transaction_id +'"]').each(function(){
      //     if(!$(this).hasClass('main_shared_transaction')){
      //       var id = $(this).closest('.check-table').data('check-id')
      //       $(this).remove()
      //       var sum = 0.0;
      //       $('.check_'+ id).find('tbody tr').find('td:eq(2)').each(function(){
      //         sum += parseFloat($(this).text());
      //       });
      //       $('.span_check_' + id).text(sum.toFixed(3) + ' BHD')
      //     }
      //   });
      // }
      $('.check_' + $removable_check_id).remove();
      $('.remove_last_split_btn').data('last-check-id', $('.check-table').last().data('check-id'))
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_new_transaction/remove_last_check',
        data: {
          check_id: $removable_check_id,
          transaction_ids: $check_transaction_ids
        }
      });
    }else{
      toastr.error("Can't delete last split check")
    }    
    e.stopImmediatePropagation();
  });
  $('#confirm_share').click(function(e){
    e.stopImmediatePropagation();
    var shared_items = $('#shareItemCheckModalPopup').find('.selected_share_item');
    var share_ids = []
    shared_items.each(function(){share_ids.push($(this).data('check-id'))})
    var transaction_id = $('.selected_split_check').data('transaction-id')
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_new_transaction/share_check',
      data: {
        check_ids: share_ids,
        transaction_id: transaction_id
      }
    });
    // if (shared_items.length){
    //   var selected_transaction =  $('.selected_split_check');
    //   var transaction_id = selected_transaction.data('transaction-id');
    //   var selected_check = $('.selected_split_check').parents('.check-table');
    //   var check_id = selected_check.data('check-id')
    //   var share_ids = []
    //   shared_items.each(function(){share_ids.push($(this).data('check-id'))})
    //   var amount = parseFloat(selected_transaction.find('td:eq(2)').text())
    //   var divided_amount = (amount / (share_ids.length + 1)).toFixed(3)
    //   selected_transaction.find('td:eq(2)').text(divided_amount)
    //   // selected_transaction.attr('class', '')
    //   // selected_transaction.addClass('shared_item');
    //   var addon_item_list = $('#check_data_' + check_id).find('.parent_id_' + transaction_id)
    //   for(var share_id of share_ids ){
    //     var new_transaction = selected_transaction.clone()
    //     new_transaction.find('[name=shared_ids]').remove()
    //     $('.check_'+ share_id).find('tbody').append(new_transaction)
    //   }
    //   if (addon_item_list.length)
    //   {
    //       addon_item_list.each(function(){
    //           var addon_amount = parseFloat($(this).find('td:eq(2)').text())
    //           var addon_divided_amount = (addon_amount / (share_ids.length + 1)).toFixed(3)
    //           for(var share_id of share_ids ){    
    //               // var new_transaction = selected_transaction.clone()
    //               // new_transaction.find('[name=shared_ids]').remove()
    //               // $('.check_'+ share_id).find('tbody').append(new_transaction)
    //               $(this).find('td:eq(2)').text(addon_divided_amount)
    //               var dup_item = $(this).clone()
    //               $('.check_'+ share_id).find('tbody').append(dup_item)
    //           }
    //           $(this).addClass('main_shared_transaction')
    //       });
    //   }
    //   share_ids.push(check_id)
    //   for(var id of share_ids){
    //     var sum = 0.0;
    //     $('.check_'+ id).find('tbody tr').find('td:eq(2)').each(function(){
    //       sum += parseFloat($(this).text());
    //     });
    //     $('.span_check_' + id).text(sum.toFixed(3) + ' BHD')
    //   }
    //   selected_transaction.addClass('main_shared_transaction')
    //   selected_transaction.find("[name=shared_ids]").val(JSON.stringify(share_ids))
    //   $('#shareItemCheckModalPopup').modal('hide')
    // }else{
    //   toastr.error('Please select transaction')
    // }
  });
  $('.clear_selection').click(function(){
    $('.transaction_selection').removeClass('selected_split_check')
  });
  $('#cancelSplitCheck').click(function(){
    $('.splitCheckData').text("Are You Sure You Want To Cancel Check?")
    $('#split_check_confimation').data('cancellation-type', 'cancel_check');
    $('#splitCheckConfirmation').modal()
  });
  $('#split_check_confimation').click(function(e){
    e.stopImmediatePropagation();
    $('#splitCheckConfirmation').modal('hide');
    $('#splitCheckPopup').modal('hide');
    if ($(this).data('cancellation-type') == 'cancel_check'){
      var parent_check = $('#parent_split_check_id').val()
      var other_ids = [];
      $('.split_selected_transaction').each(function(){
        if ($(this).data('table-check-id') != parent_check){
          other_ids.push($(this).data('table-check-id'))
        }
      })
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_new_transaction/cancel_check',
        data: {
          parent_check_id: parent_check,
          other_check_id: other_ids
        }
      });
    }
  })
}

function selectSinglePickupCheckRow() {
  $('#pickupCheckModalPopup tbody tr, #transferTableDineInList tbody tr').on('click', function(e){
    $('#pickupCheckModalPopup tbody tr, #transferTableDineInList tbody tr').removeClass('selected_pickup');
    $(this).addClass('selected_pickup');
    e.stopImmediatePropagation();
  });
}

function selectSingleDriverRow() {
  $('#driver_details tbody tr').on('click', function(e){
    $('#driver_details tbody tr').removeClass('selected_driver');
    $(this).addClass('selected_driver');
    e.stopImmediatePropagation();
  });
}

function assignDriverToCheck() {
  $('.assignDriverOkBtn').on('click', function(e){
    if($('#driver_details tr.selected_driver').length > 0) {
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_new_transaction/assign_driver',
        data: {
          check_id: $('#driver_details tr.selected_driver').data('check-id'),
          driver_id: $('#driver_details tr.selected_driver').data('driver-id')
        }
      });
    } else {
      toastr.error("Please Select Driver");
    }
    e.stopImmediatePropagation();
  })
}

function okButtonPickupCheck() {
  $('.okBtnPickUpCheck').on('click', function(e){
    if($('#pickupCheckModalPopup tr.selected_pickup').length > 0) {
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_pickup_check_list',
        data: {
          check_id: $('#pickupCheckModalPopup tr.selected_pickup').data('check-id'),
        }
      });
    } else {
      toastr.error("Please select Check");
    }
    e.stopImmediatePropagation();
  })
}


function displayEmployeeModalPopup() {
  $('.okBtnTransferTableCheckList1, .newCheckBtnTransferTableCheckList1').on('click', function(e){
    if($('#transferTableDineInList tr.selected_pickup').length > 0) {
      $('#transferTableDineInList').modal('hide');
      $('#employeeDetails .check_no').text($('#transferTableDineInList tr.selected_pickup td:nth-child(1)').text());
      $('#employeeDetails .current_time').text(moment().format('MM-DD-YYYY') + ' ' + moment().format('h:mm A'));
      $('#employeeDetails .total_amount').text($('#transferTableDineInList tr.selected_pickup td:nth-child(3)').text());
      $('.okEmployeeDetails').attr('data-is-new-check', $(this).attr('data-new-check') == 'true')
      $('#employeeDetails').modal('show');
    } else {
      toastr.error("Please select Check");
    }
    e.stopImmediatePropagation();
  })
}

function setTransferTable() {
  $('.okEmployeeDetails').on('click', function(e) {
    if($(this).attr('data-is-new-check') == 'true'){
      $('.newCheckBtnTransferTableCheckList').click();
    } else {
      $('.okBtnTransferTableCheckList').click();
    }
    e.stopImmediatePropagation();
  });
}

function shareItemPopup() {
  $('.share_item_popup').on('click', function(e) {
    if($('.transaction_selection.selected_split_check').length == 0 ) {
      toastr.error("Please Select Transaction");
    } else {
      var check_ids = [];
      $('.check-table').each(function (i,n){check_ids.push(n.getAttribute('data-check-id'))});
      var selected_check_id = $('.transaction_selection.selected_split_check').closest('.check-table').attr('data-check-id');
      check_ids.splice(check_ids.indexOf(selected_check_id),1);
      if(check_ids.length == 0) {
        toastr.error("Check Not Found");
      } else {
        $.ajax({
          type: "POST",
          url: '/business/partner/pos_share_item_popup',
          data: {
            selected_check_id: selected_check_id,
            check_ids: check_ids,
            transaction_id: $('.transaction_selection.selected_split_check').attr('data-transaction-id')
          }
        });
      }
    }
    e.stopImmediatePropagation();
  });
}

function selectedShareItem() {
  $('#shareItemCheckModalPopup table tbody tr').on('click', function(e){
    $(this).toggleClass('selected_share_item');
    e.stopImmediatePropagation();
  });
}

function openTableSelection() {
  $('.open_table_selection').on('click', function(e) {
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_dashboard_dine_list',
      data: {
        table_id: $(this).attr('data-table-id')
      }
    });
    e.stopImmediatePropagation();
  });
}

function customerSearchBeginCheck() {
  $('.customer_search_btn').on('click', function(e) {
    $('.next_page_no').val('1');
    var modalId = $(this).closest('.modal').attr('id')
    infiniteScrollAjax(1, modalId);
    infiniteScrollCustomer();
  });
}

function openNewCustomerPopup() {
  $('.new_customer_btn').on('click', function(e){
    $('#beginCheckByNamePopup').modal('hide');
    $('#newCustomerPopup').modal('show');
    e.stopImmediatePropagation();
  });
}

function openNewCustomerCheckIdPopup() {
  $('.new_customer_btn_check_id').on('click', function(e){
    $('#beginCheckByNamePopupCheckId').modal('hide');
    $('#newCustomerCheckIdPopup').modal('show');
    $('#address_contact').val($('.customer_search_box').val());
    e.stopImmediatePropagation();
  });
}

function areaSelectionPosCcheck() {
  // $('.address-type-pos-check').on('change', function(e){
  //   if($(this).val() == 'Villa') {
  //     $('.villa-text').addClass('hide');
  //     $('#apartment_number').attr('required', false);
  //   } else {
  //     $('.villa-text').removeClass('hide');
  //     $('#apartment_number').attr('required', true);
  //   }
  //   e.stopImmediatePropagation();
  // });
}

function backBtnInAddressForm() {
  $('.back-in-address-form').on('click', function(e){
    $('#newCustomerPopup').modal('hide');
    $('#beginCheckByNamePopup').modal('show');
    e.stopImmediatePropagation();
  });

  $('.back-btn-in-order-type-selection').on('click', function(e){
    $('#newCustomerPopup').modal('show');
    $('#orderTypeOptionBeginCheck').modal('hide');
    e.stopImmediatePropagation();
  });
}

function backBtnInAddressFormCheckId() {
  $('.back-in-address-form-check-id').on('click', function(e){
    $('#newCustomerCheckIdPopup').modal('hide');
    $('#beginCheckByNamePopupCheckId').modal('show');
    e.stopImmediatePropagation();
  });

  $('.back-btn-in-minimum-order-selection').on('click', function(e){
    $('#newCustomerCheckIdPopup').modal('show');
    $('#minimumOrderAmount').modal('hide');
    e.stopImmediatePropagation();
  });
}

function beginCheckByNameOrderTypeBtn() {
  $('.beginCheckByNameOrderTypeBtn').on('click', function(e){
    var selectedOderType = $('#selected_order_type_begin_check').val();
    if(selectedOderType) {
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_new_check_begin_check_by_name',
        data: {
          selected_user_id: $('.selected_user_id').val(),
          selected_address_id: $('.selected_address_id').val(),
          selected_branch_id: $('.selected_branch_id').val(),
          selected_order_type: $('#selected_order_type_begin_check').val()
        }
      });
    } else {
      toastr.error("Select Order Type");
    }
    e.stopImmediatePropagation();
  });
}

function customerSearchBeginCheckTextBox() {
  $('.customer_search_box').on('keydown', function(e) {
    if((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 13 || e.keyCode == 187 || e.keyCode == 39 || e.keyCode == 8) {
      if(e.keyCode == '13'){
        $('.next_page_no').val('1');
        var modalId = $(this).closest('.modal').attr('id')
        infiniteScrollAjax(1, modalId);
        infiniteScrollCustomer();
      }
    } else {
      e.preventDefault();
      return false;
    }
  });
}


function infiniteScrollAjax(page_no, modalId) {
  $.ajax({
    type: "POST",
    url: '/business/partner/pos_seach_customer',
    data: {
      mobile_no: $('.customer_search_box').val(),
      restaurant_id: $('.restaurant_id').val(),
      page: page_no,
      modal_id: modalId
    }
  });
}

function infiniteScrollCustomer() {
    $('#beginCheckByNamePopup .modal-body').on('scroll', function(e) {
      next_page_no = parseInt($('.next_page_no').val()) + 1;
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight && !$('#beginCheckByNamePopup #customerDetails').hasClass('d-none')) {
        infiniteScrollAjax(next_page_no, 'beginCheckByNamePopup');
        $('.next_page_no').val(next_page_no);
      }
      e.stopImmediatePropagation();
    })

    $('#beginCheckByNamePopupCheckId .modal-body').on('scroll', function(e) {
      next_page_no = parseInt($('.next_page_no').val()) + 1;
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight && !$('#beginCheckByNamePopupCheckId #customerDetails').hasClass('d-none')) {
        infiniteScrollAjax(next_page_no, 'beginCheckByNamePopupCheckId');
        $('.next_page_no').val(next_page_no);
      }
      e.stopImmediatePropagation();
    })
}

function setErrorMessageForTransferCheck() {
  $('.okBtnTransferTableCheckList, .newCheckBtnTransferTableCheckList').on('click', function(e){
    if($('#transferTableDineInList tr.selected_pickup').length > 0) {
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_transfer_table_list',
        data: {
          is_new_check: $(this).attr('data-new-check') == 'true',
          pick_check_id: $('#transferTableDineInList tr.selected_pickup').data('check-id'),
          branch_id: $('.selected_branch_id').val(),
          current_pos_check: $('#transferTableDineInList .pos_check_id').val()
        }
      });
    } else {
      toastr.error("Please select Check");
    }
    e.stopImmediatePropagation();
  }) 
}


function splitCheckPopupOpen() {
  $('.splitCheckDiv').on('click', function(e){
    if(!$(this).hasClass('pending_transaction')) {
      $.ajax({
        type: "POST",
        url: '/business/partner/pos_split_check',
        data: {
          check_id: $(this).attr('data-check-id')
        }
      });
    } else {
      $('#transaction_confimation').addClass('splitCheckClick');
    }
    e.stopImmediatePropagation();
  }) 
}

function checkTableTrSelect() {
  $('.check-table table tbody tr').on('click', function(e){
    $('.check-table table tbody tr').removeClass('selected_split_check');
    $(this).addClass('selected_split_check');
    e.stopImmediatePropagation();
  });
}

function newTransactionPopupData() {
  $('.createNewTransaction').on('click', function(e){
    $.ajax({
      type: "GET",
      url: '/business/partner/pos_new_check/'+$('#orderTypeOptionBeginCheck .selected_branch_id').val(),
      data: {
        selected_order_type: $('#orderTypeOptionDashboard #selected_order_types').val()
      }
    })
    e.stopImmediatePropagation();
  });
}

function orderTypeSelectionBeginCheckByName() {
  $('.orderTypeSelectionBeginCheckByName').on('click', function(e){
    $('#customerAddressDetails').removeClass('d-none')
    $("#customerDetails").addClass('d-none');
    $('#minimum_amount_data').addClass('d-none')
    $('#check_order_type').addClass('d-none');
    e.stopImmediatePropagation();
  });
}

function bindCheckWithAddress() {
  $('.bindCustomerWithCheck').on('click', function(e){
    $('.next_page_no').val('1');
    $('#beginCheckByNamePopupCheckId tbody').empty();
    $('.customer_search_box').val('');
    $('.customer_back_btn').addClass('d-none');
    $('#customerAddressDetails').addClass('d-none');
    $("#customerDetails").removeClass('d-none');
    $('#minimum_amount_data').addClass('d-none')
    $('#check_order_type').addClass('d-none');

    $('#beginCheckByNamePopupCheckId').modal('show');
    e.stopImmediatePropagation();
  });
}

function beginCheckByNamePopup() {
  $('.beginCheckByName').on('click', function(e){
    $('.next_page_no').val('1');
    $('#beginCheckByNamePopup tbody').empty();
    $('.customer_search_box').val('');
    $('#beginCheckByNamePopup').modal('show');
    e.stopImmediatePropagation();
  });
  $('.customer_detail').click(function(e){
    $('#beginCheckByNamePopup').find('.customer_id').val($(this).data('customer-id'))
    $('#beginCheckByNamePopupCheckId').find('.customer_id').val($(this).data('customer-id'))
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_new_transaction/'+$(this).data('customer-id') + '/get_addresses',
      data: {
        modal_id: $(this).attr('data-modal-id')
      }
    });
  });
  $('.customer_address_detail').click(function(e){
    $('#beginCheckByNamePopup').find('.address_id').val($(this).data('customer-address-id'))
    var modalId = $(this).attr('data-modal-id');
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_new_transaction/'+$(this).data('customer-address-id') + '/minimum_coverage',
      data: {
        restaurant_id: $("#"+modalId).find('.restaurant_id').val(),
        modal_id: modalId,
        check_id: $('.pos_check_id').val(),
        customer_id: $("#"+modalId).find('.customer_id').val()
      },
      success: function(data){
        if(data['modal_id'] == 'beginCheckByNamePopupCheckId') {
          $('.selectCheckOrderType').addClass('d-none');
          $('.checkIdLastStep').removeClass('d-none');
          $('.customer-details').empty().append("<span>"+data["user_name"]+"</span></br><span>"+data["address"]+"</span>");
          $('#check_customer_id').val(data['user_id'])
        } else {
          $('.selectCheckOrderType').removeClass('d-none');
          $('.checkIdLastStep').addClass('d-none');
        }
        $('#customerAddressDetails').addClass('d-none')
        $("#customerDetails").addClass('d-none');
        $('#minimum_amount_data').removeClass('d-none')
        $('#check_order_type').addClass('d-none');
        $('#minimum_amount').text(parseFloat(data['minimum_coverage_amount']).toFixed(3))
      }
    });
  });
  $('.customer_back_btn').click(function(e){
    const modalId = $(this).closest('.modal').attr('id');
    e.stopImmediatePropagation();
    if (!$('#customerAddressDetails').hasClass('d-none')){
      if(modalId == 'beginCheckByNamePopup') {
        $('#customerAddressDetails').addClass('d-none')
        $("#customerDetails").addClass('d-none');
        $('#minimum_amount_data').addClass('d-none')
        $('#check_order_type').removeClass('d-none');
        $(this).removeClass('d-none')
      } else {
        $('#customerAddressDetails').addClass('d-none')
        $("#customerDetails").removeClass('d-none');
        $('#minimum_amount_data').addClass('d-none')
        $('#check_order_type').addClass('d-none');
        $(this).addClass('d-none');
      }
    }else if (!$('#customerDetails').hasClass('d-none')){
      $(this).removeClass('d-none')
      $('#customerAddressDetails').addClass('d-none')
      $("#customerDetails").removeClass('d-none');
      $('#minimum_amount_data').addClass('d-none')
      $('#check_order_type').addClass('d-none');
    }
    else if (!$('#minimum_amount_data').hasClass('d-none')){
      $(this).removeClass('d-none')
      $('#customerAddressDetails').removeClass('d-none')
      $("#customerDetails").addClass('d-none');
      $('#minimum_amount_data').addClass('d-none')
      $('#check_order_type').addClass('d-none');
    }else if (!$('#check_order_type').hasClass('d-none')){
      if(modalId == 'beginCheckByNamePopup') {
        $(this).addClass('d-none');
        $('#customerAddressDetails').addClass('d-none');
        $("#customerDetails").removeClass('d-none');
        $('#minimum_amount_data').addClass('d-none');
        $('#check_order_type').addClass('d-none');
      } else {
        $(this).removeClass('d-none')
        $('#customerAddressDetails').addClass('d-none')
        $("#customerDetails").addClass('d-none');
        $('#minimum_amount_data').removeClass('d-none')
        $('#check_order_type').addClass('d-none');
      }
    }
  })
  $('.ConfirmMinimumOrder').click(function(){
    $('#customerAddressDetails').addClass('d-none')
    $("#customerDetails").addClass('d-none');
    $('#minimum_amount_data').addClass('d-none')
    $('#check_order_type').removeClass('d-none');
  });
  $('.selectCheckOrderType').click(function(e) {
    e.stopImmediatePropagation()
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_new_transaction/create_customer_check',
      data: {
        check_type: $('#check_order_types :selected').val(),
        customer_id: $('#beginCheckByNamePopup').find('.customer_id').val(),
        address_id: $('#beginCheckByNamePopup').find('.address_id').val(),
        restaurant_id: $('#beginCheckByNamePopup').find('.restaurant_id').val()
      }
    })
  })
}

function clearNumeberpadSelection() {
  $('.clearNumeberpadSelection').on('click', function(e){
    $('#selected_qty').val('');
    $('.numberpadDisplaySelection, .quickPaynumberpadDisplaySelection').text('');
    e.stopImmediatePropagation();
  });
}

function changeStatusofCheck() {
  $('.posCheckStatus').on('click', function(e){
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_status_change',
      data: {
        selected_status: $(this).attr('data-status'),
        pos_check_id: $('#pos_check_id').val()
      }
    });
    e.stopImmediatePropagation();
  });
}
function openFunctionReportTab() {
  $('#function_reports_link').on('click', function(e){
    $('.function_listing').removeClass('hide');
    $('#food_listing').addClass('hide');
    $('#condiments_data').addClass('hide');
    $('#pos_payment').addClass('hide');
    $('.menu-list').removeClass('active');
    $(this).addClass('active');
    e.stopImmediatePropagation();
  });
}

function checkPickupTable(){
  $('.okBtnClick').click(function(){
    $('#PickupErrorModal').modal('hide');
    $('#pickupTablePopup').modal();
  })
}

function transferTableDiv(){
  $('.transferTableDiv').click(function(e){
    $('#transferTable').modal('show');
    e.stopImmediatePropagation();
  })
}

function addOnTransaction(){
  $('.add-on-card').click(function(e){
    e.stopImmediatePropagation();
    var qty = $('#selected_qty').val() == '' ||  parseInt($('#selected_qty').val()) < 0 ? 1 : parseInt($('#selected_qty').val());
    $.ajax({
      type: "POST",
      url: '/business/partner/pos_menu_categories/'+ $('#table_id').val()+'/menuaddon_item',
      data: {
        menu_item_id: $(this).data('menu-item-id'),
        qty: qty,
        pos_table_id: $(this).data('pos-table-id'),
        selected_menu_id: $('#selected_menu_item_id').val(),
        parent_pos_transaction_id: $(this).data('parent-pos-transaction-id'),
        pos_check_id: $('#pos_check_id').val()
      }
    });
  })
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}


function delete_delivery_transporter(id) {
  swal({
    title: "Are you sure?",
    text: "Do you want to Delete this Transporter?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, Delete it!",
    cancelButtonText: "No, cancel plz!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm) {
    if (isConfirm) {
      $.ajax({
        type: "GET",
        url: '/delivery_company/remove_transporter/?emp_id=' + id,
        dataType: "JSON",
        success:function(data) {
          if (data.code == 200){
            swal("Deleted!", "Transporter has been deleted.", "success");
            document.getElementById("trans-"+id).outerHTML="";
          }
        },
        error: function() {
          swal("Error","Something went wrong","Error")
        }
      });
    } else {
      swal("Cancelled", "No change in transporter", "error");
    }
  });
};

$(document).on("change", "#create_offer_title", function() {
  var offerId = $(this).val();

  $.ajax({
    type: "GET",
    url: "/business/branch/admin/offer/percentage",
    dataType: "JSON",
    data: {
      offer_id: offerId
    },
    success: function(data) {
      if (data.discount != "") {
        $("#discount_percentage").val(data.discount).attr("readonly", true)
      } else {
        $("#discount_percentage").val(data.discount).attr("readonly", false)
      }
    },
    error: function() {
      $("#discount_percentage").val("").attr("readonly", false)
    }
  });
});

$(document).on("click", ".remove-menu-item-image-btn", function () {
  var id = $(this).data("id");

  swal({
    title: "Are you sure?",
    text: "Do you want to Delete this Image?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, Delete It!",
    cancelButtonText: "No, Cancel Plz!",
    closeOnConfirm: false,
    closeOnCancel: false
  },
  function(isConfirm) {
    if (isConfirm) {
      $.ajax({
        type: "GET",
        url: "/remove_menu_item_image?id=" + id,
        dataType: "JSON",
        success:function(data){
          if(data.code == 200) {
            $(".img-tag").attr("src", "/assets/ic_placeholder.png");
            $(".remove-menu-item-image-btn").remove();
            swal("Deleted", "Image Removed Successfully!", "success");
          }
        },
        error: function() {
          swal("error", "Image cannot be deleted", "error")
        }
      });
    } else {
      swal("Cancelled", "No change done", "error");
    }
  });
});

$(document).on("change", ".ad-type-filter", function () {
  $(this).closest("form").submit();
});

$(document).on("click", ".remove-driver-shift-btn", function() {
  var driverId = $(this).data("driver");
  var shiftId = $(this).data("shift");
  $(this).closest("div").remove();
  $(".driver-shift-modal-close").addClass("shift-refresh");
  $.get("/delivery_company/delivery_company_shifts/remove_driver_from_shift?driver_id=" + driverId + "&shift_id=" + shiftId);
});

$(document).on("click", ".shift-refresh", function() {
  window.location.reload();
});

$(document).on("click", ".open-branch-checkbox", function() {
  var targetRow = $(this).closest(".day-row").find(".timing-row");

  if (targetRow.find(".open-branch-checkbox:checked").length > 0) {
    targetRow.find(".branch-opening-time, .branch-closing-time, .add-branch-hours").removeClass("hide");
  } else {
    targetRow.find(".branch-opening-time, .branch-closing-time, .add-branch-hours").addClass("hide");
  }
});

$(document).on("click", ".add-branch-hours", function(e) {
  e.preventDefault();
  var targetRow = $(this).closest(".day-row");
  targetRow.addClass("target-row");
  var count = targetRow.find(".timing-row").length;
  var day = targetRow.find(".timing-row:last").attr("id");
  $.get("/business/add_new_branch_timing?count=" + count + "&day=" + day);
});

$(document).on("click", ".remove-branch-timing", function() {
  $(this).closest(".timing-row").remove();
});

$(document).on("change", ".manual-order-menu-category", function () {
  $(this).closest(".row").addClass("target-row");
  var id = $(this).closest(".row").attr("id");
  var categoryId = $(this).val();
  $.get("/business/show_category_items?category_id=" + categoryId + "&row_id=" + id);
});

$(document).on("change", ".manual-order-menu-item", function () {
  $(this).closest(".row").addClass("target-row");
  var id = $(this).closest(".row").attr("id");
  var itemId = $(this).val();
  $.get("/business/show_item_addons?item_id=" + itemId + "&row_id=" + id);
});

$(document).on("click", ".add-manual-order-item", function(e) {
  e.preventDefault();
  var branchId = $(".manual-order-branch").val();
  $(this).closest(".row").addClass("target-row");
  var id = $(this).closest(".row").attr("id");
  $.get("/business/add_item_row?branch_id=" + branchId + "&row_id=" + id);
  $(this).addClass("hide");
});

$(document).on("click", ".remove-manual-order-item", function(e) {
  e.preventDefault();
  $(this).closest(".row").remove();

  if($(".add-manual-order-item:visible").length == 0) {
    $(".add-manual-order-item:last").removeClass("hide");
  }
});

$(document).on("change", ".manual-order-branch", function () {
  var branchId = $(this).val();
  $.get("/business/show_branch_areas?branch_id=" + branchId);
});

$(document).on("change", ".user-address", function(e) {
  e.preventDefault();
  var id = $(this).val();
  $.get("/business/address_details?address_id=" + id);
});

$(document).on("change", "#area_id", function(e) {
  e.preventDefault();
  var id = $(this).val();
  var restaurantId = $("#restaurant_id").val();
  $.get("/business/area_details?area_id=" + id + "&restaurant_id=" + restaurantId);
});

$(document).on("change", ".on-demand-restaurant-change", function(e) {
  e.preventDefault();
  var id = $(this).val();
  window.location.href = "/business/manual/order/" + id;
});

$(document).on("click", ".user-radio", function(e) {
  e.preventDefault();
  $(this).closest("form").submit();
});

$(document).on("click", ".user-search-change-btn", function() {
  $("#selected_branch_id").val($(".manual-order-branch").val());
  $(".user-select-options").html("");
  $("#address_name").val("");
  $("#area_id").val("");
  $("#address_type").val("");
  $("#block").val("");
  $("#road").val("");
  $("#building").val("");
  $("#floor").val("");
  $("#apartment_number").val("");
  $("#additional_direction").val("");
  $("#address_contact").val("");
  $("#landline").val("");
  $("#user_name").attr("readonly", false).val("");
  $("#user_email").attr("readonly", false).val("");
  $(".user-address-list").closest(".row").addClass("hide");
  $(".user-address-list").html("");
  $("#manual_order_search_modal").modal({ backdrop: "static", keyboard: false })
  $("#manual_order_search_modal").modal("show");
});

$(document).on("click", ".offer-qty-checkbox", function () {
  if ($(this).is(":checked")) {
    $(".offer-qty-input").attr("readonly", false);
    $(".offer-qty-input").attr("required", true);
  } else {
    $(".offer-qty-input").attr("readonly", true);
    $(".offer-qty-input").val("");
    $(".offer-qty-input").attr("required", false);
  }
});

$(document).on("submit", ".dine-in-order-update-form", function () {
  var orderType = $("#order_type").val();
  var tableNumber = $("#table_number").val();

  if ((orderType == "Dine In") && ($.trim(tableNumber) == "")) {
    $("#table_number").focus();
    swal("Warning", "Please enter Table Number", "warning")
    return false;
  } else {
    return true;
  }
});
