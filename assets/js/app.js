const WA_NUMBER = '94762041031';
const keys = {
  seeded:'ec_premium_seeded_v1', craftVideos:'ec_craft_videos_v2', moneyVideos:'ec_money_videos_v2', jobs:'ec_money_jobs_v2',
  craftUsers:'ec_craft_users_v2', moneyUsers:'ec_money_users_v2', craftSession:'ec_craft_session_v2', moneySession:'ec_money_session_v2',
  craftRequests:'ec_craft_requests_v2', moneyRequests:'ec_money_requests_v2', contacts:'ec_contacts_v2', adminSession:'ec_admin_session_v2'
};
const demo = {
  craftVideos:[
    {id:'cv1', title:'Data Entry Basic Guide', desc:'Data entry වැඩ ආරම්භ කිරීමට typing accuracy, file handling සහ client instructions තේරුම් ගැනීම.', price:'LKR 1,500', url:'https://example.com/data-entry'},
    {id:'cv2', title:'AI Content Creation', desc:'AI tools භාවිතයෙන් safe, useful සහ original content ideas නිර්මාණය කරන practical guide එකක්.', price:'LKR 2,000', url:'https://example.com/ai-content'},
    {id:'cv3', title:'Freelancing Starter Roadmap', desc:'Freelancing profile, gig ideas, client communication සහ beginner mistakes ගැන පැහැදිලි වීඩියෝවක්.', price:'LKR 2,500', url:'https://example.com/freelance'},
    {id:'cv4', title:'Social Media Management', desc:'කුඩා ව්‍යාපාරයක social media pages plan, captions සහ basic reporting කරන ආකාරය.', price:'LKR 2,200', url:'https://example.com/social-media'},
    {id:'cv5', title:'Website Business Ideas', desc:'Sri Lanka market එකට ගැළපෙන website services, pricing ideas සහ client proposal basics.', price:'LKR 2,800', url:'https://example.com/web-business'},
    {id:'cv6', title:'Digital Marketing Basics', desc:'Ads, content, audience, analytics සහ safe marketing mindset ගැන beginner-friendly lesson එකක්.', price:'LKR 2,400', url:'https://example.com/digital-marketing'}
  ],
  moneyVideos:[
    {id:'mv1', title:'Earn Money Safety Guide', desc:'Online earning ගැන realistic mindset, scam signs සහ safe approach එක සරලව.', url:'https://example.com/safety'},
    {id:'mv2', title:'Micro Job Workflow', desc:'කුඩා වැඩ තෝරාගැනීම, instructions කියවීම, proof submit කිරීම සහ time management.', url:'https://example.com/micro-workflow'},
    {id:'mv3', title:'Client Message Templates', desc:'Clients සමඟ ආචාරශීලීව message කිරීම, delivery updates සහ revisions කළමනාකරණය.', url:'https://example.com/client-message'},
    {id:'mv4', title:'Skill Growth Plan', desc:'Phone එකෙන් ආරම්භ කළ හැකි digital skills සහ weekly learning plan එකක්.', url:'https://example.com/skill-plan'}
  ],
  jobs:[
    {id:'j1', title:'Sinhala Caption Writing', desc:'කුඩා ව්‍යාපාරයක post 5කට සරල Sinhala captions ලිවීම.', pay:'LKR 500 - 1,000'},
    {id:'j2', title:'Product Data Typing', desc:'Product name, price, short details table එකකට නිවැරදිව ඇතුළත් කිරීම.', pay:'LKR 800 - 1,500'},
    {id:'j3', title:'Canva Post Editing', desc:'සූදානම් template එකකට text/photo replace කර post design කිරීම.', pay:'LKR 700 - 1,800'},
    {id:'j4', title:'Business List Research', desc:'Google/FB තුළින් ව්‍යාපාර නාම සහ contact details සොයා sheet එකකට දැමීම.', pay:'LKR 1,000 - 2,000'}
  ]
};
const $ = id => document.getElementById(id);
const read = (key, fallback=[]) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const uid = (prefix='id') => prefix + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
const today = () => new Date().toLocaleString('si-LK');
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function seed(force=false){
  if(!force && localStorage.getItem(keys.seeded)) return;
  write(keys.craftVideos, demo.craftVideos); write(keys.moneyVideos, demo.moneyVideos); write(keys.jobs, demo.jobs);
  if(force || !localStorage.getItem(keys.craftUsers)) write(keys.craftUsers, []);
  if(force || !localStorage.getItem(keys.moneyUsers)) write(keys.moneyUsers, []);
  if(force || !localStorage.getItem(keys.craftRequests)) write(keys.craftRequests, []);
  if(force || !localStorage.getItem(keys.moneyRequests)) write(keys.moneyRequests, []);
  if(force || !localStorage.getItem(keys.contacts)) write(keys.contacts, []);
  if(force){localStorage.removeItem(keys.craftSession); localStorage.removeItem(keys.moneySession); localStorage.removeItem(keys.adminSession);}
  localStorage.setItem(keys.seeded, 'yes');
}
function wa(text){ return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`; }
function currentUser(type){ const email = localStorage.getItem(type === 'craft' ? keys.craftSession : keys.moneySession); if(!email) return null; return read(type === 'craft' ? keys.craftUsers : keys.moneyUsers).find(u => u.email === email) || null; }
function statusLabel(st){ return st === 'approved' ? 'Approved' : st === 'rejected' ? 'Rejected' : 'Pending'; }
function statusClass(st){ return st === 'approved' ? 'approved' : st === 'rejected' ? 'rejected' : 'pending'; }
function setMsg(id, text, type='ok'){ const el=$(id); if(el){ el.textContent=text; el.className=`message ${type}`; } }
function nav(){
  const b=$('menuToggle'), m=$('navMenu'); if(!b||!m) return;
  const close=()=>{b.classList.remove('open');m.classList.remove('show');};
  b.addEventListener('click',e=>{e.stopPropagation();b.classList.toggle('open');m.classList.toggle('show');});
  m.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('click',e=>{if(m.classList.contains('show') && !m.contains(e.target) && !b.contains(e.target)) close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
}
function mobileQuickbar(){
  if(document.querySelector('.mobile-quickbar')) return;
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const items=[
    ['index.html','⌂','Home','home'],
    ['earn-craft.html','🎬','Craft','craft'],
    ['earn-money.html','💰','Money','money'],
    ['admin.html','⚙','Admin','admin']
  ];
  const bar=document.createElement('nav'); bar.className='mobile-quickbar'; bar.setAttribute('aria-label','Mobile quick navigation');
  bar.innerHTML=items.map(([href,icon,label,cls])=>`<a class="${cls} ${page===href?'active':''}" href="${href}"><span>${icon}</span>${label}</a>`).join('');
  document.body.appendChild(bar);
}
function homeStats(){
  if($('statCraftVideos')) $('statCraftVideos').textContent = read(keys.craftVideos).length + '+';
  if($('statMoneyVideos')) $('statMoneyVideos').textContent = read(keys.moneyVideos).length + '+';
  if($('statJobs')) $('statJobs').textContent = read(keys.jobs).length + '+';
}
function setupAuth(prefix, type){
  const login=$(prefix+'LoginForm'), register=$(prefix+'RegisterForm'), userKey=type==='craft'?keys.craftUsers:keys.moneyUsers, sessionKey=type==='craft'?keys.craftSession:keys.moneySession;
  if(login){login.addEventListener('submit', e=>{e.preventDefault(); const email=$(prefix+'LoginEmail').value.trim().toLowerCase(); const pass=$(prefix+'LoginPassword').value; const user=read(userKey).find(u=>u.email===email && u.password===pass); if(!user){setMsg(prefix+'AuthMessage','ඊමේල් ලිපිනය හෝ මුරපදය නිවැරදි නැත.','error');return;} localStorage.setItem(sessionKey,email); setMsg(prefix+'AuthMessage','Login successful. Dashboard එක විවෘත කරමින්...','ok'); setTimeout(()=>location.href=type==='craft'?'earn-craft.html':'earn-money.html',500);});}
  if(register){register.addEventListener('submit', e=>{e.preventDefault(); const name=$(prefix+'Name').value.trim(); const email=$(prefix+'Email').value.trim().toLowerCase(); const password=$(prefix+'Password').value; const users=read(userKey); if(users.some(u=>u.email===email)){setMsg(prefix+'AuthMessage','මෙම ඊමේල් ලිපිනයෙන් ගිණුමක් දැනටමත් ඇත.','error');return;} users.push({id:uid('u'),name,email,password,created:today()}); write(userKey,users); localStorage.setItem(sessionKey,email); setMsg(prefix+'AuthMessage','Account created successfully.','ok'); setTimeout(()=>location.href=type==='craft'?'earn-craft.html':'earn-money.html',500);});}
}
function craftPage(){
  const grid=$('craftVideoGrid'), guest=$('craftGuest'), dash=$('craftDash'), reqBox=$('craftMyRequests'); if(!grid) return;
  const user=currentUser('craft'), videos=read(keys.craftVideos), reqs=read(keys.craftRequests);
  if($('craftName')) $('craftName').textContent = user ? user.name : 'Guest';
  if(guest) guest.classList.toggle('hide', !!user); if(dash) dash.classList.toggle('show', !!user);
  grid.innerHTML = videos.map(v=>{
    const r=user ? reqs.find(x=>x.userEmail===user.email && x.videoId===v.id && x.status!=='rejected') : null;
    const approved=r && r.status==='approved';
    return `<article class="video-card"><div class="thumb"><strong>${esc(v.title)}</strong></div><span class="price">${esc(v.price)}</span><p>${esc(v.desc)}</p>${user?`<span class="status ${statusClass(r?.status)}">${r?statusLabel(r.status):'Locked'}</span><button class="btn btn-primary full" data-craft-request="${v.id}">${approved?'View Details':'Request Access'}</button>${approved?`<a class="btn btn-soft full" target="_blank" rel="noopener" href="${esc(v.url)}">Open Video</a>`:''}`:`<a class="btn btn-primary full" href="craft-login.html">Login to Request</a>`}</article>`;
  }).join('');
  document.querySelectorAll('[data-craft-request]').forEach(b=>b.onclick=()=>requestCraft(b.dataset.craftRequest));
  if(reqBox && user){ const mine=reqs.filter(r=>r.userEmail===user.email).sort((a,b)=>b.createdAt-a.createdAt); reqBox.innerHTML = mine.length ? mine.map(r=>`<div class="list-item"><div><h4>${esc(r.videoTitle)}</h4><p>${esc(r.date)} • <span class="status ${statusClass(r.status)}">${statusLabel(r.status)}</span></p></div><a class="btn btn-soft small" target="_blank" rel="noopener" href="${wa(`Earn Craft video request\nName: ${user.name}\nEmail: ${user.email}\nVideo: ${r.videoTitle}\nStatus: ${statusLabel(r.status)}`)}">WhatsApp</a></div>`).join('') : '<div class="empty">තවම video request එකක් නැත.</div>'; }
}
function requestCraft(videoId){
  const user=currentUser('craft'); if(!user){location.href='craft-login.html'; return;} const video=read(keys.craftVideos).find(v=>v.id===videoId); if(!video) return;
  const reqs=read(keys.craftRequests); let r=reqs.find(x=>x.userEmail===user.email && x.videoId===videoId && x.status!=='rejected');
  if(!r){ r={id:uid('cr'),userName:user.name,userEmail:user.email,videoId:video.id,videoTitle:video.title,price:video.price,status:'pending',date:today(),createdAt:Date.now()}; reqs.push(r); write(keys.craftRequests,reqs); }
  window.open(wa(`Earn Craft video access request\nName: ${user.name}\nEmail: ${user.email}\nVideo: ${video.title}\nPrice: ${video.price}\nPlease check payment confirmation and approve access.`),'_blank'); craftPage();
}
function moneyPage(){
  const dash=$('moneyDash'), guest=$('moneyGuest'); if(!dash && !guest) return; const user=currentUser('money');
  if($('moneyName')) $('moneyName').textContent = user ? user.name : 'Guest'; if(guest) guest.classList.toggle('hide', !!user); if(dash) dash.classList.toggle('show', !!user); if(!user) return;
  const reqs=read(keys.moneyRequests); const req=reqs.find(r=>r.userEmail===user.email && r.status!=='rejected'); const approved=req && req.status==='approved';
  if($('moneyStatus')) $('moneyStatus').innerHTML = req ? `<h3>Lifetime access status: <span class="status ${statusClass(req.status)}">${statusLabel(req.status)}</span></h3><p>ඉල්ලීම යැවූ දිනය: ${esc(req.date)}</p>` : '<h3>Lifetime access තවම ඉල්ලා නැත.</h3><p>WhatsApp confirmation හරහා access request එක යවන්න.</p>';
  if($('moneyLocked')) $('moneyLocked').classList.toggle('hide', approved); if($('moneyUnlocked')) $('moneyUnlocked').classList.toggle('show', approved);
  const btn=$('lifetimeBtn'); if(btn) btn.onclick=requestLifetime;
  if(approved){
    if($('moneyVideoGrid')) $('moneyVideoGrid').innerHTML = read(keys.moneyVideos).map(v=>`<article class="video-card"><div class="thumb money"><strong>${esc(v.title)}</strong></div><span class="status approved">Unlocked</span><p>${esc(v.desc)}</p><a class="btn btn-money full" target="_blank" rel="noopener" href="${esc(v.url)}">Open Video</a></article>`).join('');
    if($('moneyJobsGrid')) $('moneyJobsGrid').innerHTML = read(keys.jobs).map(j=>`<article class="job-card"><h3>${esc(j.title)}</h3><p>${esc(j.desc)}</p><span class="price">${esc(j.pay)}</span><a class="btn btn-soft full" target="_blank" rel="noopener" href="${wa(`Earn Money micro job details request\nName: ${user.name}\nJob: ${j.title}\nPayment range: ${j.pay}`)}">Ask Details</a></article>`).join('');
  }
}
function requestLifetime(){
  const user=currentUser('money'); if(!user){location.href='money-login.html'; return;} const reqs=read(keys.moneyRequests); let r=reqs.find(x=>x.userEmail===user.email && x.status!=='rejected');
  if(!r){ r={id:uid('mr'),userName:user.name,userEmail:user.email,status:'pending',date:today(),createdAt:Date.now()}; reqs.push(r); write(keys.moneyRequests,reqs); }
  window.open(wa(`Earn Money lifetime access request\nName: ${user.name}\nEmail: ${user.email}\nAccess: One payment lifetime access\nPlease check payment confirmation and approve access.`),'_blank'); moneyPage();
}
function logout(){ if($('craftLogout')) $('craftLogout').onclick=()=>{localStorage.removeItem(keys.craftSession);location.href='earn-craft.html'}; if($('moneyLogout')) $('moneyLogout').onclick=()=>{localStorage.removeItem(keys.moneySession);location.href='earn-money.html'}; }
function contact(){ const form=$('contactForm'); if(!form) return; form.addEventListener('submit',e=>{e.preventDefault(); const d=new FormData(form); const list=read(keys.contacts); list.push({id:uid('ct'),name:d.get('name'),email:d.get('email'),subject:d.get('subject'),message:d.get('message'),date:today()}); write(keys.contacts,list); setMsg('contactMsg','Message saved successfully. Admin panel එකෙන් බලන්න.','ok'); form.reset();}); }
function whatsappLinks(){ document.querySelectorAll('[data-whatsapp]').forEach(a=>{a.href=wa(a.dataset.whatsapp || 'Earn Craft details request');}); }
function chat(){
  const open=$('chatOpen'), close=$('chatClose'), panel=$('chatPanel'), form=$('chatForm'), input=$('chatInput'), body=$('chatBody'); if(!open||!panel) return;
  open.onclick=()=>panel.classList.add('show'); if(close) close.onclick=()=>panel.classList.remove('show'); if(!form) return;
  form.addEventListener('submit',e=>{e.preventDefault(); const q=input.value.trim(); if(!q) return; body.insertAdjacentHTML('beforeend',`<div class="user-bubble">${esc(q)}</div>`); input.value=''; const low=q.toLowerCase(); let a='මෙය demo AI helper එකකි. Earn Craft video request, Earn Money lifetime access, admin approval සහ WhatsApp confirmation ගැන මට පැහැදිලි කර දිය හැක.'; if(low.includes('money')||q.includes('කුඩා')||q.includes('ජොබ්')) a='Earn Money login එක වෙනමයි. Lifetime access admin approve වුණාම videos සහ micro jobs unlock වේ. ආදායම guarantee නොවේ.'; if(low.includes('craft')||q.includes('වීඩියෝ')) a='Earn Craft තුළ videos එකින් එක request කළ හැක. WhatsApp confirmation පසු admin approve කළ විට status එක Approved වේ.'; if(low.includes('login')||q.includes('පිවිස')) a='Earn Craft සහ Earn Money සඳහා වෙන වෙනම login pages ඇත. එක account එකක් දෙකටම සම්බන්ධ නොවේ.'; if(low.includes('admin')||q.includes('පාලක')) a='Admin panel එකෙන් Earn Craft video requests සහ Earn Money lifetime requests වෙනම approve/reject කළ හැක.'; body.insertAdjacentHTML('beforeend',`<div class="bot-bubble">${esc(a)}</div>`); body.scrollTop=body.scrollHeight; });
}
function init(){ seed(); nav(); mobileQuickbar(); homeStats(); setupAuth('craft','craft'); setupAuth('money','money'); craftPage(); moneyPage(); logout(); contact(); whatsappLinks(); chat(); }
document.addEventListener('DOMContentLoaded', init);
