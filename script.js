
let partele = document.getElementById("data-table")

async function dataload(){
    let response =  await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    let data = await response.json()
    data.forEach(item => {
        renderdata(item)
    });
    console.log(typeof(data))
    return data
}
//dataload()

function renderdata(item){
    let ele = document.createElement("tr")
    ele.innerHTML = `<td class="icon"><img src=${item.image}</td>
        <td>${item.name}</td>
        <td>${item.symbol}</td>
        <td>$ ${item.current_price}</td>
        <td>$ ${item.total_volume}</td>
        <td>${item.market_cap_change_percentage_24h}%</td>
        <td>Market Capital: ${item.market_cap}</td>`
    
    partele.appendChild(ele)
}
function searchData() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    let origData = dataload()
    let originalData = Object.entries(origData)
    const filteredData = originalData.filter(crypto => crypto.name.toLowerCase().includes(searchInput) || crypto.symbol.toLowerCase().includes(searchInput));
    renderdata(filteredData);
  }

  // Sort function
  function sortData() {
    let origData = dataload()
    let originalData = Object.entries(origData)
    const sortedData = originalData.slice().sort((a, b) => a.market_cap - b.market_cap);
    renderdata(sortedData);
  }
  function sortData2() {
    let origData = dataload()
    let originalData = Object.entries(origData)
    const sortedData = originalData.slice().sort((a, b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h);
    renderdata(sortedData);
  }
  document.getElementById("sort").addEventListener("click",sortData())
  document.getElementById("sort2").addEventListener("click",sortData2())