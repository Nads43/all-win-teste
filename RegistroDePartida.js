 // Match Registration
        document.getElementById('match-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const matchData = {
                teamNumber: parseInt(document.getElementById('match-team').value),
                matchNumber: parseInt(document.getElementById('match-number').value),
                autoCoralL1: parseInt(document.getElementById('auto-coral-l1').value) || 0,
                autoCoralL2: parseInt(document.getElementById('auto-coral-l2').value) || 0,
                autoCoralL3: parseInt(document.getElementById('auto-coral-l3').value) || 0,
                autoCoralL4: parseInt(document.getElementById('auto-coral-l4').value) || 0,
                autoProcessador: parseInt(document.getElementById('auto-processador').value) || 0,
                autoNet: parseInt(document.getElementById('auto-net').value) || 0,
                teleCoralL1: parseInt(document.getElementById('tele-coral-l1').value) || 0,
                teleCoralL2: parseInt(document.getElementById('tele-coral-l2').value) || 0,
                teleCoralL3: parseInt(document.getElementById('tele-coral-l3').value) || 0,
                teleCoralL4: parseInt(document.getElementById('tele-coral-l4').value) || 0,
                teleProcessador: parseInt(document.getElementById('tele-processador').value) || 0,
                teleNet: parseInt(document.getElementById('tele-net').value) || 0,
                endgameStatus: parseInt(document.getElementById('endgame-status').value) || 0,
                pilotRating: parseInt(document.getElementById('pilot-rating').value) || 0,
                result: document.getElementById('match-result').value,
                observations: document.getElementById('match-observations').value
            };

            matchData.totalScore = calculateScore(matchData);

            await Storage.addMatch(matchData);
            showNotification('Partida registrada com sucesso!');
            
            // Reset form
            this.reset();
            
            // Return to home
            setTimeout(() => showPage('home'), 1500);
        });