// get
export const get = function(url, params) {
    let list = [];
    for (let key in params) {
        let str = `${key}=${params[key]}`
        list.push(str);
    }
    const data = list.join('&');
    let gUrl = `${url}?${data}`;
    if (list.length > 0) {
      gUrl = `${url}?${data}`;
    } else {
      gUrl = url;
    }
    return fetch(gUrl).then(response => {
      if (response.status === 200) return response.json();
    }).catch(err => {
        console.log(err);
    });
  };