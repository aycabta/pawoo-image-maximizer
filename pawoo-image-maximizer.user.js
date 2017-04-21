// ==UserScript==
// @name       Pawoo Image Maximizer
// @namespace  http://aycabta.github.io/
// @version    0.0.2
// @description  Pawoooooooooo
// @include    /^https:\/\/pawoo.net/
// @copyright  2017+, You
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
    sheet.insertRule('.status div {' +
                     '    height: auto !important;' +
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
    };
    maximize(document);
    document.body.addEventListener(
        'AutoPagerize_DOMNodeInserted',
        function(e) {
            maximize(e.target);
        },
        false);
})();
