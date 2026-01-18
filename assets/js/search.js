// Enhanced search and filter functionality for LOLAI
(function() {
    'use strict';

    // State management
    const state = {
        searchTerm: '',
        activeCategory: 'All'
    };

    // DOM Elements
    const searchInput = document.getElementById('live-search');
    const agentsGrid = document.getElementById('agents-grid');
    const featuredGrid = document.querySelector('.featured-grid');
    const categoryList = document.getElementById('category-list');
    const noResults = document.getElementById('no-results');

    // Determine active grid (agents or featured)
    const activeGrid = agentsGrid || featuredGrid;

    // Exit if no search input or grid available
    if (!searchInput || !activeGrid) return;

    // Get cards based on active grid
    const cardSelector = agentsGrid ? '.agent-card' : '.featured-card';
    const agentCards = Array.from(activeGrid.querySelectorAll(cardSelector));

    // Debounce function to limit search frequency
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Search and filter function
    function performSearch() {
        const searchTerm = state.searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        agentCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const vendor = card.querySelector('.agent-vendor')?.textContent.toLowerCase() || '';
            const category = card.dataset.category?.toLowerCase() || '';
            const platforms = card.dataset.platforms?.toLowerCase() || '';

            // Handle both agent-capabilities and capabilities-preview
            const capabilitiesSelector = '.agent-capabilities li, .capabilities-preview .capability-tag';
            const capabilities = Array.from(card.querySelectorAll(capabilitiesSelector))
                .map(el => el.textContent.toLowerCase())
                .join(' ');

            const searchableText = `${title} ${vendor} ${category} ${platforms} ${capabilities}`;

            // Check search match
            const matchesSearch = searchTerm === '' || searchableText.includes(searchTerm);

            // Check category filter
            const matchesCategory = state.activeCategory === 'All' || card.dataset.category === state.activeCategory;

            // Show/hide card based on both conditions
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            activeGrid.style.display = 'none';
            if (noResults) {
                noResults.classList.remove('hidden');
            }
        } else {
            activeGrid.style.display = 'grid';
            if (noResults) {
                noResults.classList.add('hidden');
            }
        }
    }

    // Category filter functionality
    function setupCategoryFilters() {
        if (!categoryList) return;

        const filterButtons = categoryList.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;

                // Update state
                state.activeCategory = category;

                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Re-run search/filter
                performSearch();
            });
        });
    }

    // Add debounced search listener
    const debouncedSearch = debounce(() => {
        state.searchTerm = searchInput.value;
        performSearch();
    }, 300);

    searchInput.addEventListener('input', debouncedSearch);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Focus search with / key
        if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
        }

        // Focus search with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }

        // Clear search with Escape
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            state.searchTerm = '';
            performSearch();
        }
    });

    // Add visual feedback for search input
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('search-focused');
    });

    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('search-focused');
    });

    // Initialize filters
    setupCategoryFilters();

    // Analytics helper (optional)
    function trackSearch(query) {
        if (window.gtag) {
            gtag('event', 'search', {
                'search_term': query
            });
        }
    }

    // Add search tracking on Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            trackSearch(searchInput.value);
        }
    });

})();
