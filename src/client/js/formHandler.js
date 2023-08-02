function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let formText = document.getElementById("text").value;

  // Check if the input is blank
  if (formText.trim() === "") {
    alert("Please enter some text");
    return;
  }
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");

  fetch("/api/key")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const apiKey = data.apiKey;

      console.log(`API key is ${apiKey}`);

      const formdata = new FormData();
      formdata.append("key", apiKey);
      formdata.append("txt", formText);
      formdata.append("lang", "en");

      console.log(formdata);
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      return fetch(
        "https://api.meaningcloud.com/sentiment-2.1",
        requestOptions
      );
    })
    .then((response) => ({
      status: response.status,
      body: response.json(),
    }))
    .then((data) => {
      console.log(data);
      document.getElementById("agreement").innerHTML = data.agreement;
      document.getElementById("confidence").innerHTML = data.confidence;
      document.getElementById("irony").innerHTML = data.irony;
      document.getElementById("score_tag").innerHTML = data.score_tag;
      document.getElementById("subjectivity").innerHTML = data.subjectivity;
    })
    .catch((error) => console.log("error", error));
}

export { handleSubmit };
