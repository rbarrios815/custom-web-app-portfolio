/** All persisted visitor-supplied text must come from these fixed choices. */
function demoDates_() {
  var today = Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd');
  var base = new Date(today + 'T12:00:00Z');
  return Array.from({length: 21}, function (_, i) {
    return new Date(base.getTime() + i * 86400000).toISOString().slice(0, 10);
  });
}
function restrictedDemoPayload_(kind, p) {
  if (!p || typeof p !== 'object' || Array.isArray(p)) throw Error('Choose a listed demo option.');
  function choice(key, values, fallback) {
    var value = p[key] === undefined || p[key] === null ? fallback : p[key];
    if (typeof value !== 'string' || values.indexOf(value) < 0) throw Error('Choose a listed demo option for ' + key + '.');
    return value;
  }
  var name = choice(kind === 'christmas' ? 'fullName' : 'name', DEMO_CHOICES.names);
  if (kind === 'christmas') {
    if (!Array.isArray(p.food) || p.food.length > 5 || p.food.some(function (x) {return ['Mashed potatoes','Dessert','Salad','Drinks','Dinner rolls'].indexOf(x)<0;})) throw Error('Choose listed dishes.');
    if (p.row !== undefined && p.row !== null && (!Number.isInteger(p.row) || p.row < 2 || p.row > 201)) throw Error('Invalid sample entry.');
    return {fullName:name, enteredBy:choice('enteredBy',DEMO_CHOICES.names,name), ageGroup:choice('ageGroup',['11+','10-'],'11+'), food:p.food.slice(), row:p.row};
  }
  if (kind === 'thanksgiving') {
    if (!Number.isInteger(p.adults) || p.adults < 1 || p.adults > 6 || !Number.isInteger(p.kids) || p.kids < 0 || p.kids > 5) throw Error('Choose listed guest counts.');
    return {name:name,response:choice('response',['Going','Maybe',"Can't go"]),adults:p.adults,kids:p.kids,dish:choice('dish',['','Mashed potatoes','Stuffing','Green bean casserole','Dinner rolls','Pumpkin pie','Apple pie','Drinks','Mac and cheese'],''),notes:choice('notes',DEMO_CHOICES.notes,'')};
  }
  var date = choice('date', demoDates_());
  var amount = choice(kind === 'decker' ? 'giftCardAmount' : 'amount',DEMO_CHOICES.amounts,'');
  if (kind === 'decker') {
    return {name:name,date:date,mealType:choice('mealType',['Breakfast','Lunch','Dinner','Snack','Dessert','DoorDash','Gift Card','Other']),food:choice('food',DEMO_CHOICES.items),deliveryTime:choice('deliveryTime',['','9:00 AM','12:00 PM','3:00 PM','5:30 PM','6:00 PM'],''),notes:choice('notes',DEMO_CHOICES.notes,''),giftCardAmount:amount};
  }
  var type = choice('type',['Breakfast','Lunch','Dinner','Snacks','Gift Card','Baby Gift','Other']);
  var item = choice('item', DEMO_CHOICES.items);
  choice('contact',[''],'');
  if (amount && type !== 'Gift Card') throw Error('Sample amounts apply only to gift cards.');
  return {name:name,date:date,type:type,item:item,time:choice('time',DEMO_CHOICES.times,''),note:choice('note',DEMO_CHOICES.notes,''),amount:amount,contact:'',website:'',
    // Derive metadata exclusively from approved choices; never persist a supplied ID.
    requestId:'demo_'+DEMO_CHOICES.names.indexOf(name)+'_'+date.replace(/-/g,'')+'_'+['Breakfast','Lunch','Dinner','Snacks','Gift Card','Baby Gift','Other'].indexOf(type)+'_'+DEMO_CHOICES.items.indexOf(item)};
}
function demoPage_(slug) {
  var dateOptions = demoDates_().map(function (date) {return '<option value="'+date+'">'+date+'</option>';}).join('');
  return DEMO_PAGES[slug].replace(/__DEMO_DATE_OPTIONS__/g,dateOptions);
}
