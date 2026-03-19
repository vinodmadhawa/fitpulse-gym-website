/**
 * Navigation utility to handle scrolling to sections
 * Works from anywhere in the app (detail pages, header, etc.)
 */

export const scrollToSection = (sectionId) => {
  // First, check if we're on the home page
  const element = document.querySelector(`#${sectionId}`);
  
  if (element) {
    // Element exists on current page, scroll to it
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    // Element doesn't exist, we're likely on a detail page
    // The home page will be loaded and we can scroll then
    window.location.hash = `#${sectionId}`;
  }
};

export const navigateToSection = (navigate, sectionId) => {
  // Navigate to home page with hash
  navigate(`/#${sectionId}`);
};

export const handleNavigation = (navigate, href) => {
  const sectionId = href.replace('#', '');
  navigate(`/#${sectionId}`);
};
