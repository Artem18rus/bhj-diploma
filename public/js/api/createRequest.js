/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
  const {url, data, method, callback} = options;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  let formData = new FormData();
  let resultUrl;

  try {
    const arr = [];
      for(let key in data) {
        arr.push(`${key}=${data[key]}`);
      }
    resultUrl = url + '?' + (arr.join('&'));

    for (let item in data) {
      formData.append(item, data[item]);
    }
    xhr.open(method, resultUrl);
  } catch (e) {
    callback(e);
  }

  if(method === 'GET') {
    xhr.send();
  } else {
    xhr.send(formData);
  }

  xhr.onload = function() {
    callback(null, xhr.response);
  }
  xhr.onerror = function() {
    callback(xhr.statusText, null); 
  }
};


// //здесь перечислены все возможные параметры для функции
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