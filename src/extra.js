export const toggleSideMenu = () => {
  const sideMenu = document.querySelector('.open_side_menu');
  sideMenu.classList.toggle('fa-angle-right');
  sideMenu.classList.toggle('fa-angle-left');
  sideMenu.classList.toggle('active');
  document.querySelector('.side_navbar').classList.toggle('open_menu');
}

export const smoothScroll = nameClass => {
  const element = document.querySelector(`.${nameClass}`);
  if(window.innerWidth <= 768) toggleSideMenu();
  window.scroll({ left: 0, top: element.offsetTop, behavior: 'smooth' });
}
