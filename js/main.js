(function () {
  document.documentElement.classList.add('js');

  /* ---- Scroll reveal with a small stagger between siblings ---- */
  var items = document.querySelectorAll('.reveal');
  items.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (n) { return n.classList.contains('reveal'); });
    el.style.setProperty('--d', (sibs.indexOf(el) * 0.12) + 's');
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

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
    var data = new FormData(form);
    if (data.get('_honey')) return; // spam trap

    btn.disabled = true;
    say('Sending…');

    fetch('https://formsubmit.co/ajax/' + EMAIL, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    }).then(function (r) {
      if (!r.ok) throw new Error('bad response');
      return r.json();
    }).then(function () {
      form.reset();
      say('Thanks! Your message was sent. I will reply soon.');
    }).catch(function () {
      // Fallback: open the visitor's mail app with the message filled in
      var subject = encodeURIComponent('Portfolio message from ' + data.get('name'));
      var body = encodeURIComponent(data.get('message') + '\n\n' + data.get('name') + ' (' + data.get('email') + ')');
      say('Could not send from the page, opening your email app instead…');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
    }).then(function () { btn.disabled = false; });
  });
})();
