
document.addEventListener('DOMContentLoaded', function() {
  chrome.identity.getProfileUserInfo(function (userInfo){
    chrome.runtime.onConnect.addListener(function(port){
      port.postMessage({key: userInfo.email});
    });
  });
});


