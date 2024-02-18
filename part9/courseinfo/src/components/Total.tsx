interface ITotalProps {
    total: number;
}

const Total = (props: ITotalProps) => {
    return <p>Number of exercises {props.total}</p>;
};

export default Total;
