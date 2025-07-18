  // Scoring System
        const SCORING = {
            AUTONOMOUS: {
                BASE: 3,
                CORAL_L1: 3,
                CORAL_L2: 4,
                CORAL_L3: 6,
                CORAL_L4: 7,
                PROCESSADOR: 6,
                NET: 4,
            },
            TELEOP: {
                CORAL_L1: 2,
                CORAL_L2: 3,
                CORAL_L3: 4,
                CORAL_L4: 5,
                PROCESSADOR: 6,
                NET: 4,
            },
        };

        function calculateScore(matchData) {
            const autoScore = SCORING.AUTONOMOUS.BASE +
                (matchData.autoCoralL1 || 0) * SCORING.AUTONOMOUS.CORAL_L1 +
                (matchData.autoCoralL2 || 0) * SCORING.AUTONOMOUS.CORAL_L2 +
                (matchData.autoCoralL3 || 0) * SCORING.AUTONOMOUS.CORAL_L3 +
                (matchData.autoCoralL4 || 0) * SCORING.AUTONOMOUS.CORAL_L4 +
                (matchData.autoProcessador || 0) * SCORING.AUTONOMOUS.PROCESSADOR +
                (matchData.autoNet || 0) * SCORING.AUTONOMOUS.NET;

            const teleopScore =
                (matchData.teleCoralL1 || 0) * SCORING.TELEOP.CORAL_L1 +
                (matchData.teleCoralL2 || 0) * SCORING.TELEOP.CORAL_L2 +
                (matchData.teleCoralL3 || 0) * SCORING.TELEOP.CORAL_L3 +
                (matchData.teleCoralL4 || 0) * SCORING.TELEOP.CORAL_L4 +
                (matchData.teleProcessador || 0) * SCORING.TELEOP.PROCESSADOR +
                (matchData.teleNet || 0) * SCORING.TELEOP.NET;

            const endgameScore = parseInt(matchData.endgameStatus) || 0;

            return autoScore + teleopScore + endgameScore;
        }