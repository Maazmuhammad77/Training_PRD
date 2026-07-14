const Trainee = require("./trainee.model");
const Invite = require("../invite/invite.model");

// get all trainees
const getAllTrainees = async ()=>{
    return await Trainee.findAll({
        order : [['createdAt', 'DESC']],
    })
}

const updateTrainee = async (traineeid, updateData) => { 
    const trainee = await Trainee.findByPk(traineeid);

    if(!trainee){
        throw new Error("Trainee not found");
    }
    await trainee.update(updateData);
    return trainee;

}

const pendingTrainees = async () => {
    return await Invite.findAll({
        where : { status : "pending" },
        order : [['createdAt', 'DESC']],
    })
}

module.exports  = {
    getAllTrainees,
    updateTrainee,
    pendingTrainees
}