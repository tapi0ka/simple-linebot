

export default class UserService {
  constructor(userModel, companyModel, salaryModel){
    this.userModel = userModel;
    this.companyModel = companyModel;
    this.salaryModel = salaryModel;
  }
  getMyUser(userId){
    // models available throug 'this'
    const user = this.userModel.findById(userId);
    return user;
  }
}