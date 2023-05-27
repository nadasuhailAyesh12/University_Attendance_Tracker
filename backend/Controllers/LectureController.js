const lectureRepository = require("../models/queries/LectureQuery");

const searchLecture = async (req, res, next) => {
    try {
        const { options, course_id, dept_name } = req.params;
        const Arguments = options.split(' ');
        const sec_id = Arguments[0];
        const building = Arguments[1];
        const room_number = Arguments[2];
        console.log(req.params)
        console.log(sec_id, room_number, building, dept_name, course_id)


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

const lectureController = { searchLecture, getLectures }
module.exports = lectureController;