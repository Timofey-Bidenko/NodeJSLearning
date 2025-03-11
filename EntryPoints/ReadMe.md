### To-Do List App Info
# This is a very Secure To-Do App
# We Use Cookies!



## How it works
Whenever you try visiting a username, following happens:
- if there's a user with this nickname already, we'll verify if it's you via cookies.
- if there's no such user, we'll create a new one and it'll be yours! We also send authentication cookies to your browser.

## Risks and limits of our app
- One user per session: You can only access one user at a time (at least for casual users). This is because cookies are used for authentication, and if you create a second user, your first user’s authentication cookies will be overwritten, causing loss of data.
  - You can have multiple users if you manage to save and inject cookies manually, or by using multiple devices or browsers.

- Single device/browser access: You can only access your user account on one device/browser. 
  - However, you might gain access across multiple devices/browsers if you save and inject cookies correctly.

- Data deletion after 7 days of inactivity: If you don’t interact with your account for 7 days, all your data will be deleted, and your username will become available to everyone again.
  - Any activity (visiting, modifying tasks) will trigger activity and prevent the account from being deleted.
  - Anyone could keep your account active by trying to visit it. Chill, they won't access it, just the inactivity timer will be reset!
  - No recovery possible: If you forget your username or your data is deleted for inactivity, there is no way to recover it. This process is irreversible.



### To-Do List API Documentation

## POST /:mainKey
- Adds a new task to the specified user’s task list (identified by mainKey).
- Request body (JSON):
  {
      "text": "[YOUR TODO/TEXT HERE]"
  }
- Returns the newly created item.

## GET /:mainKey
- Retrieves all tasks for the specified user (mainKey).
- Returns an array of tasks for that user.

## GET /:mainKey/:itemId
- Retrieves a specific task by itemId for the given mainKey.
- Returns the requested task.

## PUT /:mainKey/:itemId
- Toggles the status of a specific task (0 <-> 1). 
- 0 = new tasks, 1 = completed tasks.
- Returns the updated task.

## DELETE /:mainKey/:itemId
- Deletes a specific task under the given mainKey.
- Responds with status 200 if successfully deleted.

## GET /*
- Triggered when none of the above routes match.
- Returns the homepage.