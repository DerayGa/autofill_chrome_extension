function getFillInfo() {
  var info = { password:{} };

  info.uid = $('#uid').val();
  info.uuid = $('#uuid').val();
  info.password.taipeifubon = $('#password-taipeifubon').val();
  info.password.esunbank = $('#password-esunbank').val();
  info.password.chb = $('#password-chb').val();
  info.password.yuantabank = $('#password-yuantabank').val();
  info.password.sinopac = $('#password-sinopac').val();

  return info;
}

function restore_options() {
  chrome.storage.sync.get({
    fillInfo: []
  }, function(items) {
    var fillInfo = items.fillInfo;
    var password = fillInfo.password;
    $('#uid').val(fillInfo.uid);
    $('#uuid').val(fillInfo.uuid);
    $('#password-taipeifubon').val(password.taipeifubon);
    $('#password-esunbank').val(password.esunbank);
    $('#password-chb').val(password.chb);
    $('#password-yuantabank').val(password.yuantabank);
    $('#password-sinopac').val(password.sinopac);
  });
}

function save_options() {
  chrome.storage.sync.set({
    fillInfo: getFillInfo()
  }, function() {
  });
}

document.addEventListener('DOMContentLoaded', function() {
  $('#save').click(save_options);

  restore_options();
});