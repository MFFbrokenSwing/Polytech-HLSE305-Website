/**
 * Populates the main menu with the links to the main sections.
 */
window.addEventListener('load', function(e) {
    let nav = document.getElementById('nav');
    let titles = this.document.querySelectorAll('h2');

    // For each h2 we create a link in the nav
    titles.forEach(title => {
        let link = document.createElement('a');
        link.classList.add('icon-angle-circled-right');
        if(title.hasAttribute('id'))
        {
            link.setAttribute('href', '#' + title.getAttribute('id'));
        }
        else
        {
            title.setAttribute('href', '#');
        }
        link.innerHTML = '<div>' + title.innerText + '</div>';
        link.addEventListener('click', (ev) => {
            ev.preventDefault();
            title.scrollIntoView({
                behavior: 'smooth'
            });
        });
        nav.appendChild(link);
    });
});

/**
 * This function checks the window's scrollY to determine which section is focused.
 * It also populates the submenu with the subsections of the focused main section.
 */
function setCurrentPart()
{
    // Main section
    let titles = document.querySelectorAll('h2');
    document.querySelectorAll('#nav a').forEach(e => { e.classList.remove('current'); });
    var currentTitle = null;
    for(var i = titles.length - 1; i >= 0; i--)
    {
        if(titles[i].offsetTop <= window.scrollY + 5)
        {
            let el = document.querySelector('#nav a[href="#' + titles[i].getAttribute('id') + '"]');
            if(el != null)
            {
                el.classList.add('current');
            }
            currentTitle = titles[i];
            break;
        }
    }

    // Subsection
    let submenu = document.getElementById('submenu');
    submenu.innerHTML = "";
    if(currentTitle != null)
    {
        let subsections = document.querySelectorAll('h3[id^="' + currentTitle.getAttribute('id') + '-"]');
        // Populate submenu with links
        subsections.forEach(section => {
            let link = document.createElement('a');
            link.setAttribute('href', '#' + section.getAttribute('id'));
            link.innerHTML = section.innerText;
            link.addEventListener('click', (ev) => {
                ev.preventDefault();
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            });
            submenu.appendChild(link);
        });

        // Search for current section
        for(var i = subsections.length - 1; i >= 0; i--)
        {
            if(subsections[i].offsetTop <= window.scrollY + 5)
            {
                let el = document.querySelector('a[href="#' + subsections[i].getAttribute('id') + '"]');
                if(el != null)
                {
                    el.classList.add('current');
                }
                break;
            }
        }
    }
}

window.addEventListener('scroll', setCurrentPart);