const {Annoucement } = require("../models/announcement.model.js"  )
const { createAnnouncements,getAnnouncements } = require("../services/announcement.service.js");
const asyncHandler = require("../utils/asyncHandler.js");
const {Manager} = require("../models/index.js")
const HTTP_STATUSES = require("../utils/httpStatuses.js");


const createAnnouncement = asyncHandler(async (req, res) => { 
    const { title , body } = req.body;
    const manager = await Manager.findAll()
    const posted_by = manager.id ;
    const announcement = await createAnnouncements({ title, body, posted_by });
    res.status(HTTP_STATUSES.CREATED).json(announcement);
   
});

const getAnnouncement = asyncHandler( async (req, res) => {

    const announcements = await getAnnouncements();
    res.status(HTTP_STATUSES.OK).json(announcements);
  
})

module.exports = { createAnnouncement, getAnnouncement };