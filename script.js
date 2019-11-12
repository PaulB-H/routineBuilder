$(document).ready(function () {



    $( ".frontItem" ).click(function() {
        console.log(`${this.text} clicked!`);
        $(".selectedMuscle").val(`${this.text}`);
    });




    function getExercises() {
        let queryURL = `https://wger.de/api/v2/exercise/?language=2&muscles=1&status=2`;

        $.get(`${queryURL}`, function (response) {
            console.log(response);
            console.log(response.results[0].category);

            for (var i = 0; i < 5; i++) {
                    $(".workoutList").append(`
                    <div class="workoutBlock">
                        <h1>${response.results[i].name}</h1>
                        <p>${response.results[i].description}</p>
                        <button>Add to routine</button>
                    </div>
                    `);
            }
        })
    };





    getExercises();

});