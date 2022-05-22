$(document).ready(function() { 

    $(".add-tasks").submit(function(event){

        event.preventDefault(); 
        
        //retrieve inputs 
        var category = $("#inputCategory").val();
        var startTime = $("#inputStartTime").val();
        var endTime = $("#inputEndTime").val();
        var taskName = $("#inputTaskName").val();
        var taskLocation = $("#inputTaskLocation").val();

        if (category && startTime && endTime && taskName && taskLocation) {
            //Display a new task
            $("#tasks-list").append("<div class='list-group-item list-group-item-action flex-column align-items-start task "+ category.toLowerCase().replace(" ", "-") + "'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + taskName +" <span><small>[" + startTime +" to " + endTime + "] </small></span> <span class='close'>x</span></h5><small>" + category + " | " +taskLocation + "</small></div></div>");
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
    })

});