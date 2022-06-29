import "./style.css";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";


export function EmployeeList(props) {
  const { items} = props;
  
  return (
    <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
      <div className="dataTable-top">
        <div className="dataTable-dropdown">
          <label>
            <select className="dataTable-selector">
              <option value="5">5</option>
              <option value="10" selected="">
                10
              </option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>{" "}
            entries per page
          </label>
        </div>
      </div>
      <div className="dataTable-container">
        <table className="table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
            <td>Id</td>
              <td>Name</td>
              <td>UserName</td>
              <td>Email</td>
            </tr>
          </tfoot>
          <tbody>
            {(items || []).map((item) => (
              <tr key={item.userId}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dataTable-bottom">
        <div className="dataTable-info">Showing 1 to 10 of 57 entries</div>
        <nav className="dataTable-pagination">
          <ul className="dataTable-pagination-list">
            <li className="active">
              <a href="#" data-page="1">
                1
              </a>
            </li>
            <li className="">
              <a href="#" data-page="2">
                2
              </a>
            </li>
            <li className="">
              <a href="#" data-page="3">
                3
              </a>
            </li>
            <li className="">
              <a href="#" data-page="4">
                4
              </a>
            </li>
            <li className="">
              <a href="#" data-page="5">
                5
              </a>
            </li>
            <li className="">
              <a href="#" data-page="6">
                6
              </a>
            </li>
            <li className="pager">
              <a href="#" data-page="2">
                ›
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function Modal(props) {
  const [id,setId] = useState('');
  const [name,setName] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const modalElement = useRef(null);
  function createPost(e) {
    e.preventDefault();
    const postData = {id,name,username,email};
    axios
      .post("https://jsonplaceholder.typicode.com/users/1", postData)
      .then((response) => {
        console.log(response.data)
      });
      modalElement.current.style.display = 'none';
  }
  function close() {
    props.modalElement.current.style.display = 'none';
  }

  function open() {
    props.modalElement.current.style.display = 'block';
  }

  useEffect(() => {
    props.buttonOpen.current.onclick = open;
  });
  return (
    <div>
      <form id='personForm' onSubmit={e => createPost()}>
        <label>Id</label><input type="text" className="form-control" placeholder="Enter id" name="id" id="id" required="required" onChange={(e) => setId(e.target.value)}/>
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Enter name" name="name" id="name" required="required" onChange={(e) => setName(e.target.value)}/>
        <label>Username</label>
        <input type="text" className="form-control" placeholder="Username" name="username" id="username" required="required" onChange={(e) => setUsername(e.target.value)}/>
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" placeholder="Enter email" name="email" id="email" required="required" onChange={(e) => setEmail(e.target.value)}/>
        <div id="buttons">
          <button type="submit" className="btn btn-danger submit-button">Submit</button>
          <button className="btn btn-primary cancel-button" onClick={close}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
