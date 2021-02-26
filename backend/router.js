import express from "express";

import calendarAchievementAllRead from "./controllers/routes/calendarAchievementAllRead.js"
import calendarAchievementCreate from "./controllers/routes/calendarAchievementCreate.js"
import calendarAchievementDelete from "./controllers/routes/calendarAchievementDelete.js"
import calendarAchievementRead from "./controllers/routes/calendarAchievementRead.js"
import calendarScheduleAssignedAllRead from "./controllers/routes/calendarScheduleAssignedAllRead.js"
import calendarScheduleAssignedCreate from "./controllers/routes/calendarScheduleAssignedCreate.js"
import calendarScheduleAssignedDelete from "./controllers/routes/calendarScheduleAssignedDelete.js"
import calendarScheduleAssignedRead from "./controllers/routes/calendarScheduleAssignedRead.js"
import calendarScheduleAssignedUpdate from "./controllers/routes/calendarScheduleAssignedUpdate.js"
import scheduleTemplateCreate from "./controllers/routes/scheduleTemplateCreate.js"
import scheduleTemplateDelete from "./controllers/routes/scheduleTemplateDelete.js"
import scheduleTemplateGoalAllRead from "./controllers/routes/scheduleTemplateGoalAllRead.js"
import scheduleTemplateGoalCreate from "./controllers/routes/scheduleTemplateGoalCreate.js"
import scheduleTemplateGoalDelete from "./controllers/routes/scheduleTemplateGoalDelete.js"
import scheduleTemplateRead from "./controllers/routes/scheduleTemplateRead.js"
import scheduleTemplateUpdate from "./controllers/routes/scheduleTemplateUpdate.js"
import scheduleTemplateUserAllRead from "./controllers/routes/scheduleTemplateUserAllRead.js"
import userCreate from "./controllers/routes/userCreate.js"
import userDetailsRead from "./controllers/routes/userDetailsRead.js"
import userLoginTokenRead from "./controllers/routes/userLoginTokenRead.js"




export let router = express.Router();


router.all("/calendarAchievementAllRead", calendarAchievementAllRead);
router.all("/calendarAchievementCreate", calendarAchievementCreate);
router.all("/calendarAchievementDelete", calendarAchievementDelete);
router.all("/calendarAchievementRead", calendarAchievementRead);
router.all("/calendarScheduleAssignedAllRead", calendarScheduleAssignedAllRead);
router.all("/calendarScheduleAssignedCreate", calendarScheduleAssignedCreate);
router.all("/calendarScheduleAssignedDelete", calendarScheduleAssignedDelete);
router.all("/calendarScheduleAssignedRead", calendarScheduleAssignedRead);
router.all("/calendarScheduleAssignedUpdate", calendarScheduleAssignedUpdate);
router.all("/scheduleTemplateCreate", scheduleTemplateCreate);
router.all("/scheduleTemplateDelete", scheduleTemplateDelete);
router.all("/scheduleTemplateGoalAllRead", scheduleTemplateGoalAllRead);
router.all("/scheduleTemplateGoalCreate", scheduleTemplateGoalCreate);
router.all("/scheduleTemplateGoalDelete", scheduleTemplateGoalDelete);
router.all("/scheduleTemplateRead", scheduleTemplateRead);
router.all("/scheduleTemplateUpdate", scheduleTemplateUpdate);
router.all("/scheduleTemplateUserAllRead", scheduleTemplateUserAllRead);
router.all("/userCreate", userCreate);
router.all("/userDetailsRead", userDetailsRead);
router.all("/userLoginTokenRead", userLoginTokenRead);



router.all("/*", (request, response) => response.send("<h1>404</h1>"));