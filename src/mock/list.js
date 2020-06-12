
const dataSource = []
for (let i = 0; i < 10; i++) {
    dataSource.push({
      key: i,
      name: `yzf${i+1}`,
      age: `yzf${i+1+i+1}`,
      address: `yzf${i+1+i+1+i+1}`
    })
}
window.localStorage.setItem('dataSource', JSON.stringify(dataSource))



