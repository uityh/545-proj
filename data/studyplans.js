import {dbConnection} from './../server/mongoConnection.js';
import {ObjectId} from 'mongodb';

const getCollection = async () => {
  const db = await dbConnection();
  let coll = await db.collection("users");
  return coll;
}




//create study form to be modified by site. user provides formTitle, site should automatically fill in current userId
const createForm = async(userId, formTitle) => {
    if (!formTitle || !userId) {
        throw `Error: must provide a userID and a title for the Form`;
    }

    if (typeof userId !== "string" || typeof formTitle !== "string") {
        throw `Error: userId and formTitle must be strings`
    }

    formTitle = formTitle.trim();

    if (formTitle == "") {
      throw `Error: Form Title cannot be just spaces`;
    }

    if (!ObjectId.isValid(userId)) {
        throw `Error: invalid user id`;
    }

    const newForm = {
        id: new ObjectId(),
        formTitle: formTitle,
        sections: []
    }
    const userColl = await getCollection();
    //console.log(userColl);
    const submitForm = await userColl.findOneAndUpdate(
        {_id: new ObjectId(userId)},
        {$push: {studyForms: newForm}},
        {returnDocument: 'after'}
    );

    if (submitForm.lastErrorObject.n === 0) {
        throw `Error: could not add studyForm successfully`;
    }

    newForm.id = newForm.id.toString();
    return newForm;
}

//get all studyForms of a user to display on the homepage
const getAll = async(userId) => {
    //none of this error handling should matter because the website should handle it but might as well
    if (!userId) {
        throw `Error: must provide userId`;
    }
    if (typeof userId !== 'string') {
        throw `Error: userId must be a string`;
    }
    userId = userId.trim()
    if (userId == "") {
        throw `Error: id cannot be empty`;
    
    }
    if (!ObjectId.isValid(userId)) {
        throw `Error: invalid user Id`
    } 

    const userColl = await getCollection();
    const userForms = await userColl.findOne({_id: new ObjectId(userId)});

    if (userForms === null) {
        throw `Error: no user with that ID`;
    }

    let formList = userForms.studyForms;
    formList = formList.map((x) => {
        x.id = x.id.toString();
        return x
    });
    return formList;
};

//get studyform by id
const get = async (formId) => {
  if (!formId) {
    throw `Error: must provide formId`;
  }
  if (typeof formId !== "string") {
    throw `Error: form id must be a string`;
  }
  formId = formId.trim();
  if (formId == "") {
    throw `Error: form id cannot be empty`;
  }
  if (!ObjectId.isValid(formId)) {
    throw `Error: invalid formId`;
  }

  const userColl = await getCollection();

  const findForm = await userColl.findOne(
    {'studyForms.id': new ObjectId(formId)},
    {projection: {_id: 0, 'studyForms.$': 1}}
  );
  if (findForm === null) {
    throw `Error: could not find form with that ID`
  };
  findForm.studyForms[0].id = findForm.studyForms[0].id.toString();
  return findForm.studyForms[0];
}

/*delete studyform by id, returns all user studyforms without newly deleted one
to refresh the page with*/
const remove = async (formId) => {
  if (!formId) {
    throw `Error: must provide formId`;
  }
  if (typeof formId !== "string") {
    throw `Error: form id must be a string`;
  }
  formId = formId.trim();
  if (formId == "") {
    throw `Error: form id cannot be empty`;
  }
  if (!ObjectId.isValid(formId)) {
    throw `Error: invalid formId`;
  }

  const userColl = await getCollection();

  const removeForm = await userColl.findOneAndUpdate(
    {'studyForms.id': new ObjectId(formId)},
    {$pull: {studyForms: {id: new ObjectId(formId)}}}
  );
  //console.log(removeForm);
  return await getAll(removeForm.value._id.toString());
}

/*update, Updates title if needed, then should blanket replace old 
sections array with whatever is currently in the tables on the site*/
const update = async (formId, title, sections) => {
  if (!formId || !title || !sections) {
    throw `Error: must provide a formId, title, and sections array`;
  }
  if (typeof formId !== "string" || typeof title !== "string") {
    throw `Error: formid and title must be strings`;
  }
  formId = formId.trim();
  title = title.trim();
  if (formId == "") {
    throw `Error: form id cannot be empty`;
  }
  if (title == "") {
    title = "Untitled Form";
  }

  if (!ObjectId.isValid(formId)) {
    throw `Error: invalid formId`;
  }

  if (!Array.isArray(sections)) {
    throw `Error: sections must be an array of Objects`;
  }

  const userColl = await getCollection();
  const updateTitle = await userColl.findOneAndUpdate(
    {"studyForms.id": new ObjectId(formId)},
    {$set: {"studyForms.$.formTitle": title}},
    {returnDocument: 'after'}
  );
  const updateInfo = await userColl.findOneAndUpdate(
    {"studyForms.id": new ObjectId(formId)},
    {$set: {"studyForms.$.sections": sections}},
    {returnDocument: 'after'}
  );

  if (updateTitle.lastErrorObject.n === 0) {
    throw `Error: could not find studyForm`;
  }

  let updatedForm = updateInfo.value;
  return updatedForm
}

/*
"studyForms": [
    {
      "formTitle": "CS Major with Math Minor",
      "id": {
        "$oid": "6431eb12fc13ae012e69e5a0"
      },
      "sections": [
        {
          "sectionTitle": "CS Major",
          "courses": [
            {
              "courseName": "CS 545",
              "semester": "21F",
              "grade": "A"
            }
          ]
        },
        {
          "sectionTitle": "Math Minor",
          "courses": [
            {
              "courseName": "CS 545",
              "semester": "21F",
              "grade": "A"
            }
          ]
        }
      ]
    }
  ]
  */

//console.log(await createForm('643dc2a8b0c554f79c761b8a', "CS With no bitches"));
//console.log(await createForm('643dc2a8b0c554f79c761b8a', "CS with a minor in being a clown"));
//console.log(await get("64409bbbd698689217b2efa0"));

export {createForm, getAll, get, remove, update};