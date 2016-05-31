var fillButton;
var fillInfo;
var keyHex = "";

$(document).ready(function() {
  var connect = chrome.runtime.connect({
    name: "mycontentscript"
  });

  connect.onMessage.addListener(getMessage);

  function getMessage(message, sender) {
    connect.onMessage.removeListener(getMessage);
    key = message.key || '';

    key = CryptoJS.MD5(key).toString() + '0000000000000000';

    keyHex = CryptoJS.enc.Hex.parse(key);

    chrome.storage.sync.get({
      fillInfo: []
    }, function(items) {
      fillInfo = items.fillInfo;
      var password = fillInfo.password || {}
      if (!fillInfo) return;

      fillButton = $('<button style="background-color:#2196F3;border:none;color:white;font-size:x-large;position:fixed;bottom:0px;right:0px;width:100%;height:35px;z-index:99999">自動填寫</button>')

      fillInfo.uid = decrypt(fillInfo.uid);
      fillInfo.uuid = decrypt(fillInfo.uuid);
      $.each(password, function(index, value) {
        password[index] = decrypt(password[index]);
      });

      if (password.taipeifubon && document.title.indexOf('富邦') > -1) {
        taipeifubon();
      }

      if (password.esunbank && document.title.indexOf('玉山') > -1) {
        esunbank();
      }

      if (password.chb && document.title.indexOf('彰化') > -1) {
        chb();
      }

      if (password.yuantabank && document.title.indexOf('元大') > -1) {
        yuantabank();
      }

      if (password.sinopac && document.title.indexOf('永豐') > -1) {
        sinopac();
      }

      if (password.taishin && document.URL.indexOf('taishinbank') > -1) {
        taishin();
      }
    });
  }
})

function taipeifubon() {
  $('frameset', document).parent().append($(fillButton));

  $(fillButton).click(function() {
    var frame1 = $('#frame1');
    if (!frame1) return;

    var txnFrame = $('#txnFrame', frame1.contents());
    if (!txnFrame) return;
    var contents = txnFrame.contents();

    var m1_uid = $('#m1_uid', contents);
    if (m1_uid)
      $(m1_uid).val(fillInfo.uid);

    var m1_uuid = $('#m1_uuid', contents);
    if (m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#m1_password', contents);
    if (m1_password)
      $(m1_password).val(fillInfo.password.taipeifubon);

    var m1_userCaptcha = $('#m1_userCaptcha', contents);
    if (m1_userCaptcha)
      $(m1_userCaptcha).focus();

    $(fillButton).remove();
  });

  $('#frame1').on('load', function(){
    var contents = $('#frame1').contents();

    var header_login = $('#header_form\\:header_login', contents);
    if (header_login) {
      $(header_login).bind('click', function() {
        $(fillButton).trigger('click');
      });
    }
  });
}

function esunbank() {
  $(document.body).append($(fillButton));

  $(fillButton).click(function() {
    var iframe1 = $('#iframe1');
    if (!iframe1) return;

    var contents = iframe1.contents();

    var custid = $("#loginform\\:custid", contents);
    if (custid)
      $(custid).val(fillInfo.uid);

    var m1_uuid = $('#loginform\\:name', contents);
    if (m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#loginform\\:passwd', contents);
    if (m1_password) {
      $(m1_password).val(fillInfo.password.esunbank);
      $(m1_password).focus();
    }

    $(fillButton).remove();
  });

  $('#iframe1').on('load', function(){
    $(fillButton).trigger('click');
  });
}

function chb() {
  $(document.body).append($(fillButton));

  $(fillButton).click(function() {

    var custid = $("#_SSO_UID_");
    if (custid)
      $(custid).val(fillInfo.uid);

    var m1_uuid = $('#_SSO_UUID_');
    if (m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#_SSO_PWD_');
    if (m1_password) {
      $(m1_password).val(fillInfo.password.chb);
      $(m1_password).focus();

      var submitBtn = $('#submitBtn');

      if (submitBtn) {
        $(submitBtn).trigger('click');
      }
    }

    $(fillButton).remove();
  });

  //window.setTimeout(function() {
    $(fillButton).trigger('click');
  //}, 1000);
}

function yuantabank() {
  $('frameset', document).parent().append($(fillButton));

  $(fillButton).click(function() {
    var frame = $('frame[name="main"]');
    if (!frame) return;

    var contents = frame.contents();

    var m1_uid = $('#custid', contents);
    if (m1_uid)
      $(m1_uid).val(fillInfo.uid);

    var m1_uuid = $('#custno', contents);
    if (m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#custcode', contents);
    if (m1_password)
      $(m1_password).val(fillInfo.password.yuantabank);

    var m1_userCaptcha = $('#gcode', contents);
    if (m1_userCaptcha)
      $(m1_userCaptcha).focus();

    $(fillButton).remove();
  });

  $('frame[name="main"]').on('load', function(){
    $(fillButton).trigger('click');
  });
}

function sinopac() {
  $(document.body).append($(fillButton));

  $(fillButton).click(function() {

    var custid = $("#ctl00_ctl00_ContentPlaceHolder1_DefaultContent_id");
    if (custid)
      $(custid).val(fillInfo.uid);

    var m1_uuid = $('#ctl00_ctl00_ContentPlaceHolder1_DefaultContent_usercode');
    if (m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#ctl00_ctl00_ContentPlaceHolder1_DefaultContent_PWD');
    if (m1_password)
      $(m1_password).val(fillInfo.password.sinopac);

    $(fillButton).remove();
  });
}

function taishin(){
  $(document.body).append($(fillButton));

  $(fillButton).click(function() {
    var userid = $("#userid");
    if (userid)
      $(userid).val(fillInfo.uid);

    var usercode = $("#usercode");
    if (usercode)
      $(usercode).val(fillInfo.uuid);

    var password = $("#password");
    if (password && fillInfo.password.taishin)
      $(password).val(fillInfo.password.taishin);

    var authcode = $('#authcode');
    if (authcode)
      $(authcode).focus();

    $(fillButton).remove();
  });

  //window.setTimeout(function() {
    $(fillButton).trigger('click');
  //}, 1000);
}