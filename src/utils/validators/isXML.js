const isXML = (str) => {
  try {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(str, "application/xml");

    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export default isXML;
