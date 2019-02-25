$(document).ready(function () {
    var topics = [
        "Colombia",
        "United States",
        "Chile",
        "Argentina",
        "Domincan Republic",
        "France",
        "Italy",
        "Germany",
        "Venezuela",
        "Brazil",
        "Paraguay",
        "Uruguay",
        "Island",
    ]


    /**
     *
    Create buttons of the elements in an array  
     * @param {*} _array array of srings with the elements to be created
     */
    function createButtons(_array) {

        _array.forEach(_element => {

            $(".buttons").prepend(`<button class="btnCity btn btn-outline-info">${_element}`);
        });

    }

    createButtons(topics);

    // Event to create butttons
    $("#insert").on("click", function (event) {
        event.preventDefault();

        let _text = $("#txtSearch").val();

        // if the text is not empty then execute it
        if (_text.trim() !== "") {

            // if the button does not exist then create it
            if (topics.indexOf(_text) === -1) {

                // Insert the input value into the array
                topics.push(_text);

                // clear the buttons div to create everithind again
                $(".buttons").empty();

                // call function to create the buttons
                createButtons(topics);
                
                $("#txtSearch").val("");

            }
            else {
                alert("The country is already on then list");
            }
        }
        else {
            alert("Please insert a country");
        }
    })

    $("#clearText").on("click", function (event) {
        $("#txtSearch").val("");
    })

    // click event of every element with the class btnCity
    $(document).on("click", ".btnCity", event => {

        event.preventDefault();

        // ask for number of items selection
        if ($("#numSelect").val() === "Choose...") {
            alert("Please select the number of items to show")
        }
        else {

            $(".images").empty();

            var _key = 'DT3tAeGh3WmOI5Kdmlpi2tw42OOE0sgs';
            var _searchValue = event.currentTarget.textContent;
            var _limit = "&limit=" + $("#numSelect").val();

            console.log('https://api.giphy.com/v1/gifs/search?q=' + _searchValue + '&api_key=' + _key + _limit);
            $.ajax({
                url: 'https://api.giphy.com/v1/gifs/search?q=' + _searchValue + '&api_key=' + _key + _limit,
                method: "GET"
            }).then(function (response) {

                // console.log(response)

                // store the array from the response
                var _data = response.data;

                for (var i = 0; i < _data.length; i++) {

                    // variable to store the element
                    var _element = _data[i];

                    var _urlStillGif = _element.images.original_still.url;
                    var _urlOriginalGif = _element.images.original.url;
                    var _rating = _element.rating;
                    var _title = _element.title;


                    $(".images").append(
                        `<div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div class="card_content card text-center">
                    <div class="card-header">
                    ${_title}
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <img id="img${i}" class="responseImage card-img-top" src="${_urlStillGif}" active="0" data-still="${_urlStillGif}" data-original="${_urlOriginalGif}" alt="">            
                            <footer class="blockquote-footer"><cite title="Source Title">${_rating}</cite></footer>
                        </blockquote>
                    </div>
                    </div>
                </div>`);
                }

            })
        }
    })

    // event for each image
    $(document).on("click", ".responseImage", event => {

        var _imageId = event.currentTarget.id;
        // console.log(_imageId)


        var _image = $("#" + _imageId);
        var _active = _image.attr("active")


        if (_active === "0") {
            _imageUrl = _image.attr("data-original");
            _image.attr("active", "1");
        }
        else {
            _imageUrl = _image.attr("data-still");
            _image.attr("active", "0");
        }

        _image.attr("src", _imageUrl);

    });
});