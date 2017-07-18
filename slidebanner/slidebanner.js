/***************
name : slidebanner.js
maker : play-ground.kr okhi1@naver.com
version : 1.1
date : 20150619

사용시 출처를 명시바랍니다.
***************/
(function($){
	
	var speed=600,delay=1000,pagecolor='#eeeeee',pageoncolor='#333';
	var container,bannercnt,opt,ele,stop=false;

	$.fn.slidebanner = function(opt){
		opt = opt;
		if(opt.speed) speed=opt.speed;
		if(opt.delay) delay=opt.delay;
		if(opt.pagecolor) pagecolor=opt.pagecolor;
		if(opt.pageoncolor) pageoncolor=opt.pageoncolor;
		ele = $(this);
		width = ele.width();
		container = $('.container',ele);
		bannercnt = $('div',container).length;
		
		$(ele).css({'position':'relative'});
		$('div',container).css({'float':'left','overflow':'hidden'});				
		$('div',container).last().prependTo($(container));
		$('div',container).each(function(i,v){
			$(this).attr('page',i);
		});
		container.css({'width':width*3,'position':'relative','left':(width*(-1))+'px'});
		

		if(opt.page==true){
			makepage();
			
			$('.page div',ele).click(function(){
				stop = true;
				animatestop($('.page div',ele).index($(this))); 
			});
		}
		
		if(opt.auto==true) leftmove();

		if(opt.arrow.left!='' && opt.arrow.right!=''){
			
			makearrow();

			$('.arrowleft',ele).click(function(){//rightmove
				
				idx = parseInt($('div',container).eq(0).attr('page'));
				idx = (idx==0)? bannercnt-1 : idx-1 ;
				if(opt.auto==true) stop = true;
				
				if($('div',container).eq(0).is(':animated')===false){
					if(idx==(bannercnt-1)){
						animatestop(-1);
					}else{
						animatestop(idx);
					}
				}else{
					$('div',container).stop(true,true);
					stop = false;
					rightmove();
				}

			});

			$('.arrowright',ele).click(function(){//leftmove
				
				idx = parseInt($('div',container).eq(0).attr('page'));
				idx = (idx>bannercnt)? 0 : idx+1 ;
				if(opt.auto==true) stop = true;
				
				if($('div',container).eq(0).is(':animated')===false){
					animatestop(idx);
				}else{
					$('div',container).stop(true,true);
					stop = false;
					leftmove();
				}
			});


		}
		

		function leftmove(){
			
			if(stop===true) return;

			$('div',container).eq(0).delay(delay).animate({
				width:'0px'
			},speed,function(){
				$('div',container).eq(0).appendTo(container);
				$('div',container).last().css('width',width+'px');
				
				if(opt.page==true) pageon(($(this).attr('page')*1+1));

				if(opt.auto==true && stop==false) leftmove();
			});
			
		}

		function rightmove(){
			
			$('div',container).last().css({'width':'0px'});
			$('div',container).last().prependTo(container);
			
			$('div',container).first().animate({
				width:width+'px'
			},100,function(){
				if(opt.page==true) pageon(($(this).attr('page')*1));
				if(opt.auto==true && stop==false) leftmove();
			});

			return;
		}


		function makearrow(){
			arrowhtml = "<span class='arrowleft' style='position:absolute; cursor:pointer;'>"+opt.arrow.left+"</span><span class='arrowright' style='position:absolute; cursor:pointer;'>"+opt.arrow.right+"</span>";
			$(ele).append(arrowhtml);
		}

		function makepage(){
			pagehtml = "<div class='page' style='position:absolute;'>";
			for(i=0; i<bannercnt; i++){
				background = (i==0)? pageoncolor : pagecolor ;
				pagehtml += "<div style='float:left; width:12px; height:12px; background:"+background+"; border-radius:7px; margin:2px; cursor:pointer;'></div>";
			}
			pagehtml += "</div>";
			
			$(ele).append(pagehtml);

		}

		function pageon(idx){
			if(idx>(bannercnt-1)) idx = 0;
			$('.page div',ele).css('background',pagecolor);
			$('.page div:eq('+idx+')',ele).css('background',pageoncolor);
		}

		function fastleftmove(moveidx){

			$('div',container).eq(0).animate({
				width:'0px'
			},300,function(){
				$('div',container).eq(0).appendTo(container);
				$('div',container).last().css('width',width+'px');

				if(opt.page==true) pageon(($(this).attr('page')*1+1));
								
				if(moveidx>0){ 
					moveidx--;
					fastleftmove(moveidx);
				}else{
					if(opt.auto==true){ 
						stop = false;
						leftmove();
					}
				}
			});

		}

		function fastrightmove(moveidx){

			$('div',container).last().css({'width':'0px'});
			$('div',container).last().prependTo(container);
			
			$('div',container).first().animate({
				width:width+'px'
			},300,function(){
				if(opt.page==true) pageon(($(this).attr('page')*1));

				if(moveidx>0){ 
					moveidx--;
					fastrightmove(moveidx);
				}else{
					if(opt.auto==true){ 
						stop = false;
						leftmove();
					}
				}
			});

		}

		function animatestop(targetindex){
			$('div',container).stop(true,true);
			pageindex = $('div',container).eq(0).attr('page');
			moveidx = targetindex-pageindex;

			if(moveidx>0){//leftmove
				fastleftmove(moveidx-1);
			}

			if(moveidx<0){//rightmove
				fastrightmove((moveidx*(-1))-1);
			}
		}
	
	}
})(jQuery);