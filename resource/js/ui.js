var win = $(window);
var html = $('html');
(function(){
	var agent = navigator.userAgent.toLocaleLowerCase();
	var html = document.getElementsByTagName('html')[0];
	var htmlClass = html.getAttribute('class');
	var device, deviceVer, ver = null;
	if(agent.indexOf('mobile') > -1) { //모바일 체크
		ver = 'mobile';
		if(agent.indexOf('iphone') > -1 || agent.indexOf('ipad') > -1) { //ios 체크
			device = agent.substring(agent.indexOf('os') + 3);
			deviceVer = device.substring(0, device.indexOf('like mac os x'));
			osVer = 'ios' + deviceVer;
		}
		if(agent.indexOf('android') > -1) { //안드로이드 체크
			device = agent.substring(agent.indexOf('android') + 8);
			deviceVer = device.substring(0, device.indexOf(';'));
			andVer = deviceVer.replace(/[.]/gi,'_');
			osVer = 'android' + andVer;
	
			if(agent.indexOf('samsung') > -1) osVer += ' samsung'; //삼성 인터넷브라우져 체크
		}
	} else {
		ver = 'pc';
		if(agent.indexOf('msie') > -1) { //ie10 이하 체크
			device = agent.substring(agent.indexOf('msie') + 4);
			deviceVer = Math.floor(device.substring(0, device.indexOf(';')));
			osVer = 'ie' + deviceVer;
		} else {
			osVer = 'edge';
		};
	}
	if(agent.indexOf('naver') > -1) osVer += ' naver'; //네이버 앱 체크
	if(ver !== null) {
		(htmlClass !== null) ? html.setAttribute('class', htmlClass + ' ' + ver + ' ' + osVer) : html.setAttribute('class', ver + ' ' + osVer); //html 클래스 부여
	}
	fontSize();
})();

win.resize(function(){
	fontSize();
});

function deviceChk() {
	var winW = win.width();
	var state = '';
	(winW <= 1024) ? state = 'mobile' : state = 'pc';
	return state;
}
function fontSize() {
	var baseW = 320 / 62.5;
	var winW = win.width();
	if (winW <= 600) {
		var fontSize = winW / baseW;
		html.css('font-size', Math.floor(fontSize*100)/100 + '%');
	} else { 
		html.css('');
	}
}
function tabActive(obj, idx, type) {
	if(typeof obj !== 'string') {
		var $this = $(obj);
		var idx = $this.parent().index();
		var txt = $this.text();
		var tabContents = $this.closest('[class*="tabMenu"]').next('.tabContents');

		if(type === true && !$this.parent().hasClass('active')) event.preventDefault();

		$this.parent().addClass('active').siblings().removeClass('active');
		
		if($this.closest('[class*="tabMenu"]').find('.tabBtn').is(':visible')) {
			$this.parent().parent().slideUp(200).closest('.tabMenu').find('.tabBtn').text(txt);
		}
	} else {
		var tab = $('#' + obj);
		var menu = tab.find('li');
		var tabContents = tab.next('.tabContents');
		
		idx = idx - 1;

		menu.eq(idx).addClass('active').siblings().removeClass('active');
	}
	
	tabContents.find('> .tabCont').eq(idx).addClass('active').siblings().removeClass('active');
}

var slideObj = {};
function vodSlide(obj) {
	var ele = obj;
	slide = new Swiper('.' + ele + ' .vodSlide', {
		loop: true,
		speed: 500,
		slidesPerView: 'auto',
		centeredSlides: true,
		navigation: {
			nextEl: '.' + ele + ' .slideNext',
			prevEl: '.' + ele + ' .slidePrev',
		}
	});
	slideObj[obj] = slide;
}

// 쿠키 설정
function setCookie(name, value, expiredays) {
	var today = new Date();
	today.setDate( today.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";"
}

// 쿠키 가져오기
function getCookie(key) {
	var cook = document.cookie + ";";
	var idx = cook.indexOf(key, 0);
	var val = "";

	if(idx != -1) {
		cook = cook.substring(idx, cook.length);
		begin = cook.indexOf("=", 0) + 1;
		end = cook.indexOf(";", begin);
		val = unescape( cook.substring(begin, end) );
	}
	return val;
}
