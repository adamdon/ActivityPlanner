import express from "express";

import calendarAchievementAllRead from "./routes/api/calendarAchievementAllRead.js"
import calendarAchievementCreate from "./routes/api/calendarAchievementCreate.js"
import calendarAchievementDelete from "./routes/api/calendarAchievementDelete.js"
import calendarAchievementRead from "./routes/api/calendarAchievementRead.js"
import calendarScheduleAssignedAllRead from "./routes/api/calendarScheduleAssignedAllRead.js"
import calendarScheduleAssignedCreate from "./routes/api/calendarScheduleAssignedCreate.js"
import calendarScheduleAssignedDelete from "./routes/api/calendarScheduleAssignedDelete.js"
import calendarScheduleAssignedRead from "./routes/api/calendarScheduleAssignedRead.js"
import calendarScheduleAssignedUpdate from "./routes/api/calendarScheduleAssignedUpdate.js"
import scheduleTemplateCreate from "./routes/api/scheduleTemplateCreate.js"
import scheduleTemplateDelete from "./routes/api/scheduleTemplateDelete.js"
import goalScheduleAllRead from "./routes/api/goalScheduleAllRead.js"
import goalCreate from "./routes/api/goalCreate.js"
import goalDelete from "./routes/api/goalDelete.js"
import scheduleTemplateRead from "./routes/api/scheduleTemplateRead.js"
import scheduleTemplateUpdate from "./routes/api/scheduleTemplateUpdate.js"
import scheduleTemplateUserAllRead from "./routes/api/scheduleTemplateUserAllRead.js"
import userCreate from "./routes/api/userCreate.js"
import userDetailsRead from "./routes/api/userDetailsRead.js"
import userLoginTokenRead from "./routes/api/userLoginTokenRead.js"




export let router = express.Router();


router.all("/api/calendarAchievementAllRead", calendarAchievementAllRead);
router.all("/api/calendarAchievementCreate", calendarAchievementCreate);
router.all("/api/calendarAchievementDelete", calendarAchievementDelete);
router.all("/api/calendarAchievementRead", calendarAchievementRead);
router.all("/api/calendarScheduleAssignedAllRead", calendarScheduleAssignedAllRead);
router.all("/api/calendarScheduleAssignedCreate", calendarScheduleAssignedCreate);
router.all("/api/calendarScheduleAssignedDelete", calendarScheduleAssignedDelete);
router.all("/api/calendarScheduleAssignedRead", calendarScheduleAssignedRead);
router.all("/api/calendarScheduleAssignedUpdate", calendarScheduleAssignedUpdate);
router.all("/api/scheduleTemplateCreate", scheduleTemplateCreate);
router.all("/api/scheduleTemplateDelete", scheduleTemplateDelete);
router.all("/api/goalScheduleAllRead", goalScheduleAllRead);
router.all("/api/goalCreate", goalCreate);
router.all("/api/goalDelete", goalDelete);
router.all("/api/scheduleTemplateRead", scheduleTemplateRead);
router.all("/api/scheduleTemplateUpdate", scheduleTemplateUpdate);
router.all("/api/scheduleTemplateUserAllRead", scheduleTemplateUserAllRead);
router.all("/api/userCreate", userCreate);
router.all("/api/userDetailsRead", userDetailsRead);
router.all("/api/userLoginTokenRead", userLoginTokenRead);



// router.all("/*", (request, response) => response.send("<h1>404</h1>"));