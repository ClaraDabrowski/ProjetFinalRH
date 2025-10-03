function toggleOptions() {
    const opts = document.getElementById('options');
    opts.classList.toggle('show');
}

function goTo(page) {
    window.location.href = page;
}


document.addEventListener('DOMContentLoaded', function() {
   
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    document.body.insertBefore(menuToggle, document.body.firstChild);

    const aside = document.querySelector('aside');
    const body = document.body;

    menuToggle.addEventListener('click', function() {
        aside.classList.toggle('active');
        body.classList.toggle('menu-open');
        
       
        if (aside.classList.contains('active')) {
            menuToggle.innerHTML = '✕';
        } else {
            menuToggle.innerHTML = '☰';
        }
    });

    
    body.addEventListener('click', function(e) {
        if (body.classList.contains('menu-open') && 
            !aside.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            aside.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '☰';
        }
    });

    
    const menuLinks = aside.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                aside.classList.remove('active');
                body.classList.remove('menu-open');
                menuToggle.innerHTML = '☰';
            }
        });
    });

   
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            aside.classList.remove('active');
            body.classList.remove('menu-open');
            menuToggle.innerHTML = '☰';
        }
    });
});