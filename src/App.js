import "./App.css";
import React from "react";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Breadcrumb } from "./components/Breadcrumb";
import { EmployeeList } from "./components/List";
import { Footer } from "./components/Footer";
import { Card } from "./components/Card";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Modal } from "./components/List/index.js";

function App(props) {
  const [table, setTable] = useState();
  const [sidebarClass, setSidebarClass] = useState("sb-nav-fixed");
  const buttonOpen = useRef(null);
  const modalElement = useRef(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setTable(response.data);
      })
      .catch(() => {
        console.error("Error")
      })
  });

  
  function toggleSidebarClass() {
    setSidebarClass(
      sidebarClass.includes("toggled")
        ? "sb-nav-fixed"
        : "sb-nav-fixed sb-sidenav-toggled"
    );
  }
  return (
    <>
      <div className={sidebarClass} id="corps">
        <Navbar toggleSidebarClass={toggleSidebarClass} style="z-index:1" />
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <Sidebar />
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <div class="title-and-button">
                  <h1 className="mt-4">Tables</h1>
                  <div>
              <button className="btn btn-primary" type="button" ref={buttonOpen}> Add</button>
          </div>
                </div>
                <Breadcrumb />
                <Card>
                  DataTables is a third party plugin that is used to generate the
                  demo table below. For more information about DataTables, please
                  visit the
                  <a target="_blank" href="https://datatables.net/">
                    official DataTables documentation
                  </a>
                  .
                </Card>
                
                <Card title="DataTable Example">
                  <EmployeeList items={table} />
                </Card>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
      <div id="personModal" ref={modalElement}>
        <Modal buttonOpen={buttonOpen} modalElement={modalElement}/>
      </div>
    </>
  );
}
export default App;
