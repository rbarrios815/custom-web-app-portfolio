const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('demos/Code.gs','utf8');const opened=[];
const sheets={
'1AHtS0FnezTGRfoiqKzUyjPEBd_9cbSq4qG3qrmh7Yuo':[['Name','Age','Food','Party'],['Alex Example','11+','Dessert','Alex Example']],
'1S7SeE-sRFCg0c0kYlf4m7KI-G5hZ2rJZKeSjnU7tJ5k':[['Name','Response','Adults','Kids','Dish','Notes'],['Morgan Sample','Going',1,0,'Pie','Sample']],
'15uaH_bNqp1pt3RVGHle7f5YrWQIub50imBVUKgLw0_8':[['Name','Date','Meal Type','What They Are Bringing','Delivery Time','Notes / Contact Information','Gift Card Amount','Submitted At'],['Alex Example','2026-11-07','Dinner','Soup','5 PM','Sample','','']],
'1bekXsiIIEmMVusm7J5pzwHpoM2kmDze3Fz8cmTb8V_U':[['Name','Date','Support Type','What You Are Bringing','Delivery Time','Public Note','Gift Card Amount','Submitted At','Private Contact','Submission ID'],['Morgan Sample','2026-11-08','Lunch','Soup','12:00','Sample',50,'secret timestamp','secret contact','secret id']]
};
const mock=id=>{const a=sheets[id];if(!a)throw Error('Unapproved sheet '+id);return {getLastRow:()=>a.length,getMaxRows:()=>1000,getRange:(row,col,n=1,m=1)=>({getValues:()=>a.slice(row-1,row-1+n).map(r=>r.slice(col-1,col-1+m)),getDisplayValues:()=>a.slice(row-1,row-1+n).map(r=>r.slice(col-1,col-1+m).map(String)),setValues:rows=>{rows.forEach((r,i)=>a[row-1+i]=r);},setFontWeight(){return this},setBackground(){return this},setWrap(){return this}}),setFrozenRows(){},setColumnWidth(){},appendRow:r=>a.push(r)};};
const html=s=>({html:s,setTitle(){return this},addMetaTag(){return this}});
const c={Date,SpreadsheetApp:{openById:id=>{opened.push(id);return {getSheetByName:()=>mock(id)}},flush(){}},LockService:{getScriptLock:()=>({waitLock(){},tryLock(){return true},releaseLock(){}})},Utilities:{formatDate:()=> '2026-11-01'},HtmlService:{createHtmlOutput:html}};
vm.createContext(c);vm.runInContext(source,c);let n=0;const test=(name,f)=>{f();n++;console.log('PASS',name)};
test('all four routes render original-derived pages',()=>{for(const k of ['christmas','thanksgiving','decker','rafa'])assert(c.doGet({parameter:{demo:k}}).html.includes('Fictional sample data only'));assert.equal(c.doGet({parameter:{demo:'__proto__'}}).html,'Demo not found');});
test('each read uses only its intended demo Sheet',()=>{c.getChristmasData();c.apiAction('/api/list',{});c.getMealSignUps();c.getPageData();assert.deepEqual([...new Set(opened)],Object.keys(sheets));});
test('Rafa public response excludes private columns',()=>{const s=JSON.stringify(c.getPageData());for(const x of ['secret timestamp','secret contact','secret id','amount'])assert(!s.includes(x));});
test('admin mutations disabled',()=>{assert.throws(()=>c.adminAction('password123','delete',{row:2}),/disabled/);assert.throws(()=>c.apiAction('/api/admin',{password:'password123',action:'delete',id:2}),/disabled/);});
test('Christmas formula-like names stored literally',()=>{c.saveAttendee({fullName:'=SAMPLE',food:[],ageGroup:'11+',enteredBy:'=SAMPLE'});assert.equal(sheets[Object.keys(sheets)[0]][2][0],"'=SAMPLE");});
test('Christmas rejects malformed dishes',()=>assert.throws(()=>c.saveAttendee({fullName:'Sample',food:['invalid']}),/listed dishes/));
test('Rafa invalid dates and arbitrary types rejected',()=>assert.throws(()=>c.submitSignup({name:'Sample',date:'2026-02-30',type:'Other',item:'Soup',requestId:'sample-request-00001'}),/date/i));
test('all demo frontend scripts parse',()=>{for(const f of fs.readdirSync('demos').filter(f=>f.endsWith('.html'))){const s=fs.readFileSync('demos/'+f,'utf8');for(const m of s.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1],{filename:f});}});
test('original baby Sheet IDs absent from deployable suite',()=>{for(const x of ['19BRu-lcGEvFCAYyUYDVfilrAXEQ8Y1U6o5AC-0oBgEQ','1U97EEnzbXx9OKWKxq6J5zx5LRP3Tpll4zBbstrSQg30'])assert(!source.includes(x));});
console.log(n+' demo suite scenarios passed.');
