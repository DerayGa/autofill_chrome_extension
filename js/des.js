

function encrypt(text){
  if(!text) return null;

  var textWordArray = CryptoJS.enc.Utf8.parse(text);
  var iv = reverseHexString(keyHex.toString());
  var ivHex = CryptoJS.enc.Hex.parse(iv);

  var options = {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex
  };

  var encrypted = CryptoJS.TripleDES.encrypt(textWordArray, keyHex, options);

  return encrypted.toString();
}

function decrypt(base64String){
  if(!base64String) return '';

  var iv = reverseHexString(keyHex.toString());
  var ivHex = CryptoJS.enc.Hex.parse(iv);

  var options = {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex
  };

  var decrypted = CryptoJS.TripleDES.decrypt( {
      ciphertext: CryptoJS.enc.Base64.parse(base64String)
  }, keyHex, options);

  return decrypted.toString(CryptoJS.enc.Utf8);
}

function reverseHexString(hexStr) {
  var first32 = hexStr.substring(0, 32);
  var reverseFirst32 = first32.split("").reverse().join("").split("");

  var reverseHex = '0000000000000000';

  for (var i = 0; i < reverseFirst32.length; i+=2) {
      reverseHex += reverseFirst32[i+1];
      reverseHex += reverseFirst32[i];
  };

  return reverseHex;
}