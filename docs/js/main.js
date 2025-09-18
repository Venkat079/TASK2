// src/assets/js/main.js

// Bootstrap custom validation for contact form
(function() {
    'use strict';
    window.addEventListener('load', function() {
      var form = document.getElementById('contactForm');
      if (!form) return; // Only run if form exists
  
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    }, false);
  })();
  