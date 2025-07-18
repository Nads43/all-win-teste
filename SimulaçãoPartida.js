        // Match Simulation
        async function simulateMatch() {
            const blueTeams = [
                document.getElementById('blue-team-1').value,
                document.getElementById('blue-team-2').value,
                document.getElementById('blue-team-3').value
            ].filter(Boolean).map(Number);
            
            const redTeams = [
                document.getElementById('red-team-1').value,
                document.getElementById('red-team-2').value,
                document.getElementById('red-team-3').value
            ].filter(Boolean).map(Number);

            if (blueTeams.length < 3 || redTeams.length < 3) {
                showNotification('Selecione 3 equipes para cada aliança', 'error');
                return;
            }

            const teams = await Storage.getTeams();
            const blueTeamData = blueTeams.map(num => teams.find(t => t.number === num)).filter(Boolean);
            const redTeamData = redTeams.map(num => teams.find(t => t.number === num)).filter(Boolean);

            // Calculate alliance averages
            const blueAvg = blueTeamData.reduce((sum, team) => sum + (team.stats?.averagePoints || 0), 0) / blueTeamData.length;
            const redAvg = redTeamData.reduce((sum, team) => sum + (team.stats?.averagePoints || 0), 0) / redTeamData.length;

            // Calculate experience factor
            const blueExp = blueTeamData.reduce((sum, team) => sum + (team.stats?.totalMatches || 0), 0) / blueTeamData.length;
            const redExp = redTeamData.reduce((sum, team) => sum + (team.stats?.totalMatches || 0), 0) / redTeamData.length;

            // Calculate win rate
            const blueWinRate = blueTeamData.reduce((sum, team) => {
                const stats = team.stats;
                return sum + (stats?.totalMatches ? (stats.wins / stats.totalMatches) : 0);
            }, 0) / blueTeamData.length;

            const redWinRate = redTeamData.reduce((sum, team) => {
                const stats = team.stats;
                return sum + (stats?.totalMatches ? (stats.wins / stats.totalMatches) : 0);
            }, 0) / redTeamData.length;

            // Weighted scoring
            const blueScore = (blueAvg * 0.5) + (blueExp * 0.2) + (blueWinRate * 100 * 0.3);
            const redScore = (redAvg * 0.5) + (redExp * 0.2) + (redWinRate * 100 * 0.3);

            const total = blueScore + redScore;
            const blueChance = total > 0 ? (blueScore / total * 100) : 50;
            const redChance = total > 0 ? (redScore / total * 100) : 50;

            const resultsDiv = document.getElementById('prediction-results');
            resultsDiv.classList.remove('hidden');
            resultsDiv.innerHTML = `
                <div class="frc-card">
                    <h4 class="text-lg font-semibold text-white mb-4">Probabilidade de Vitória</h4>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-blue-400 font-semibold">Aliança Azul</span>
                            <span class="text-white font-bold text-xl">${blueChance.toFixed(1)}%</span>
                        </div>
                        <div class="w-full bg-gray-700 rounded-full h-6">
                            <div class="bg-blue-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2" 
                                 style="width: ${blueChance}%">
                                <span class="text-white text-sm font-medium">${blueChance.toFixed(1)}%</span>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <span class="text-red-400 font-semibold">Aliança Vermelha</span>
                            <span class="text-white font-bold text-xl">${redChance.toFixed(1)}%</span>
                        </div>
                        <div class="w-full bg-gray-700 rounded-full h-6">
                            <div class="bg-red-500 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-2" 
                                 style="width: ${redChance}%">
                                <span class="text-white text-sm font-medium">${redChance.toFixed(1)}%</span>
                            </div>
                        </div>

                        <div class="text-center mt-6 p-4 bg-gray-800 rounded-lg">
                            <span class="text-gray-300">Vencedor Previsto: </span>
                            <span class="font-bold text-lg ${blueChance > redChance ? 'text-blue-400' : 'text-red-400'}">
                                Aliança ${blueChance > redChance ? 'Azul' : 'Vermelha'}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="frc-card">
                    <h4 class="text-lg font-semibold text-white mb-4">Pontuação Prevista</h4>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center p-4 bg-blue-900 rounded-lg">
                            <div class="text-blue-400 font-semibold mb-2">Aliança Azul</div>
                            <div class="text-3xl font-bold text-white">${Math.round(blueAvg * 3)}</div>
                            <div class="text-gray-300 text-sm">pontos</div>
                        </div>
                        <div class="text-center p-4 bg-red-900 rounded-lg">
                            <div class="text-red-400 font-semibold mb-2">Aliança Vermelha</div>
                            <div class="text-3xl font-bold text-white">${Math.round(redAvg * 3)}</div>
                            <div class="text-gray-300 text-sm">pontos</div>
                        </div>
                    </div>
                </div>
            `;
        }