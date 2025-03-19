import { defineAsyncComponent } from 'vue'

const template = defineAsyncComponent(() => import('@/components/SiteScreen/SiteScreen.vue'))

export const sites = [
  {
    props: {
      id: 1,
      name: 'Pizza business card',
      link: 'eat',
      description:
        'The website uses plugins for gallery functionality, features custom-styled form elements, implements number validation checks, and is fully responsive across different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 2,
      name: 'Landing page for filter systems',
      link: 'filtr',
      description:
        'This website uses several jQuery plugins including animation effects, fancybox for modal windows, hamburger menus for mobile navigation, headhesive for sticky headers, masked input for form fields, mmenu for mobile-friendly navigation, slick for carousels/sliders, and waypoints for detecting scroll position - all contributing to a fully responsive design that adapts to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 3,
      name: 'Landing page for helping with army',
      link: 'bezop',
      description:
        'The website uses jQuery with plugins (mmenu, Magnific Popup, Slick) and custom JavaScript to create an interactive, responsive interface that adapts to different screen sizes and devices.',
    },
    template,
  },
  {
    props: {
      id: 4,
      name: 'Main page for sport site',
      link: 'gara',
      description:
        'The website uses jQuery with multiple plugins including fancybox for image galleries and modal windows, hamburgers for mobile menu toggles, headhesive for sticky headers, maskedinput for form field formatting, mmenu for mobile navigation menus, and slick for image carousels - all working together to create a responsive design that adapts to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 5,
      name: 'A site to find people for casting',
      link: 'kasing',
      description:
        'The website uses jQuery with a comprehensive suite of plugins including fancybox for lightbox galleries, hamburgers for mobile menu buttons, headhesive for sticky headers, maskedinput for form validation, mmenu for mobile navigation, selectize for enhanced dropdown menus, slick for image carousels, and viewportchecker to trigger animations based on scroll position - all working together to create a responsive design that adapts seamlessly to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 6,
      name: 'Specialised carpet washing and cleaning factory',
      link: 'kovro',
      description:
        'The website uses jQuery with a versatile set of tools including fancybox for modal windows, Font Awesome for scalable icons, mmenu for mobile-friendly navigation, slick for image sliders, viewportchecker for scroll-based animations, plus hamburgers CSS for menu toggles and headhesive JavaScript for sticky headers - all working together to create a responsive design that adapts effectively to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 7,
      name: 'LEMIER - Solutions for people and business',
      link: 'lemi',
      description:
        'The website uses jQuery with an extensive plugin collection including animate for CSS animations, fancybox for image galleries, hamburgers for mobile menu buttons, headhesive for sticky headers, maskedinput for form validation, mmenu for mobile navigation, slick for content sliders, and waypoints for scroll-triggered events - all combining to create a responsive design that adapts smoothly to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 8,
      name: 'Site of ads for unique tools for garden and vegetable gardening',
      link: 'torn',
      description:
        'The website uses jQuery with HTML5 shiv for legacy browser support, Magnific Popup for lightboxes, mmenu for mobile navigation, Respond.js for media query support, Slick for carousels, Superfish for enhanced dropdown menus, Bootstrap grid for layout structure, and maskedinput for form field formatting - all working together to create a responsive design that adapts effectively across different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 9,
      name: 'Personal website for the poet',
      link: 'poet',
      description:
        'The website uses jQuery with fancybox for modal windows and image galleries, Font Awesome for scalable vector icons, Sly for advanced content scrolling, validate for form validation, and maskedinput for formatted input fields - all working together to create a responsive design that adapts to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 10,
      name: 'News with big menu',
      link: 'test',
      description:
        'The website uses jQuery as its foundation with validate.js for form validation and sly.js for advanced content scrolling and carousels - all implemented to create a responsive design that adapts to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 11,
      name: 'Landing page for helping with army',
      link: 'armi',
      description:
        'The website uses jQuery with fancybox for image galleries and modal windows, Font Awesome for scalable icons, headhesive for sticky headers, maskedinput for form field formatting, and slick for image carousels, though it lacks responsive design elements for adapting to different screen sizes.',
    },
    template,
  },
  {
    props: {
      id: 12,
      name: 'English language school',
      link: 'shkola',
      description:
        'The website uses jQuery with specialized plugins including Slick for image sliders, Parallax for scrolling effects, Countdown for timers, Masked Input for form field formatting, and Fancybox with mousewheel support for image galleries and modal windows, though it lacks responsive design for different screen sizes.',
    },
    template,
  },
  // Add other sections as needed
]
