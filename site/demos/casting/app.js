const form=document.querySelector('#search');
const query=document.querySelector('#query');
const category=document.querySelector('#category');
const cards=[...document.querySelectorAll('.card')];
const filters=[...document.querySelectorAll('[data-filter]')];
const results=document.querySelector('#result-count');
const empty=document.querySelector('#empty');
function update() {
 const phrase=query.value.trim().toLowerCase();
 const type=category.value;
 let count=0;
 for(const card of cards){const visible=(type==='all'||card.dataset.type===type)&&(!phrase||card.dataset.search.includes(phrase)||card.textContent.toLowerCase().includes(phrase));card.hidden=!visible;if(visible)count++;}
 filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===type)));
 results.textContent=`${count} sample ${count===1?'opportunity':'opportunities'}`;
 empty.hidden=count!==0;
}
form.addEventListener('submit',event=>{event.preventDefault();update();document.querySelector('#roles').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
query.addEventListener('input',update);
category.addEventListener('change',update);
filters.forEach(button=>button.addEventListener('click',()=>{category.value=button.dataset.filter;update();}));
document.querySelector('#reset').addEventListener('click',()=>{query.value='';category.value='all';update();query.focus();});
const dialog=document.querySelector('#detail-dialog');
const title=document.querySelector('#dialog-title');
const copy=document.querySelector('#dialog-copy');
let trigger;
function open(event,heading,description){trigger=event.currentTarget;title.textContent=heading;copy.textContent=description;dialog.showModal();}
document.querySelectorAll('.detail').forEach(button=>button.addEventListener('click',event=>open(event,button.dataset.title,button.dataset.copy)));
document.querySelector('#how-open').addEventListener('click',event=>open(event,'Explore the demo','Search or filter the fictional listings and open a card to see its details. This is an adapted portfolio demonstration.'));
document.querySelector('#close').addEventListener('click',()=>dialog.close());
document.querySelector('.close-button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>trigger?.focus());
