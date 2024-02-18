import { TCoursePart } from '../types/types';

interface IPartProps {
    part: TCoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = (props: IPartProps) => {
    switch (props.part.kind) {
        case 'basic':
            return (
                <div>
                    <h3>
                        {props.part.name} {props.part.exerciseCount}
                    </h3>
                    <p>
                        <i>{props.part.description}</i>
                    </p>
                </div>
            );
        case 'group':
            return (
                <div>
                    <h3>
                        {props.part.name} {props.part.exerciseCount}
                    </h3>
                    <p>project exercises {props.part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <h3>
                        {props.part.name} {props.part.exerciseCount}
                    </h3>
                    <p>
                        <i>{props.part.description}</i>
                    </p>
                    <p>submit to {props.part.backgroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <h3>
                        {props.part.name} {props.part.exerciseCount}
                    </h3>
                    <p>
                        <i>{props.part.description}</i>
                    </p>
                    <p>required skills: {props.part.requirements.join(', ')}</p>
                </div>
            );
        default:
            return assertNever(props.part);
    }
};

export default Part;
