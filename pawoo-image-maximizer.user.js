// ==UserScript==
// @name       Pawoo Image Maximizer
// @namespace  http://aycabta.github.io/
// @version    0.0.3
// @description  Pawoooooooooo
// @include    /^https:\/\/pawoo.net/
// @copyright  2017+, aycabta
// ==/UserScript==

(function() {
    var sheet;
    var style = document.createElement('style');
    style.setAttribute('id', 'pawoo-image-maximizer-css');
    style.type = "text/css";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
    sheet = style.sheet;
    sheet.insertRule('.media-item .u-photo {' +
                     '    background-image: none !important;' +
                     '}', sheet.cssRules.length);
    sheet.insertRule('.status__attachments__inner {' +
                     '    height: auto !important;' +
                     '    display: block !important;' +
                     '}', sheet.cssRules.length);
    sheet.insertRule('.scrollable div {' +
                     '    height: auto !important;' +
                     '}', sheet.cssRules.length);
    sheet.insertRule('.scrollable div[style^="box-sizing"] {' +
                     '    width: 100% !important;' +
                     '    left: auto !important;' +
                     '    top: auto !important;' +
                     '    right: auto !important;' +
                     '    bottom: auto !important;' +
                     '    margin-bottom: 3px !important;' +
                     '}', sheet.cssRules.length);
    var maximize = doc => {
        var photos = doc.querySelectorAll('.media-item .u-photo');
        photos.forEach(photo => {
            if (photo.getElementsByTagName('img').length == 0) {
                var url = photo.attributes['href'].value;
                var img = document.createElement("img");
                img.src = url;
                img.style.width = '100%';
                photo.appendChild(img);
            }
        });
        photos = doc.querySelectorAll('.scrollable a[style*="background"]');
        photos.forEach(photo => {
            if (photo.getElementsByTagName('img').length == 0) {
                var url = photo.attributes['href'].value;
                var img = document.createElement("img");
                img.src = url;
                img.style.width = '100%';
                photo.appendChild(img);
            }
        });
    };
    maximize(document);
    document.body.addEventListener(
        'AutoPagerize_DOMNodeInserted',
        e => {
            maximize(e.target);
        },
        false);
    var observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            if (m.addedNodes !== undefined) {
                m.addedNodes.forEach(n => {
                    maximize(n);
                });
            }
        });
    });
    observer.observe(document.querySelector('body'), { childList: true, subtree: true });
})();
