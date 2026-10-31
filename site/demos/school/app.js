const hero=document.querySelector('.hero');
const layers=document.querySelectorAll('.layer');
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches){
 hero.addEventListener('pointermove', event=>{
  if(motion.matches)return;
  const rect=hero.getBoundingClientRect();
  const x=(event.clientX-rect.left)/rect.width-.5, y=(event.clientY-rect.top)/rect.height-.5;
  layers.forEach(layer=>{const depth=Number(layer.dataset.depth);layer.style.transform=`translate(${x*depth*34}px,${y*depth*26}px)`;});
 });
 hero.addEventListener('pointerleave',()=>layers.forEach(layer=>layer.style.transform=''));
}
const dialog=document.querySelector('dialog');
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelector('#dialog-title').textContent=button.dataset.detail;
 document.querySelector('#dialog-copy').textContent=button.dataset.copy;
 dialog.showModal();
}));
document.querySelectorAll('.dialog-close,.dialog-done').forEach(button=>button.addEventListener('click',()=>dialog.close()));
document.querySelector('#explore-course').addEventListener('click',()=>{const group=document.querySelector('#course-form');for(const field of group.querySelectorAll('input')){if(!field.reportValidity())return;}group.querySelector('.form-note').textContent='Thanks for exploring. This demo does not send or save your information.';});
