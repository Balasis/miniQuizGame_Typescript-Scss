export class Assist {
    used;
    description;
    UIdescription;
    constructor(used = false, description, UIdescription) {
        this.used = used;
        this.description = description;
        this.UIdescription = UIdescription;
    }
    getUIdescription() {
        return this.UIdescription;
    }
    getUsed() {
        return this.used;
    }
    setUsed(b) {
        this.used = b;
    }
}
export default Assist;
