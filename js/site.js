(function(){
  var $=function(selector){return document.querySelector(selector)};
  document.querySelectorAll('[data-current-year]').forEach(function(year){
    year.textContent=new Date().getFullYear();
  });
  document.querySelectorAll('.services-submenu a[href$="#services"]').forEach(function(link){
    link.addEventListener('click',function(){
      var submenu=link.closest('.services-nav');
      if(submenu)submenu.open=false;
    });
  });

  var head=$('header'),bar=$('#bar'),fab=$('#fab'),hero=$('#hero');
  if(head&&bar&&fab&&hero){
    function onScroll(){
      var doc=document.documentElement,max=doc.scrollHeight-innerHeight,y=scrollY;
      bar.style.transform='scaleX('+(max>0?y/max:0)+')';
      head.classList.toggle('solid',y>40);
      fab.classList.toggle('show',y>hero.offsetHeight*.7);
    }
    addEventListener('scroll',onScroll,{passive:true});onScroll();

    var burger=$('#burger'),menu=$('#menu');
    if(burger&&menu){
      function toggle(open,restoreFocus){
        burger.setAttribute('aria-expanded',open);
        menu.classList.toggle('open',open);
        document.body.style.overflow=open?'hidden':'';
        if(open){
          var firstLink=menu.querySelector('a');
          if(firstLink)firstLink.focus();
        }else if(restoreFocus){
          burger.focus();
        }
      }
      burger.addEventListener('click',function(){toggle(burger.getAttribute('aria-expanded')!=='true')});
      menu.addEventListener('click',function(event){if(event.target.closest('a'))toggle(false)});
      addEventListener('keydown',function(event){if(event.key==='Escape'&&burger.getAttribute('aria-expanded')==='true')toggle(false,true)});
    }

    var elements=document.querySelectorAll('.rv');
    if('IntersectionObserver' in window){
      var observer=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}});
      },{threshold:.15,rootMargin:'0px 0px -6% 0px'});
      elements.forEach(function(element){observer.observe(element)});
    }else{elements.forEach(function(element){element.classList.add('in')})}

    hero.addEventListener('pointermove',function(event){
      var rect=hero.getBoundingClientRect();
      hero.style.setProperty('--mx',((event.clientX-rect.left)/rect.width-.5)*2);
      hero.style.setProperty('--my',((event.clientY-rect.top)/rect.height-.5)*2);
    });
  }

  document.querySelectorAll('img').forEach(function(img){
    function bad(){
      if(img.dataset.x)return;
      img.dataset.x=1;
      img.removeAttribute('srcset');
      img.src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
    img.addEventListener('error',bad);
    if(img.complete&&img.naturalWidth===0)bad();
  });

  var contactForm=$('#contact-form');
  if(contactForm){
    var params=new URLSearchParams(window.location.search);
    var service=params.get('service');
    var reason=params.get('reason');
    function selectContactOption(select,value){
      for(var i=0;i<select.options.length;i++){
        if(select.options[i].value===value){select.value=value;return}
      }
    }
    if(service)selectContactOption(contactForm.elements.service,service);
    if(reason)selectContactOption(contactForm.elements.reason,reason);
    contactForm.addEventListener('submit',function(event){
      event.preventDefault();
      var fields=new FormData(contactForm);
      var serviceLabel=contactForm.elements.service.selectedOptions[0].textContent;
      var reasonLabel=contactForm.elements.reason.selectedOptions[0].textContent;
      var subject=encodeURIComponent('Website inquiry: '+reasonLabel);
      var body=encodeURIComponent([
        'Name: '+fields.get('name'),
        'Email: '+fields.get('email'),
        'Phone: '+(fields.get('phone')||'Not provided'),
        'Reason for reaching out: '+reasonLabel,
        'Service or program: '+serviceLabel,
        '',
        'Message:',
        fields.get('message')
      ].join('\n'));
      window.location.href='mailto:info@leadinglights901.com?subject='+subject+'&body='+body;
    });
  }
  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js-ready');
})();
