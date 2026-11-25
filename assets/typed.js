// Section links in the top bar retype themselves when the pointer lands on
// them, then leave a blinking caret. Without this script they are plain links.
(function () {
  // What a half-typed word does when the pointer leaves: 'type' finishes it
  // with a quick burst of typing, 'fade' fades the missing letters in.
  var LEAVE = 'type';

  var still = window.matchMedia('(prefers-reduced-motion: reduce)');
  var pointer = window.matchMedia('(hover: hover)');

  document.querySelectorAll('.site-header nav a').forEach(function (link) {
    var text = link.textContent;
    var typed = document.createElement('span');
    var rest = document.createElement('span');
    var timer;
    var count = 0; // letters showing while the word is being typed
    var active = false; // the pointer has been on the link
    var rushing = false; // finishing the word quickly after the pointer left

    // The letters typed so far, then the letters still to come. The second
    // span is invisible while typing but keeps the word's full width.
    typed.className = 'typed-text';
    rest.className = 'typed-rest';
    typed.textContent = text;
    link.setAttribute('aria-label', text);
    link.textContent = '';
    link.append(typed, rest);
    link.classList.add('typed');

    function show(letters) {
      typed.textContent = text.slice(0, letters);
      rest.textContent = text.slice(letters);
    }

    function next() {
      count++;
      if (count < text.length) {
        show(count);
        // Slightly uneven, like fingers on keys; a steady burst when rushing.
        timer = setTimeout(next, rushing ? 30 : 120 + Math.random() * 80);
      } else {
        finish();
        if (rushing) leave();
      }
    }

    // The word is whole again; the pointer may still be on it.
    function finish() {
      clearTimeout(timer);
      show(text.length);
      link.style.width = '';
      link.classList.remove('is-typing');
    }

    // The caret holds for a beat and fades out (timings live in style.css).
    function leave() {
      link.classList.remove('is-typing');
      link.classList.add('is-leaving');
      var style = getComputedStyle(rest);
      var total = parseFloat(style.transitionDelay) + parseFloat(style.transitionDuration);
      timer = setTimeout(settle, (total * 1000 || 0) + 40);
    }

    // Back to a plain link.
    function settle() {
      finish();
      link.classList.remove('is-leaving');
      active = rushing = false;
    }

    link.addEventListener('mouseleave', function () {
      if (!active || rushing) return;
      clearTimeout(timer);
      if (LEAVE === 'type' && link.classList.contains('is-typing')) {
        rushing = true;
        next();
      } else {
        leave();
      }
    });

    link.addEventListener('mouseenter', function () {
      if (still.matches || !pointer.matches) return;
      clearTimeout(timer);
      active = true;
      rushing = false;
      link.classList.remove('is-leaving');
      // Hold the link's width so its neighbours can't move while it is split.
      link.style.width = link.getBoundingClientRect().width + 'px';
      link.classList.add('is-typing');
      count = 0;
      show(0);
      timer = setTimeout(next, 120 + Math.random() * 80);
    });
  });
})();
