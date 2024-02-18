interface IProps {
    message: string;
}

const Notify = (props: IProps) => {
    return <div style={{ color: 'red' }}>{props.message}</div>;
};

export default Notify;
