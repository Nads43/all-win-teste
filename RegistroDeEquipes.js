 // Team Registration
        document.getElementById('team-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const teamData = {
                number: parseInt(document.getElementById('team-number').value),
                name: document.getElementById('team-name').value,
                photoURL: null
            };

            // Check if team number already exists
            const existingTeams = await Storage.getTeams();
            if (existingTeams.some(team => team.number === teamData.number)) {
                showNotification('Número de equipe já existe!', 'error');
                return;
            }

            await Storage.addTeam(teamData);
            showNotification('Equipe cadastrada com sucesso!');
            
            // Reset form
            this.reset();
            
            // Return to home
            setTimeout(() => showPage('home'), 1500);
        });