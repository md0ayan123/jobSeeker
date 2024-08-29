
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [about, setAbout] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('file', file);
    formData.append('about', about);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to upload file');
    }
  };

  return (
    <div className="mt-5 container " style={{backgroundColor:""}}>
      <h1>Upload User Information and Resume</h1>
      <form onSubmit={handleSubmit}>
      <div class="mt-3">
    <label for="exampleInputName" class="form-label">Name</label>
    <input type="text"  placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} class="form-control" id="exampleInputName"/>
  </div>
    

<div class="mb-3 mt-4">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" name='email' placeholder="Email" value={email}  onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <label for="exampleFormControlTextarea1" class="form-label">We'll never share your email with anyone else.</label> 
  </div>
  
<div class="mt-4 mb-3">
<label for="exampleInputAbout" class="form-label">About</label>
  <textarea class="form-control" name='about' id="exampleFormControlTextarea1" rows="3"  value={about}
          onChange={(e) => setAbout(e.target.value)}></textarea>
  <label for="exampleFormControlTextarea1" class="form-label">Write a few sentences about yourself.</label> 
</div>
    <div class="input-group mt-3 mb-3" >
  <label class="input-group-text" for="inputGroupFile01">Upload Your Resume</label>
  <input type="file" onChange={handleFileChange}  class="form-control" id="inputGroupFile01"/>
</div>
<input class="btn btn-primary" type="submit" value="Submit" onClick={handleSubmit}></input>
</form>
</div> 
 
  )
}

export default App;