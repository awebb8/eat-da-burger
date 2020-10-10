// alert("connected");

// Wait to attach handlers until the DOM is fully loaded.
$(function() {
    $(".eat").on("click", function(event) {
        console.log("button works");
        console.log("this:" + $(this).data("newdevour"));
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newBurgerState = {
            devoured: !newDevour
        };

        console.log(newBurgerState);

        // Send PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function() {
                console.log("change to newDevour", newDevour);
                // Reload the page to get the updated list of burgers
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#burger").val().trim(),
            devoured: $("[name=devoured]:checked").val()
        };

        // Send POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created new burger to eat");
                location.reload();
            }
        );
    });

});