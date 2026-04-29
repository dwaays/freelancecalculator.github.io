async function getExchangeRates() {
  var response = await fetch("https://open.er-api.com/v6/latest/USD")
  var data = await response.json()
  return data.rates
}

window.onload = async function() {
  var rates = await getExchangeRates()

  document.getElementById("calcBtn").addEventListener("click", function() {
    var pages = Number(document.getElementById("pages").value)
    var deadline = Number(document.getElementById("deadline").value)
    var selectedCurrency = document.getElementById("currency").value
    var currency = rates[selectedCurrency]
    var symbols = {"USD": "$", "GBP": "£", "EUR": "€", "GHS": "₵"}
    var s = symbols[selectedCurrency]

    if (pages <= 0 || deadline <= 0 || isNaN(pages) || isNaN(deadline)) {
      document.getElementById("result").textContent = "Please enter valid numbers!"
      return
    }

    var price = pages * 50 * currency

    if (deadline <= 3) {
      price = price + (100 * currency)
    }

    document.getElementById("result").innerHTML =
      "Base price: " + s + (pages * 50 * currency).toFixed(2) + "<br>" +
      "Urgency fee: " + s + (deadline <= 3 ? (100 * currency).toFixed(2) : "0.00") + "<br>" +
      "<strong>Total: " + s + price.toFixed(2) + "</strong>"
  })
}
