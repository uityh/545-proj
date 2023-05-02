# 545-proj
# Stevens Course Planner

Stevens Course Planner is a website that assists students at Stevens in planning what courses they need to take to graduate or fulfill certain requirements.

## Getting Started

1. Clone this repository.
2. Install the dependencies with `npm i`.
3. Start a MongoDB instance with `mongod`.
4. In Mongo Compass, create a collection called schedule_users and add this document ```{"_id":{"$oid":"64413773da922d58b89a525a"},"username":"matt","password":"123","studyForms":[{"id":{"$oid":"6450434d96e95dd0189ea671"},"formTitle":"Math with CS Minor","sections":[{"sectionTitle":"Math Major","courses":[{"semester":"21F","courseName":"MA 232","grade":"B"},{"semester":"21S","courseName":"MA 221","grade":"A"}]},{"sectionTitle":"CS Minor","courses":[]}]},{"id":{"$oid":"64504d3e740690cda924d402"},"formTitle":"CS Major with Math Minor","sections":[]},{"id":{"$oid":"645059951c9aee0e27e3ad73"},"formTitle":"Math Major with CS Minor","sections":[{"sectionTitle":"Math Major","courses":[]}]}]}```
4. Start the server with `npm start`.
5. Open http://localhost:3000 in your browser.

## Features

- View your current schedule.
- Plan your future semesters.
- Easy to use UI
 
## Requirements

- MongoDB v5.1 or higher

![Schedulcker](https://user-images.githubusercontent.com/72940884/235545944-01eb430a-b364-4b07-aa8e-85c462f7e087.png)
