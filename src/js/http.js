const transformer = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    maximumSignificantDigits: 8,
  });
  const transformer2 = new Intl.NumberFormat('en-US', {
    style: 'percent',
maximumFractionDigits:2
  });
(async () => {
    const api = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,litecoin,bitcoin-cash&vs_currencies=usd&include_24hr_change=true").then((response) => {
        return response.json();
    })

    console.log(api);
    Object.keys(api).map(async (key) => {
        const image = (await fetch('https://api.coingecko.com/api/v3/coins/' + key).then((r) => r.json())).image.small;

        const ribbon = document.createRange().createContextualFragment(/*html*/`
        <div class="slide">
        <img src="${image}" class="img-fluid coin-img" alt="slider" />
        <span class='ms-1 text-light'> ${key}</span>
        <span class='ms-1 text-success'> ${transformer.format(Number(api[key].usd))}</span>
        <span class='ms-1 text-danger'> ${transformer2.format(Number(api[key].usd_24h_change)/100)}</span>
       </div>

        `
        )
        document.getElementById("track").append(ribbon)
    })

    
    
    // return api;
})();