import Logo from "../Logo/Logo";

export default function Navbar({ children }) {
  return (
    <nav className="navbar  py-2 bg-info-subtle ">
      <div className="container d-flex">
        <Logo />
        {children}
      </div>
    </nav>
  );
}
