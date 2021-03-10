import FamilyMember from "./FamilyMember";

class Target {
  constructor() {
    this.target = new FamilyMember();
    this.mother = new FamilyMember();
    this.father = new FamilyMember();
    this.children = [];
    this.spouses = [];
  }
}

export default Target;
