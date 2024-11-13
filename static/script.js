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
window.addEventListener('load', () => {
    let isDescriptionPinned = false;
    let currentPinnedStrain = null;

    document.querySelectorAll('.strain').forEach(strain => {
        strain.addEventListener('mouseover', () => {
            if (!isDescriptionPinned) {
                showStrainInfo(strain);
            }
        });

        strain.addEventListener('mouseout', () => {
            if (!isDescriptionPinned) {
                hideStrainInfo();
            }
        });

        strain.addEventListener('click', () => {
            // If another strain is already pinned, unpin it first
            if (isDescriptionPinned && currentPinnedStrain !== strain) {
                isDescriptionPinned = false;
            }
            
            // Toggle the pinning state
            isDescriptionPinned = !isDescriptionPinned;
            currentPinnedStrain = isDescriptionPinned ? strain : null;

            if (isDescriptionPinned) {
                showStrainInfo(strain);
            } else {
                hideStrainInfo();
            }
        });
    });

    function showStrainInfo(strain) {
        const strainInfo = document.getElementById('strain-info');
        strainInfo.style.display = 'block';

        // Update strain info content
        document.getElementById('strain-name').textContent = strain.textContent;
        document.getElementById('strain-thc').textContent = `THC: ${strain.getAttribute('data-thc')}`;
        document.getElementById('strain-type').textContent = `Type: ${strain.getAttribute('data-strain-type')}`;
        document.getElementById('strain-description').textContent = strain.getAttribute('data-description');
        document.getElementById('strain-image').src = strain.getAttribute('data-image-src');
    }

    function hideStrainInfo() {
        document.getElementById('strain-info').style.display = 'none';
    }
});


