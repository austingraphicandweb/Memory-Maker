$(document).ready(function () {
  const newMemoryForm = $("#saveNewMemories");
  const title = $("#title");
  const date = $("#date");
  const description = $("#description");
  const location = $("#location");
  const rating = $("#rating");
  const category = $("#category");
  
  // const url = $("#url");

  newMemoryForm.on("click", function (event) {
    // // Sets a flag for whether or not we're updating a post to be false initially
    // let updating = false;
    event.preventDefault();
    let ratingStars = $("#rating input[name='star']:checked");
    const memoryId = event.target.getAttribute("data-id");
    const newEventData = {
      title: title.val().trim(),
      date: date.val().trim(),
      description: description.val().trim(),
      location: location.val().trim(),
      category: category.val().trim(),
      rating: ratingStars.val(),
    };
    // If we're updating a memory run updateMemory to update a memory
    // Otherwise run submitmemory to create a whole new event
    if (!memoryId) {
      submitNewMemory(newEventData);
    } else {
      updateMemory(newEventData);
    }

    title.val("");
    date.val("");
    description.val("");
    location.val("");
    category.val("");
  });

  function submitNewMemory(newEvent) {
    const formData = new FormData();

    Object.keys(newEvent).forEach(function (field) {
      const value = newEvent[field];
      formData.append(field, value);
    });

    $.each($("input[type='file']")[0].files, function (i, file) {
      formData.append("file[]", file);
    });

    // $.ajax({
    //   type: "POST",
    //   url: "/api/newMemory",
    //   cache: false,
    //   contentType: false,
    //   processData: false,
    //   data: formData,
    //   success: function (result) {
    //     window.location.href = "/memories";
    //   },
    //   error: function (err) {
    //     // throw err;
    //     alert("Please, make sure to fill out each field and choose rating for your memories!");
    //   },
    // });
    $.ajax({
      type: "POST",
      url: "/api/newMemory",
      cache: false,
      contentType: false,
      processData: false,
      data: formData,
    })
      .then(res => {
        window.location.replace(`/memories`);
      })
      .catch(function (err) {
        alert("Please, make sure to fill out each field with at least 3 characters and choose rating for your memories!");
  });
  }

  // Update a given event, bring user to the blog page when done
  function updateMemory(memory) {
    const memoryId = event.target.getAttribute("data-id");
    console.log(memoryId);

    $.ajax({
      method: "PUT",
      url: "/api/newMemory/"+memoryId,
      data: memory,
    }).then(function () {
      window.location.replace("/memories");
    });
  }
});



// const idNum = window.location.pathname.split("/")[3];
// const update = $("#update-memory");
// function updateMemory(par) {

//   $.ajax({
//     method: "GET",
//     url: "/newMemory/" + idNum,
//     data: par,
//   }).then(function () {
//     window.location.href = "/newMemory/"+ idNum;
//   });
// }
// update.on("click", (event) => {
//   event.preventDefault();
//   const memoryId = event.target.getAttribute("data-id");

//   console.log(typeof memoryId);
//   var updMemory = {
//     id: parseInt(memoryId),
//     title: $("#title").text(),
//     date: $("#date").text(),
//     description: $("#description").text(),
//     rating: $("#rating").text(),
//     location: $("#location").text(),
//     category: $("#category").text(),
//     image: $("#image").text(),
//   };
//   updateMemory(updMemory);
// });
