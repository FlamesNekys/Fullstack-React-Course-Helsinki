interface IHeaderProps {
    header: string;
}

const Header = (props: IHeaderProps) => {
    return <h1>{props.header}</h1>;
};

export default Header;
