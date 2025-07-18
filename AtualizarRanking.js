   // Update ranking
        async function updateRanking() {
            const teams = await Storage.getTeams();
            const sortedTeams = teams.sort((a, b) => {
                const aStats = a.stats || { averagePoints: 0, wins: 0 };
                const bStats = b.stats || { averagePoints: 0, wins: 0 };
                
                if (bStats.averagePoints !== aStats.averagePoints) {
                    return bStats.averagePoints - aStats.averagePoints;
                }
                
                return bStats.wins - aStats.wins;
            });

            const rankingList = document.getElementById('ranking-list');
            
            if (sortedTeams.length === 0) {
                rankingList.innerHTML = `
                    <div class="text-center py-8 text-gray-400">
                        <svg class="h-12 w-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                        <p>Nenhuma equipe encontrada</p>
                        <p class="text-sm">Registre equipes e partidas para ver o ranking</p>
                    </div>
                `;
                return;
            }

            rankingList.innerHTML = sortedTeams.map((team, index) => {
                const stats = team.stats || {
                    totalMatches: 0,
                    wins: 0,
                    losses: 0,
                    ties: 0,
                    averagePoints: 0,
                };
                
                const winRate = stats.totalMatches > 0 
                    ? ((stats.wins / stats.totalMatches) * 100).toFixed(1) 
                    : '0.0';

                return `
                    <div class="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold">
                                ${index + 1}
                            </div>
                            <div class="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                            </div>
                            <div>
                                <h4 class="font-semibold text-white">#${team.number} - ${team.name}</h4>
                                <p class="text-gray-400 text-sm">${stats.totalMatches} partidas</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-semibold text-white">${stats.averagePoints.toFixed(1)} pts</div>
                            <div class="text-sm text-gray-400">
                                ${stats.wins}V - ${stats.losses}D - ${stats.ties}E
                            </div>
                            <div class="text-xs text-gray-500">${winRate}% vitórias</div>
                        </div>
                    </div>
                `;
            }).join('');
        }