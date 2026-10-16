/*
============================================================
PROBLEM: SOCIAL PUBLISHING DASHBOARD — CORE LOGIC
============================================================

Build the core JavaScript logic for a dashboard that allows
a user to create one post and publish it to multiple social
platforms.

No DOM, backend, database, authentication, or real APIs.
Everything should work using JavaScript data structures.

------------------------------------------------------------
POST DATA
------------------------------------------------------------

Each post should contain:

- id
- content
- selected platforms
- createdAt
- overall status
- individual publishing status/result for each platform

Supported platforms:
- linkedin
- x
- reddit


------------------------------------------------------------
FUNCTIONAL REQUIREMENTS
------------------------------------------------------------

1. CREATE POST
   - Create a new post.
   - Generate/store a unique ID.
   - Store content.
   - Store selected platforms.
   - Store creation time.
   - Initialize appropriate publishing states.


2. VALIDATE POST
   - Content must not be empty.
   - Selected platforms must be valid.
   - At least one platform must be selected.
   - Apply platform-specific character limits/rules.
   - One platform being  invalid should NOT automatically
     make every other platform fail.


3. PUBLISH POST
   - Simulate publishing to each selected platform.
   - Do NOT call real APIs.
   - Each platform must produce its own result.

   Example:

   LinkedIn -> success
   X        -> failed
   Reddit   -> success


4. DETERMINE OVERALL STATUS

   A post can have states such as:

   - draft
   - publishing
   - published
   - partially_failed
   - failed

   Derive the overall status from individual platform
   results.

   Example challenge:

   LinkedIn -> success
   X        -> failed
   Reddit   -> success

   Overall status -> ?


5. POST HISTORY

   Store posts in memory.

   Support retrieving:

   - all posts
   - successfully published posts
   - failed / partially failed posts
   - posts involving a specific platform


6. RETRY FAILED PLATFORMS

   Retry ONLY platforms that previously failed.

   Example:

   LinkedIn -> success
   X        -> failed
   Reddit   -> success

   Retry should attempt X only.

   LinkedIn and Reddit must NOT be published again.


7. DELETE POST

   - Delete a post from local dashboard history using ID.
   - This does NOT mean deleting the real social-media post.


------------------------------------------------------------
IMPORTANT LOGIC CHALLENGE
------------------------------------------------------------

The system must preserve BOTH:

1. Individual platform state
2. Overall post state

Think carefully about your data structure.

DO NOT start with UI.

First decide:
- What does one post object look like? create an object involving all parameters
- How will platform results be represented?  iteration is easy in array, but ig object because we don't need iteration here.
- Which functions are required? functions for each of the procedure- creating a post,, but here ig we can make the post creation as main function except for delete 
- Which values should be stored? id, overallStatus, individualPlatformStatus, selectedPlatforms
- Which values can be derived? 

Then implement the logic.
============================================================
*/


// const post = {
//   id,
//   content,
//   selectedPlatforms,
//   createdAt,
//   overallStatus,
//   individualPlatformStatus
// }
let id = 0;

function createPost(content, selectedPlatforms) {
  if (selectedPlatforms === null || selectedPlatforms === undefined) {
    throw new Error("Invalid Name");
  }

  const storedID = id++;
  const storedContent = content;
  const storedSelectedPlatforms = selectedPlatforms;
  const createdAt = new Date();

  const individualPlatformStatus = {};

  for (const i of selectedPlatforms) {
    individualPlatformStatus[i] = {
      currentState: "not started yet",
      isValidationPassed: null,
      explaination4failure: null,
    };
  }

  const overallStatus = {
    Status: "not started yet",
  };

  const result = {
    storedID,
    storedContent,
    storedSelectedPlatforms,
    createdAt,
    individualPlatformStatus,
    overallStatus,
  };

  return result;
}


// --------------------------------------------------
// SUPPORTED PLATFORMS
// --------------------------------------------------

const supportedPlatforms = ["Linkedin", "X", "Reddit"];

Object.freeze(supportedPlatforms);


// --------------------------------------------------
// VALIDATION
// --------------------------------------------------

function postValidation(post) {
  if (
    post.storedContent === null ||
    post.storedContent === undefined ||
    post.storedContent === ""
  ) {
    throw new Error("No content!");
  }

  if (post.storedSelectedPlatforms.length === 0) {
    throw new Error("At least one platform required");
  }

  const platformRules = {
    X: {
      charLimit: 100,
      ageLimit: 18,
    },

    Linkedin: {
      charLimit: 100,
      ageLimit: 16,
    },

    Reddit: {
      charLimit: 120,
      ageLimit: 12,
    },
  };

  for (const platform of post.storedSelectedPlatforms) {

    if (!supportedPlatforms.includes(platform)) {

      post.individualPlatformStatus[platform] = {
        currentState: "Validation Failed",
        isValidationPassed: false,
        explaination4failure: "Not in the supported platform",
      };

    } else {

      if (post.storedContent.length > platformRules[platform].charLimit) {

        post.individualPlatformStatus[platform] = {
          currentState: "Validation Failed",
          isValidationPassed: false,
          explaination4failure: "Due to long content",
        };

      } else {

        post.individualPlatformStatus[platform] = {
          currentState: "Validation Succeeded",
          isValidationPassed: true,
          explaination4failure: "none",
        };

      }
    }
  }

  return post;
}


// --------------------------------------------------
// PUBLISH
// --------------------------------------------------

function publishPost(post) {

  const reqArr = Object.entries(post.individualPlatformStatus);

  reqArr.forEach(function (state) {

    if (state[1].isValidationPassed === null) {

      state[1].currentState = "Validation-NULL";

    } else {

      if (state[1].isValidationPassed === true) {
        state[1].currentState = "Published";
      }

      if (state[1].isValidationPassed === false) {
        state[1].currentState = "Not Published";
      }

    }
  });

  return post;
}


// --------------------------------------------------
// PIPELINE
// --------------------------------------------------

const mainValue01 = createPost(
  "yo, this is me, your creator",
  [
    "Telegram",
    "Instagram",
    "X",
    "Reddit",
    "",
    "Linkedin",
    "HikeMessenger",
    "Whatsapp"
  ]
);

const mainValue02 = postValidation(mainValue01);

const mainValue03 = publishPost(mainValue02);

console.log(mainValue03);
console.log(mainValue01)
console.log(mainValue01 === mainValue02);