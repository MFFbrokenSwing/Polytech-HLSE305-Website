window.addEventListener('load', function(e) {
    let nav = document.getElementById('nav');
    let titles = this.document.querySelectorAll('h2');

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
        nav.appendChild(link);
    });
});

function setCurrentPart()
{
    let titles = document.querySelectorAll('h2');
    document.querySelectorAll('#nav a').forEach(e => { e.classList.remove('current'); });

    for(var i = titles.length - 1; i >= 0; i--)
    {
        if(titles[i].offsetTop <= window.scrollY)
        {
            let el = document.querySelector('#nav a[href="#' + titles[i].getAttribute('id') + '"]');
            if(el != null)
            {
                console.log('Found the el');
                el.classList.add('current');
            }
            break;
        }
    }
}

window.addEventListener('scroll', setCurrentPart);