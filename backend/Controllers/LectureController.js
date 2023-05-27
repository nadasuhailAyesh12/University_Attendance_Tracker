const lectureRepository = require("../models/queries/LectureQuery");

const searchLecture = async (req, res, next) => {
    try {
        const { options, course_id, dept_name } = req.params;
        const Arguments = options.split(' ');
        const sec_id = Arguments[0];
        const building = Arguments[1];
        const room_number = Arguments[2];

        const lecture = await lectureRepository.searchLecture(course_id, dept_name, building, room_number, sec_id)

        res.status(200).json({
            success: true,
            lecture
        });
    }
    catch (err) {
        return next(err);
    }
};

const getLectures = async (req, res, next) => {
    try {
        const { course_id, dept_name } = req.params;
        const lectures = await lectureRepository.getLectures(dept_name, course_id);

        res.status(200).json({
            success: true,
            lectures
        });
    }
    catch (err) {
        return next(err);
    }
}

const updateLecture = async (req, res, next) => {
    try {
        const { id, oldCourse_id, oldSec_id } = req.params;
        const { sec_id, course_id, room_number, building, start_time, end_time, day, lecture_id } = req.body
        await lectureRepository.updateLecture(sec_id, course_id, room_number, building, start_time, end_time, day, id, oldCourse_id, oldSec_id, lecture_id)

        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
}

const deleteLecture = async (req, res, next) => {
    try {
        const { id, course_id, sec_id } = req.params;
        await lectureRepository.deleteLecture(sec_id, course_id, id)

        res.status(204).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
}

const insertLecture = async (req, res, next) => {
    try {

        const { lecture_id, sec_id, course_id, room_number, building, start_time, end_time, day, semester, year } = req.body
        await lectureRepository.addLecture(lecture_id, sec_id, course_id, semester, year, room_number, building, start_time, end_time, day)

        res.status(200).json({
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
}

const lectureController = { searchLecture, getLectures, updateLecture, deleteLecture, insertLecture }
module.exports = lectureController;