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
const $=id=>document.getElementById(id); const read=(key,fallback=[])=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}; const write=(key,val)=>localStorage.setItem(key,JSON.stringify(val)); const uid=(p='id')=>p+'_'+Date.now().toString(36)+Math.random().toString(36).slice(2,7); const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function seed(force=false){ if(!force && localStorage.getItem(keys.seeded)) return; write(keys.craftVideos,demo.craftVideos); write(keys.moneyVideos,demo.moneyVideos); write(keys.jobs,demo.jobs); if(force||!localStorage.getItem(keys.craftUsers)) write(keys.craftUsers,[]); if(force||!localStorage.getItem(keys.moneyUsers)) write(keys.moneyUsers,[]); if(force||!localStorage.getItem(keys.craftRequests)) write(keys.craftRequests,[]); if(force||!localStorage.getItem(keys.moneyRequests)) write(keys.moneyRequests,[]); if(force||!localStorage.getItem(keys.contacts)) write(keys.contacts,[]); if(force) localStorage.removeItem(keys.adminSession); localStorage.setItem(keys.seeded,'yes'); }
function setMsg(id,text,type='ok'){const el=$(id); if(el){el.textContent=text; el.className=`message ${type}`;}}
function statusLabel(st){return st==='approved'?'Approved':st==='rejected'?'Rejected':'Pending'} function statusClass(st){return st==='approved'?'approved':st==='rejected'?'rejected':'pending'}
function nav(){const b=$('menuToggle'),m=$('navMenu'); if(b&&m)b.onclick=()=>{b.classList.toggle('open');m.classList.toggle('show');};}
function login(){ const form=$('adminLoginForm'); if(form) form.onsubmit=e=>{e.preventDefault(); const email=$('adminEmail').value.trim().toLowerCase(), code=$('adminCode').value.trim(); if(email==='admin@earncraft.lk'&&code==='1234'){localStorage.setItem(keys.adminSession,'yes'); show();} else setMsg('adminLoginMsg','Admin email හෝ code නිවැරදි නැත.','error');}; const out=$('adminLogout'); if(out) out.onclick=()=>{localStorage.removeItem(keys.adminSession);show();}; }
function show(){ const ok=localStorage.getItem(keys.adminSession)==='yes'; if($('adminLoginCard')) $('adminLoginCard').style.display=ok?'none':'block'; if($('adminPanel')) $('adminPanel').classList.toggle('show',ok); if(ok) renderAll(); }
function tabs(){ document.querySelectorAll('[data-admin-tab]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('[data-admin-tab]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.admin-section').forEach(s=>s.classList.remove('active')); const target=$(btn.dataset.adminTab); if(target) target.classList.add('active');}); }
function stats(){ const box=$('adminStats'); if(!box) return; const data=[['Craft Videos',read(keys.craftVideos).length],['Money Videos',read(keys.moneyVideos).length],['Micro Jobs',read(keys.jobs).length],['Craft Requests',read(keys.craftRequests).length],['Money Requests',read(keys.moneyRequests).length],['Craft Users',read(keys.craftUsers).length],['Money Users',read(keys.moneyUsers).length],['Messages',read(keys.contacts).length]]; box.innerHTML=data.map(([n,v])=>`<div class="stat-card"><b>${v}</b><span>${n}</span></div>`).join(''); }
function videos(){
  const craft=$('adminCraftVideos'), money=$('adminMoneyVideos'), jobs=$('adminJobs');
  if(craft) craft.innerHTML=read(keys.craftVideos).map(v=>`<div class="list-item"><div><h4>${esc(v.title)}</h4><p>${esc(v.price)} • ${esc(v.desc)}</p><p>${esc(v.url)}</p></div><button class="btn btn-danger small" data-del-craft="${v.id}">Delete</button></div>`).join('')||'<div class="empty">No videos.</div>';
  if(money) money.innerHTML=read(keys.moneyVideos).map(v=>`<div class="list-item"><div><h4>${esc(v.title)}</h4><p>${esc(v.desc)}</p><p>${esc(v.url)}</p></div><button class="btn btn-danger small" data-del-money="${v.id}">Delete</button></div>`).join('')||'<div class="empty">No videos.</div>';
  if(jobs) jobs.innerHTML=read(keys.jobs).map(j=>`<div class="list-item"><div><h4>${esc(j.title)}</h4><p>${esc(j.desc)}</p><p>${esc(j.pay)}</p></div><button class="btn btn-danger small" data-del-job="${j.id}">Delete</button></div>`).join('')||'<div class="empty">No micro jobs.</div>';
  document.querySelectorAll('[data-del-craft]').forEach(b=>b.onclick=()=>{write(keys.craftVideos,read(keys.craftVideos).filter(v=>v.id!==b.dataset.delCraft));renderAll();});
  document.querySelectorAll('[data-del-money]').forEach(b=>b.onclick=()=>{write(keys.moneyVideos,read(keys.moneyVideos).filter(v=>v.id!==b.dataset.delMoney));renderAll();});
  document.querySelectorAll('[data-del-job]').forEach(b=>b.onclick=()=>{write(keys.jobs,read(keys.jobs).filter(j=>j.id!==b.dataset.delJob));renderAll();});
}
function requests(){
  const craft=$('adminCraftRequests'), money=$('adminMoneyRequests');
  if(craft){const list=read(keys.craftRequests).sort((a,b)=>b.createdAt-a.createdAt); craft.innerHTML=list.length?list.map(r=>`<div class="list-item"><div><h4>${esc(r.videoTitle)}</h4><p>${esc(r.userName)} • ${esc(r.userEmail)}</p><p>${esc(r.date)} • <span class="status ${statusClass(r.status)}">${statusLabel(r.status)}</span></p></div><div class="list-actions"><button class="btn btn-money small" data-craft-approve="${r.id}">Approve</button><button class="btn btn-danger small" data-craft-reject="${r.id}">Reject</button></div></div>`).join(''):'<div class="empty">No video requests.</div>';}
  if(money){const list=read(keys.moneyRequests).sort((a,b)=>b.createdAt-a.createdAt); money.innerHTML=list.length?list.map(r=>`<div class="list-item"><div><h4>Earn Money Lifetime Access</h4><p>${esc(r.userName)} • ${esc(r.userEmail)}</p><p>${esc(r.date)} • <span class="status ${statusClass(r.status)}">${statusLabel(r.status)}</span></p></div><div class="list-actions"><button class="btn btn-money small" data-money-approve="${r.id}">Approve</button><button class="btn btn-danger small" data-money-reject="${r.id}">Reject</button></div></div>`).join(''):'<div class="empty">No lifetime requests.</div>';}
  document.querySelectorAll('[data-craft-approve]').forEach(b=>b.onclick=()=>setRequest(keys.craftRequests,b.dataset.craftApprove,'approved'));
  document.querySelectorAll('[data-craft-reject]').forEach(b=>b.onclick=()=>setRequest(keys.craftRequests,b.dataset.craftReject,'rejected'));
  document.querySelectorAll('[data-money-approve]').forEach(b=>b.onclick=()=>setRequest(keys.moneyRequests,b.dataset.moneyApprove,'approved'));
  document.querySelectorAll('[data-money-reject]').forEach(b=>b.onclick=()=>setRequest(keys.moneyRequests,b.dataset.moneyReject,'rejected'));
}
function setRequest(key,id,status){const list=read(key); const r=list.find(x=>x.id===id); if(r){r.status=status;r.updatedAt=Date.now();write(key,list);renderAll();}}
function forms(){
  const craft=$('addCraftVideoForm'); if(craft) craft.onsubmit=e=>{e.preventDefault(); const list=read(keys.craftVideos); list.push({id:uid('cv'),title:$('craftVideoTitle').value.trim(),desc:$('craftVideoDesc').value.trim(),price:$('craftVideoPrice').value.trim(),url:$('craftVideoUrl').value.trim()||'#'}); write(keys.craftVideos,list); craft.reset(); renderAll();};
  const money=$('addMoneyVideoForm'); if(money) money.onsubmit=e=>{e.preventDefault(); const list=read(keys.moneyVideos); list.push({id:uid('mv'),title:$('moneyVideoTitle').value.trim(),desc:$('moneyVideoDesc').value.trim(),url:$('moneyVideoUrl').value.trim()||'#'}); write(keys.moneyVideos,list); money.reset(); renderAll();};
  const job=$('addJobForm'); if(job) job.onsubmit=e=>{e.preventDefault(); const list=read(keys.jobs); list.push({id:uid('j'),title:$('jobTitle').value.trim(),desc:$('jobDesc').value.trim(),pay:$('jobPay').value.trim()}); write(keys.jobs,list); job.reset(); renderAll();};
  const reset=$('resetDemo'); if(reset) reset.onclick=()=>{ if(confirm('Reset all demo data?')){ seed(true); renderAll(); } };
}
function contacts(){ const box=$('adminContacts'); if(!box) return; const list=read(keys.contacts).slice().reverse(); box.innerHTML=list.length?list.map(c=>`<div class="list-item"><div><h4>${esc(c.subject)}</h4><p>${esc(c.name)} • ${esc(c.email)}</p><p>${esc(c.message)}</p><p>${esc(c.date)}</p></div></div>`).join(''):'<div class="empty">No messages.</div>'; }
function renderAll(){stats();videos();requests();contacts();}
function init(){seed();nav();login();tabs();forms();show();}
document.addEventListener('DOMContentLoaded',init);
