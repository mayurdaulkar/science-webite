// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const chapterCards = document.querySelectorAll('.chapter-card');

    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        chapterCards.forEach(card => {
            const chapterTitle = card.querySelector('h4').textContent.toLowerCase();
            const chapterDesc = card.querySelector('p').textContent.toLowerCase();
            const chapterNum = card.querySelector('h3').textContent.toLowerCase();
            
            if (searchTerm === '' || 
                chapterTitle.includes(searchTerm) || 
                chapterDesc.includes(searchTerm) || 
                chapterNum.includes(searchTerm)) {
                card.classList.remove('hidden');
                if (searchTerm !== '') {
                    card.classList.add('highlight');
                    setTimeout(() => card.classList.remove('highlight'), 500);
                }
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Search on input
    searchInput.addEventListener('input', performSearch);
    
    // Search on button click
    searchBtn.addEventListener('click', performSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for chapter links
    document.querySelectorAll('.chapter-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.style.pointerEvents = 'none';
            
            // Simulate loading (remove this in production)
            setTimeout(() => {
                this.textContent = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    });

    // Add hover effects for chapter cards
    chapterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch();
            searchInput.blur();
        }
    });

    // Add focus styles for accessibility
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(79, 172, 254, 0.3)';
    });

    searchInput.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    });

    // Add smooth reveal animation for chapter cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initially hide cards and observe them
    chapterCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add back to top functionality
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4facfe, #00f2fe);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Back to top functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effect for back to top button
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Generic Chapter PDF Toggle Function
function toggleChapter(chapterNumber) {
    const pdfSection = document.getElementById(`chapter${chapterNumber}-pdf-section`);
    const chapterCard = document.querySelector(`[data-chapter="chapter${chapterNumber}"]`);
    const isHidden = pdfSection.classList.contains('hidden');
    
    if (isHidden) {
        // Show the PDF section
        pdfSection.classList.remove('hidden');
        
        // Scroll to the PDF section smoothly
        setTimeout(() => {
            pdfSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    } else {
        // Hide the PDF section
        pdfSection.classList.add('hidden');
        
        // Scroll back to the chapter card
        chapterCard.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
} 