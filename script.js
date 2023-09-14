document.addEventListener("DOMContentLoaded", function() {
    const profile = document.querySelector('.profile');
    const links = document.querySelectorAll('.link');
    const description = document.querySelector('.description');
    const courses = document.querySelector('.courses');

    // Inicialmente, escondemos os elementos
    profile.style.opacity = '0';
    profile.style.transform = 'translateY(-20px)';
    links.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
    });
    description.style.opacity = '0';
    description.style.transform = 'translateY(20px)';
    courses.style.opacity = '0';
    courses.style.transform = 'translateY(20px)';

    // Após um curto delay, animamos os elementos para aparecerem
    setTimeout(() => {
        profile.style.transition = 'all 0.5s ease-out';
        profile.style.opacity = '1';
        profile.style.transform = 'translateY(0)';

        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease-out';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 * (index + 1)); // Aumentamos o delay para cada link, criando um efeito em cascata
        });

        setTimeout(() => {
            description.style.transition = 'all 0.5s ease-out';
            description.style.opacity = '1';
            description.style.transform = 'translateY(0)';
        }, 500);

        setTimeout(() => {
            courses.style.transition = 'all 0.5s ease-out';
            courses.style.opacity = '1';
            courses.style.transform = 'translateY(0)';
        }, 700);
    }, 100);
});
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
document.getElementById('currentYear').textContent = new Date().getFullYear();
