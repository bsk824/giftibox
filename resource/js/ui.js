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
	var baseW = 375 / 62.5;
	var winW = win.width();
	if (winW <= 767) {
		var fontSize = winW / baseW;
		html.css('font-size', Math.floor(fontSize*100)/100 + '%');
	} else { 
		html.css('');
	}
}
function fileUpload(obj) {
	var $this = $(obj);
	var thisFile = $this[0].files;
	var thisVal = $this.val();
	var txtVal = $this.parent().prev('.inputTxt');
	
	(thisVal.length > 0 || thisFile.length > 0) ? txtVal.removeClass('error').addClass('active').val(thisVal) : txtVal.removeClass('active').val(thisVal);
}

function scrollMov(obj, sec) {
	var $this = $(obj);
	var section = $(sec);
	if($('main').length){
		event.preventDefault();
		$this.parent().addClass('active').siblings().removeClass('active');
		$('html, body').animate({'scrollTop' : section.offset().top}, 300);
	}
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


function youtube(key) {
	var iframe = '<iframe src="https://www.youtube.com/embed/'+ key +'?amp;autoplay=1" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
	return iframe;
}
function youtubeOn(img, src) {
	var _this = $(img);
	_this.parent().addClass('active').append(youtube(src));
};