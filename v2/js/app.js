$(document).ready(function(){
  // preloader_youtube_like   
var Nanobar=function(){var c,d,e,f,g,h,k={width:"100%",height:"2px",zIndex:9999,top:"0"},l={width:0,height:"100%",clear:"both",transition:"height .3s"};c=function(a,b){for(var c in b)a.style[c]=b[c];a.style["float"]="left"};f=function(){var a=this,b=this.width-this.here;0.1>b&&-0.1<b?(g.call(this,this.here),this.moving=!1,100==this.width&&(this.el.style.height=0,setTimeout(function(){a.cont.el.removeChild(a.el)},100))):(g.call(this,this.width-b/4),setTimeout(function(){a.go()},16))};g=function(a){this.width=a;this.el.style.width=this.width+"%"};h=function(){var a=new d(this);this.bars.unshift(a)};d=function(a){this.el=document.createElement("div");this.el.style.backgroundColor=a.opts.bg;this.here=this.width=0;this.moving=!1;this.cont=a;c(this.el,l);a.el.appendChild(this.el)};d.prototype.go=function(a){a?(this.here=a,this.moving||(this.moving=!0,f.call(this))):this.moving&&f.call(this)};e=function(a){a=this.opts=a||{};var b;a.bg=a.bg||"#db3131";this.bars=[];b=this.el=document.createElement("div");c(this.el,k);a.id&&(b.id=a.id);b.style.position=a.target?"relative":"fixed";a.target?a.target.insertBefore(b,a.target.firstChild):document.getElementsByTagName("body")[0].appendChild(b);h.call(this)};e.prototype.go=function(a){this.bars[0].go(a);100==a&&h.call(this)};return e}();var nanobar = new Nanobar();nanobar.go(30);nanobar.go(60);nanobar.go(100);
/*backtotop*/
var btn = $('#button');
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});
  /*search*/
   $(".searchit").on("change paste keyup", function() {
    var filter = $(this).val();
    if (filter ==''){
      $(".acard").css('display',''); 
    }
    else{ 
      $(".acard").css('display','none');
      $(".acard .card-content:contains("+filter+")").parent(".acard").css('display',''); 
    
    };  
  }); 
  /*bokmark*/
    $('.fa-bookmark').on('click',function() {
    var cookieid = $(this).parents('li').attr('id');
    var cookievalue = Cookies.get(cookieid);
    cookieselector = '#'+cookieid+' .fa-bookmark';
    if  ( cookievalue ==1 ){
       $(cookieselector).removeClass('red').addClass('grey');
      Cookies.set(cookieid,0);
      cookievalue = Cookies.get(cookieid);
    }
    else{
      $(cookieselector).removeClass('grey').addClass('red');
      Cookies.set(cookieid,1);
      cookievalue = Cookies.get(cookieid);
    };
  });
  var fav = 0;
  /*bokmark filter*/
  $('.bookmarkit').on('click',function() {
    var cookieid; 
    var cookievalue;
    var cookieselector;
    if (fav == 1){
      $(".acard").css('display','');
      $(".bookmarkit i").removeClass('red').addClass('grey');
    fav = 0; 
    }
    else{ 
      $(".countsort i").removeClass('bleu').addClass('grey');
      $(".alphabetsort i").removeClass('teal').addClass('grey');
      fav = 1;
      sort = 0;
      sortcount=0; 
      //
      $(".bookmarkit i").removeClass('grey').addClass('red');
      $(".acard").css('display','none');
      for (let i = 1; i < 35; i++) {
        cookieid = "id"+i;
        cookieselector = "#"+cookieid;
        cookievalue = Cookies.get(cookieid);
        if (cookievalue == 1){
          $(cookieselector).css('display',''); 
        }
        else{
          $(cookieselector).css('display','none');      
        }
       }
      fav = 1; 
     };  
  });
});
/*bookmark*/
function loadconfig() {
  var cookieid; 
  var cookievalue;
  var cookieselector;
  for (let i = 1; i < 36; i++) {
     cookieid = "id"+i;
     cookieselector = '#'+cookieid+' .fa-bookmark';
     cookievalue = Cookies.get(cookieid);
     if (cookievalue == 1){
      $(cookieselector).removeClass('grey').addClass('red'); 
     }
     else{
      $(cookieselector).removeClass('red').addClass('grey');    
     }
    }
  };
  /*sort alphabet*/
  function sortListalphabet() {
    var list, i, switching, h, l, shouldSwitch;
    list = document.getElementById("cards-container");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      h = list.getElementsByTagName("h3");
      l = list.getElementsByTagName("li");

      // Loop through all list-items:
      for (i = 0; i < (h.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (h[i].innerHTML.toLowerCase() > h[i + 1].innerHTML.toLowerCase()) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */

        l[i].parentNode.insertBefore(l[i + 1], l[i]);
        switching = true;
      }
    }
  };  
  /*sortalphabet click */
  var sort=0;
  $('.fa-sort-alpha-down').on('click',function() {
    sortListalphabet();
    if (sort == 1){
      $(".alphabetsort i").removeClass('teal').addClass('grey');
    sort = 0; 
    }
    else{ 
      $(".acard").css('display','');
      $(".bookmarkit i").removeClass('red').addClass('grey');
      $(".countsort i").removeClass('blue').addClass('grey');
      $(".alphabetsort i").removeClass('grey').addClass('teal');
      sort = 1;
      sortcount=0;
      fav = 0;
    }
  });
  /*sort counters*/
  function sortListcounter() {
    var list, i, switching, c, l, shouldSwitch;
    list = document.getElementById("cards-container");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      c = list.getElementsByClassName("counter");
      l = list.getElementsByTagName("li");

      // Loop through all list-items:
      for (i = 0; i < (c.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* check if the next item should
        switch place with the current item: */
        if (Number(c[i].innerHTML) < Number(c[i + 1].innerHTML)) {
          /* if next item is alphabetically
          lower than current item, mark as a switch
          and break the loop: */
         // console.log(parseInt(c[i].innerHTML) +">"+ parseInt(c[i + 1].innerHTML));
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark the switch as done: */

        l[i].parentNode.insertBefore(l[i + 1], l[i]);
           switching = true;
      }
    }
  };  
  /*sortcounters click */
  var sortcount=0;
  $('.fa-sort-amount-up').on('click',function() {
    if (sortcount == 1){
      $(".countsort i").removeClass('blue').addClass('grey');
      sortcount = 0; 
    }
    else{ 
      $(".acard").css('display','');
      sortListcounter();
      $(".bookmarkit i").removeClass('red').addClass('grey');
      $(".countsort i").removeClass('grey').addClass('blue');
      $(".alphabetsort i").removeClass('teal').addClass('grey');
      sort = 0;
      fav = 0;
      sortcount = 1;
    };
  });
window.addEventListener('DOMContentLoaded', (event) => {
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
});
 /* small screen menu triger*/
 (function($) {
  $(function() {

$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    hover: true, // Activate on hover
    belowOrigin: true, // Displays dropdown below the button
    alignment: 'right' // Displays dropdown with edge aligned to the left of button
  }
);

  }); // End Document Ready
})(jQuery);
/*stylish horizental menu*/
(function() {

  const target = document.querySelector(".target");
  const links = document.querySelectorAll(".mynav a");
  const colors = ["#206020", "#206020", "#206020", "#206020", "#206020", "#206020", "#206020"];

  function mouseenterFunc() {
    if (!this.parentNode.classList.contains("active")) {
      for (let i = 0; i < links.length; i++) {
        if (links[i].parentNode.classList.contains("active")) {
          links[i].parentNode.classList.remove("active");
        }
        links[i].style.opacity = "0.25";
      }

      this.parentNode.classList.add("active");
      this.style.opacity = "1";

      const width = this.getBoundingClientRect().width;
      const height = this.getBoundingClientRect().height;
      const left = this.getBoundingClientRect().left + window.pageXOffset;
      const top = this.getBoundingClientRect().top + window.pageYOffset;
      const color = colors[Math.floor(Math.random() * colors.length)];

      target.style.width = `${width}px`;
      target.style.height = `${height}px`;
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
      target.style.borderColor = color;
      target.style.transform = "none";
    }
  }

  for (let i = 0; i < links.length; i++) {
    //links[i].addEventListener("click", (e) => e.preventDefault());
    links[i].addEventListener("mouseenter", mouseenterFunc);
  }

  function resizeFunc() {
    const active = document.querySelector(".mynav li.active");

    if (active) {
      const left = active.getBoundingClientRect().left + window.pageXOffset;
      const top = active.getBoundingClientRect().top + window.pageYOffset;

      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
    }
  }

  window.addEventListener("resize", resizeFunc);

})(jQuery);
// LoadPositionURL
function getUrlParam(parameter, defaultvalue){
  var urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1){
      urlparameter = getUrlVars()[parameter];
      }
  return urlparameter;
}
function updateURLParameter(url, param, paramVal)
{
  var TheAnchor = null;
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = "";

  if (additionalURL) 
  {
      var tmpAnchor = additionalURL.split("#");
      var TheParams = tmpAnchor[0];
          TheAnchor = tmpAnchor[1];
      if(TheAnchor)
          additionalURL = TheParams;

      tempArray = additionalURL.split("&");

      for (var i=0; i<tempArray.length; i++)
      {
          if(tempArray[i].split('=')[0] != param)
          {
              newAdditionalURL += temp + tempArray[i];
              temp = "&";
          }
      }        
  }
  else
  {
      var tmpAnchor = baseURL.split("#");
      var TheParams = tmpAnchor[0];
          TheAnchor  = tmpAnchor[1];

      if(TheParams)
          baseURL = TheParams;
  }

  if(TheAnchor)
      paramVal += "#" + TheAnchor;

  var rows_txt = temp + "" + param + "=" + paramVal;
  return baseURL + "?" + newAdditionalURL + rows_txt;
};
function Loadparam(){ 
var postURL=window.location.href.split('?')[0];
var postseek='seek'+postURL;
var urlParams = new URLSearchParams(location.search);
var param = urlParams.get('point');
var sparam = urlParams.get('seek');
if ( param > 0 ){
player.list.switch(param-1);
window.addEventListener('load', (event) => { player.seek(sparam); });
}
else{
//window.history.replaceState('', '', updateURLParameter(window.location.href, "point", getCookie(postURL)));
player.list.switch(getCookie(postURL)-1);
//window.history.replaceState('', '', updateURLParameter(window.location.href, "seek", getCookie(postseek)));
window.addEventListener('load', (event) => {player.seek(getCookie(postseek));});
};

}
function setCookie(name, value, days) {
var expires = "";
if (days) {
  var date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  expires = "; expires=" + date.toUTCString();
}
document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for (var i = 0; i < ca.length; i++) {
  var c = ca[i];
  while (c.charAt(0) == ' ') c = c.substring(1, c.length);
  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
}
return null;
};
//Responsive Social Media Share Buttons
function loadshareit() {
  var url = window.location.href; 
  var title = $('title').text();
  $( document ).ready(function() {
    $("#shareit").html("<mobileshare3 class='mobileshare3'><a href='https://pinterest.com/pin/create/button/?url="+url+
    "&amp;media="+url+"&amp;description="+title+"' rel='noreferrer' target='_blank' title='شارك على بانتيراست'>"+
    "<i class='fab fa-pinterest'></i></a></mobileshare3><mobileshare5 class='mobileshare5'><a class='whatsapp' href='whatsapp://send?text="+
    title+" "+url+"' rel='noreferrer' target='_top' title='شارك على واتساب'><i class='fab fa-whatsapp'></i></a></mobileshare5>"+
    "<mobileshare4 class='mobileshare4'><a href='https://t.me/share/url?url="+url+"&text="+title+
    "' rel='noreferrer' target='_blank' title='شارك على تيليغرام'><i class='fab fa-telegram-plane'></i></a></mobileshare4><mobileshare class='mobileshare'><a href='https://www.facebook.com/sharer.php?u="+
    url+"&t="+title+"' rel='noreferrer' target='_blank' title='شارك على فايسيوك'><i class='fab fa-facebook'></i></a></mobileshare>");  
    });
}  
