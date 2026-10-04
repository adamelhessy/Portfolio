/* Loaded in <head>. If this file ever fails to load, the "js" class is never added,
   so every section stays visible (nothing is hidden by the reveal animation). */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  /* ---- Scroll reveal with a small stagger between siblings ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function showAll() { items.forEach(function (el) { el.classList.add('in'); }); }

  try {
    items.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentNode.children, function (n) { return n.classList.contains('reveal'); });
      el.style.setProperty('--d', (sibs.indexOf(el) * 0.12) + 's');
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });
    } else {
      showAll();
    }
  } catch (err) {
    showAll();
  }
  // Safety net: never leave content hidden, whatever happens
  setTimeout(showAll, 6000);

  /* ---- Contact form ---- */
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.status');
  var btn = form.querySelector('button[type="submit"]');
  var EMAIL = 'adam.elhessy1122@gmail.com';

  function say(msg) { status.textContent = msg; }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var name = form.elements['name'].value.trim();
    var email = form.elements['email'].value.trim();
    var message = form.elements['message'].value.trim();
    if (form.elements['_honey'].value) return; // spam trap

    btn.disabled = true;
    say('Sending…');

    fetch('https://formsubmit.co/ajax/' + EMAIL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: name, email: email, message: message,
        _subject: 'New message from your portfolio',
        _captcha: 'false', _template: 'table'
      })
    }).then(function (r) {
      if (!r.ok) throw new Error('bad response');
      return r.json();
    }).then(function (res) {
      if (res && res.success === 'false') throw new Error('rejected');
      form.reset();
      say('Thanks! Your message was sent. I will reply soon.');
    }).catch(function () {
      // Fallback: open the visitor's mail app with the message filled in
      var subject = encodeURIComponent('Portfolio message from ' + name);
      var body = encodeURIComponent(message + '\n\n' + name + ' (' + email + ')');
      say('Could not send from the page, opening your email app instead…');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
    }).then(function () { btn.disabled = false; });
  });
});
