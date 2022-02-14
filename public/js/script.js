const Museum = new museumApi('https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=13&hasImages=true&q=a')

window.addEventListener("load", () => {
  Museum
    .getFullList()
    .then(data => {
      console.log(data)
    })
    .catch(error => next(error))
});