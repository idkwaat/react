import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import ("./customstyle.css")


export default function AdminLayout({ children }) {
  return (
    <>
<div className="wrapper">
    <Sidebar/>
    <div id="body" className="active">
        <Navbar/>
<div className="content">
                <div className="container">
      <main>{children}</main>
      </div>
      </div>
      </div>
</div>
    </>
  );
}
