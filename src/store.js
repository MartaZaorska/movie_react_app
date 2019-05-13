export default class Store {
  static getElements(nameElement){
    let elements = [];
    if(localStorage.getItem(nameElement) !== null){
      elements = JSON.parse(localStorage.getItem(nameElement));
    }
    return elements;
  }

  static checkElement(nameElement, id){
    const elements = Store.getElements(nameElement);
    const element = elements.find(item => item.id === id);
    if(!element){
      return false;
    }else{
      return true;
    }
  }
  
  static addElementToStore(nameElement, item){
    let elements = Store.getElements(nameElement);
    elements.push(item);
    localStorage.setItem(nameElement, JSON.stringify(elements));
  }

  static removeElementFromStore(nameElement, id){
    let elements = Store.getElements(nameElement);
    const elementItem = elements.find(item => item.id === id);
    const index = elements.indexOf(elementItem);
    if(index !== -1) elements.splice(index, 1);
    localStorage.setItem(nameElement, JSON.stringify(elements));
  }

  static clearElements(nameElement){
    let elements = [];
    localStorage.setItem(nameElement, JSON.stringify(elements));
  }
}