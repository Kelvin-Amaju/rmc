(() => {
  'use strict';

  document.querySelectorAll('form[data-enquiry]').forEach(form => {
    const note = document.createElement('p');
    note.className = 'enquiry-note';
    note.setAttribute('role', 'status');
    note.textContent = 'This form opens your email app. Review and send your enquiry there.';
    form.append(note);

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const lines = [];
      form.querySelectorAll('input, select, textarea').forEach(field => {
        if (!field.value.trim()) return;
        const value = field.tagName === 'SELECT'
          ? field.selectedOptions[0]?.textContent.trim()
          : field.value.trim();
        if (value) lines.push(`${field.getAttribute('aria-label') || field.name}: ${value}`);
      });

      const subject = encodeURIComponent('Website enquiry — Rheriene Mabamidje & Co.');
      const body = encodeURIComponent(lines.join('\r\n\r\n'));
      window.location.href = `mailto:info@mabamidje.com?subject=${subject}&body=${body}`;
      note.textContent = 'Your enquiry is ready in your email app. If it did not open, email info@mabamidje.com or call +234 803 318 1681.';
    });
  });
})();
