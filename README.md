# Grexrom

| HTTP Method | URI path            | Description                                |      Protected |
| :---         |   :---:            |          ---:                              |           ---: |
| GET          | /                  | Render index page and search               |                |
| GET          | /registro          | Render register page                       |                |
| POST         | /registro          | Handle register page                       |                |
| GET          | /login             | Login page                                 |                |
| GET          | /info/:ID          | Art work info                              |comment section |
| GET          | /profile           | User info(user data, favorite artwork)     | all page       |
| POST         | /profile           | add new user info                          | all page       |
