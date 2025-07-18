   // Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
            
            // Show selected page
            document.getElementById(pageId + '-page').classList.remove('hidden');
            
            // Update page-specific data
            if (pageId === 'register-match') {
                updateTeamSelects();
            } else if (pageId === 'ranking') {
                updateRanking();
            } else if (pageId === 'statistics') {
                updateStatisticsSelects();
            } else if (pageId === 'register-team') {
                updateTeamList();
            }
        }