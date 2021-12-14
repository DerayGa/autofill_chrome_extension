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
            var account = fillInfo.account || {}
            if (!fillInfo) {
                return;
            }

            fillButton = $('<button style="background-color:#2196F3;border:none;color:white;font-size:x-large;position:fixed;bottom:0px;right:0px;width:100%;height:35px;z-index:99999">自動填寫</button>')

            fillInfo.uid = decrypt(fillInfo.uid);
            fillInfo.uuid = decrypt(fillInfo.uuid);
            $.each(password, function(index, value) {
                password[index] = decrypt(password[index]);
            });
            $.each(account, function(index, value) {
                account[index] = decrypt(account[index]);
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

            if (password.ctbcbank && document.title.indexOf('中國信託') > -1) {
                ctbcbank();
            }

            if (password.hncb && document.title.indexOf('華南') > -1) {
                hncb();
            }

            if (password.citi && document.title.indexOf('Citibank') > -1) {
                citi();
            }

            if (password.cathaybk && document.title.indexOf('國泰世華') > -1) {
                cathaybk();
            }

            if (password.cathaybk && document.title.indexOf('土地銀行') > -1) {
                landbank();
            }

            if (password.post && document.title.indexOf('郵局') > -1) {
                post();
            }
        });
    }
});

function taipeifubon() {
    $('frameset', document).parent().append($(fillButton));

    $(fillButton).click(function() {
        var frame1 = $('#frame1');
        if (!frame1) {
            return;
        }

        var txnFrame = $('#txnFrame', frame1.contents());
        if (!txnFrame) {
            return;
        }
        var contents = txnFrame.contents();

        var table = $('table[class="login_tb"]:first', contents);
        var inputs = $('input', table);

        if (inputs[0]) {
            $(inputs[0]).val(fillInfo.uid);
        }

        if (inputs[1]) {
            $(inputs[1]).val(fillInfo.uuid);
        }

        if (inputs[2]) {
            $(inputs[2]).val(fillInfo.password.taipeifubon);
        }

        if (inputs[3]) {
            $(inputs[3]).focus();
        }

        $(fillButton).remove();
    });

    $('#frame1').on('load', function() {
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
        if (!iframe1) {
            return;
        }

        var contents = iframe1.contents();

        var custid = $("#loginform\\:custid", contents);
        if (custid) {
            $(custid).val(fillInfo.uid);
        }

        var m1_uuid = $('#loginform\\:name', contents);
        if (m1_uuid) {
            $(m1_uuid).val(fillInfo.uuid);
        }

        var m1_password = $('#loginform\\:pxsswd', contents);
        if (m1_password) {
            $(m1_password).val(fillInfo.password.esunbank);
            $(m1_password).focus();
        }

        $(fillButton).remove();
    });

    $('#iframe1').on('load', function() {
        $(fillButton).trigger('click');
    });
}

function chb() {
    function autoFillChb() {
        var form1 = $('.login-form-wrap');
        if (!form1) {
            return;
        }

        var custid = $("input[name=uid]", form1);
        if (custid) {
            $(custid).val(fillInfo.uid);
        }

        var m1_uuid = $('input[name=uuid]', form1);
        if (m1_uuid) {
            $(m1_uuid).val(fillInfo.uuid);
        }

        var m1_password = $('input[name=pwd]', form1);
        if (m1_password) {
            $(m1_password).val(fillInfo.password.chb);
        }

        var txtValidateCode = $('input[name=captcha]', form1);
        if (txtValidateCode) {
            $(txtValidateCode).focus();
        }
    }

    autoFillChb();
}

function yuantabank() {
    function autoFillYuantabank() {
        var frame = $('frame[name="main"]');
        if (!frame) {
            return;
        }

        var contents = frame.contents();

        var m1_uid = $('#custid', contents);
        if (m1_uid) {
            $(m1_uid).val(fillInfo.uid);
        }

        var m1_uuid = $('#custno', contents);
        if (m1_uuid) {
            $(m1_uuid).val(fillInfo.uuid);
        }

        var m1_password = $('#custcode', contents);
        if (m1_password) {
            $(m1_password).val(fillInfo.password.yuantabank);
        }

        var m1_userCaptcha = $('#gcode', contents);
        if (m1_userCaptcha) {
            $(m1_userCaptcha).focus();
        }
    }

    $('frame[name="main"]').on('load', function() {
        autoFillYuantabank();
    });
}

function sinopac() {
    $(document.body).append($(fillButton));

    $(fillButton).click(function() {
        var fields = $("#not-logged-in-form > div.rowElem");

        var custid = $("input", fields[0]);
        if (custid) {
            $(custid[0]).click();
            $(custid[0]).focus();
            custid[0].dispatchEvent(new Event('input'));
            $(custid[0]).val(fillInfo.uid);
        }

        var m1_uuid = $("input", fields[1]);
        if (m1_uuid) {
            $(m1_uuid[0]).click();
            $(m1_uuid[0]).focus();
            m1_uuid[0].dispatchEvent(new Event('input'));
            $(m1_uuid[0]).val(fillInfo.uuid);
        }

        var m1_password = $("input", fields[2]);
        if (m1_password) {
            $(m1_password[0]).click();
            $(m1_password[0]).focus();
            m1_password[0].dispatchEvent(new Event('input'));
            $(m1_password[0]).val(fillInfo.password.sinopac);
        }

        var m1_userCaptcha = $("input", fields[3]);
        if (m1_userCaptcha) {
            $(m1_userCaptcha).focus();
        }

        $(fillButton).remove();
    });
}

