# Presenter Alarm App

## WebSocket Info

### Timer

#### Listeners

- "start-timer", "stop-timer"

#### Fire New Event From Server

- "get-timer"

---

### Remark

#### Listeners

- "all-remarks", "create-remark", "update-remark", "delete-remark"
- "create-remark" accept these parameters as payload i.e. projectId (string), description (string)
- "update-remark" accept these params as payload i.e. remarkId (string), description (string)
- "delete-remark" accept these params as payload i.e. id (string)

---

### Presenter View

#### Listeners

- "all-presenter-questions", "create-presenter-question", "delete-presenter-question", "move-presenter-question-to-archived"
- "create-presenter-question" accept params i.e. name (string), questionText (string), project (string)
- "delete-presenter-qusetion" accept params i.e. questionId (string), projectId (string)
- "move-presenter-question-to-archived" accept params i.e questionId (string), projectId (string)

#### Fire Event

- "new-presenter-question"

---

### Moderator View

#### Listeners

- "all-moderator-questions", "create-moderator-question", "delete-moderator-question", "move-moderator-question-to-live"
- "create-moderator-question" accept params i.e. name (string), questionText (string), project (string)
- "delete-moderator-question" accept params i.e. questionId (string), projectId (string)
- "move-moderator-question-to-live" accept params i.e. qusetionId (string), projectId (string)

#### Fire Event

- "new-moderator-question"

---

### Live Questions

#### Listeners

- "all-live-questions", "delete-live-question", "move-live-question-to-archived"
- "delete-live-question" accept params i.e. questionId (string), projectId (string)
- "move-live-question-to-archived" accept params i.e. questionId (string), projectId (string)

---

### Incoming Question

#### Listeners

- "all-incoming-questions", "create-incoming-question", "delete-incoming-question", "move-incoming-question-to-moderator", "move-incoming-question-to-presenter"

- "create-incoming-question" accept params i.e. name (string), questionText (string), project (string)
- "delete-incoming-question" accept params i.e. questionId (string), projectId (string)
- "move-incoming-question-to-moderator" accept params i.e. questionId (string), projectId (string)
- "move-incoming-question-to-presenter" accept params i.e. questionId (string), projectId (string)

#### Fire Event

- "new-incoming-question"

---

### Archived Question

#### Listeners

- "delete-archived-question"
- "delete-archived-qusetion" accept params i.e. questionId (string), projectId (string)
