document.addEventListener('DOMContentLoaded', function() {
    const skillsData = {
        labels: ['Python', 'SQL', 'Excel', 'Power BI', 'Git', 'GitHub'],
        proficiency: [90, 85, 80, 75, 70, 70],
        categories: ['Languages', 'Databases', 'Tools', 'Tools', 'Tools', 'Tools']
    };

    const ctx = document.getElementById('skillsChart').getContext('2d');
    const skillsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: skillsData.labels,
            datasets: [{
                label: 'Skill Proficiency (Illustrative)',
                data: skillsData.proficiency,
                backgroundColor: 'rgba(56, 178, 172, 0.6)',
                borderColor: 'rgba(56, 178, 172, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Proficiency: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                   ticks: {
                        autoSkip: false
                    }
                }
            }
        }
    });

    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-teal-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.add('bg-teal-500', 'text-white');
            button.classList.remove('bg-gray-200', 'text-gray-700');

            const category = button.dataset.category;
            let filteredLabels = [];
            let filteredData = [];

            if (category === 'all') {
                filteredLabels = skillsData.labels;
                filteredData = skillsData.proficiency;
            } else {
                skillsData.categories.forEach((cat, index) => {
                    if (cat === category) {
                        filteredLabels.push(skillsData.labels[index]);
                        filteredData.push(skillsData.proficiency[index]);
                    }
                });
            }

            skillsChart.data.labels = filteredLabels;
            skillsChart.data.datasets[0].data = filteredData;
            skillsChart.update();
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header .nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.addEventListener('change', (event) => {
         const targetId = event.target.value;
         const targetElement = document.querySelector(targetId);
         if (targetElement) {
             targetElement.scrollIntoView({ behavior: 'smooth' });
         }
    });

});
