/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const {url, data, method, callback} = options;
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

   if(method === 'GET') {
    try {
      const paramsGet = url + '?mail=' + data.mail + '&password=' + data.password;
      xhr.open(method, paramsGet);
      xhr.send();
    }
    catch (err) {
      callback(err);
    }
  } else {
    try {
      const formData = new FormData();
      formData.append('mail', data.mail);
      formData.append('password', data.password);
      xhr.open(method, url);
      xhr.send(formData);
    }
    catch (err) {
      callback(err);
    }
  }

  xhr.onload = function() {
    if(xhr.status === 200) {
      callback(null, xhr.response);
    } else {
      callback(err);
    }
  }
}