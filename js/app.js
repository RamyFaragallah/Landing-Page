
//Get all sections
const allSections = document.getElementsByTagName('section');





// Build nav bar dynamically when DOM is loaded to prevnt crashing the app
document.addEventListener('DOMContentLoaded', buildNavBar);

// Navigate smoothly to clicked section link
document.addEventListener('click', navigateToSection);

// Set sections as active
document.addEventListener('scroll', observViewedSection);
// Add click event wth a listener (addNavBar function)
document.addEventListener('click', showMenu);






// build the nav
function buildNavBar() {
    let sectionIndex = 0;
    // Define Document Fragment that will hold li elements before appending it to ul
    const docFragment = document.createDocumentFragment();
    // Get nav bar ul
    const navList = document.getElementById('navbar__list');
    while (sectionIndex < allSections.length) {
        //Start creating lis and anchor elements depending on section elements
        const navItem = document.createElement('li');
        const itemAnchor = document.createElement('a');
        itemAnchor.textContent = allSections[sectionIndex].getAttribute('data-nav');
        itemAnchor.href = '#' + allSections[sectionIndex].getAttribute('id');
        itemAnchor.classList.add('menu__link');
        navItem.appendChild(itemAnchor);
        docFragment.appendChild(navItem);
        sectionIndex++;
        //End creating lis and anchors
    }
    navList.appendChild(docFragment);
}

// Scroll to clicked link using scrollTO event
function navigateToSection(ev) {
    // Check if clicked element is the anchor of nav bar links via its class
    if (ev.target.classList.contains('menu__link')) {
        // Get clicked anchor's info (href) to get it's equivalent section
        const targetedSection = document.getElementById(ev.target.getAttribute('href').slice(1));
        ev.preventDefault();
        // Hide nav bar at small screens
        hideNav(ev);
        window.scrollTo({
            behavior: 'smooth',
            top: targetedSection.offsetTop
        });
    }
}

// observe viewed section to determined which oe to be marked
function observViewedSection() {
    // Start the observerCallback invoking when 60% of the  section is viewwd
    const observerOptions = {
        threshold: .6
    };
    // define IntersectionObserver API
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    for (let section of allSections) {
        observer.observe(section);
    }
}


// Add class 'your-active-class' to section when near top of viewport
function observerCallback(entries) {
    for (const entry of entries) {
        // Get Anchor that is equivalent to the viewed section
        const equivalentAnchor = document.querySelector(`a[href='#${entry.target.id}']`);
        const viewdSection = entry.target;
        // check if the specific section viewd 60% to decide if to mark it 
        if (entry.isIntersecting) {
            viewdSection.classList.add('your-active-class');
            equivalentAnchor.classList.add('active_link');
        } else {
            viewdSection.classList.remove('your-active-class');
            equivalentAnchor.classList.remove('active_link')
        }
    }

}

//show nav bar Menu if bar icon toggled on mobile screens
function showMenu(event) {
    // Get navbar menu 
    const navMenu = document.querySelector('.navbar__menu ul');
    // Check if the bar icon item is clicked 
    if (event.target.classList.contains('toggle-button')) {
        // Add class to 'navMenu' if not exist and remove it if exists
        navMenu.classList.toggle('clicked');

    }
}
// Hide nav bar on mobile screens after clicking on anchor
function hideNav(ev) {
    const navList = document.querySelector('#navbar__list.clicked');
    if (navList != null) {
        navList.classList.remove('clicked');
    }
}


