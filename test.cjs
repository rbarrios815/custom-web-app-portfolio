const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync('Code.gs','utf8'),ctx);
const headers=['Display Order','Title','Description','Demo URL','Screenshot URL','Visible','Source Repository','Source Spreadsheet','Status'];
const row=(n,status='PUBLIC_DEMO_VERIFIED',url='https://script.google.com/macros/s/demo/exec',image='https://example.com/home.jpg')=>[String(n),'Demo '+n,'Sample',url,image,'TRUE','PRIVATE_REPO','PRIVATE_SHEET',status];
const settings=[['Setting','Value'],['Business Email',''],['Business Text Number','']];
let count=0;function check(name,f){f();count++;console.log('PASS',name);}
check('sort, visibility and four-card limit',()=>{const r=[headers,row(4),row(2),row(1),row(3),row(5),row(6)];r[6][5]='FALSE';assert.deepEqual(Array.from(ctx.portfolioModel_(r,settings).cards,c=>c.title),['Demo 1','Demo 2','Demo 3','Demo 4']);});
check('private columns and status never reach public model',()=>{const s=JSON.stringify(ctx.portfolioModel_([headers,row(1)],settings));for(const x of ['PRIVATE_REPO','PRIVATE_SHEET','PUBLIC_DEMO_VERIFIED'])assert(!s.includes(x));});
check('unverified URLs and screenshots withheld',()=>{const c=ctx.portfolioModel_([headers,row(1,'Needs verification')],settings).cards[0];assert.equal(c.ready,false);assert.equal(c.url,'');assert.equal(c.image,'');});
check('unsafe URL schemes and credentials rejected',()=>{for(const x of ['javascript:alert(1)','http://example.com','https://u:p@example.com','https://example.com/<x>','https://example.com/ bad','https://example.com\\evil'])assert.equal(ctx.httpsUrl_(x),'');});
check('missing image cannot produce ready demo',()=>assert.equal(ctx.portfolioModel_([headers,row(1,'PUBLIC_DEMO_VERIFIED','https://example.com','')],settings).cards[0].ready,false));
check('contact absent by default and injection rejected',()=>{const s=ctx.portfolioModel_([headers,row(1)],[...settings,['Business Email','a@b.com?bcc=secret'],['Business Text Number','javascript:1']]);assert.equal(s.email,'');assert.equal(s.phone,'');});
check('valid contact settings retained',()=>{const s=ctx.portfolioModel_([headers,row(1)],[...settings,['Business Email','hello@example.com'],['Business Text Number','+1 (555) 010-2000']]);assert.equal(s.email,'hello@example.com');assert.equal(s.phone,'+15550102000');});
check('schema drift fails instead of publishing wrong fields',()=>assert.throws(()=>ctx.portfolioModel_([['Title']],settings)));
new vm.Script(fs.readFileSync('Index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1]);
console.log(count+' model/security scenarios passed; frontend parses.');
