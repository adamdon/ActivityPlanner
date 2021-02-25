import express from "express";

import calendarAchievementAllRead from "./controller/calendarAchievementAllRead.js"
import calendarAchievementCreate from "./controller/calendarAchievementCreate.js"
import calendarAchievementDelete from "./controller/calendarAchievementDelete.js"
import calendarAchievementRead from "./controller/calendarAchievementRead.js"
import calendarScheduleAssignedAllRead from "./controller/calendarScheduleAssignedAllRead.js"
import calendarScheduleAssignedCreate from "./controller/calendarScheduleAssignedCreate.js"
import calendarScheduleAssignedDelete from "./controller/calendarScheduleAssignedDelete.js"
import calendarScheduleAssignedRead from "./controller/calendarScheduleAssignedRead.js"
import calendarScheduleAssignedUpdate from "./controller/calendarScheduleAssignedUpdate.js"
import scheduleTemplateCreate from "./controller/scheduleTemplateCreate.js"
import scheduleTemplateDelete from "./controller/scheduleTemplateDelete.js"
import scheduleTemplateGoalAllRead from "./controller/scheduleTemplateGoalAllRead.js"
import scheduleTemplateGoalCreate from "./controller/scheduleTemplateGoalCreate.js"
import scheduleTemplateGoalDelete from "./controller/scheduleTemplateGoalDelete.js"
import scheduleTemplateRead from "./controller/scheduleTemplateRead.js"
import scheduleTemplateUpdate from "./controller/scheduleTemplateUpdate.js"
import scheduleTemplateUserAllRead from "./controller/scheduleTemplateUserAllRead.js"
import userCreate from "./controller/userCreate.js"
import userDetailsRead from "./controller/userDetailsRead.js"
import userLoginTokenRead from "./controller/userLoginTokenRead.js"




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