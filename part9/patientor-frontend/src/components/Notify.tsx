interface IProps {
    note: string | null;
}

const Notify = (props: IProps) => {
    if (props.note) return <div style={{ marginTop: 20, color: 'red' }}>{props.note}</div>;
};

export default Notify;
