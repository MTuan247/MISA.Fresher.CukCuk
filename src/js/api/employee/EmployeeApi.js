import BaseAPI from "../base/BaseApi";

export default class EmployeeApi extends BaseAPI {
    constructor() {
        super()
    }
    // static api = "http://cukcuk.manhnv.net/v1/Employees/"
    static host = "https://localhost:44334/api/v1/"
    static api = this.host + "Employee/"
    static positionApi = this.host + "Position/"
    static departmentApi = this.host + "Department/"
}