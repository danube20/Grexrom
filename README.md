# Grexrom

| HTTP Method | URI path                    | Description                                |      Protected |
| :---         |   :---:                    |          ---:                              |           ---: |
| GET          | /                          | Render index page and search               |      False     |
| GET          | /artworks                  |Render all artworks items                   |      False     |
| GET          | /register                  | Render register page                       |      False   |
| POST         | /register                  | Handle register page                       |      False     |
| GET          | /login                     | Render login page                          |      False     |
| POST         | /login                     | Handle login page                          |      False     |
| GET          | /artwork/:id               | Art work info                              |      True            |
| POST         | /artwork/:id               | Add new comment                            |      True            |
| GET          | /profile/:username         | User info(user data, favorite artwork)     | True           |
| GET          | /profile/:username/edit-info         |Render a form with user info           | True           |
| POST         | /profile/:username/edit-info         | Add/ edit user info                          | True           |
