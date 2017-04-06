requirejs.config({
	urlArgs: "bust=" + (new Date()).getTime(),

    paths: {
        'jquery': [
            //'http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
            '../libs/jquery/js/jquery-2.1.4.min'
        ],
		'system' : '../system'
    }
});

requirejs(['Main']);
