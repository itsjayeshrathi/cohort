const inputA = document.querySelector("#fieldA");
const inputB = document.querySelector("#fieldB");
const submit = document.querySelector("#submit");
const answerBox = document.querySelector("#answer");

submit.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8000/sum", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      a: inputA.value,
      b: inputB.value,
    }),
  });
  const content = await response.json();
  console.log(content);
  answerBox.value = content.ans;
});
