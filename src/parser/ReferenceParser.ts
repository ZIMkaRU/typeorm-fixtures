import { random } from 'lodash';
import { IParser, IFixture } from '../interface';

export class ReferenceParser implements IParser {
    public priority = 50;

    isSupport(value: string): boolean {
        return value.indexOf('@') === 0;
    }

    parse(value: string, fixture: IFixture, entities: any): any {
        if (value.substr(value.length - 1) === '*') {
            const prefix = value.substr(1, value.length - 1);
            const regex = new RegExp(`^${prefix}([0-9]+)$`);
            const maskEntities = Object.keys(entities).filter((s: string) => regex.test(s));

            return entities[maskEntities[random(maskEntities.length - 1)]];
        } else {
            return entities[value.substr(1)];
        }
    }
}
