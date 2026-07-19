/* Custom app cursor: a small circle (black @ 20% opacity, white border) that
   follows the pointer and deepens to 40% opacity while a click is held.
   Only runs on fine-pointer devices (mouse/trackpad) — touch screens have no
   pointer to follow, so it's skipped there and the native behaviour stays. */
(function () {
  if (!window.matchMedia || !window.matchMedia('(pointer: fine)').matches) return;

  function init() {
    if (document.querySelector('.app-cursor')) return;

    var dot = document.createElement('div');
    dot.className = 'app-cursor';
    document.body.appendChild(dot);
    // Guard on <html> so the "hide the native cursor" CSS only applies once
    // the follower actually exists — if this script fails to run, the real
    // cursor is left untouched rather than hidden with no replacement.
    document.documentElement.classList.add('has-custom-cursor');

    function place(e) {
      dot.style.transform =
        'translate(' + e.clientX + 'px,' + e.clientY + 'px) translate(-50%,-50%)';
      dot.style.opacity = '1';
    }

    window.addEventListener('mousemove', place, { passive: true });
    // pointerdown/up cover mouse + pen; the class swaps the fill opacity.
    window.addEventListener('pointerdown', function () { dot.classList.add('is-down'); });
    window.addEventListener('pointerup', function () { dot.classList.remove('is-down'); });
    window.addEventListener('pointercancel', function () { dot.classList.remove('is-down'); });
    // Fade out when the pointer leaves the window, back in when it returns.
    document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { dot.style.opacity = '1'; });
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
