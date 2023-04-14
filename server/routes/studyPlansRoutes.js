import { Router } from "express";
import {
    getAllStudyForms,
    createStudyForm,
    deleteStudyForm,
    createSchedule,
    deleteSchedule,
    createCourse,
    deleteCourse,
} from "../../data/studyPlans.js";

const router = Router();

router.get("/studyForm", async (req, res) => {
    const studyForms = await getAllStudyForms();
    res.json(studyForms);
});

router.post("/studyForm", async (req, res) => {
    const studyForm = req.body;
    const result = await createStudyForm(studyForm);
    res.json(result);
});

router.delete("/studyForm/:id", async (req, res) => {
    const studyFormId = req.params.id;
    const result = await deleteStudyForm(studyFormId);
    res.json({ deletedCount: result });
});

router.post("/studyForm/:id/schedule", async (req, res) => {
    const studyFormId = req.params.id;
    const schedule = req.body;
    const result = await createSchedule(studyFormId, schedule);
    res.json({ modifiedCount: result });
});

router.delete(
    "/studyForm/:studyFormId/schedule/:scheduleId",
    async (req, res) => {
        const { studyFormId, scheduleId } = req.params;
        const result = await deleteSchedule(studyFormId, scheduleId);
        res.json({ modifiedCount: result });
    }
);

router.post(
    "/studyForm/:studyFormId/schedule/:scheduleId/course",
    async (req, res) => {
        const { studyFormId, scheduleId } = req.params;
        const course = req.body;
        const result = await createCourse(studyFormId, scheduleId, course);
        res.json({ modifiedCount: result });
    }
);

router.delete(
    "/studyForm/:studyFormId/schedule/:scheduleId/course/:courseId",
    async (req, res) => {
        const { studyFormId, scheduleId, courseId } = req.params;
        const result = await deleteCourse(studyFormId, scheduleId, courseId);
        res.json({ modifiedCount: result });
    }
);

export default router;
