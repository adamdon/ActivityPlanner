import express from "express";

import achievementAllRead from "./routes/api/achievementAllRead.js"
import achievementCreate from "./routes/api/achievementCreate.js"
import achievementDelete from "./routes/api/achievementDelete.js"
import calendarRead from "./routes/api/calendarRead.js"
import calendarAssignmentRead from "./routes/api/calendarAssignmentRead.js"
import assignmentAllRead from "./routes/api/assignmentAllRead.js"
import assignmentCreate from "./routes/api/assignmentCreate.js"
import assignmentDelete from "./routes/api/assignmentDelete.js"
import scheduleCreate from "./routes/api/scheduleCreate.js"
import scheduleDelete from "./routes/api/scheduleDelete.js"
import goalScheduleAllRead from "./routes/api/goalScheduleAllRead.js"
import goalCreate from "./routes/api/goalCreate.js"
import goalDelete from "./routes/api/goalDelete.js"
import scheduleUpdate from "./routes/api/scheduleUpdate.js"
import scheduleUserAllRead from "./routes/api/scheduleUserAllRead.js"
import userCreate from "./routes/api/userCreate.js"
import userDetailsRead from "./routes/api/userDetailsRead.js"
import userLoginTokenRead from "./routes/api/userLoginTokenRead.js"




export let router = express.Router();


router.all("/api/achievementAllRead", achievementAllRead);
router.all("/api/achievementCreate", achievementCreate);
router.all("/api/achievementDelete", achievementDelete);
router.all("/api/calendarRead", calendarRead);
router.all("/api/calendarAssignmentRead", calendarAssignmentRead);
router.all("/api/assignmentAllRead", assignmentAllRead);
router.all("/api/assignmentCreate", assignmentCreate);
router.all("/api/assignmentDelete", assignmentDelete);
router.all("/api/scheduleCreate", scheduleCreate);
router.all("/api/scheduleDelete", scheduleDelete);
router.all("/api/goalScheduleAllRead", goalScheduleAllRead);
router.all("/api/goalCreate", goalCreate);
router.all("/api/goalDelete", goalDelete);
router.all("/api/scheduleUpdate", scheduleUpdate);
router.all("/api/scheduleUserAllRead", scheduleUserAllRead);
router.all("/api/userCreate", userCreate);
router.all("/api/userDetailsRead", userDetailsRead);
router.all("/api/userLoginTokenRead", userLoginTokenRead);



// router.all("/*", (request, response) => response.send("<h1>404</h1>"));