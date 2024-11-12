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
document.addEventListener('DOMContentLoaded', () => {
    const strains = document.querySelectorAll('.strain');
    const strainInfo = document.getElementById('strain-info');
    const strainName = document.getElementById('strain-name');
    const strainTHC = document.getElementById('strain-thc');
    const strainType = document.getElementById('strain-type');
    const strainDescription = document.getElementById('strain-description');

    strains.forEach(strain => {
        strain.addEventListener('mouseover', () => showStrainInfo(strain));
        strain.addEventListener('click', () => showStrainInfo(strain));
    });

    const showStrainInfo = (strain) => {
        strainInfo.style.display = 'block';
        strainName.innerText = strain.innerText;
        strainTHC.innerText = strain.getAttribute('data-thc');
        strainType.innerText = strain.getAttribute('data-strain-type');
        strainDescription.innerText = strain.getAttribute('data-description');
    };
});

