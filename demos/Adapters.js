const Christmas=(function(){
const SHEET_ID='1AHtS0FnezTGRfoiqKzUyjPEBd_9cbSq4qG3qrmh7Yuo';
function sheet(){let s=SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');if(s.getLastRow()===0)s.appendRow(['Name','Age','Food','Party']);return s;}
function data(){let s=sheet(),last=s.getLastRow(),a=last>1?s.getRange(2,1,last-1,4).getValues():[];return {meta:{date:'December 24, 2025 (sample)',time:'6:00 PM',address:'123 Candy Cane Lane, North Pole (fictional)',questions:'Contact the host (demo)'},menu:['Mashed potatoes','Dessert','Salad','Drinks','Dinner rolls'],attendees:a.map((r,i)=>({row:i+2,fullName:String(r[0]),ageGroup:String(r[1]),food:String(r[2]).split(',').map(x=>x.trim()).filter(Boolean),enteredBy:String(r[3])})).filter(x=>x.fullName)};}
function output(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
function getChristmasData(){return data();}
function saveAttendee(p){if(!p || typeof p!=='object')throw Error('Invalid entry');let s=sheet();if(s.getLastRow()>200)throw Error('This sample is full. Please try later.');let r=p.row?Number(p.row):s.getLastRow()+1;if(r<2||r>s.getLastRow()+1)throw Error('Invalid row');let name=String(p.fullName||'').trim();if(!name||name.length>80)throw Error('Use a sample name up to 80 characters.');if(!Array.isArray(p.food)||p.food.length>5)throw Error('Choose listed dishes.');if(!['11+','10-'].includes(String(p.ageGroup||'11+')))throw Error('Choose an age group.');if(p.food.some(x=>!['Mashed potatoes','Dessert','Salad','Drinks','Dinner rolls'].includes(x)))throw Error('Choose listed dishes.');s.getRange(r,1,1,4).setValues([[name,String(p.ageGroup||'11+'),(p.food||[]).join(', '),String(p.enteredBy||name).slice(0,80)]].map(r=>r.map(v=>typeof v==='string'&&/^[=+@-]/.test(v)?"'"+v:v)));return data();}
function adminAction(){throw Error('Admin changes are disabled in this public demo.');}


return {getChristmasData,saveAttendee,adminAction};
})();
function getChristmasData(){return Christmas.getChristmasData.apply(null,arguments);}
function saveAttendee(p){p=restrictedDemoPayload_('christmas',p);const lock=LockService.getScriptLock();lock.waitLock(10000);try{return Christmas.saveAttendee(p);}finally{lock.releaseLock();}}
function adminAction(){return Christmas.adminAction.apply(null,arguments);}
const Thanksgiving=(function(){

const SHEET_ID='1S7SeE-sRFCg0c0kYlf4m7KI-G5hZ2rJZKeSjnU7tJ5k';
function tab(){const s=SpreadsheetApp.openById(SHEET_ID).getSheetByName('Sheet1');if(s.getLastRow()===0)s.appendRow(['Name','Response','Adults','Kids','Dish','Notes']);return s;}
function list(){const s=tab(),n=s.getLastRow();return n<2?[]:s.getRange(2,1,n-1,6).getValues().map((r,i)=>({id:i+2,name:String(r[0]),response:String(r[1]),adults:Number(r[2]),kids:Number(r[3]),dish:String(r[4]),notes:String(r[5])})).filter(x=>x.name);}
function safe(v){const s=String(v||'').trim();return /^[=+@-]/.test(s)?"'"+s:s;}
function save(entry,id){const s=tab(),name=String(entry.name||'').trim().slice(0,80),response=String(entry.response||''),adults=Number(entry.adults),kids=Number(entry.kids),dish=response==='Going'?String(entry.dish||'').trim().slice(0,100):'',notes=String(entry.notes||'').trim().slice(0,300);if(!name)throw Error('Please enter a name.');if(!['Going','Maybe',"Can't go"].includes(response))throw Error('Invalid response.');if(!Number.isInteger(adults)||adults<0||adults>20||!Number.isInteger(kids)||kids<0||kids>20)throw Error('Check the guest counts.');if(dish&&list().some(x=>x.dish===dish&&x.response==='Going'&&x.id!==id))throw Error('Someone already claimed that dish. Please choose another.');let row=id||s.getLastRow()+1;if(row<2||row>s.getLastRow()+1)throw Error('Invalid entry.');s.getRange(row,1,1,6).setValues([[safe(name),safe(response),adults,kids,safe(dish),safe(notes)]]);}
function apiAction(path,p){const lock=LockService.getScriptLock();lock.waitLock(10000);try{if(path==='/api/list')return {entries:list()};if(path==='/api/save'){if(tab().getLastRow()>200)throw Error('This sample is full. Please try later.');let name=String(p.name||'').trim().toLowerCase();let old=list().find(x=>x.name.toLowerCase()===name);save(p,old?old.id:null);return {entries:list()};}if(path==='/api/admin')throw Error('Admin changes are disabled in this public demo.');throw Error('Invalid request.');}finally{lock.releaseLock();}}


return {apiAction};
})();
function apiAction(path,p){if(path==='/api/save')p=restrictedDemoPayload_('thanksgiving',p);return Thanksgiving.apiAction(path,p);}
const Decker=(function(){
const SPREADSHEET_ID = '15uaH_bNqp1pt3RVGHle7f5YrWQIub50imBVUKgLw0_8';
const SHEET_NAME = 'Sheet1';

const HEADERS = [
  'Name',
  'Date',
  'Meal Type',
  'What They Are Bringing',
  'Delivery Time',
  'Notes / Contact Information',
  'Gift Card Amount',
  'Submitted At'
];



function getMealSignUps() {
  const sheet = getSheet_();
  initializeSheet_(sheet);

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const values = sheet
    .getRange(2, 1, lastRow - 1, HEADERS.length)
    .getDisplayValues();

  const entries = values
    .filter(row => row.some(value => String(value).trim() !== ''))
    .map(row => ({
      name: row[0],
      date: row[1],
      mealType: row[2],
      food: row[3],
      deliveryTime: row[4],
      notes: row[5],
      giftCardAmount: row[6]
    }));

  return entries;
}

function submitMealSignUp(formData) {
  validateSubmission_(formData);

  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(30000);

    const sheet = getSheet_();
    initializeSheet_(sheet);
    if(sheet.getLastRow()>200)throw Error('This sample is full. Please try later.');

    const submittedDate = parseLocalDate_(formData.date);

    sheet.appendRow([
      cleanText_(formData.name),
      submittedDate,
      cleanText_(formData.mealType),
      cleanText_(formData.food),
      cleanText_(formData.deliveryTime),
      cleanText_(formData.notes),
      cleanText_(formData.giftCardAmount),
      new Date()
    ]);

    const newRow = sheet.getLastRow();

    sheet
      .getRange(newRow, 2)
      .setNumberFormat('dddd, mmmm d, yyyy');

    sheet
      .getRange(newRow, 8)
      .setNumberFormat('m/d/yyyy h:mm am/pm');

    return {
      success: true,
      message: 'Thank you! Your sign-up has been added.'
    };

  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function initializeSheet_(sheet) {
  const currentHeaders = sheet
    .getRange(1, 1, 1, HEADERS.length)
    .getDisplayValues()[0];

  const headersMatch = HEADERS.every(
    (header, index) => currentHeaders[index] === header
  );

  if (!headersMatch) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

    sheet
      .getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#dbeafe')
      .setWrap(true);

    sheet.setFrozenRows(1);
  }

  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(2, 170);
  sheet.setColumnWidth(3, 130);
  sheet.setColumnWidth(4, 250);
  sheet.setColumnWidth(5, 130);
  sheet.setColumnWidth(6, 280);
  sheet.setColumnWidth(7, 130);
  sheet.setColumnWidth(8, 170);
}

function validateSubmission_(formData) {
  if (!formData || typeof formData !== 'object') {
    throw new Error('The submission was not received correctly.');
  }

  const name = cleanText_(formData.name);
  const date = cleanText_(formData.date);
  const mealType = cleanText_(formData.mealType);

  if (!name) {
    throw new Error('Please enter your name.');
  }

  if (!date) {
    throw new Error('Please choose a date.');
  }

  if (!mealType) {
    throw new Error('Please choose a meal type.');
  }

  const allowedMealTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Dessert',
    'DoorDash',
    'Gift Card',
    'Other'
  ];

  if (!allowedMealTypes.includes(mealType)) {
    throw new Error('Please choose a valid meal type.');
  }





  parseLocalDate_(date);
}

function parseLocalDate_(dateText) {
  const parts = String(dateText).split('-');

  if (parts.length !== 3) {
    throw new Error('The date is invalid.');
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  const d=new Date(year,month,day);if(d.getFullYear()!==year||d.getMonth()!==month||d.getDate()!==day)throw Error('Invalid date');return d;
}

function cleanText_(value) {
  const s=String(value == null ? '' : value).trim().slice(0,400);return /^[=+@-]/.test(s)?"'"+s:s;
}
return {getMealSignUps,submitMealSignUp};
})();
function getMealSignUps(){return Decker.getMealSignUps.apply(null,arguments);}
function submitMealSignUp(p){return Decker.submitMealSignUp(restrictedDemoPayload_('decker',p));}
const Rafa=(function(){
/** Baby Rafael — Meals & Gifts for Kristina and Daniel.
 * Add an HTML file named index and paste the HTML below into it.
 * Deploy as a Web app, executing as Me.
 */
const CONFIG = Object.freeze({
  spreadsheetId: '1bekXsiIIEmMVusm7J5pzwHpoM2kmDze3Fz8cmTb8V_U',
  sheetName: 'SIGNUPS',
  timeZone: 'America/Chicago',
  types: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Gift Card', 'Baby Gift', 'Other'],
  mealTypes: ['Breakfast', 'Lunch', 'Dinner']
});

const HEADERS = [
  'Name',
  'Date',
  'Support Type',
  'What You Are Bringing',
  'Delivery Time',
  'Public Note',
  'Gift Card Amount',
  'Submitted At',
  'Private Contact',
  'Submission ID'
];



// Public response omits contact details, amounts, timestamps, and IDs.
function getPageData() {
  const today = today_();

  const signups = rows_(sheet_())
    .map(publicRow_)
    .filter(function (r) {
      return r.name && r.date && r.date >= today;
    })
    .sort(function (a, b) {
      return (a.date + a.time + a.type)
        .localeCompare(b.date + b.time + b.type);
    });

  return {
    today: today,
    timeZone: CONFIG.timeZone,
    types: CONFIG.types,
    signups: signups
  };
}

function submitSignup(input) {
  const item = validate_(input);
  const lock = LockService.getScriptLock();

  if (!lock.tryLock(15000)) {
    throw new Error(
      'Someone else is signing up. Please try again in a moment.'
    );
  }

  try {
    const sheet = sheet_();
    const rows = rows_(sheet);if(rows.length>=200)throw Error('This sample is full. Please try later.');

    // A retry after a lost response never creates a second row.
    const existing = rows.find(function (r) {
      return String(r[9]) === item.requestId;
    });

    if (existing) {
      return { ok: true, alreadySaved: true };
    }

    const isMeal = CONFIG.mealTypes.indexOf(item.type) !== -1;
    const taken = rows.some(function (r) {
      return dateString_(r[1]) === item.date &&
        String(r[2]) === item.type;
    });

    if (isMeal && taken) {
      throw new Error(
        'That ' + item.type.toLowerCase() +
        ' is already covered. Choose another date or support type.'
      );
    }

    const next = sheet.getLastRow() + 1;

    if (next > sheet.getMaxRows()) {
      sheet.insertRowsAfter(sheet.getMaxRows(), 100);
    }

    // Preserve the supplied table's column types.
    const values = [
      item.name,
      item.date,
      item.type,
      item.item,
      item.time,
      item.note,
      item.amount,
      Utilities.formatDate(
        new Date(),
        CONFIG.timeZone,
        'yyyy-MM-dd HH:mm:ss'
      ),
      item.contact,
      item.requestId
    ];

    sheet.getRange(next, 1, 1, HEADERS.length)
      .setValues([values.map(safeCell_)]);

    SpreadsheetApp.flush();

    return { ok: true, alreadySaved: false };
  } finally {
    lock.releaseLock();
  }
}

function sheet_() {
  const sheet = SpreadsheetApp
    .openById(CONFIG.spreadsheetId)
    .getSheetByName(CONFIG.sheetName);

  if (!sheet) {
    throw new Error(
      'The signup sheet is unavailable. Please contact the organizer.'
    );
  }

  const actual = sheet
    .getRange(1, 1, 1, HEADERS.length)
    .getDisplayValues()[0];

  if (actual.some(function (h, i) {
    return h !== HEADERS[i];
  })) {
    throw new Error(
      'The signup sheet headers have changed. ' +
      'Please ask the organizer to restore them.'
    );
  }

  return sheet;
}

function rows_(sheet) {
  const count = sheet.getLastRow() - 1;

  return count > 0
    ? sheet.getRange(2, 1, count, HEADERS.length).getValues()
    : [];
}

function today_() {
  return Utilities.formatDate(
    new Date(),
    CONFIG.timeZone,
    'yyyy-MM-dd'
  );
}

function dateString_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return Utilities.formatDate(
      value,
      CONFIG.timeZone,
      'yyyy-MM-dd'
    );
  }

  const text = String(value || '').trim();
  return validDate_(text) ? text : '';
}

function timeString_(value) {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return Utilities.formatDate(value, CONFIG.timeZone, 'HH:mm');
  }

  const text = String(value || '').trim();
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(text) ? text : '';
}

function publicRow_(r) {
  return {
    name: String(r[0] || ''),
    date: dateString_(r[1]),
    type: String(r[2] || ''),
    item: String(r[3] || ''),
    time: timeString_(r[4]),
    note: String(r[5] || '')
  };
}

function text_(value, label, max, required) {
  if (
    value !== undefined &&
    value !== null &&
    typeof value !== 'string'
  ) {
    throw new Error(label + ' must be text.');
  }

  const result = String(value || '').trim();

  if (required && !result) {
    throw new Error('Please enter ' + label.toLowerCase() + '.');
  }

  if (result.length > max) {
    throw new Error(
      label + ' must be ' + max + ' characters or fewer.'
    );
  }

  return result;
}

function validDate_(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    return false;
  }

  const d = new Date(s + 'T12:00:00Z');

  return !isNaN(d.getTime()) &&
    d.toISOString().slice(0, 10) === s;
}

