const { createTeam, addMember, removeMember, getTimeline } = require("./team.service.js");

const createTeams = async (req, res) => {
    const { name } = req.body;
    try {
        const team = await createTeam(name);
        res.status(201).json(team);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addMembers = async (req, res) => { 
    const { teamId, traineeId } = req.body;
    try {
         const member = await addMember(teamId, traineeId);
        res.status(201).json(member);
    }
    catch (error) {{
        res.status(500).json({ error: error.message });
    }
} }

const removeMembers = async (req, res) => { 
    const { reason } = req.body;
    const { teamId, traineeId } = req.params;
    try {
        const member = await removeMember(teamId, traineeId, reason);
        res.status(200).json(member);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTimelines = async (req, res) => { 
    const { teamId } = req.params;
    try {
        const timeline = await getTimeline(teamId);
        res.status(200).json(timeline);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createTeams, addMembers, removeMembers, getTimelines };