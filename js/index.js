$(document).ready(function() { 

    $("#tasks-list").html(localStorage.getItem("tasks-list"));

    $(".add-tasks").submit(function(event){

        event.preventDefault(); 
        
        //retrieve inputs 
        var category = $("#inputCategory").val();
        var otherCategory = $("#inputOtherCategory").val();
        var startTime = $("#inputStartTime").val();
        var endTime = $("#inputEndTime").val();
        var taskName = $("#inputTaskName").val();
        var taskLocation = $("#inputTaskLocation").val();

        if (category && startTime && endTime && taskName && taskLocation) {

            //Error handling
            if(taskName.length < 3){
                $("#feedback").html("Task name should be longer than 3 characters!"); 
                return;
            }

            if (otherCategory){
                $("#tasks-list").append("<div class='list-group-item list-group-item-action flex-column align-items-start task "+ category.toLowerCase().replace(" ", "-") + "'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + taskName +" <span><small>[" + startTime +" to " + endTime + "] </small></span><span class='close'>x</span></h5><small>" + otherCategory + " | <a class='location-link' id='"+ taskLocation.toLowerCase().replace(" ","_") + "'> " + taskLocation + "</a></small></div></div>");
            } else {
                $("#tasks-list").append("<div class='list-group-item list-group-item-action flex-column align-items-start task "+ category.toLowerCase().replace(" ", "-") + "'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + taskName +" <span><small>[" + startTime +" to " + endTime + "] </small></span> <span class='close'>x</span></h5><small>" + category + " | <a class='location-link' id='"+ taskLocation.toLowerCase().replace(" ","_") + "'> " + taskLocation + "</a></small></div></div>");
            }
                
            //Save 
            localStorage.setItem("tasks-list", $("#tasks-list").html());

            //feedback
            $("#feedback").html("Task added!"); 

        } else{
            $("#feedback").html("Please fill out all the fields!"); 
        }  

    });

    //redirect to google map 
    $(document).on('click', ".location-link", function () {
        var taskLocationId = $(this).attr("id");
        //notification
        if (confirm('You are about to be redirected to google map!')) {
            window.open("http://maps.google.com/?q=" +  taskLocationId + "");
        } else {
            alert('Canceled');
        }
    });

    $(".filter").click(function(){
        $(".filter").removeClass("active");
        $(this).addClass("active");
        var subjectId = $(this).attr("id");
        $(".task").show();
        if(subjectId !== "all" ) {
            //hide uncorresponding tasks
            $(".task").not("." + subjectId).css("display", "none");
        }
    });

    //Delete a task by clicking on the x icon
    $(document).on('click',".close", function(){
        $(this).fadeOut(500, function(){
            $(this).closest(".list-group-item").remove();
        })
        //update local storage
        localStorage.setItem("tasks-list", $("#tasks-list").html());
    })

    //Delete all tasks by clicking on the delete all button
    $(document).on('click', ".btn-delete-all", function (event){
        if (confirm('You are about to delete all the tasks in the list!')) {
            $(".task").remove();
            alert('Deletion successful!');
            event.preventDefault;
        } else {
            alert('Canceled');
        }
    })

    //show other category
    $("#inputCategory").change(function() {
        if ($("#inputCategory").val() == "other") {
            $("#otherCategory").removeClass("hidden");
        } else $("#otherCategory").addClass("hidden");
    })

});