function taishin() {
    function autoFillTaishin() {
        var frame = $('frame[name="_mainFrame"]');
        if (!frame) {
            return;
        }

        var contents = frame.contents();

        var userid = $("#userid", contents);
        if (userid) {
            $(userid).val(fillInfo.uid);
            $(userid).focus();
        }

        var usercode = $("#usercode", contents);
        if (usercode) {
            $(usercode).val(fillInfo.uuid);
            $(usercode).focus();
        }

        var password = $("#password", contents);
        if (password) {
            if (fillInfo.password.taishin) {
                $(password).val(fillInfo.password.taishin);
            }
            $(password).focus();
        }

        var authcode = $("#authcode", contents);
        if (authcode) {
            $(authcode).focus();
        }
    }

    $('frame[name="_mainFrame"]').on('load', function() {
        autoFillTaishin();
    });
}

function ctbcbank() {
    var count = 10;

    function autoFillCtbcbank() {
        var inputs = $('form > div.form-section > div.form_group > div.input_field > input');
        input0 = $('form > div.form-section > div.form_group > div.input_field > input')[0];

        if (inputs.length == 0 && count-- > 0) {
            setTimeout(autoFillCtbcbank, 500);
            return;
        }

        if (inputs[0]) {
            $(inputs[0]).val(fillInfo.uid);
            inputs[0].dispatchEvent(new Event('input'));
        }

        if (inputs[1]) {
            $(inputs[1]).val(fillInfo.uuid);
            inputs[1].dispatchEvent(new Event('input'));
        }

        if (inputs[2] && fillInfo.password.ctbcbank) {
            $(inputs[2]).val(fillInfo.password.ctbcbank);
            inputs[2].dispatchEvent(new Event('input'));
        }
    }

    autoFillCtbcbank();
}

function hncb() {
    function autoFillHncb() {
        var form1 = $('#LoginForm_post');
        if (!form1) {
            return;
        }

        var userid = $("#USERID", form1);
        if (userid && !($(userid).val())) {
            $(userid).val(fillInfo.uid);
        }

        var usercode = $("#NICKNAME", form1);
        if (usercode && !($(usercode).val())) {
            $(usercode).val(fillInfo.uuid);
        }

        var password = $("#password", form1);
        if (password && fillInfo.password.hncb) {
            $("#pwdText", form1).focus();
            $(password).val(fillInfo.password.hncb);
        }

        var authcode = $('#TrxCaptchaKey', form1);
        if (authcode) {
            $(authcode).focus();
        }
    }

    autoFillHncb();
}

function citi() {
    function autoFillCiti() {
        var username = $("#username");
        if (username && !($(username).val())) {
            $(username).val(fillInfo.uuid);
        }

        var password = $("#password");
        if (password && fillInfo.password.citi) {
            $(password).val(fillInfo.password.citi);
        }
    }

    autoFillCiti();
}

function cathaybk() {
    function autoFillCathaybk() {
        var account = $("input#CustID");
        if (account) {
            $(account).val(fillInfo.uid);
        }

        var username = $("input#UserIdKeyin");
        if (username) {
            $(username).val(fillInfo.uuid);
        }

        var password = $("input#passwordKeyin");
        if (password && fillInfo.password.cathaybk) {
            $(password).val(fillInfo.password.cathaybk);
        }

    }

    autoFillCathaybk();
}

function landbank() {
    function autoFillLandbank() {
        var frame = $('iframe[src="/Account/Login"]');
        if (!frame) {
            return;
        }

        var contents = frame.contents();

        var userid = $("input#hidNationalID", contents);
        if (userid) {
            $(userid).focus();
            $(userid).val(fillInfo.uid);
        }

        var username = $("input#UserName", contents);
        if (username) {
            $(username).focus();
            $(username).val(fillInfo.uuid);
        }

        var password = $("input#Password", contents);
        if (password) {
            $(password).focus();
            if (fillInfo.password.landbank) {
                $(password).val(fillInfo.password.landbank);
            }
        }

        var authcode = $("input#VerificationCode", contents);
        if (authcode) {
            $(authcode).focus();
        }
    }

    $('iframe[src="/Account/Login"]').on('load', function() {
        autoFillLandbank();
    });
}

function post() {
    function autoFillPost() {
        var account = $("input[ng-model=cif_id]");
        if (account) {
            $(account).val(fillInfo.uid);
            account[0].dispatchEvent(new Event('input'));
        }
        var username = $("input[ng-model=userID]");
        if (username) {
            $(username).val(fillInfo.uuid);
        }
        var password = $("input[ng-model=userPWD]");
        if (password && fillInfo.password.post) {
            $(password).val(fillInfo.password.post);
        }
        var captcha = $("input[name=captcha]");
        if (captcha) {
            $(captcha).focus();
        }

    }

    autoFillPost();
}
