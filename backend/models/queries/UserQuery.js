const db = require("../seeding/Connection");
const { PreparedStatement: PS } = require("pg-promise")

const getUserByID = async (ID) => {
    const getUserByIDQuery = new PS({ name: 'getUserByID', text: "select ID,name,role from authuser where ID= $1", values: [ID] });
    const user = await db.one(getUserByIDQuery);
    return user;
}

const userRepository = { getUserByID };
module.exports = userRepository;