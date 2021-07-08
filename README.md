# Presenter Alarm App

## WebSocket Info

### Timer

#### Listeners

- "start-timer", "stop-timer"

#### Fire New Event From Server

- "get-timer"

### Remark

#### Listeners

- "all-remarks", "create-remark", "update-remark", "delete-remark"
- "create-remark" accept these parameters as payload i.e. projectId (string), description (string)
- "update-remark" accept these params as payload i.e. remarkId (string), description (string)
- "delete-remark" accept these params as payload i.e. id (string)
