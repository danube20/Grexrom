# Grexrom

| HTTP Method | URI path            | Description                                |      Protected |
| :---         |   :---:            |          ---:                              |           ---: |
| GET          | /                  | Render index page and search               |      False     |
| GET          | /registro          | Render register page                       |        False   |
| POST         | /registro          | Handle register page                       |      False     |
| GET          | /login             | Render login page                          |      False     |
| POST         | /login             | Handle login page                          |      False     |
| GET          | /info/:Id          | Art work info                              |True            |
| POST         | /info/:Id          | Add new comment                            |True            |
| GET          | /profile           | User info(user data, favorite artwork)     | True           |
| POST         | /profile           | Add new user info                          | True           |
