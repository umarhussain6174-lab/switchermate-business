/**
 * SwitcherMate Business - Main JavaScript
 * Navigation System - Jeremy Hickman Style
 */

(function() {
  'use strict';

  // DOM Elements
  const menuToggle = document.querySelector('.menu-toggle');
  const offcanvas = document.querySelector('.offcanvas');
  const overlay = document.querySelector('.offcanvas-overlay');
  const closeBtn = document.querySelector('.offcanvas-close');
  const accordionToggle = document.querySelector('.accordion-toggle');
  const accordionContent = document.querySelector('.accordion-content');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item[data-action]');
  const faqItems = document.querySelectorAll('.faq-item');
  const categoryButtons = document.querySelectorAll('.category-filter button');
  const blogCards = document.querySelectorAll('.blog-card');

  /**
   * Initialize Navigation
   */
  function initNavigation() {
    if (!menuToggle || !offcanvas || !overlay) return;

    // Open menu
    menuToggle.addEventListener('click', openMenu);

    // Close menu
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && offcanvas.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /**
   * Open Off-Canvas Menu
   */
  function openMenu() {
    offcanvas.classList.add('active');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  /**
   * Close Off-Canvas Menu
   */
  function closeMenu() {
    offcanvas.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  /**
   * Initialize Accordion
   */
  function initAccordion() {
    if (!accordionToggle || !accordionContent) return;

    accordionToggle.addEventListener('click', function() {
      const isExpanded = this.classList.contains('expanded');
      
      if (isExpanded) {
        this.classList.remove('expanded');
        this.setAttribute('aria-expanded', 'false');
        accordionContent.classList.remove('expanded');
      } else {
        this.classList.add('expanded');
        this.setAttribute('aria-expanded', 'true');
        accordionContent.classList.add('expanded');
      }
    });
  }

  /**
   * Initialize Mobile Navigation
   */
  function initMobileNav() {
    mobileNavItems.forEach(function(item) {
      item.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        
        if (action === 'open-menu') {
          openMenu();
        }
      });
    });
  }

  /**
   * Initialize FAQ Accordion
   */
  function initFaq() {
    faqItems.forEach(function(item) {
      const question = item.querySelector('.faq-question');
      
      if (question) {
        question.addEventListener('click', function() {
          const isActive = item.classList.contains('active');
          
          // Close all other items
          faqItems.forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle current item
          item.classList.toggle('active');
        });
      }
    });
  }

  /**
   * Initialize Category Filter
   */
  function initCategoryFilter() {
    if (categoryButtons.length === 0 || blogCards.length === 0) return;

    categoryButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        this.classList.add('active');
        
        // Filter cards
        blogCards.forEach(function(card) {
          const cardCategory = card.getAttribute('data-category');
          
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /**
   * Initialize Smooth Scroll
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          e.preventDefault();
          
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * Header Scroll Effect
   */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    
    if (!header) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  /**
   * Initialize All Components
   */
  function init() {
    initNavigation();
    initAccordion();
    initMobileNav();
    initFaq();
    initCategoryFilter();
    initSmoothScroll();
    initHeaderScroll();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
