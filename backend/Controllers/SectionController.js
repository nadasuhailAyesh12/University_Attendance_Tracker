const lectureRepository = require("../models/queries/LectureQuery");
const sectionRepository = require("../models/queries/SectionQuery");

const addSectionandLecture = async (req, res, next) => {
    try {
        const course_id = req.params.id;
        const { sec_id, semester, year, room_number, building, start_time, end_time, day, ID } = req.body;
        await sectionRepository.insertSection(sec_id, course_id, semester, year, ID);
        await lectureRepository.addLecture(sec_id, course_id, semester, year, room_number, building, start_time, end_time, day);
        res.status(200).json({
            success: true,
            messsage: "add section sucessfuly"
        })
    }
    catch (error) {
        return next(error)
    }
}

const getSectionsRecordsRelatedtoCourse = async (req, res, next) => {
    try {
        const { id } = req.params
        const sections = await sectionRepository.getSectionsRelatedtoCourse(id)
        res.status(200).json({
            success: true,
            sections
        })
    }
    catch (error) {
        return next(error)
    }
}

const sectionController = { addSectionandLecture, getSectionsRecordsRelatedtoCourse }
module.exports = sectionController;