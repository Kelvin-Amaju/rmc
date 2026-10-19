/* Internal pages: same navigation and scroll choreography as the approved homepage. */
(() => {
  'use strict';
  const $ = q => document.querySelector(q);
  const $$ = q => [...document.querySelectorAll(q)];
  const prefersLess = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menu = $('#menuToggle'), nav = $('#mobileNav'), header = $('#siteHeader'), progress = $('#pageProgress');
  function setMenu(open){
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
    nav.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if(menu && nav){
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', e => { if(e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => {if(e.key==='Escape')setMenu(false)});
    addEventListener('resize', () => {if(innerWidth>900)setMenu(false)}, {passive:true});
  }
  if(!prefersLess && 'IntersectionObserver' in window){
    document.documentElement.classList.add('js-animate');
    $$('[data-stagger]').forEach(group => {
      [...group.children].filter(el=>el.hasAttribute('data-reveal')).forEach((el,index)=>el.style.setProperty('--reveal-delay', `${Math.min(index,5)*(innerWidth<=680?110:185)}ms`));
    });
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}
    }), {threshold:.08,rootMargin:'0px 0px -45px 0px'});
    $$('[data-reveal]').forEach(el=>observer.observe(el));
  }
  let ticking=false;
  function onScroll(){
    if(ticking) return;ticking=true;
    requestAnimationFrame(()=>{
      const y=scrollY;
      if(progress) progress.style.width=`${Math.min(100,y/Math.max(1,document.documentElement.scrollHeight-innerHeight)*100)}%`;
      if(header) header.classList.toggle('is-sticky',y>header.offsetHeight+5);
      const cta=$('.cta-section');
      if(cta&&!prefersLess){const r=cta.getBoundingClientRect();if(r.bottom>-50&&r.top<innerHeight+50) cta.style.setProperty('--cta-pan-y',`${-((r.top+r.height/2-innerHeight/2)/innerHeight*26).toFixed(1)}px`)}
      ticking=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});onScroll();
  const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
  // Intentional mailto flow: static site does not pretend to send a message itself.
  const form=$('#contactForm');
  if(form)form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const person=`${String(data.get('fname')||'').trim()} ${String(data.get('lname')||'').trim()}`.trim();
    const service=String(data.get('service')||'General enquiry');
    const subject=`RMC website enquiry — ${service}`;
    const body=`Name: ${person}\nEmail: ${String(data.get('email')||'')}\nPhone: ${String(data.get('phone')||'')}\nService: ${service}\n\nMessage:\n${String(data.get('message')||'')}`;
    $('#formNote').textContent='Opening your email app. Please send the prepared message from there.';
    location.href=`mailto:info@mabamidje.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  const serviceId=new URLSearchParams(location.search).get('service');
  if(serviceId && form){
    const keys=['Auditing & Assurance','Tax Consultancy','Accounting Systems','Accounting Records','Inventory Management','Management Information Systems','Recovery of Excess Bank Charges','Business Consultancy'];
    const ix=Number(serviceId)-1;if(Number.isInteger(ix)&&ix>=0&&ix<keys.length)form.elements.service.value=keys[ix];
  }
})();
