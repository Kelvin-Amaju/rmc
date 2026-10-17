/* V8 additive liquid choreography: no layout or homepage redesign; respects reduced motion. */
(() => {
  'use strict';
  const lessMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const $ = (q,ctx=document)=>ctx.querySelector(q);
  const $$ = (q,ctx=document)=>[...ctx.querySelectorAll(q)];
  // Right-side navigation has a softly blurring backdrop; keep V7's menu mechanics intact.
  const nav=$('#mobileNav'), header=$('#siteHeader'), toggle=$('#menuToggle'), shell=$('.site-shell');
  if(nav && shell && header){
    const shade=document.createElement('div');shade.className='menu-backdrop';shade.setAttribute('aria-hidden','true');
    shell.insertBefore(shade,header);
    const sync=()=>{
      const isOpen=nav.classList.contains('is-open');
      document.body.classList.toggle('menu-open',isOpen);
      if(isOpen&&innerWidth<=900){
        const first=$('a',nav);if(first&&!nav.contains(document.activeElement))first.focus({preventScroll:true});
      }
    };
    shade.addEventListener('click',()=>{if(nav.classList.contains('is-open'))toggle.click()});
    const navObserver=new MutationObserver(sync);navObserver.observe(nav,{attributes:true,attributeFilter:['class']});
    document.addEventListener('keydown',e=>{
      if(!nav.classList.contains('is-open') || innerWidth>900 || e.key!=='Tab')return;
      const focusables=[toggle,...$$('a:not([tabindex="-1"])',nav)];
      const current=focusables.indexOf(document.activeElement);
      if(e.shiftKey && current===0){e.preventDefault();focusables[focusables.length-1].focus()}
      else if(!e.shiftKey && current===focusables.length-1){e.preventDefault();focusables[0].focus()}
    });
  }
  if(lessMotion)return;

  // Word-by-word motion: operating on text nodes preserves <em>, <br> and original wording.
  const selectors=[
    '.display-heading','.interior-title','.lead-copy','.strength-card h3',
    '.strength-card p','.service-card h3','.service-card p',
    '.process-card h3','.process-card p','.value-block h3',
    '.catalogue-name h3','.leadership-copy h3','.contact-form-shell h3',
    '.gateway-panel h3'
  ];
  const candidates=$$(selectors.join(','));
  const wordObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('fluid-visible');wordObserver.unobserve(entry.target)}
  }),{threshold:.08,rootMargin:'0px 0px -35px 0px'}):null;
  candidates.forEach((element,index)=>{
    if(element.closest('.hero'))return; // the approved V7 hero already has its own animation
    let n=0;
    const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT,{
      acceptNode:node=>node.nodeValue.trim()&&node.parentElement?.closest('script,style')===null?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT
    });
    const textNodes=[];while(walker.nextNode())textNodes.push(walker.currentNode);
    for(const node of textNodes){
      const frag=document.createDocumentFragment();
      (node.nodeValue.match(/\S+|\s+/gu)||[]).forEach(piece=>{
        if(/^\s+$/u.test(piece)){frag.append(document.createTextNode(piece));return}
        const outer=document.createElement('span');outer.className='fluid-word';
        const inner=document.createElement('span');inner.className='fluid-word-core';inner.textContent=piece;
        inner.style.setProperty('--word-delay',`${Math.min(n++,19)*39+(index%3)*45}ms`);
        outer.append(inner);frag.append(outer);
      });
      node.replaceWith(frag);
    }
    if(n){element.classList.add('motion-words-ready');wordObserver?wordObserver.observe(element):element.classList.add('fluid-visible')}
  });
  // Random-but-consistent accents: slow organic blobs and small orbit marks in various sections.
  const sections=$$(
    '.about-section,.strengths-section,.services-section,.process-section,.faq-section,.interior-story,.values-section,.credential-section,.catalogue-section,.contact-main,.visit-section,.staff-help,.service-introduction'
  );
  sections.forEach((el,index)=>{
    el.classList.add('liquid-section');
    if(index%2===0 || index===sections.length-1){
      const blob=document.createElement('span');blob.className='liquid-blob';blob.setAttribute('aria-hidden','true');
      blob.style.animationDelay=`-${index*1.7}s`;el.append(blob);
    }
    if(index%3===1){
      const spark=document.createElement('span');spark.className='floating-spark';spark.setAttribute('aria-hidden','true');
      spark.style.setProperty('--spark-left',`${8+(index*23)%80}%`);
      spark.style.setProperty('--spark-top',`${12+(index*17)%65}%`);el.append(spark);
    }
  });
  $$('.text-link,.contact-route>a,.footer-links a').forEach(el=>el.classList.add('fluid-underline'));
  // Per-element image drift and per-section glow instead of one rigid global parallax.
  const photos=$$('.service-photo img,.fluid-photo>img,.credential-cards img');
  let ticking=false;
  const applyDrift=()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{
      if(innerWidth>680){
        for(const img of photos){
          const rect=img.getBoundingClientRect();
          if(rect.bottom < -130 || rect.top > innerHeight+130) continue;
          const fraction=(rect.top+rect.height/2-innerHeight/2)/innerHeight;
          img.style.setProperty('--fluid-image-y',`${Math.max(-19,Math.min(19,-fraction*19)).toFixed(1)}px`);
        }
        for(const el of sections){
          const r=el.getBoundingClientRect();
          if(r.bottom<-150||r.top>innerHeight+150)continue;
          el.style.setProperty('--section-drift',`${Math.max(-25,Math.min(25,-(r.top+r.height/2-innerHeight/2)/innerHeight*22)).toFixed(1)}px`);
        }
      }
      ticking=false;
    });
  };
  addEventListener('scroll',applyDrift,{passive:true});addEventListener('resize',applyDrift,{passive:true});applyDrift();

  // Gentle pointer-following highlights and attractive magnetic buttons on desktop.
  if(finePointer){
    $$('.strength-card,.process-card,.value-block,.credential-cards article').forEach(card=>{
      card.addEventListener('pointermove',e=>{
        const r=card.getBoundingClientRect();
        card.style.setProperty('--pointer-x',`${e.clientX-r.left}px`);
        card.style.setProperty('--pointer-y',`${e.clientY-r.top}px`);
      },{passive:true});
    });
    $$('.button,.btn-header').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect();
        const dx=(e.clientX-r.left-r.width/2)/r.width*10;
        const dy=(e.clientY-r.top-r.height/2)/r.height*7;
        el.style.setProperty('--magnetic-x',`${dx.toFixed(2)}px`);
        el.style.setProperty('--magnetic-y',`${dy.toFixed(2)}px`);
      },{passive:true});
      el.addEventListener('pointerleave',()=>{el.style.setProperty('--magnetic-x','0px');el.style.setProperty('--magnetic-y','0px')});
    });
  }
})();
