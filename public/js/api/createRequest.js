/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const {url, data, method, callback} = options;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let formData = new FormData();
  xhr.withCredentials = true;
  let resultUrl;

  if(method === 'GET') {
    formData = undefined;
    function func(url, data) {
      const arr = [];
        for(let key in data) {
          arr.push(`${key}=${data[key]}`);
        }
      return url + '?' + (arr.join('&'));
    }
    resultUrl = func(url, data);
  } else {
    for (let item in data) {
      formData.append(item, data[item]);
    }
  }

  xhr.onload = function() {
    callback(null, xhr.response);
  }
  xhr.onerror = function() {
    callback(xhr.statusText, null); 
  }

  try {
    if (formData !== undefined) {
      xhr.send(formData);
    } else {
      xhr.open(method, resultUrl);
      xhr.send();
    }
  }
  catch (e) {
    callback(e);
  }
};


// здесь перечислены все возможные параметры для функции
// createRequest({
//   url: 'http://localhost:8000', // адрес
//   data: { // произвольные данные, могут отсутствовать
//     email: 'ivan@poselok.ru',
//     password: 'odinodin'
//   },
//   method: 'POST', // метод запроса
  
//     // Функция, которая сработает после запроса.
//     // Если в процессе запроса произойдёт ошибка, её объект
//     // должен быть в параметре err.
//     // Если в запросе есть данные, они должны быть переданы в response.
  
//   callback: (err, response) => {
//     console.log( 'Ошибка, если есть', err );
//     console.log( 'Данные, если нет ошибки', response );
//   }
// });