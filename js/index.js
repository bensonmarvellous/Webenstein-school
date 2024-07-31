document.getElementById('toggle-reviews').addEventListener('click', function() {
    const hiddenReviews = document.querySelectorAll('.review-box.hidden');
    const visibleReviews = document.querySelectorAll('.review-box:not(.hidden)');
    const arrow = document.getElementById('arrow');
    const button = document.getElementById('toggle-reviews');

    if (hiddenReviews.length > 0) {
        // Show more reviews
        hiddenReviews.forEach(review => {
            review.classList.remove('hidden');
            review.style.opacity = 1;
            review.style.transform = 'translateY(0)';
            review.style.pointerEvents = 'auto';
        });
        button.innerHTML = 'Show Less <span id="arrow">▲</span>';
    } else {
        // Show less reviews
        visibleReviews.forEach((review, index) => {
            if (index >= 2) { // Keep the first two reviews visible
                review.classList.add('hidden');
                review.style.opacity = 0;
                review.style.transform = 'translateY(20px)';
                review.style.pointerEvents = 'none';
            }
        });
        button.innerHTML = 'Show More <span id="arrow">▼</span>';
    }
});
