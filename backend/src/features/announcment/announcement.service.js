const Announcement = require("./announcement.model.js");

const createAnnouncements= async ({ title, body, posted_by }) => {
    try {
        const announcement = await Announcement.create({ title, body, posted_by });
        return announcement;
    }
    catch (error) {
        throw new Error("Error creating announcement: " + error.message);
    }
}

const getAnnouncements = async () => {
    try {
        const announcements = await Announcement.findAll({ order: [['posted_at', 'DESC']] });   
        return announcements;
    }
    catch (error) {
        throw new Error("Error fetching announcements: " + error.message);
    }
}

module.exports = { createAnnouncements, getAnnouncements };