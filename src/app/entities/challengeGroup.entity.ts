export class ChallengeGroup {

    constructor(){
        this.data = [];
    }

    public name: string;
    public data: Dictionary[]= [];
}

export class Dictionary {
    public key: string;
    public value: string;
}
