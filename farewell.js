/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('nav-drawer');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});
function closeDrawer() {
  hamburger.classList.remove('open');
  drawer.classList.remove('open');
}
document.addEventListener('click', e => {
  if(!hamburger.contains(e.target) && !drawer.contains(e.target)) closeDrawer();
});

/* ── Custom cursor ── */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 7) + 'px';
  cursor.style.top  = (e.clientY - 7) + 'px';
});
document.querySelectorAll('a, button, .tl-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

/* ── Timeline scroll reveal ── */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });
document.querySelectorAll('.tl-item').forEach(i => revealIO.observe(i));

/* ── Animated counters ── */
function animateCount(el, target) {
  const dur = 1800; let startTime = null;
  (function step(ts) {
    if(!startTime) startTime = ts;
    const p = Math.min((ts - startTime) / dur, 1);
    el.textContent = Math.round((1 - Math.pow(1-p, 4)) * target).toLocaleString();
    if(p < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? target.toLocaleString() : target;
  })(performance.now());
}
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const el = e.target;
      if('special' in el.dataset) return;
      animateCount(el, parseInt(el.dataset.target));
      countIO.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-number').forEach(el => countIO.observe(el));

/* ── Confetti ── */
const cnv = document.getElementById('confetti-canvas');
const cx  = cnv.getContext('2d');
function rsz() { cnv.width = innerWidth; cnv.height = innerHeight; }
rsz(); addEventListener('resize', rsz);
const COLS = ['#c9a84c','#b5451b','#4a6741','#8b6c42','#2d5f8a'];
class P {
  constructor(init){ this.r(init); }
  r(init=false){
    this.x = Math.random()*cnv.width;
    this.y = init ? Math.random()*-cnv.height : -12;
    this.sz = Math.random()*7+3;
    this.vy = Math.random()*2.4+1;
    this.vx = (Math.random()-.5)*1.4;
    this.a  = Math.random()*Math.PI*2;
    this.sp = (Math.random()-.5)*.11;
    this.c  = COLS[Math.random()*COLS.length|0];
    this.op = 1; this.rect = Math.random()>.5;
  }
  u(){ this.x+=this.vx; this.y+=this.vy; this.a+=this.sp; this.op-=.0035;
       if(this.y>cnv.height||this.op<=0) this.r(); }
  d(){
    cx.save(); cx.translate(this.x,this.y); cx.rotate(this.a);
    cx.globalAlpha=Math.max(0,this.op); cx.fillStyle=this.c;
    if(this.rect) cx.fillRect(-this.sz/2,-this.sz/2,this.sz,this.sz*.4);
    else{ cx.beginPath(); cx.arc(0,0,this.sz/2,0,Math.PI*2); cx.fill(); }
    cx.restore();
  }
}
const ps = Array.from({length:120},()=>new P(true));
let on = true;
setTimeout(()=>on=false, 4500);
(function loop(){ cx.clearRect(0,0,cnv.width,cnv.height);
  if(on) ps.forEach(p=>{p.u();p.d();}); requestAnimationFrame(loop); })();

/* ── Parallax hero photo (desktop only) ── */
if(matchMedia('(hover:hover)').matches){
  addEventListener('scroll',()=>{
    const f=document.querySelector('.hero-photo-frame');
    if(f) f.style.transform=`translateY(${scrollY*.09}px)`;
  },{passive:true});
}

// 1. Select all gallery containers
const allSliders = document.querySelectorAll('.premium-slider');

allSliders.forEach((slider, index) => {
    let currentSlide = 0;
    const slides = slider.querySelectorAll('.slide');

    // 2. Define the animation for THIS specific slider
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // 3. Start the timer. 
    // index * 300 adds a tiny delay between sliders for a "premium" wave effect.
    setTimeout(() => {
        setInterval(nextSlide, 3000); // Changes image every 3 seconds
    }, index * 300); 
});

/* ── SCROLL REVEAL ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        e.target.classList.add('visible');
        if(e.target.classList.contains('timeline-item')) {
          e.target.style.transitionDelay = (Array.from(e.target.parentElement.children).indexOf(e.target) * 0.15) + 's';
        }
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelector('.orb1').style.transform = `translate(${y*0.03}px, ${y*0.04}px) scale(1)`;
    document.querySelector('.orb2').style.transform = `translate(${-y*0.02}px, ${-y*0.03}px) scale(1)`;
  }, { passive: true });



document.body.addEventListener("click", () => {
  document.getElementById("music").play();
}, { once: true });



