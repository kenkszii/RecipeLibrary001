
function LocalStorage(key) {
  function save(credentials) {
    localStorage.setItem(key, JSON.stringify(credentials));
  };


  function load() {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    } else {
      return;
    }
  };


  function destroy() {
    localStorage.removeItem(key);
  };

  
  function update(newCredentials) {
    const savedCredentials = load();

    if (savedCredentials) {
      let credentials = savedCredentials;

      Object.assign(credentials, newCredentials);

      save(credentials);
    };
  };
  

  return {save, load, destroy, update};
};


function useLocalStorage(key) {
	return LocalStorage(key);
};


export {LocalStorage, useLocalStorage};