
const url = "./myDegrees.json";

const loadButton = document.querySelector("#load-career");
const loadingImage = document.querySelector("#loading");
const careers = document.querySelector("#career-container");
const errorMsg = document.querySelector("#error");

loadButton.addEventListener('click', () => {
    loadingImage.classList.remove("hidden");
    careers.parentElement.classList.add("hidden");
    loadButton.disabled = true;

    console.log("Starting to load..");

  window.setTimeout(() => {
    fetch(url)
        .then((response) => {
            console.log(response);
            let resultCode = response.status;

            if (resultCode === 200) {
                return { success: true, content:  response.json()};
            }
            else if (resultCode == 404){
                return { success: false, content:  "Can not read data"};    
            }
            return { success: false, content:  "Unknown error"};    
        })
        .then(function (data) {
            console.log(data);
            loadingImage.classList.add("hidden");
            careers.parentElement.classList.remove("hidden");

            if (data.success)
            {
                data.content.then(function (json) {
                    // Load contents...
                    console.log(json);
                    // errorMsg.innerHTML = json.FirstName + " " + json.LastName;
                    // errorMsg.parentElement.classList.remove("hidden");

                    json.CollegeDegrees.forEach(ele => {
                       
                        let div = document.createElement('div');
                        div.className="degree-box";
                        div.innerHTML=`<h2>${ele.School}</h2>
                            <b>Program</b>: ${ele.Program}<br />
                            <b>Degree</b>: ${ele.DegreeType}<br />
                            <b>Year</b>: ${ele.YearConferred}`;

                        careers.appendChild(div);
                    });
                });
                return;
            }
            errorMsg.innerHTML = data.content;
            errorMsg.parentElement.classList.remove("hidden");
        })
        .catch(function (error) {
            console.log(error);
            loadingImage.classList.add("hidden");
            errorMsg.classList.remove("hidden");

            errorMsg.innerHTML = error;
        });
    }, 1000);
});

