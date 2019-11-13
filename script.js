var newRoutine = [];

$(document).ready(function () {

    var iterator;

    var userMuscle;

    $(".frontItem").click(function () {
        $("#selectedMuscle").val(`${this.text}`);
        userMuscle = `${this.id}`;
    });

    $(".rearItem").click(function () {
        $("#selectedMuscle").val(`${this.text}`);
        userMuscle = `${this.id}`;
    });

    function getExercises() {
        let queryURL = `https://wger.de/api/v2/exercise/?language=2&muscles=${userMuscle}&status=2`;

        $.get(`${queryURL}`, function (response) {

            for (var i = 0; i < 5; i++) {
                let iterator = i;

                var newExercise = {
                    exerciseTitle: "", 
                    exerciseDescription: "", 
                    frontImage: "",
                    rearImage: ""
                };

                $(".workoutList").append(`
                    <div id="work${i}" class="workoutBlock">
                        <h5>${response.results[i].name}</h5>
                        <button id="addToRoutine">Add to routine</button>
                        <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo${i}">Tap for details</button>
                        <div id="demo${i}" class="collapse">
                        <p>${response.results[i].description}</p>
                        <div id="imageHolder${i}"></div>
                        </div>
                        
                    </div>
                `);

                newExercise.exerciseTitle = `${response.results[i].name}`;
                newExercise.exerciseDescription = `${response.results[i].description}`;

                let queryURL = `https://wger.de/api/v2/exerciseimage/?exercise=${response.results[i].id}`;

                $.get(`${queryURL}`, function (response) {
                    if (response.count == 2) {
                        $(`#imageHolder${iterator}`).append(`
                            <div>
                                <img src="${response.results[0].image}">
                                <img src="${response.results[1].image}">
                            </div>
                        `)
                        newExercise.frontImage = `${response.results[0].image}`;
                        newExercise.rearImage = `${response.results[1].image}`;
                    }
                    else {
                        $(`#imageHolder${iterator}`).append(`
                            <div>
                                <p style="text-align: center;">Sorry, no image!</p>
                            </div>
                        `)
                        newExercise.frontImage = "No image";
                        newExercise.rearImage = "No image";
                    };
                });

                newRoutine.push(newExercise);
                console.log(newRoutine);
                
            }
        })
    };

    $("#searchButton").click(function () {
        $(".workoutList").empty();
        getExercises();
    });

});