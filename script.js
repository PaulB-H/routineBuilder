$(document).ready(function () {

    var iterator;

    $(".frontItem").click(function () {
        console.log(`${this.text} clicked!`);
        $(".selectedMuscle").val(`${this.text}`);
    });


    function getExercises() {

        let queryURL = `https://wger.de/api/v2/exercise/?language=2&muscles=1&status=2`;

        $.get(`${queryURL}`, function (response) {
            console.log(response);
            console.log(response.results[0].category);

            for (var i = 0; i < 5; i++) {
                let iterator = i;
                console.log(iterator);

                $(".workoutList").append(`
                    <div id="work${i}" class="workoutBlock">
                        <h1>${response.results[i].name}</h1>
                        <p>${response.results[i].description}</p>
                        <button>Add to routine</button>
                    </div>
                `);

                let queryURL = `https://wger.de/api/v2/exerciseimage/?exercise=${response.results[i].id}`

                $.get(`${queryURL}`, function (response) {
                    console.log(`iterator is ${iterator}`)

                        if (response.count == 2) {
                            $(`#work${iterator}`).append(`
                            <div>
                                <img src="${response.results[0].image}">
                                <img src="${response.results[1].image}">
                            </div>
                            `)
                        }
                        else {
                            console.log("No image here");
                        };

                });
            }
        })
    };

    // function getExerciseImages


    getExercises();

});