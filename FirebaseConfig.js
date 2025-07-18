 // Firebase config
        const firebaseConfig = {
            apiKey: "AIzaSyAHmdFyWJEJt4-scD3iWN86ZdEmp0MlW3k",
            authDomain: "scouting-25f50.firebaseapp.com",
            databaseURL: "https://scouting-25f50-default-rtdb.firebaseio.com",
            projectId: "scouting-25f50",
            storageBucket: "scouting-25f50.appspot.com",
            messagingSenderId: "979841487870",
            appId: "1:979841487870:web:a0837cbeaba08e1e43a6af",
            measurementId: "G-8KXC49MNS4"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.database();

                // Storage usando Firebase
        class Storage {
            static async getTeams() {
                const snapshot = await db.ref('teams').once('value');
                const teams = snapshot.val() ? Object.values(snapshot.val()) : [];
                const statsSnap = await db.ref('team_stats').once('value');
                const stats = statsSnap.val() ? Object.values(statsSnap.val()) : [];
                return teams.map(team => {
                    const teamStats = stats.find(s => s.teamNumber === team.number);
                    return { ...team, stats: teamStats };
                });
            }

            static async addTeam(team) {
                const newTeamRef = db.ref('teams').push();
                const newTeam = {
                    ...team,
                    id: newTeamRef.key,
                    createdAt: new Date().toISOString(),
                };
                await newTeamRef.set(newTeam);
                // Inicializa stats
                await db.ref('team_stats/' + team.number).set({
                    teamNumber: team.number,
                    totalMatches: 0,
                    wins: 0,
                    losses: 0,
                    ties: 0,
                    totalPoints: 0,
                    averagePoints: 0,
                });
                return newTeam;
            }

            static async getMatches() {
                const snapshot = await db.ref('matches').once('value');
                return snapshot.val() ? Object.values(snapshot.val()) : [];
            }

            static async addMatch(matchData) {
                const newMatchRef = db.ref('matches').push();
                const newMatch = {
                    ...matchData,
                    id: newMatchRef.key,
                    createdAt: new Date().toISOString(),
                };
                await newMatchRef.set(newMatch);
                await this.updateTeamStats(matchData.teamNumber, matchData.result, matchData.totalScore);
                return newMatch;
            }

            static async updateTeamStats(teamNumber, result, score) {
                const statsRef = db.ref('team_stats/' + teamNumber);
                const snap = await statsRef.once('value');
                let teamStats = snap.val();
                if (!teamStats) {
                    teamStats = {
                        teamNumber,
                        totalMatches: 0,
                        wins: 0,
                        losses: 0,
                        ties: 0,
                        totalPoints: 0,
                        averagePoints: 0,
                    };
                }
                teamStats.totalMatches += 1;
                teamStats.wins += (result === 'win' ? 1 : 0);
                teamStats.losses += (result === 'loss' ? 1 : 0);
                teamStats.ties += (result === 'tie' ? 1 : 0);
                teamStats.totalPoints += score;
                teamStats.averagePoints = teamStats.totalMatches > 0 ? teamStats.totalPoints / teamStats.totalMatches : 0;
                await statsRef.set(teamStats);
            }
        }

