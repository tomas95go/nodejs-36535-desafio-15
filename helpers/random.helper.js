const generateRandomNumber = (cant) => {
  const randomNumbers = [];

  for (let i = 0; i < Number(cant); i++) {
    const randomNumber = Math.floor(Math.random() * (1000 - 1) + 1);
    const isPresent = randomNumbers.findIndex(
      (element) => element.randomNumber === randomNumber
    );
    if (isPresent === -1) {
      randomNumbers.push({
        randomNumber,
        times_repeated: 0,
      });
    } else {
      randomNumbers[isPresent].times_repeated++;
    }
  }
  return randomNumbers;
};

process.on("message", (msg) => {
  const { cant } = msg;
  const result = generateRandomNumber(cant);
  process.send(result);
});
