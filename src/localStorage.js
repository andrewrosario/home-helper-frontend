export const saveState = (state) => {
    try {
      console.log('localstorage.js state', state)
      const serializedState = JSON.stringify(state);
      console.log('serialized state', serializedState)
      localStorage.setItem('state', serializedState);
    } catch(error) {
      // ignore write errors
      console.log('saveState errors', error)
    }
  };

  export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      console.log(localStorage.getItem('state'))
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 
  