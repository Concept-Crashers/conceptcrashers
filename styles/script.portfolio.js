(() => {
  // Smoothed auto-scroll for .hero-visuals when viewport <= 900px.
  // Uses exponential smoothing for velocity so movement and reversals feel smooth.

  const SELECTOR = '.hero-visuals';
  const MAX_WIDTH = 900;
  const MAX_SPEED_PX_PER_SEC = 120; // top speed (px/s)
  const MAX_SPEED = MAX_SPEED_PX_PER_SEC / 1000; // px/ms
  const SMOOTH_FACTOR = 0.0035; // smoothing factor per ms (tweak for feel)
  const VELOCITY_EPS = 0.02; // threshold to consider velocity stopped (px/ms)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let visuals = null;
  let rafId = null;
  let running = false;
  let paused = false;
  let direction = 1; // 1 = down, -1 = up
  let lastTime = null;

  // physics state
  let velocity = 0; // px/ms
  let targetVelocity = 0; // px/ms
  let waitingToFlip = false;

  function restoreOriginalIfCloned(el) {
    if (!el) return;
    if (el.dataset && el.dataset.__heroOriginal) {
      try { el.innerHTML = el.dataset.__heroOriginal; } catch (e) { /* ignore */ }
      delete el.dataset.__heroOriginal;
    }
  }

  function updateTargetVelocity() {
    if (paused) { targetVelocity = 0; return; }
    if (waitingToFlip) { targetVelocity = 0; return; }
    targetVelocity = direction * MAX_SPEED;
  }

  function step(timestamp) {
    if (!running) return;
    if (!lastTime) lastTime = timestamp;
    const dt = Math.min(40, timestamp - lastTime); // clamp dt to avoid big jumps
    lastTime = timestamp;

    if (!visuals) visuals = document.querySelector(SELECTOR);
    if (!visuals) { rafId = requestAnimationFrame(step); return; }

    restoreOriginalIfCloned(visuals);
    visuals.style.overflowY = 'auto';
    visuals.style.webkitOverflowScrolling = 'touch';

    if (visuals.scrollHeight <= visuals.clientHeight + 2) { rafId = requestAnimationFrame(step); return; }

    updateTargetVelocity();

    // exponential smoothing toward target velocity
    const alpha = Math.min(1, dt * SMOOTH_FACTOR);
    velocity += (targetVelocity - velocity) * alpha;

    // apply movement
    visuals.scrollTop += velocity * dt;

    const maxScroll = visuals.scrollHeight - visuals.clientHeight;

    // handle hits at ends with smooth flip
    if (!waitingToFlip && visuals.scrollTop <= 0 && velocity < 0) {
      visuals.scrollTop = 0; waitingToFlip = true; targetVelocity = 0;
    }
    if (!waitingToFlip && visuals.scrollTop >= maxScroll && velocity > 0) {
      visuals.scrollTop = maxScroll; waitingToFlip = true; targetVelocity = 0;
    }

    // when we're waiting and velocity has dropped near zero, flip direction smoothly
    if (waitingToFlip && Math.abs(velocity) < VELOCITY_EPS) {
      waitingToFlip = false; direction = -direction; updateTargetVelocity();
    }

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    if (prefersReducedMotion) return;
    visuals = document.querySelector(SELECTOR);
    if (!visuals) return;
    restoreOriginalIfCloned(visuals);
    running = true; paused = false; lastTime = null; velocity = 0; waitingToFlip = false; updateTargetVelocity();
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false; paused = false; lastTime = null; velocity = 0; targetVelocity = 0; waitingToFlip = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (visuals) { visuals.style.overflowY = ''; visuals.style.webkitOverflowScrolling = ''; }
  }

  function attachInteractions() {
    visuals = document.querySelector(SELECTOR);
    if (!visuals) return;
    visuals.addEventListener('mouseenter', () => { paused = true; updateTargetVelocity(); });
    visuals.addEventListener('mouseleave', () => { paused = false; updateTargetVelocity(); });
    visuals.addEventListener('touchstart', () => { paused = true; updateTargetVelocity(); }, {passive:true});
    visuals.addEventListener('touchend', () => { paused = false; updateTargetVelocity(); }, {passive:true});
    visuals.addEventListener('scroll', () => {
      // brief pause after manual scroll
      paused = true; updateTargetVelocity(); clearTimeout(window.__heroVisualsResumeTimer);
      window.__heroVisualsResumeTimer = setTimeout(() => { paused = false; updateTargetVelocity(); }, 800);
    }, {passive:true});
  }

  function onResize() { if (window.innerWidth <= MAX_WIDTH) start(); else stop(); }

  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else onResize(); });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { attachInteractions(); onResize(); });
  else { attachInteractions(); onResize(); }

})();
