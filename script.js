$(document).ready(function () {

    var iterator;

    var userMuscle;

    $(".frontItem").click(function () {
        console.log(`${this.text} clicked!`);
        console.log(`The muscleID is: ${this.id}`);
        $(".selectedMuscle").val(`${this.text}`);
        userMuscle = `${this.id}`;
        console.log(userMuscle);
    });

    $(".rearItem").click(function () {
        console.log(`${this.text} clicked!`);
        console.log(`The muscleID is:${this.id}`);
        $(".selectedMuscle").val(`${this.text}`);
        userMuscle = `${this.id}`;
        console.log(userMuscle);
    });

    function getExercises() {
        let queryURL = `https://wger.de/api/v2/exercise/?language=2&muscles=1&status=2`;

        $.get(`${queryURL}`, function (response) {

            for (var i = 0; i < 5; i++) {
                let iterator = i;

                $(".workoutList").append(`
                    <div id="work${i}" class="workoutBlock">
                        <h5>${response.results[i].name}</h5>
                        <button>Add to routine</button>
                        <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo${i}">Tap for details</button>
                        <div id="demo${i}" class="collapse">
                        <p>${response.results[i].description}</p>
                        <div id="imageHolder${i}"></div>
                        </div>
                        
                    </div>
                `);

                let queryURL = `https://wger.de/api/v2/exerciseimage/?exercise=${response.results[i].id}`;

                $.get(`${queryURL}`, function (response) {
                    if (response.count == 2) {
                        $(`#imageHolder${iterator}`).append(`
                            <div>
                                <img src="${response.results[0].image}">
                                <img src="${response.results[1].image}">
                            </div>
                            `)
                    }
                    else {
                        console.log("No image here");
                        $(`#imageHolder${iterator}`).append(`
                            <div>
                            <p style="text-align: center;">Sorry, no image!</p>
                            </div>
                            `)
                    };
                });
            }
        })
    };


    // https://wger.de/api/v2/exercise/?language=2&muscles=1&status=2

    $("#searchButton").click(function () {
        $(".workoutList").empty();
        console.log(userMuscle);
    });


    getExercises();
});