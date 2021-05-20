class StateTemplate {
  constructor() {
    this.dataState = {
      uuid_family_member: null,
      first_name: "",
      middle_name: "",
      last_name: "",
      d_o_b: null,
      d_o_d: null,
      gender: null,
      mothe: {
        uuid_family_member: "",
        first_name: "",
        middle_name: "",
        last_name: "",
      },
      fathe: {
        uuid_family_member: "",
        first_name: "",
        middle_name: "",
        last_name: "",
      },
      children: [],
      spouses: [],
    };
    this.UIstate = {
      editMode: false,
      editNewChild: false,
      editNewParent: false,
      editNewSpouse: false,
      newParentGender: null,
      editFamilyMember: false,
      editFamilyMemberMode: undefined,
      editFamilyMemberUUID: undefined,
      editMarriage: false,
      editMarriageUUID: undefined,
      showSettings: false,
    };
    this.photo = undefined;
    this.photoUrl = undefined;
    this.isPublic = undefined;
    this.publicName = undefined;
  }
}

export default StateTemplate;
