import express from "express";

import calendarAchievementAllRead from "./controllers/routes/api/calendarAchievementAllRead.js"
import calendarAchievementCreate from "./controllers/routes/api/calendarAchievementCreate.js"
import calendarAchievementDelete from "./controllers/routes/api/calendarAchievementDelete.js"
import calendarAchievementRead from "./controllers/routes/api/calendarAchievementRead.js"
import calendarScheduleAssignedAllRead from "./controllers/routes/api/calendarScheduleAssignedAllRead.js"
import calendarScheduleAssignedCreate from "./controllers/routes/api/calendarScheduleAssignedCreate.js"
import calendarScheduleAssignedDelete from "./controllers/routes/api/calendarScheduleAssignedDelete.js"
import calendarScheduleAssignedRead from "./controllers/routes/api/calendarScheduleAssignedRead.js"
import calendarScheduleAssignedUpdate from "./controllers/routes/api/calendarScheduleAssignedUpdate.js"
import scheduleTemplateCreate from "./controllers/routes/api/scheduleTemplateCreate.js"
import scheduleTemplateDelete from "./controllers/routes/api/scheduleTemplateDelete.js"
import scheduleTemplateGoalAllRead from "./controllers/routes/api/scheduleTemplateGoalAllRead.js"
import scheduleTemplateGoalCreate from "./controllers/routes/api/scheduleTemplateGoalCreate.js"
import scheduleTemplateGoalDelete from "./controllers/routes/api/scheduleTemplateGoalDelete.js"
import scheduleTemplateRead from "./controllers/routes/api/scheduleTemplateRead.js"
import scheduleTemplateUpdate from "./controllers/routes/api/scheduleTemplateUpdate.js"
import scheduleTemplateUserAllRead from "./controllers/routes/api/scheduleTemplateUserAllRead.js"
import userCreate from "./controllers/routes/api/userCreate.js"
import userDetailsRead from "./controllers/routes/api/userDetailsRead.js"
import userLoginTokenRead from "./controllers/routes/api/userLoginTokenRead.js"




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
router.all("/api/scheduleTemplateGoalAllRead", scheduleTemplateGoalAllRead);
router.all("/api/scheduleTemplateGoalCreate", scheduleTemplateGoalCreate);
router.all("/api/scheduleTemplateGoalDelete", scheduleTemplateGoalDelete);
router.all("/api/scheduleTemplateRead", scheduleTemplateRead);
router.all("/api/scheduleTemplateUpdate", scheduleTemplateUpdate);
router.all("/api/scheduleTemplateUserAllRead", scheduleTemplateUserAllRead);
router.all("/api/userCreate", userCreate);
router.all("/api/userDetailsRead", userDetailsRead);
router.all("/api/userLoginTokenRead", userLoginTokenRead);



router.all("/*", (request, response) => response.send("<h1>404</h1>"));