var fillButton;
var fillInfo;


$(document).ready(function(){

  chrome.storage.sync.get({
    fillInfo: []
  }, function(items) {
    fillInfo = items.fillInfo;

    if(!fillInfo) return;

    fillButton = $('<button style="background-color:#2196F3;border:none;color:white;font-size:x-large;position:fixed;bottom:0px;right:0px;width:100%;height:35px;z-index:99999">自動填寫</button>')

    if(fillInfo.password.taipeifubon && document.title.indexOf('富邦') > -1) {
      taipeifubon();
    }

    if(fillInfo.password.esunbank && document.title.indexOf('玉山') > -1) {
      esunbank();
    }

    if(fillInfo.password.chb && document.title.indexOf('彰化') > -1) {
      chb();
    }

    if(fillInfo.password.yuantabank && document.title.indexOf('元大') > -1) {
      yuantabank();
    }

    if(fillInfo.password.sinopac && document.title.indexOf('永豐') > -1) {
      sinopac();
    }
  });
})

function taipeifubon(){
  $('frameset', document).parent().append($(fillButton));

  $(fillButton).click(function(){
    var frame1 = $('#frame1');
    if(!frame1) return;

    var txnFrame = $('#txnFrame', frame1.contents());
    if(!txnFrame) return;
    var contents = txnFrame.contents();

    var m1_uid = $('#m1_uid', contents);
    if(m1_uid)
      $(m1_uid).val(fillInfo.uid);

    var m1_uuid = $('#m1_uuid', contents);
    if(m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#m1_password', contents);
    if(m1_password)
      $(m1_password).val(fillInfo.password.taipeifubon);

    var m1_userCaptcha = $('#m1_userCaptcha', contents);
    if(m1_userCaptcha)
      $(m1_userCaptcha).focus();

    $(fillButton).remove();
  });
}

function esunbank(){
  $(document.body).append($(fillButton));

  $(fillButton).click(function(){
    var iframe1 = $('#iframe1');
    if(!iframe1) return;

    var contents = iframe1.contents();

    var custid = $("#loginform\\:custid", contents);
    if(custid)
      $(custid).val(fillInfo.uid);

    var m1_uuid = $('#loginform\\:name', contents);
    if(m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#loginform\\:passwd', contents);
    if(m1_password)
      $(m1_password).val(fillInfo.password.esunbank);

    $(fillButton).remove();
  });
}

function chb(){
  $(document.body).append($(fillButton));

  $(fillButton).click(function(){

    var custid = $("#_SSO_UID_");
    if(custid)
      $(custid).val(fillInfo.uid);

    var m1_uuid = $('#_SSO_UUID_');
    if(m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#_SSO_PWD_');
    if(m1_password)
      $(m1_password).val(fillInfo.password.chb);

    $(fillButton).remove();
  });
}

function yuantabank(){
  $('frameset', document).parent().append($(fillButton));

  $(fillButton).click(function(){
    var frame = $('frame[name="main"]');
    if(!frame) return;

    var contents = frame.contents();

    var m1_uid = $('#custid', contents);
    if(m1_uid)
      $(m1_uid).val(fillInfo.uid);

    var m1_uuid = $('#custno', contents);
    if(m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#custcode', contents);
    if(m1_password)
      $(m1_password).val(fillInfo.password.yuantabank);

    var m1_userCaptcha = $('#gcode', contents);
    if(m1_userCaptcha)
      $(m1_userCaptcha).focus();

    $(fillButton).remove();
  });
}

function sinopac(){
  $(document.body).append($(fillButton));

  $(fillButton).click(function(){

    var custid = $("#ctl00_ctl00_ContentPlaceHolder1_DefaultContent_id");
    if(custid)
      $(custid).val(fillInfo.uid);

    var m1_uuid = $('#ctl00_ctl00_ContentPlaceHolder1_DefaultContent_usercode');
    if(m1_uuid)
      $(m1_uuid).val(fillInfo.uuid);

    var m1_password = $('#ctl00_ctl00_ContentPlaceHolder1_DefaultContent_PWD');
    if(m1_password)
      $(m1_password).val(fillInfo.password.sinopac);

    $(fillButton).remove();
  });
}