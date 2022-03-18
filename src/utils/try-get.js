const tryGet = (value) => {
    try {
      const r = value();
      if (typeof r !== 'undefined') {
        if (r === null) {
          return '';
        }
        return r;
      }
      return '';
    } catch (e) {
      return '';
    }
  };
  
  export default tryGet;