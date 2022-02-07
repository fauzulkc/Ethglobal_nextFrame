import Header from "./Header";
const Layout = (props: { children: any }) => {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default Layout;
