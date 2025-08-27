// Header: menu hamburguer
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
if (hamburger && menu){
  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}

// Galeria com miniaturas e teclado + toque
(function(){
  const modal = document.getElementById('galleryModal');
  if (!modal) return;
  const imgEl = document.getElementById('galleryImage');
  const closeBtn = document.getElementById('closeGallery');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const thumbs = document.getElementById('thumbs');

  let images = [];
  let currentIndex = 0;

  function openGallery(arr){
    images = arr;
    currentIndex = 0;
    render();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }

  function closeGallery(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
  }

  function render(){
    imgEl.src = images[currentIndex];
    imgEl.alt = `Foto ${currentIndex+1} de ${images.length}`;
    thumbs.innerHTML = images.map((src,i)=> `<img src="${src}" alt="Miniatura ${i+1}" data-i="${i}" class="${i===currentIndex?'active':''}">`).join('');
  }

  function changeSlide(dir){
    currentIndex = (currentIndex + dir + images.length) % images.length;
    render();
  }

  // Eventos
  closeBtn.addEventListener('click', closeGallery);
  prevBtn.addEventListener('click', () => changeSlide(-1));
  nextBtn.addEventListener('click', () => changeSlide(1));
  thumbs.addEventListener('click', (e)=>{
    const t = e.target.closest('img');
    if (!t) return;
    currentIndex = Number(t.dataset.i);
    render();
  });

  // Teclado
  document.addEventListener('keydown', (e)=>{
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
  });

  // Swipe touch
  let startX = 0;
  imgEl.addEventListener('touchstart', (e)=> startX = e.touches[0].clientX);
  imgEl.addEventListener('touchend', (e)=> {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40){
      changeSlide(dx > 0 ? -1 : 1);
    }
  });

  // Bind botões "Ver fotos"
  document.querySelectorAll('[data-gallery]').forEach(btn => {
    btn.addEventListener('click', () => {
      try {
        const arr = JSON.parse(btn.getAttribute('data-gallery'));
        openGallery(arr);
      } catch(e){ console.error('Galeria inválida', e); }
    });
  });
})();
