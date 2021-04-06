class DataStateTemplate {
  constructor() {
    this.uuid_family_member = null;
    this.first_name = "";
    this.middle_name = "";
    this.last_name = "";
    this.d_o_b = null;
    this.d_o_d = null;
    this.gender = null;
    this.mothe = {
      uuid_family_member: "",
      first_name: "",
      middle_name: "",
      last_name: "",
    };
    this.fathe = {
      uuid_family_member: "",
      first_name: "",
      middle_name: "",
      last_name: "",
    };
    this.children = [];
    this.spouses = [];
  }
}

export default DataStateTemplate;
