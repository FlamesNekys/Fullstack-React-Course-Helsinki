import { TCoursePart } from '../types/types';
import Part from './Part';

interface IContentProps {
    content: TCoursePart[];
}

const Content = (props: IContentProps) => {
    return (
        <div>
            {props.content.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    );
};

export default Content;
