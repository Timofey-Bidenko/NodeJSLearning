# To-Do List API Documentation

## POST /:mainKey
- Adds a new task to the specified mainKey category.
- Request body (JSON):
  {
      "text": "[YOUR TODO/TEXT HERE]"
  }
- Returns the newly created item as JSON.

## GET /:mainKey
- Retrieves all tasks under the specified mainKey.
- Returns an array of tasks.

## GET /:mainKey/:itemId
- Retrieves a specific task by itemId under the given mainKey.
- Returns the task as JSON.
- Responds with 404 if not found.

## PUT /:mainKey/:itemId
- Toggles the status of a specific task (new <-> done).
- Returns the updated task.
- Responds with 404 if not found.

## DELETE /:mainKey/:itemId
- Deletes a specific task under the given mainKey.
- Responds with 200 if successfully deleted.
- Responds with 404 if the task does not exist.

## GET /*
- Triggered when none of the above routes match.
- Returns the entire dataset (all mainKeys and their items).