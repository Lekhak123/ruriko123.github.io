var loadFile = function (event) {
    var output = document.getElementById('preview-image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src)
        document
            .getElementById("submit-button")
            .disabled = false;
        document
            .getElementById("text-results")
            .textContent = "Submit the button to identify object";

        return false;
    }
}
const final_result = result => {
    return (result !== "cannot identify"
        ? `The result is ${result}`
        : "Cannot identify object")
}
async function detect() {
    document
        .getElementById("text-results")
        .textContent = "Processing...";
    document
        .getElementById("submit-button")
        .disabled = true;
    //detect(document.getElementById('img'));return false;
    let img = document.getElementById("preview-image");

    cocoSsd
        .load()
        .then(model => {

            model
                .detect(img)
                .then(predictions => {
                    let result = predictions[0].class || "cannot identify";
                    var msg = new SpeechSynthesisUtterance();

                    msg.text = `The model predicted that the object is: ${result}`;
                    window
                        .speechSynthesis
                        .speak(msg);
                    document
                        .getElementById("text-results")
                        .textContent = `${final_result(result)}`;
                });
        });

}
