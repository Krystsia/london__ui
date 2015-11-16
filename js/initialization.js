$(document).ready(function() {
   
    var x = $(window).scrollTop();
    var y = $(window).scrollLeft();
    var width = $(window).width();
    var height = $(window).height();
    
    
    
    
    /****************function**************/
    
    
    function update(selector){
        var updateWidth = $(selector).width();
        var updateHeigth = $(selector).height();
        var posHor = width/2-updateWidth/2;
        var posVer = height/2-updateHeigth/2+margin*2; 
        $(selector).show('slow');
        $(selector).scrollLeft(posHor);
        $(selector).scrollTop(posVer);
    }
    
    
    /****************promts****************/
    
    
    $('.update').hide();
    
 /****************для демонстрации, нужно удалить*************/   
    var arr = $('.update').not('.adding_files').toArray();
   
    var margin = 0;
    jQuery.each(arr,function(){
        var updateWidth = $(this).width();
        var updateHeigth = $(this).height();
        $(this).show('slow').css({
            'left' : width/2-updateWidth/2,
            'top' : height/2-updateHeigth/2+margin*2
        });
        margin += updateHeigth;
    });
/****************end demo*************/
    
   
    
    
     /*add files*/
    $('.add').on('click',function(){
        $('.adding_files').show('slow');
    })
    
    /*selectAll*/
    $('.allcheckbox input:checkbox').change(function(){
        
        var group=$('.files_list_add_document input:checkbox');
        $(group).attr('checked', $(this).attr('checked'));
    });
    
    
    
    /*fixing height*/
    var heightFix = $('.tab__item').height();
    $('.fix').height(heightFix);
    
    
    
    /*add service*/
    
    $('div#add_service_content,div#add_client_content').hide();
    $('#add_service_btn').click(function(){
        update('div#add_service_content');
        return false;
    });
    $('#add_client_btn').click(function(){
        update('div#add_client_content');
        return false;
    });
   
    
    
    var html_add_service = "<ul id=new_service>"+$('#new_service').html()+"</ul>";
    $('#add_service').click(function(e){
        e.preventDefault();
        $('#new_service:first-child')
            .before(html_add_service);
        $('#new_service:first-child')
            .css('margin-bottom','10px');
        $('select').styler();
        $('.delete').click(function(e){
        e.preventDefault();
        $(this).parents('ul').hide();
        });
    });
    var count = 1;
    var html_new_director = "<ul id=new_director>"+$('#new_director').html()+"</ul>";
    $('#new_director_btn').click(function(e){
        e.preventDefault();
        $('#new_director:last').after(html_new_director);
        var arrayD = $('ul#new_director').toArray();
        jQuery.each(arrayD,function(){
            $(this).addClass('alert');
            $(this).find('.settings_number').text(count++);
        });
        count=1;
        $('ul#new_director').find('div.close').click(function(e){
        
        e.preventDefault();
        $(this).parents('.alert').remove();
        var count =1;
        var arrayDes = $('ul#new_director').toArray();
            jQuery.each(arrayDes,function(){
            $(this).find('.settings_number').text(count++);
        });
        
    });
    });
    
    /*terminate the contract*/
    
    $('#terminate_the_contract').hide();
     $('#terminate_the_contract_btn').click(function(){
         update('#terminate_the_contract');
     })
    
    /*button*/
    
    
    $('.cancel,.close,.c').click(function(e){
        e.preventDefault();
        $(this).parents('.alert').hide(200);
    });
    
/****************lightbox******************/
    
    
    $('a.lightbox').click(function(e){
        $('<div id="overlay"></div>')
        .css('top',$(document).scrollTop())
        .css('opacity', '0')
        .animate({'opacity':'0.5'},'slow')
        .appendTo('body');
        $('<div id="lightbox"></div>')
        .hide()
        .appendTo('body');
        $('<img class="imgLB"/>')
        .attr('src',$(this).attr('href'))
        .load(function(){
            positionLB();
        })
        
        .appendTo('#lightbox');
        $('<a href="#" class="btn btn_blue"></a>')
        .text('CANCEL')
        .appendTo('#lightbox')
        .click(function(){
            removeLB();
        });
        $('<h3></h3>').text('Hear must be variable').appendTo('#lightbox');
        
        return false;
    });
    
    function positionLB(){
        var top = ($(window).height() - $('#lightbox').height()) / 2;
        var left = ($(window).width() - $('#lightbox').width()) / 2;
        $('#lightbox')
        .css({
            'top': top+$(document).scrollTop(),
            'left':left
        })
        .fadeIn();         
    };
    
    function removeLB(){
        $('#overlay,#lightbox')
        .fadeOut('slow',function(){
            $(this).remove();
            $('body').css('overflow-y','auto');
        })
    }
    
    
    
	$('input, select').styler({fileBrowse: "SURVEY"});
    $('.jq-selectbox__dropdown').width($('.jq-selectbox').width());
    $('.datechoose').pickmeup();
    $('.date').pickmeup({
		flat	: true
	});
});