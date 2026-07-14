const {Annoucement } = require("./announcement.model.js"  )
const { createAnnouncements,getAnnouncements } = require("./announcement.service.js");
const {Manager} = require("../../models/index.js")
const createAnnouncement = async (req, res) => { 
  try {
    const { title , body } = req.body;
    const manager = await Manager.findAll()
    const posted_by = manager.id ;
    const announcement = await createAnnouncements({ title, body, posted_by });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const announcements = await getAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createAnnouncement, getAnnouncement };