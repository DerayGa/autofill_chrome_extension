var keyHex = "";

function getFillInfo() {
  var info = { password:{}, account: {} };

  info.uid = encrypt($('#uid').val());
  info.uuid = encrypt($('#uuid').val());
  info.password.taipeifubon = encrypt($('#password-taipeifubon').val());
  info.password.esunbank = encrypt($('#password-esunbank').val());
  info.password.chb = encrypt($('#password-chb').val());
  info.password.yuantabank = encrypt($('#password-yuantabank').val());
  info.password.sinopac = encrypt($('#password-sinopac').val());
  info.password.taishin = encrypt($('#password-taishin').val());
  info.password.ctbcbank = encrypt($('#password-ctbcbank').val());
  info.password.hncb = encrypt($('#password-hncb').val());
  info.password.citi = encrypt($('#password-citi').val());
  info.account.post = encrypt($('#account-post').val());
  info.password.post = encrypt($('#password-post').val());

  return info;
}

function restore_options() {
  chrome.storage.sync.get({
    fillInfo: []
  }, function(items) {

    var fillInfo = items.fillInfo;
    var password = fillInfo.password || {};
    var account = fillInfo.account || {};
    $('#uid').val(decrypt(fillInfo.uid));
    $('#uuid').val(decrypt(fillInfo.uuid));
    $('#password-taipeifubon').val(decrypt(password.taipeifubon));
    $('#password-esunbank').val(decrypt(password.esunbank));
    $('#password-chb').val(decrypt(password.chb));
    $('#password-yuantabank').val(decrypt(password.yuantabank));
    $('#password-sinopac').val(decrypt(password.sinopac));
    $('#password-taishin').val(decrypt(password.taishin));
    $('#password-ctbcbank').val(decrypt(password.ctbcbank));
    $('#password-hncb').val(decrypt(password.hncb));
    $('#password-citi').val(decrypt(password.citi));
    $('#account-post').val(decrypt(account.post));
    $('#password-post').val(decrypt(password.post));
  });
}

function save_options() {
  chrome.storage.sync.set({
    fillInfo: getFillInfo()
  }, function() {
  });
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.identity.getProfileUserInfo(function (userInfo){
    var key = userInfo.email || '';

    key = CryptoJS.MD5(key).toString()+ '0000000000000000';

    keyHex = CryptoJS.enc.Hex.parse(key);

    restore_options();
  });

  $('#save').click(save_options);

});