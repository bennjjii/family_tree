import FamilyMember from "./FamilyMember";

class Target {
  constructor() {
    this.uuid_box = "704459f2-c51b-4433-9991-30a4ef63c63f";
    this.uuid_target = "";
    this.target = new FamilyMember();
    this.mother = new FamilyMember();
    this.father = new FamilyMember();
    this.children = [];
    this.spouses = [];
    this.UIstate = {
      editMode: false,
      editNewChild: false,
      editNewParent: false,
      editNewSpouse: false,
      newParentGender: null,
    };
  }
}

export default Target;
