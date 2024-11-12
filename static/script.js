window.addEventListener('load', () => {
    // Force scroll to the top on page load
    window.scrollTo(0, 0);

    document.querySelector('header').classList.add('logo-loaded');

    const sections = document.querySelectorAll('section');
    const headerLogo = document.querySelector('header .logo');
    const footerLogo = document.querySelector('footer .footer-logo');
    const socialMediaImages = document.querySelectorAll('.social-icons img'); // Select social media images
    const contentBoxes = document.querySelectorAll('.content-box');
    const initialLoadSections = ['about']; // Sections to load initially

    // Apply fade-in to sections that should load on initial page load
    initialLoadSections.forEach(id => {
        document.getElementById(id).classList.add('fade-in');
    });

    const revealSection = () => {
        const triggerBottom = window.innerHeight * 0.9;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                section.classList.add('fade-in');
            }
        });
    };

    window.addEventListener('scroll', revealSection);
    revealSection(); // Call once to reveal sections on page load

    // Add shimmy effect on hover to content boxes, logos, and social media images
    const addShimmyEffect = (elements) => {
        elements.forEach(element => {
            element.addEventListener('mouseover', () => {
                element.classList.add('shimmy');
            });
            element.addEventListener('animationend', () => {
                element.classList.remove('shimmy');
            });
        });
    };

    addShimmyEffect([...contentBoxes, headerLogo, footerLogo, ...socialMediaImages]);
});
