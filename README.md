## TASK (4/8/23) :: Starting Date ~ End Date will be (20/8/23)

- Team Member API is done (4/8/23)
- Blog API is done (4/8/23)
- Service Api is done (4/8/23)
- Featured Api is done (5/8/23)
- Feedback Api is donee (5/8/23)
- Project Api is done (5/8/23)
- FAQ API is done (6/8/23)
- JOB API is done (6/8/23)

## PROBLEMS

1. Change-password ee issue ase. ekbar change korar poreu, seta diye r login hosse na
2. project.model.ts e category [] Array hisabe required koresi. but new project create korar time e oi category required korar poreu, category te kono property na dileu, kono error dei na. mane category required hisabe kaj korse na. eitar jonne zod validation kora dorkar
3. job.service.ts ee firstName jodi update korte jai, tahole lastName update na korleu, seta automatic vanish hoiye jai..ei jonne  
     const data = await jobModel.findByIdAndUpdate(
        { _id: jobId },
        { $set: { "name.firstName": jobData.name?.firstName } }, // Update only the firstName field
        { new: true, runValidators: true }
    );

    emon use korte hobe.

# API ENDPOINTS

### Team Member

1. `(GET) => /api/v1/:memberId` **get single team member by id**
2. `(GET) => /api/v1/` **get all Team Members**
3. `(POST) => /api/v1/` **create team member**
4. `(PATCH) => /api/v1/:memberId` **update a team member**
5. `(PATCH) => /api/v1/:memberId` **delete a team member**

### Blog

1. `(GET) => api/v1/blogs` **Get All Blog**
2. `(POST) => api/v1/blogs` **Write Blogs Article**
3. `(Single GET) => api/v1/blogs/:blogId` **Get Single Blog By ID / SLUG**
4. `(POST) => api/v1/blogs/:blogId/comments` **Add Comment to Blog Post**
5. `(PATCH) => api/v1/blogs/:blogId/comments/:commentId` **Update a Comment**
6. `(DELETE) => api/v1/blogs/:blogId/comments/:commentId` **Delete a Comment**
7. `(POST) => api/v1/blogs/:blogId/comments/:commentId/like` **Like a Comment**
8. `(POST) => api/v1/blogs/:blogId/comments/:commentId/dislike` **Dislike a Comment**
9. `(POST) => api/v1/blogs/:blogId/comments/:commentId/replies` **Reply to a Comment**
10. `(PATCH) => api/v1/blogs/:blogId/comments/:commentId/replies/:replyId` **Update a Reply**
11. `(DELETE) => api/v1/blogs/:blogId/comments/:commentId/replies/:replyId` **Delete a Reply**

### Service Section

1. `(GET) => /api/v1/:serviceId` **get a single service**
2. `(GET) => /api/v1/` **Get all services list**
3. `(POST) => /api/v1/` **create team member**
4. `(PATCH) => /api/v1/:serviceId` **Update A Service**
5. `(DELETE) => /api/v1/:serviceId` **delete a service**

### Featured Section

1. `(GET) => /api/v1/:featuredId` **get single featured list**
2. `(GET) => /api/v1/` **get all featured lists**
3. `(POST) => /api/v1/` **create featured list**
4. `(PATCH) => /api/v1/:featuredId` **update featured list**
5. `(DELETE) => /api/v1/:featuredId` **delete a featured list**

### Feedback Section

1. `(GET) => /api/v1/:feedbackId` **get single feedback list**
2. `(GET) => /api/v1/` **get all feedback lists**
3. `(POST) => /api/v1/` **create feedback list**
4. `(PATCH) => /api/v1/:feedbackId` **update feedback list**
5. `(DELETE) => /api/v1/:feedbackId` **delete a feedback list**

### Project

1. `(GET) => /api/v1/:projectId` **get single project**
2. `(GET) => /api/v1/` **get all projects list**
3. `(POST) => /api/v1/` **create new project**
4. `(PATCH) => /api/v1/:projectId` **update project**
5. `(DELETE) => /api/v1/:projectId` **delete project**

### FAQ Section

1. `(GET) => /api/v1/:faqId` **get single faq**
2. `(GET) => /api/v1/` **get all faq list**
3. `(POST) => /api/v1/` **create new faq**
4. `(PATCH) => /api/v1/:faqId` **update faq**
5. `(DELETE) => /api/v1/:faqId` **delete faq**


### JOB Section

1. `(GET) => /api/v1/:jobId` **get single job application**
2. `(GET) => /api/v1/` **get all job application lists**
3. `(POST) => /api/v1/` **create new job application**
4. `(PATCH) => /api/v1/:jobId` **update job application**
5. `(DELETE) => /api/v1/:jobId` **delete job application**
