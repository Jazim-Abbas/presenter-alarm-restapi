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