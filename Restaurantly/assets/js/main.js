/**
* Template Name: Restaurantly
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function showContent(contentType) {
  const contentElement = document.getElementById('content');

  let content = '';
  switch (contentType) {
      case 'personalChef':
          content = `<h1>Personal Chef Service</h1><p>AfroSoul Connect offers both in home and deliver service for clients in need of personal chef. 
          We handle the grocery shopping, cooking, and clean up. Clients can come home and have 
          fresh home-cooked meals to enjoy with none of the stress that comes with cooking.</p>
          <ul>
            <li>We offer various chef services for busy professionals, families and professional athletes.</li>
            <li>We design meal plans to fit various dietary needs & special diets. From healthy, 
            vegetarian, vegan, paleo, diabetic, keto and more. No one size fit all meals.
            </li>
          </ul>`;
          break;
      case 'romanticDinner':
          content = `
          <h1>Romantic Couples Dinner</h1>
          <p>Enjoy a romantic dinner for two and feel like royalty!</p>
          <p>Imagine a romantic and soothing music night with AfroSoul Connect chef to compliment your 
          special day; Date Night, Birthdays, Anniversaries, Engagements, Valentine’s Day, Celebrate 
          Milestones, Proposals, Reconcile or Reconnect, Show Appreciation, Homecoming & 
          Housewarming, New Baby, Vow Renewals, all special occasion. Anyone can go to a restaurant, 
          but to have a chef come in and cook for you and your love, a curated dinner tailored to your 
          customized menu.
          We arrive 2 – 2.5 hours before your scheduled dinner time for set the table and prepare your 
          special meal.
          </p>
          <p>Menu of The Day</p>
          <ul>
            <li>Canapes & 2 courses.</li>
            <li>Canapes & 3 courses.</li>
            <li>Canapes & 4 courses.</li>
          </ul>
          <h6>(price range from R350 per person) excluding service fee</h6>
          `;
          break;
      case 'privateDining':
          content = `
          <h1>Private Dining</h1>
          <p>Private dining experiences tailored to your tastes and preferences.</p>
          <p>We provide an opulent in-home eating experience with our upscale chef service for 20 guest
          (maximum), with the best and freshest prepared food. Every element of your dining experience 
          will be customized to individual interests and preferences since we take pleasure in our
          customer satisfaction.</p>
          <p>Service Includes: Hiring items such as Dinner plates, Knives & Forks, Dessert bowls & Spoons, 
          Wine & Beverage glasses, for a maximum of 27 people.</p>
          <p>Standard Setup:
          Includes custom menu, dinner plates/chargers, utensils, glassware, and linen napkins.</p>
          <p>Luxe Setup:
          Includes above plus full décor, including any combination of candles, flowers, table linens, 
          placemats, chargers, and centerpieces to complete table scape.</p>
          <p>We are ready for your special occasion, business meeting, groups, corporate function</p>
          <h6>Prices vary according to menu choice</h6>
          `;
          break;
      case 'Catering':
          content = `<h1>Catering</h1>
          <p>Elevate your special event with our tantalizing tasty bites to exquisite tapas and lavish platters, 
          we bring the perfect blend of flavor to ensure your event is a tasteful success.</p>
          <ul>
            <li>We cater for a minimum of 17 guests.</li>
            <li>We offer full service, casual and drop off catering.</li>
            <li>We curate menus per client.</li>
          </ul>
          `;
          break;
      case 'spit-roasting':
          content = `<h1>Spit-Roasting</h1>
          <p>Whether you're hosting a family reunion, a corporate event, or a casual get-together with 
          friends, our outdoor spit-roasting experience promises to make it a memorable occasion. Gather 
          around the fire, savoring delicious food and lively conversation, as the flames dance and the 
          aroma from the slow cooking rotating special marinated meat in our classic traditional firewood 
          and coal style fills the air.</p>
          <ul>
            <li>We offer full service, casual and drop off catering.</li>
            <li>We curate menus per client.</li>
          </ul>
          <p>Don't wait any longer – book your spit-roasting experience with us today!</p>
          `;
          break;
  }

  contentElement.innerHTML = content;
}

// Call showContent with 'personalChef' as default content on page load
window.onload = function() {
  showContent('personalChef');
};

