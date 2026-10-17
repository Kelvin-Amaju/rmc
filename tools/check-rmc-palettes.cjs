const { chromium } = require('C:/Users/USER/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try {
 for(const version of [4,7]) {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  await page.route(/^https?:/,r=>r.abort());
  for(const file of ['index','about','services','contact','login']) {
   await page.goto(`file:///C:/laragon/www/netgrity/app/rmc/v${version}/${file}.html`,{waitUntil:'load'});
   await page.waitForTimeout(400);
   console.log(`v${version}/${file}`,await page.evaluate(()=>({ink:getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(),accent:getComputedStyle(document.documentElement).getPropertyValue('--rust').trim()||getComputedStyle(document.documentElement).getPropertyValue('--lime').trim(),overflow:document.documentElement.scrollWidth>innerWidth})));
   if(file==='index') {
    await page.waitForTimeout(1200);
    await page.screenshot({path:`assets/img/previews/v${version}.jpg`,type:'jpeg',quality:85});
   }
  }
  await page.setViewportSize({width:390,height:844});
  console.log(`v${version} mobile login overflow`,await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  await page.close();
 }
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