function validate_(input) {
  if (
    !input ||
    typeof input !== 'object' ||
    Array.isArray(input)
  ) {
    throw new Error('Please complete the signup form.');
  }

  if (input.website) {
    throw new Error('Unable to accept this signup.');
  }

  const item = {
    name: text_(input.name, 'Name', 80, true),
    date: text_(input.date, 'Date', 10, true),
    type: text_(input.type, 'Support type', 30, true),
    item: text_(
      input.item,
      'What you are bringing',
      220,
      true
    ),
    time: text_(input.time, 'Delivery time', 5, false),
    note: text_(input.note, 'Public note', 400, false),
    contact: text_(
      input.contact,
      'Contact information',
      160,
      false
    ),
    requestId: text_(
      input.requestId,
      'Submission reference',
      80,
      true
    ),
    amount: ''
  };

  if (!/^[a-zA-Z0-9_-]{16,80}$/.test(item.requestId)) {
    throw new Error('Please reload the page and try again.');
  }

  if (!validDate_(item.date) || item.date < today_()) {
    throw new Error('Please choose today or a future date.');
  }

  if (CONFIG.types.indexOf(item.type) === -1) {
    throw new Error('Please select a listed support type.');
  }

  if (
    item.time &&
    !/^([01]\d|2[0-3]):[0-5]\d$/.test(item.time)
  ) {
    throw new Error('Please enter a valid delivery time.');
  }

  if (
    input.amount !== '' &&
    input.amount !== undefined &&
    input.amount !== null
  ) {
    const amount = String(input.amount).trim();

    if (
      item.type !== 'Gift Card' ||
      !/^\d+(\.\d{1,2})?$/.test(amount) ||
      Number(amount) <= 0 ||
      Number(amount) > 10000
    ) {
      throw new Error(
        'Enter a gift-card amount between $0.01 and $10,000, ' +
        'or leave it blank.'
      );
    }

    item.amount = Number(amount);
  }

  return item;
}

function safeCell_(value) {
  // Store formula-like guest input as literal text.
  return typeof value === 'string' && /^[=+@'\-]/.test(value)
    ? "'" + value
    : value;
}
return {getPageData,submitSignup};
})();
function getPageData(){return Rafa.getPageData.apply(null,arguments);}
function submitSignup(p){return Rafa.submitSignup(restrictedDemoPayload_('rafa',p));}
