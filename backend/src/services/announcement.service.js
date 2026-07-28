const Announcement = require("../models/announcement.model.js");
const ApiError = require("../utils/ApiError.js");

const createAnnouncements= async ({ title, body, posted_by }) => {
    try {
        const announcement = await Announcement.create({ title, body, posted_by });
        return announcement;
    }
    catch (error) {
        throw new ApiError(500, "Error creating announcement: " + error.message);
    }
}

const getAnnouncements = async () => {
    try {
        const announcements = await Announcement.findAll({ order: [['posted_at', 'DESC']] });   
        return announcements;
    }
    catch (error) {
        throw new ApiError(500, "Error fetching announcements: " + error.message);
    }
}

module.exports = { createAnnouncements, getAnnouncements };