/**
 * Populates the main menu with the links to the main sections.
 */
window.addEventListener('load', function(e) {
    let nav = document.getElementById('submenu');
    let titles = this.document.querySelectorAll('h2');

    // For each h2 we create a link in the nav
    titles.forEach(title => {
        let link = document.createElement('a');
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

    // Listens clicks on category titles in the nav
    categories = document.querySelectorAll('.category');
    categories.forEach(cat => {
        let link = cat.children[0];
        link.addEventListener('click', ev => {
            ev.preventDefault();
            if(cat.hasAttribute('data-opened') && cat.getAttribute('data-opened') === "true")
            {
                cat.setAttribute('data-opened', false);
            }
            else
            {
                cat.setAttribute('data-opened', true);
            }
        });
    });
});

/**
 * This function checks the window's scrollY to determine which section is focused.
 */
function setCurrentPart()
{
    let titles = document.querySelectorAll('h2');

    // Removes class 'current' from all links in the submenu
    document.querySelectorAll('#submenu a').forEach(el => {
        el.classList.remove('current');
    });

    // Search for current section
    for(var i = titles.length - 1; i >= 0; i--)
    {
        if(titles[i].offsetTop <= window.scrollY + 5)
        {
            // Selects the link in the submenu referencing the given title
            let link = document.querySelector('#submenu a[href="#' + titles[i].getAttribute('id') + '"]');
            if(link == null) continue;

            link.classList.add('current');
            break;
        }
    }
}

window.addEventListener('scroll', setCurrentPart);