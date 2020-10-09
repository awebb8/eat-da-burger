// Wait to attach handlers until the DOM is fully loaded.
$(function() {
    $(".eat").on("click", function(event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("newdevour");

        var newBurgerState = {
            devoured: newDevour
        };

        // Send PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function() {
                console.log("changed devoured to", newDevour);
                // Reload the page to get the updated list of burgers
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#burger").val().trim(),
            devour: $("[name=devoured]:checked").val().trim()
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