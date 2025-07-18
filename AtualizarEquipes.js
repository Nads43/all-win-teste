 // Update team selects
        async function updateTeamSelects() {
            const teams = await Storage.getTeams();
            const teamSelect = document.getElementById('match-team');
            
            teamSelect.innerHTML = '<option value="">Selecione uma equipe</option>';
            teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team.number;
                option.textContent = `${team.number} - ${team.name}`;
                teamSelect.appendChild(option);
            });
        }
