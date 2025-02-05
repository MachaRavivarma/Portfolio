document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Function to filter projects
    function filterProjects(category) {
        console.log('Filtering by category:', category); // Debug log
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            console.log('Card category:', cardCategory); // Debug log
            
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                if (cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    // Show all projects initially
    filterProjects('all');

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the category from the clicked button
            const category = button.getAttribute('data-filter');
            console.log('Button clicked:', category); // Debug log
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });

    // Image hover effect
    const projectImages = document.querySelectorAll('.project-image');
    projectImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            const img = image.querySelector('img');
            img.style.transform = 'translateY(calc(-100% + 250px))';
        });
        
        image.addEventListener('mouseleave', () => {
            const img = image.querySelector('img');
            img.style.transform = 'translateY(0)';
        });
    });

    // Contact Form Changelog
    const changelogForm = document.createElement('div');
    changelogForm.className = 'changelog-form';
    changelogForm.innerHTML = `
        <div class="changelog-header">
            <h3>Recent Updates</h3>
            <span class="close-changelog">&times;</span>
        </div>
        <div class="changelog-content">
            <div class="changelog-item">
                <span class="date">2024-03-20</span>
                <p>Added new project: Nagarjuna Hospitals (Coming Soon)</p>
            </div>
            <div class="changelog-item">
                <span class="date">2024-03-15</span>
                <p>Updated portfolio with latest projects</p>
            </div>
            <div class="changelog-item">
                <span class="date">2024-03-10</span>
                <p>Added filtering functionality to projects section</p>
            </div>
        </div>
    `;

    document.body.appendChild(changelogForm);

    // Show changelog after 3 seconds
    setTimeout(() => {
        changelogForm.classList.add('show');
    }, 3000);

    // Close changelog when clicking the close button
    const closeChangelog = document.querySelector('.close-changelog');
    if (closeChangelog) {
        closeChangelog.addEventListener('click', () => {
            changelogForm.classList.remove('show');
        });
    }

    // Close changelog when clicking outside
    document.addEventListener('click', (e) => {
        if (!changelogForm.contains(e.target) && changelogForm.classList.contains('show')) {
            changelogForm.classList.remove('show');
        }
    });
}); 