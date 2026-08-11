// Behaviour for the combined 200 / 300 / 500 page.
//
// Everything here is an enhancement. No content depends on it: with the script
// removed the page still renders all three courses in full, and only the
// twelve rows of upcoming batch dates go missing.
export default `
(function(){
  var root = document.getElementById('tp');
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

  /* ---- upcoming batches -------------------------------------------------
     One row per month, one column per course. All three start on the 1st, so
     a single table says more than three tables of near-identical rows. */
  (function(){
    var body = document.getElementById('tp-dates-body');
    if(!body) return;
    var M = ['January','February','March','April','May','June',
             'July','August','September','October','November','December'];
    var now = new Date(), y = now.getFullYear(), m = now.getMonth();
    if(now.getDate() > 1) m++;
    var rows = '';
    for(var i=0; i<12; i++){
      var mi = (m+i)%12, yy = y + Math.floor((m+i)/12);
      var mon = M[mi].slice(0,3), nxt = M[(mi+1)%12].slice(0,3);
      var few = i < 2; /* the nearest batches fill first */
      rows += '<tr>'
        + '<td class="mo">' + M[mi] + ' ' + yy + '</td>'
        + '<td>1st \\u2013 24th ' + mon + '</td>'
        + '<td>1st \\u2013 29th ' + mon + '</td>'
        + '<td>1st ' + mon + ' \\u2013 29th ' + nxt + '</td>'
        + '<td><span class="tp-seat ' + (few ? 'few' : 'ok') + '"><i></i>'
        + (few ? 'Filling fast' : 'Seats available') + '</span></td>'
        + '<td><a class="tp-link" href="/student-admission-panel/">Register</a></td>'
        + '</tr>';
    }
    body.innerHTML = rows;
  })();

  /* ---- student review videos -------------------------------------------
     The iframe is only created on click, so six YouTube players never load
     with the page. */
  (function(){
    var main = document.getElementById('tp-vmain');
    if(!main) return;
    var thumb = document.getElementById('tp-vthumb');
    var lab = document.getElementById('tp-vlab');
    var rows = root.querySelectorAll('.tp-vrow');
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
    rows.forEach(function(row, i){
      row.addEventListener('click', function(){
        var id = row.getAttribute('data-vid');
        rows.forEach(function(r){ r.setAttribute('aria-current','false'); });
        row.setAttribute('aria-current','true');
        if(lab) lab.textContent = 'Student review \\u00b7 0' + (i+1);
        if(thumb) thumb.src = 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';
        play(id);
        if(window.matchMedia('(max-width:1100px)').matches){
          main.scrollIntoView({behavior:'smooth', block:'center'});
        }
      });
    });
  })();

  /* ---- the arc: rules draw themselves in as each group arrives --------- */
  (function(){
    var steps = root.querySelectorAll('.tp-arc-step');
    if(!steps.length) return;
    if(!('IntersectionObserver' in window) ||
       window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      steps.forEach(function(s){ s.classList.add('lit'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var group = Array.prototype.slice.call(e.target.parentNode.children);
        group.forEach(function(s, i){
          setTimeout(function(){ s.classList.add('lit'); }, i * 140);
        });
        io.unobserve(e.target);
      });
    }, {threshold: 0.4});
    steps.forEach(function(s){ io.observe(s); });
  })();
})();
`;
