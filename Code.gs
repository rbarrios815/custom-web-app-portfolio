/** Read-only gallery. Configure PORTFOLIO_SHEET_ID in Script Properties. */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Ricardo’s Custom Web App Portfolio — Interactive Demo Gallery')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getPortfolio() {
  var id = PropertiesService.getScriptProperties().getProperty('PORTFOLIO_SHEET_ID');
  if (!id) throw new Error('The gallery is being configured. Please check back soon.');
  var book = SpreadsheetApp.openById(id);
  var demos = book.getSheetByName('Demos');
  var settings = book.getSheetByName('Settings');
  if (!demos || !settings) throw new Error('The gallery is temporarily unavailable.');
  return portfolioModel_(demos.getDataRange().getDisplayValues(), settings.getDataRange().getDisplayValues());
}

function portfolioModel_(rows, settingRows) {
  var settings = {};
  settingRows.slice(1).forEach(function (r) { settings[String(r[0]).trim()] = String(r[1] || '').trim(); });
  var headings = rows[0] || [];
  var required = ['Display Order', 'Title', 'Description', 'Demo URL', 'Screenshot URL', 'Visible', 'Status'];
  required.forEach(function (h) { if (headings.indexOf(h) < 0) throw new Error('The gallery configuration needs attention.'); });
  function value(row, key) { return String(row[headings.indexOf(key)] || '').trim(); }
  var cards = rows.slice(1).filter(function (r) { return value(r, 'Visible').toUpperCase() === 'TRUE' && value(r, 'Title'); })
    .sort(function (a, b) { return Number(value(a, 'Display Order')) - Number(value(b, 'Display Order')); })
    .slice(0, 4).map(function (r) {
      // Only an explicitly verified demo may become a public link/image.
      var verified = value(r, 'Status') === 'PUBLIC_DEMO_VERIFIED';
      var url = httpsUrl_(value(r, 'Demo URL'));
      var image = httpsUrl_(value(r, 'Screenshot URL'));
      return { title: value(r, 'Title').slice(0, 100), description: value(r, 'Description').slice(0, 400),
        url: verified ? url : '', image: verified ? image : '', ready: Boolean(verified && url && image) };
    });
  var email = settings['Business Email'] || '';
  var phone = settings['Business Text Number'] || '';
  return {
    title: settings['Portfolio Title'] || 'Ricardo’s Custom Web App Portfolio',
    subtitle: settings['Portfolio Subtitle'] || 'Interactive Demo Gallery',
    intro: settings['Supporting Text'] || 'Explore interactive web apps built for real people, events, and businesses.',
    contactIntro: settings['Contact Intro'] || 'Have an idea? Let’s create a custom web app for your event, family, or business.',
    email: /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email) ? email : '',
    phone: /^\+?[\d ()-]{7,25}$/.test(phone) ? phone.replace(/[ ()-]/g, '') : '', cards: cards
  };
}

function httpsUrl_(text) {
  // Reject credentials, whitespace, executable schemes and malformed hosts.
  return /^https:\/\/[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?(?::\d+)?(?:[/?#][^\s\\<>"']*)?$/i.test(text) ? text : '';
}
