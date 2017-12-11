import { TransactionalBase } from './transactionalBase.entity';

export class Challenge extends TransactionalBase {
    public name: string;
    public category: string;
    public amount: number;
}
