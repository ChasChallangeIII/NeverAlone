# Details

Date : 2025-05-26 11:38:46

Directory c:\\Users\\oscar\\Documents\\react\\projects\\nerver-alone-api\\server

Total : 51 files,  6332 codes, 7 comments, 442 blanks, all 6781 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [server/README.md](/server/README.md) | Markdown | 83 | 0 | 34 | 117 |
| [server/config/postgres.js](/server/config/postgres.js) | JavaScript | 25 | 0 | 9 | 34 |
| [server/config/swagger.js](/server/config/swagger.js) | JavaScript | 49 | 0 | 3 | 52 |
| [server/controllers/AuthController.js](/server/controllers/AuthController.js) | JavaScript | 72 | 0 | 19 | 91 |
| [server/controllers/CommunityController.js](/server/controllers/CommunityController.js) | JavaScript | 110 | 0 | 11 | 121 |
| [server/controllers/ContactController.js](/server/controllers/ContactController.js) | JavaScript | 53 | 0 | 12 | 65 |
| [server/controllers/GroupController.js](/server/controllers/GroupController.js) | JavaScript | 45 | 0 | 10 | 55 |
| [server/controllers/ReportController.js](/server/controllers/ReportController.js) | JavaScript | 34 | 0 | 8 | 42 |
| [server/controllers/reportCommentController.js](/server/controllers/reportCommentController.js) | JavaScript | 61 | 0 | 12 | 73 |
| [server/controllers/userController.js](/server/controllers/userController.js) | JavaScript | 10 | 0 | 2 | 12 |
| [server/docs/authDocs.yaml](/server/docs/authDocs.yaml) | YAML | 136 | 0 | 5 | 141 |
| [server/docs/commentDocs.yaml](/server/docs/commentDocs.yaml) | YAML | 142 | 0 | 5 | 147 |
| [server/docs/communityDocs.yaml](/server/docs/communityDocs.yaml) | YAML | 275 | 0 | 10 | 285 |
| [server/docs/contactDocs.yaml](/server/docs/contactDocs.yaml) | YAML | 110 | 0 | 5 | 115 |
| [server/docs/groupDocs.yaml](/server/docs/groupDocs.yaml) | YAML | 98 | 0 | 6 | 104 |
| [server/docs/mainDocs.yaml](/server/docs/mainDocs.yaml) | YAML | 27 | 0 | 3 | 30 |
| [server/docs/reportDocs.yaml](/server/docs/reportDocs.yaml) | YAML | 149 | 0 | 7 | 156 |
| [server/docs/usersDocs.yaml](/server/docs/usersDocs.yaml) | YAML | 30 | 0 | 2 | 32 |
| [server/error.log](/server/error.log) | Log | 1,525 | 0 | 1 | 1,526 |
| [server/middleware/auth.js](/server/middleware/auth.js) | JavaScript | 39 | 0 | 14 | 53 |
| [server/middleware/errorHandler.js](/server/middleware/errorHandler.js) | JavaScript | 34 | 0 | 7 | 41 |
| [server/middleware/notFound.js](/server/middleware/notFound.js) | JavaScript | 5 | 0 | 3 | 8 |
| [server/package-lock.json](/server/package-lock.json) | JSON | 2,167 | 0 | 1 | 2,168 |
| [server/package.json](/server/package.json) | JSON | 38 | 0 | 1 | 39 |
| [server/routes/AdminRouter.js](/server/routes/AdminRouter.js) | JavaScript | 10 | 0 | 11 | 21 |
| [server/routes/ApiRouter.js](/server/routes/ApiRouter.js) | JavaScript | 12 | 0 | 7 | 19 |
| [server/routes/AuthRouter.js](/server/routes/AuthRouter.js) | JavaScript | 16 | 0 | 6 | 22 |
| [server/routes/CommunityRouter.js](/server/routes/CommunityRouter.js) | JavaScript | 22 | 2 | 5 | 29 |
| [server/routes/ContactRouter.js](/server/routes/ContactRouter.js) | JavaScript | 14 | 0 | 4 | 18 |
| [server/routes/GroupRouter.js](/server/routes/GroupRouter.js) | JavaScript | 8 | 0 | 7 | 15 |
| [server/routes/ReportCommentRouter.js](/server/routes/ReportCommentRouter.js) | JavaScript | 15 | 5 | 8 | 28 |
| [server/server.js](/server/server.js) | JavaScript | 34 | 0 | 10 | 44 |
| [server/services/authService.js](/server/services/authService.js) | JavaScript | 103 | 0 | 38 | 141 |
| [server/services/communityService.js](/server/services/communityService.js) | JavaScript | 94 | 0 | 12 | 106 |
| [server/services/contactService.js](/server/services/contactService.js) | JavaScript | 31 | 0 | 5 | 36 |
| [server/services/db/db.js](/server/services/db/db.js) | JavaScript | 237 | 0 | 47 | 284 |
| [server/services/groupService.js](/server/services/groupService.js) | JavaScript | 90 | 0 | 22 | 112 |
| [server/services/locationService.js](/server/services/locationService.js) | JavaScript | 15 | 0 | 5 | 20 |
| [server/services/reportCommentService.js](/server/services/reportCommentService.js) | JavaScript | 29 | 0 | 9 | 38 |
| [server/services/reportService.js](/server/services/reportService.js) | JavaScript | 44 | 0 | 14 | 58 |
| [server/services/userService.js](/server/services/userService.js) | JavaScript | 13 | 0 | 3 | 16 |
| [server/utils/errors/appErrors.js](/server/utils/errors/appErrors.js) | JavaScript | 21 | 0 | 5 | 26 |
| [server/utils/errors/authErrors.js](/server/utils/errors/authErrors.js) | JavaScript | 51 | 0 | 11 | 62 |
| [server/utils/errors/dbErrors.js](/server/utils/errors/dbErrors.js) | JavaScript | 16 | 0 | 4 | 20 |
| [server/utils/errors/errors.js](/server/utils/errors/errors.js) | JavaScript | 7 | 0 | 1 | 8 |
| [server/utils/errors/reportErrors.js](/server/utils/errors/reportErrors.js) | JavaScript | 6 | 0 | 2 | 8 |
| [server/utils/helpers.js](/server/utils/helpers.js) | JavaScript | 11 | 0 | 2 | 13 |
| [server/utils/logger.js](/server/utils/logger.js) | JavaScript | 15 | 0 | 3 | 18 |
| [server/validators/authValidator.js](/server/validators/authValidator.js) | JavaScript | 55 | 0 | 5 | 60 |
| [server/validators/groupValidator.js](/server/validators/groupValidator.js) | JavaScript | 14 | 0 | 3 | 17 |
| [server/validators/reportValidator.js](/server/validators/reportValidator.js) | JavaScript | 32 | 0 | 3 | 35 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)