import { ObjectId } from "mongodb";
import { dbConnection } from "../server/mongoConnection.js";

const getStudyPlansCollection = async () => {
    const db = await dbConnection();
    return db.collection("studyPlans");
};

const createStudyForm = async (studyForm) => {
    const studyPlansCollection = await getStudyPlansCollection();
    const result = await studyPlansCollection.insertOne({
        studyForms: [studyForm],
    });
    return result.ops[0];
};

const deleteStudyForm = async (studyFormId) => {
    const studyPlansCollection = await getStudyPlansCollection();
    const result = await studyPlansCollection.deleteOne({
        "studyForms.id": ObjectId(studyFormId),
    });
    return result.deletedCount;
};

export async function getAllStudyForms() {
    const db = await dbConnection();
    const studyPlansCollection = db.collection("studyPlans");
    return await studyPlansCollection.find({}).toArray();
}

const createSchedule = async (studyFormId, schedule) => {
    const studyPlansCollection = await getStudyPlansCollection();
    const result = await studyPlansCollection.updateOne(
        { "studyForms.id": ObjectId(studyFormId) },
        { $push: { "studyForms.$.schedules": schedule } }
    );
    return result.modifiedCount;
};

const deleteSchedule = async (studyFormId, scheduleId) => {
    const studyPlansCollection = await getStudyPlansCollection();
    const result = await studyPlansCollection.updateOne(
        { "studyForms.id": ObjectId(studyFormId) },
        { $pull: { "studyForms.$.schedules": { id: ObjectId(scheduleId) } } }
    );
    return result.modifiedCount;
};

const createCourse = async (studyFormId, scheduleId, course) => {
    const studyPlansCollection = await getStudyPlansCollection();
    const result = await studyPlansCollection.updateOne(
        {
            "studyForms.id": ObjectId(studyFormId),
            "studyForms.schedules.id": ObjectId(scheduleId),
        },
        { $push: { "studyForms.$.schedules.$.courses": course } }
    );
    return result.modifiedCount;
};

const deleteCourse = async (studyFormId, scheduleId, courseId) => {
    const studyPlansCollection = await getStudyPlansCollection();
    const result = await studyPlansCollection.updateOne(
        {
            "studyForms.id": ObjectId(studyFormId),
            "studyForms.schedules.id": ObjectId(scheduleId),
        },
        {
            $pull: {
                "studyForms.$.schedules.$.courses": { id: ObjectId(courseId) },
            },
        }
    );
    return result.modifiedCount;
};

export {
    createStudyForm,
    deleteStudyForm,
    createSchedule,
    deleteSchedule,
    createCourse,
    deleteCourse,
};
