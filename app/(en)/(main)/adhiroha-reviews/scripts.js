// Behaviour for the reviews page. Everything here is an enhancement: with the
// script removed every review, rating and video card is still on the page.
export default `
(function(){
  var root = document.getElementById('rv');
  if(!root) return;

  /* ---- header drawer + footer year (the shared chrome's own behaviour) ---- */
  (function(){
    var b=document.getElementById('hd-burger'), d=document.getElementById('hd-drawer'),
        sc=document.getElementById('hd-scrim'), c=document.getElementById('hd-close');
    if(!b||!d) return;
    function set(o){
      d.classList.toggle('open',o);
      if(sc) sc.classList.toggle('open',o);
      document.documentElement.style.overflow = o ? 'hidden' : '';
    }
    b.addEventListener('click',function(){set(true);});
    if(c) c.addEventListener('click',function(){set(false);});
    if(sc) sc.addEventListener('click',function(){set(false);});
  })();
  var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  /* ---- student review videos -------------------------------------------
     The iframe is only created on click, so no YouTube player loads with the
     page however many cards there are. */
  (function(){
    var main = document.getElementById('rv-vmain');
    if(!main) return;
    var thumb = document.getElementById('rv-vthumb');
    var lab = document.getElementById('rv-vlab');
    var cards = root.querySelectorAll('.rv-vcard');
    function play(id){
      var old = main.querySelector('iframe');
      if(old) old.remove();
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&playsinline=1&rel=0';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      f.title = 'Adhiroha student review';
      main.appendChild(f);
      main.setAttribute('data-vid', id);
    }
    main.addEventListener('click', function(){
      if(!main.querySelector('iframe')) play(main.getAttribute('data-vid'));
    });
    main.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); main.click(); }
    });
    cards.forEach(function(card){
      card.addEventListener('click', function(){
        var id = card.getAttribute('data-vid');
        cards.forEach(function(c){ c.setAttribute('aria-current','false'); });
        card.setAttribute('aria-current','true');
        if(lab) lab.textContent = 'Student review \\u00b7 ' + card.getAttribute('data-n') + ' \\u00b7 ' + card.getAttribute('data-len');
        if(thumb) thumb.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
        play(id);
        main.scrollIntoView({behavior:'smooth', block:'center'});
      });
    });
  })();
})();
`;
