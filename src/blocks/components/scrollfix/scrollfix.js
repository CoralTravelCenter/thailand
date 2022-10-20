function scrollFix(width){
  let header = document.querySelector('div.container-tabItemWrap .container-tabItem.activeTab') || false;

  if (!header) return
  if (window.innerWidth<width) return

  let headerHeight = header.getBoundingClientRect().height;
  let headerParent = header.closest(".container-tabItemWrap");
  headerParent.style.height = headerHeight + 'px';
};

document.addEventListener('DOMContentLoaded', function(){
  


setTimeout( scrollFix(1199.98), 50 )

window.addEventListener('scroll', scrollFix(1199.98));
window.addEventListener('click', function(e){
  if ( e.target.closest('.tabItem') ){
    scrollFix(1199.98);
  }
});

});