$(document).ready(function () {
  const idNum = window.location.pathname.split("/")[3];
  const update = $("#update-memory");
  const del = $("#delete-memory");


  const updateMemory = memoryData => {
    $.ajax({
      method: "GET",
      url: "/newMemory/" + idNum,
      data: memoryData,
    }).then(() => window.location.href = "/newMemory/" + idNum);
  };
  
  const delMemory = event => { 
    const memoryId = event.target.getAttribute("data-id");
    $.ajax({
      method: "DELETE",
      url: "/memories/id/" + memoryId,
    }).then(result => {
      toastr.success("Memory deleted");
      setTimeout(() => window.location.href = "/memories", 2000);
    });
  };

  update.on("click", (event) => {
    event.preventDefault();
    const memoryId = event.target.getAttribute("data-id");
    const updMemory = {
      id: parseInt(memoryId),
      title: $("#title").text(),
      date: $("#date").text(),
      description: $("#description").text(),
      rating: $("#rating").text(),
      location: $("#location").text(),
      category: $("#category").text(),
      image: $("#image").text(),
    };
    updateMemory(updMemory);
  });

  del.on("click", (event) => {
    event.preventDefault();
    delMemory(event);
  });

 
   
  // const arrayOfDates = [];
  // $(".singledate").each(function (index) {
  //   console.log(
  //     index + ": " + $(this).text().split(/\s+/).slice(1, 4).join(" ")
  //   );
  //   arrayOfDates.push($(this).text().split(/\s+/).slice(1, 4).join(" "));
  // });
  // console.log(arrayOfDates);
  // let timeDisplayed = document.querySelectorAll(".singledate");
  // for (i = 0; i < arrayOfDates.length; i++) {
  //   timeDisplayed[i].innerHTML = arrayOfDates[i];
  // }
});
