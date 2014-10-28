var data = [],
	grid = true,
	brush = true;
	
$(document).ready(function() {
	$(document).on('click', '.pixel',function() {
		if (brush === true) {
			$(this).css('background', $('#color').val());
			$(this).data('color', $('#color').val());
		}
	});
	
	$(document).on('mouseover', '.pixel',function() {
		if (brush === false) {
			$(this).css('background', $('#color').val());
			$(this).data('color', $('#color').val());
		}
	});		
	
	$('.color').click(function() {
		$('#color').val($(this).data("hex"));
		$('.curColor').css('background', $(this).data("hex"));
	});
	
	$('#number').change(function() {
		if ($('#number').val() != '' && $('#row').val())
			setPixel($('#number').val(), $('#row').val());
	});
	
	$('#row').change(function() {
		if ($('#number').val() != '' && $('#row').val())
			setPixel($('#number').val(), $('#row').val());
	});
	
	$('.save').click(function(event) {
		event.preventDefault();
		save();
	});
	
	$('.load').click(function(event) {
		event.preventDefault();
		load();
	});		
	
	
	$('.grid').click(function() {
		toggleGrid();
	});
		
	$('.brush').click(function() {
		toggleClick();
	});	
		
	$('.clear').click(function() {
		data = [];
		$('.pixel').css('background', '#fff');
	});
	
	$('.example').click(function() {
		$('.pixel').css('background', '#fff');
		data = $.parseJSON($('.' + $(this).data('name') + '-data').val());
		load();
	});
	
	setPixel($('#number').val(), $('#row').val());	
});

function setPixel(number, row) {
	var html = '';
	for (var i = 1; i <= number; i++) {
		html += '<div class="pixel" data-i="' + i + '" data-color="#fff"></div>';
		a = i % row;
		if (a === 0)
			html += '<br clear="both">';
	}
	$('#pixel').html(html);
}

showKeyCode = function(e) {
	switch(e.keyCode)
	{
		case 49: // 1
			toggleClick();
		break;
	}
}

save = function() {	
	$('.pixel').each(function(){
		var i = $(this).data('i');
		var c = $(this).data('color');
		// 還需判斷不重複的才要存
		data.push({'i': i, 'c': c});
	});
	$('.input').val(JSON.stringify(data));
	$('body').data(data);	
}

load = function() {
	$.each( data, function( key, val ) {
		$('.pixel[data-i=' + data[key].i + ']').css('background', data[key].c);
	});	
	$('#console').val(JSON.stringify(data));
}

toggleClick = function() {
	if (brush === false) {
		brush = true;
		$('*').css('cursor', 'default');
		$('.brush').css('font-weight', 'normal');
	} else {
		brush = false;
		$('*').css('cursor', 'pointer');
		$('.brush').css('font-weight', 'bold');
	}
}

toggleGrid = function() {
	if (grid === false) {
		$('.pixel').css('border', '1px dashed #ccc');
		$('.pixel').css('width', '23px');
		$('.pixel').css('height', '23px');
		$('.grid').css('font-weight', 'normal');
		grid = true;
	} else {
		$('.pixel').css('border', '0');
		$('.pixel').css('width', '25px');
		$('.pixel').css('height', '25px');
		$('.grid').css('font-weight', 'bold');
		grid = false;
	}
}