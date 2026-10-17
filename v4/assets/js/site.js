/* Small, progressive enhancements — no external JS runtime required. */
(()=>{
  document.documentElement.classList.add('js');
  const header=document.querySelector('.site-header');
  const menu=document.getElementById('mobileMenu');
  const toggle=document.getElementById('menuToggle');
  const line=document.getElementById('scrollLine');
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onScroll=()=>{
    if(header) header.classList.toggle('is-stuck',window.scrollY>40);
    if(line){const h=document.documentElement;const range=h.scrollHeight-h.clientHeight;line.style.width=(range>0?Math.min(100,window.scrollY/range*100):0)+'%';}
  };
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  function setMenu(open){if(!toggle||!menu)return;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menu.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('nav-open',open);if(open){menu.querySelector('a')?.focus();}else{toggle.focus();}}
  toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.classList.contains('open'))setMenu(false);});
  window.addEventListener('resize',()=>{if(innerWidth>980&&menu?.classList.contains('open'))setMenu(false);});
  const revealEls=[...document.querySelectorAll('[data-reveal]')];
  if(!reduced&&'IntersectionObserver'in window){
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target);}})},{threshold:0.09,rootMargin:'0px 0px 35px 0px'});
    revealEls.forEach(el=>obs.observe(el));
  }else revealEls.forEach(el=>el.classList.add('is-visible'));
  // Independent accessible disclosures (service catalogue).
  document.querySelectorAll('.scope-toggle').forEach(button=>button.addEventListener('click',()=>{
    const content=document.getElementById(button.getAttribute('aria-controls'));
    if(!content)return;
    const open=button.getAttribute('aria-expanded')!=='true';
    document.querySelectorAll('.scope-toggle').forEach(b=>{b.setAttribute('aria-expanded','false');const c=document.getElementById(b.getAttribute('aria-controls'));if(c)c.removeAttribute('data-open');});
    if(open){button.setAttribute('aria-expanded','true');content.setAttribute('data-open','true');}
  }));
  // Make service deep links reveal and expand their target, including links from homepage.
  if(location.hash?.startsWith('#service-')){
    const target=document.getElementById(location.hash.slice(1));
    const button=target?.querySelector('.scope-toggle');
    if(button&&button.getAttribute('aria-expanded')!=='true')button.click();
  }
  const staffToggle=document.getElementById('togglePassword');
  staffToggle?.addEventListener('click',()=>{
    const input=document.getElementById('pass');if(!input)return;
    const reveal=input.type==='password';input.type=reveal?'text':'password';
    staffToggle.textContent=reveal?'Hide':'Show';staffToggle.setAttribute('aria-label',reveal?'Hide password':'Show password');staffToggle.setAttribute('aria-pressed',String(reveal));
  });
  const contactForm=document.getElementById('contactForm');
  contactForm?.addEventListener('submit',e=>{
    e.preventDefault();if(!contactForm.reportValidity())return;
    const data=new FormData(contactForm);
    const fname=(data.get('fname')||'').toString().trim(),lname=(data.get('lname')||'').toString().trim();
    const email=(data.get('email')||'').toString().trim(),phone=(data.get('phone')||'').toString().trim(),message=(data.get('message')||'').toString().trim();
    const subject=`RMC website enquiry from ${fname} ${lname}`;
    const body=`Name: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone||'Not supplied'}\n\nMessage:\n${message}`;
    const mailto=`mailto:info@mabamidje.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const note=document.getElementById('formNote');if(note)note.textContent='Opening your email application. Please send the prepared message to complete your enquiry.';
    window.location.href=mailto;
  });
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
})();
