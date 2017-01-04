$.fn.editable.defaults.mode = 'inline';

$(document).ready(function() {

    $('.nameEdit').editable({
        type: 'text',
        name: 'name',
        url: '/editUser',
        title: 'Enter Name'
    });

    $('.emailEdit').editable({
        type: 'text',
        name: 'email',
        url: '/editUser',
        title: 'Enter Email'
    });




});