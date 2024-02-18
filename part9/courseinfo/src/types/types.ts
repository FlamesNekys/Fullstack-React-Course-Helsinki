interface ICoursePartBase {
    name: string;
    exerciseCount: number;
}

interface ICoursePartDescription extends ICoursePartBase {
    description: string;
}

interface ICoursePartBasic extends ICoursePartDescription {
    kind: 'basic';
}

interface ICoursePartGroup extends ICoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

interface ICoursePartBackground extends ICoursePartDescription {
    backgroundMaterial: string;
    kind: 'background';
}

interface ICoursePartSpecial extends ICoursePartDescription {
    requirements: string[];
    kind: 'special';
}

export type TCoursePart = ICoursePartBasic | ICoursePartGroup | ICoursePartBackground | ICoursePartSpecial;
