//ONLOAD
$(document).ready(function(){
   document.querySelector('.foot p').innerHTML = "Natnael Meseret &copy; "+(new Date()).getFullYear();
   $('#home').css('background-image','url("Vector/Nav/home_dark.svg")');
   $('#whatido').css('background-image','url("Vector/Nav/skills_dark.svg")');
   $('#whatiuse').css('background-image','url("Vector/Nav/tools_dark2.svg")');
   $('#abou').css('background-image','url("Vector/Nav/about_dark.svg")');
   $('#contac').css('background-image','url("Vector/Nav/contact_dark2.svg")');   

   $('html, body').scrollTop(0);

   jsPlumb.ready(function() {
      var first = jsPlumb.getInstance();
      first.importDefaults({
        PaintStyle:{ 
          strokeWidth:2, 
          stroke:"#03A9F4",
          outlineWidth:0 
        },
        Connector : [ "Bezier", { curviness: 150 } ],
        Endpoint:[ "Dot", { radius:.1 } ],
        EndpointStyle : { fill: "#03A9F4"  },
        Anchor : ["Left", "Right"]
      });
      first.connect({
        source:"coffee", 
        target:"me", 
        overlays:[ 
          ["Arrow" , { width:10, length:10, location:1 }]
        ]
      });
      first.connect({
        source:"me", 
        target:"design", 
        overlays:[ 
          ["Arrow" , { width:10, length:10, location:1 }]
        ]
      });
      first.connect({
        source:"design", 
        target:"code", 
        overlays:[ 
          ["Arrow" , { width:10, length:10, location:1 }]
        ]
      });

      //MAKE THEM DRAGABLE
      first.draggable("coffee", {
          containment: "circles"
      });
      first.draggable("me", {
          containment: "circles"
      });
      first.draggable("design", {
          containment: "circles"
      });
      first.draggable("code", {
          containment: "circles"
      });

      //MAKE THE DRAG SYNCHRONIZE
      $('.circle').on('mousedown',function(){
        if($(window).width() > 1024)
          $(this).css('transition','unset');
      });
      $('.circle').on('mouseup',function(){
        if($(window).width() > 1024)
          $(this).css('transition','left 5s, bottom, 5s').css('left',$(this).position().left + Math.floor(Math.random()*50) + 'px');
      });

      //INITIATE THE TRANSITION
      function init(){
        if($(window).width() >= 776) {
          console.log('HERE');
          var sign = Math.random();
          $('.circle:first-child').css({
            left: sign<.5 ? $('.circle:first-child').position().left - Math.floor(Math.random()*5) + 'px' : $('.circle:first-child').position().left + Math.floor(Math.random()*5) + 'px' ,
            bottom: sign<.5 ? $('.circle:first-child').position().bottom - Math.floor(Math.random()*5) + 'px' : $('.circle:first-child').position().bottom + Math.floor(Math.random()*5) + 'px'
          });
          $('.circle:nth-child(2)').css({           
            left: sign<.5 ? $('.circle:nth-child(2)').position().left - Math.floor(Math.random()*5) + 'px' : $('.circle:nth-child(2)').position().left + Math.floor(Math.random()*5) + 'px' ,
            bottom: sign<.5 ? $('.circle:nth-child(2)').position().bottom - Math.floor(Math.random()*5) + 'px' : $('.circle:nth-child(2)').position().bottom + Math.floor(Math.random()*5) + 'px'
          });
          $('.circle:nth-child(3)').css({           
            left: sign<.5 ? $('.circle:nth-child(3)').position().left - Math.floor(Math.random()*5) + 'px' : $('.circle:nth-child(3)').position().left + Math.floor(Math.random()*5) + 'px' ,
            bottom: sign<.5 ? $('.circle:nth-child(3)').position().bottom - Math.floor(Math.random()*5) + 'px' : $('.circle:nth-child(3)').position().bottom + Math.floor(Math.random()*5) + 'px'
          });
          $('.circle:nth-child(4)').css({           
            left: sign<.5 ? $('.circle:nth-child(4)').position().left - Math.floor(Math.random()*5) + 'px' : $('.circle:nth-child(4)').position().left + Math.floor(Math.random()*5) + 'px' ,
            bottom: sign<.5 ? $('.circle:nth-child(4)').position().bottom - Math.floor(Math.random()*5) + 'px' : $('.circle:nth-child(4)').position().bottom + Math.floor(Math.random()*5) + 'px'
          });

          $('.circle').on('transitionend', function(e) {
            var sign = Math.random();
            $(this).css({
              left: sign<.5 ? $(this).position().left - Math.floor(Math.random()*50) + 'px' : $(this).position().left + Math.floor(Math.random()*50) + 'px' ,
              bottom: sign<.5 ? $(this).position().bottom - Math.floor(Math.random()*50) + 'px' : $(this).position().bottom + Math.floor(Math.random()*50) + 'px'
            });
          });
        }
      }
      init();

      //ANIMATION CONTROL
      $('.pause').on('click', function() {
        $(this).toggleClass('play');
        if($(this).hasClass('play')){
          $('.circle').off('transitionend');
          $('.circle').stop();
        }else{
          init();
        }
      });

      //REPAINT LINES ON TRANSITION
      var h2 = setInterval(function(){
        first.repaintEverything();
      }, 10);

   });
});


//SCROLL TO SECTIONS SMOOTHLY
function smoothScroll(e, obj) {
   e.preventDefault();
   $('html, body').animate({scrollTop:$($(obj).attr('href')).position().top}, 500);

   if($(obj).attr('href') != '#home') {
      $('.links').addClass('links-2');
   }else{
      $('.links').removeClass('links-2');
   }
}


//For the Navigation Icons to react to the mouse position
$('.link').mousemove(function(e){

   var x = (e.clientX-$(this).offset().left - 15) + 'px';

   if(e.clientX-$(this).offset().left - 20 > -10 && e.clientX-$(this).offset().left - 20 < 35)
      $(this).find('a').css('background-position-x',x);


   var y = (e.clientY-$(this).offset().top - 15) + 'px';

   if(e.clientY-$(this).offset().top - 20 > -10 && e.clientY-$(this).offset().top - 20 < 35)
      $(this).find('a').css('background-position-y',y);
});
$('.link').mouseleave(function(){
   $(this).find('a').css('background-position','center');
});


//Attaching the wheelScroll() to the Scroll Event
document.onwheel = function(e){
   if($('html, body').scrollTop() > window.innerHeight - 180){
      $('.links').addClass('links-2');
   }else{
      $('.links').removeClass('links-2');
   }
};
$(window).scroll(function(e) {
   if($('html, body').scrollTop() > window.innerHeight - 180){
      $('.links').addClass('links-2');
   }else{
      $('.links').removeClass('links-2');
   }
});