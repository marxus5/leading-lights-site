(function(){
  // King Jesus Clothing products: edit this block only.
  // Set each product's name, store path, optional price and image, and short description.
  var KJC={store:'https://kingjesusclothing.org',aff:''};
  var featured={name:'Featured collab piece',path:'/shop/',price:'',img:'',blurb:'Our flagship piece from the Leading Lights collaboration. Add a short description here.'};
  var items=[
    {name:'Product name',path:'/shop/',price:'',img:'',blurb:'Short description.'},
    {name:'Product name',path:'/shop/',price:'',img:'',blurb:'Short description.'},
    {name:'Product name',path:'/shop/',price:'',img:'',blurb:'Short description.'},
    {name:'Product name',path:'/shop/',price:'',img:'',blurb:'Short description.'}
  ];
  function esc(text){return String(text).replace(/[&<>"]/g,function(char){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]})}
  function href(path){return esc(KJC.store+path+KJC.aff)}
  function shot(product){return '<a class="shot" href="'+href(product.path)+'" target="_blank" rel="sponsored noopener noreferrer" aria-label="'+esc(product.name)+' on King Jesus Clothing" tabindex="-1">'+(product.img?'<img src="'+esc(product.img)+'" alt="'+esc(product.name)+'" loading="lazy">':'')+'</a>'}
  function btn(product,label){return '<a class="btn k" href="'+href(product.path)+'" target="_blank" rel="sponsored noopener noreferrer">'+label+'</a>'}

  var heroProduct=document.getElementById('hero-product');
  var products=document.getElementById('prods');
  var shopAll=document.getElementById('shopall');
  if(heroProduct&&products&&shopAll){
    heroProduct.className='heroprod rv pop';
    heroProduct.innerHTML=shot(featured)+'<div class="info"><span class="badge">Featured</span><h3>'+esc(featured.name)+'</h3>'+(featured.price?'<div class="price">'+esc(featured.price)+'</div>':'')+'<p>'+esc(featured.blurb)+'</p>'+btn(featured,'Shop now')+'</div>';
    products.innerHTML=items.map(function(product,index){
      return '<article class="prod rv" style="--i:'+index+'">'+shot(product)+'<div class="info"><h3>'+esc(product.name)+'</h3>'+(product.price?'<div class="price" style="font-size:1rem">'+esc(product.price)+'</div>':'')+'<p>'+esc(product.blurb)+'</p>'+btn(product,'Shop now')+'</div></article>';
    }).join('');
    shopAll.href=KJC.store+(KJC.aff||'');
  }

  var $=function(selector){return document.querySelector(selector)};
  document.querySelectorAll('[data-current-year]').forEach(function(year){
    year.textContent=new Date().getFullYear();
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
      function toggle(open){
        burger.setAttribute('aria-expanded',open);
        menu.classList.toggle('open',open);
        document.body.style.overflow=open?'hidden':'';
      }
      burger.addEventListener('click',function(){toggle(burger.getAttribute('aria-expanded')!=='true')});
      menu.addEventListener('click',function(event){if(event.target.tagName==='A')toggle(false)});
      addEventListener('keydown',function(event){if(event.key==='Escape')toggle(false)});
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

  var messageForm=$('#message-form');
  if(messageForm){
    messageForm.addEventListener('submit',function(event){
      event.preventDefault();
      var message=$('#contact-message');
      if(!message.value.trim()){message.focus();return}
      var subject=encodeURIComponent('Message from the Leading Lights website');
      var body=encodeURIComponent(message.value.trim());
      window.location.href='mailto:info@leadinglights901.com?subject='+subject+'&body='+body;
    });
  }
})();
