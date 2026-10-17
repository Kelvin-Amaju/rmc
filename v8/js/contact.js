document.getElementById('contact-enquiry').addEventListener('submit', function (event) {
  event.preventDefault();
  const data = new FormData(this);
  const subject = 'Website enquiry: ' + data.get('service');
  const body = ['Name: ' + data.get('name'), 'Email: ' + data.get('email'), 'Phone: ' + (data.get('phone') || 'Not provided'), 'Service: ' + data.get('service'), '', data.get('message')].join('\n');
  document.getElementById('enquiry-status').textContent = 'Your email app will open with a draft. If it does not open, email info@mabamidje.com or call +234 803 318 1681.';
  window.location.href = 'mailto:info@mabamidje.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});
