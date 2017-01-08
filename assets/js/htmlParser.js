var decodeHTML = function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

$(document).ready(function() {
    $('.content').each(function(i) {
        var string = $(this).html();
        var decodedString = decodeHTML(string);
        $(this).html(decodedString);
    });
});