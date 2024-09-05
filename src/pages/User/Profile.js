

import React, { useEffect, useState } from 'react';


import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { IoBody } from 'react-icons/io5';
import { toast } from "react-toastify";
const Profile = ({ user, userdetails }) => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [id,setId] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=>{
        (
         async () => {
           const response = await fetch('http://localhost:5135/api/user', {
          
           headers: { 'Content-Type': 'application/json' },
           credentials: 'include',
           
           });
           const content = await response.json();
           if (content)
           {
           setName(content.name)
           setEmail(content.email)
           setId(content.id)
          }
           else
           setName("Not logged")
     
         }
        )();
         
       });

       const [profileImage,setPorfileImage] = useState("");
       const [imageUrl,setimageUrl] = useState("");
       const[imagePreview , setImagePreview] = useState(null);
       const[isLoading,setLoading] = useState(false);

       const handleImageChange = (e) =>{
            setPorfileImage(e.target.files[0])
            setImagePreview(URL.createObjectURL(e.target.files[0]))
       }
       
       const uploadImage = async (e) =>{
        e.preventDefault();
        setLoading(true)
        try{
          
            if (
              profileImage && (
                profileImage.type == "image/png" ||
                profileImage.type == "image/jpg" ||
                profileImage.type == "image/jpeg" 
              )
            )
            {
              const image = new FormData()
              image.append("file",profileImage)
              image.append("cloud_name","nmx3ilvz")
              image.append("upload_preset","nmx3ilvz")
              image.append("api_key","231595731546417")

              const response = await fetch(
                "https://api.cloudinary.com/v1_1/esps/image/upload",
              
              {
                method: "POST",
                body: image
              }

              )
              const imgData = await response.json();
              setimageUrl(imgData.url)
              setImagePreview(imgData.url)
              
              if (imgData.url)
              {
                alert("Upload Sucess")
                setPhoto(imgData.url)
              }
             
            }
            

        }
        catch (error)
        {
              setLoading(false);
        }

       }

       const [cv,setCv] = useState("");
       const [cvUrl,setcvUrl] = useState("");
       const [loadcv,setloadcv] = useState(false);
       const[isLoadingx,setLoadingx] = useState(false);

       
       const handleCvChange = (e) =>{
        setCv(e.target.files[0])
        
   }
       const uploadCv = async (e) => {
        e.preventDefault();
        setLoadingx(true);
      
        try {
          
      
          if (cv && cv.type === "application/pdf") {
            const cvForm = new FormData();
            cvForm.append("file", cv);
            cvForm.append("cloud_name", "iezcghim");
            cvForm.append("upload_preset", "iezcghim");
            cvForm.append("api_key", "231595731546417");
      
         
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/esps/image/upload",
              {
                method: "POST",
                body: cvForm,
                headers: {},
              }
            );
           
      
            
      
            const cvData = await response.json();
          
             
            setcvUrl(cvData.url);
              if (cvData.url)
              {
              alert("Upload Sucess")
              
              setUrlCv(cvData.url)
            }
              setloadcv(true);
            
          }
        
        } catch (error) {
          
          setLoadingx(false);
        }
      };
      
      const [lettre,setlettre] = useState("");
      const [lettreUrl,setlettreUrl] = useState("");
      const [loadlettre,setloadlettre] = useState(false);
      const[isLoadingxy,setLoadingxy] = useState(false);

      
      const handlelettreChange = (e) =>{
       setlettre(e.target.files[0])
       
  }
      const uploadlettre = async (e) => {
       e.preventDefault();
       setLoadingxy(true);
     
       try {
         
     
         if (lettre && lettre.type === "application/pdf") {
           const lettreForm = new FormData();
           lettreForm.append("file", lettre);
           lettreForm.append("cloud_name", "iezcghim");
           lettreForm.append("upload_preset", "iezcghim");
           lettreForm.append("api_key", "231595731546417");
     
        
           const response = await fetch(
             "https://api.cloudinary.com/v1_1/esps/image/upload",
             {
               method: "POST",
               body: lettreForm,
               headers: {},
             }
           );
          
     
           
     
           const lettreData = await response.json();
         
            
           setlettreUrl(lettreData.url);
             if (lettreData.url)
             {
              alert("Upload Sucess")
              setUrlLettre(lettreData.url)
             }
            
             setloadlettre(true);
           
         }
         
       } catch (error) {
         
         setLoadingxy(false);
       }
     };


    
    const [UserId, setUserId] = useState(0);
    const [Photo, setPhoto] = useState("");
    const [Ville, setVille] = useState(0);
    const [LinkedinUrl, setLinkedinUrl] = useState("");
    
    const [Status, setStatus] = useState(0);
    const [Telephone, setTelephone] = useState(0);
    const [Dispo, setDispo] = useState("");
    const [Categorie, setCategorie] = useState(0);
    const [UrlCv, setUrlCv] = useState("");
    const [UrlLettre, setUrlLettre] = useState("");
  
    
    useEffect(()=>{
      setUserId(userdetails.userId);
      setPhoto(userdetails.photo);
      setVille(userdetails.ville);
      setLinkedinUrl(userdetails.linkedinUrl);
      setStatus(userdetails.status);
      setTelephone(userdetails.telephone);
      setDispo(userdetails.dispo);
      setCategorie(userdetails.categorie);
      setUrlCv(userdetails.urlCv);
      setUrlLettre(userdetails.urlLettre);
    },[userdetails]);

    

    const submit = async (e) => {
        e.preventDefault();
        setUserId(id);
        setId(id);
        const response =await fetch(`http://localhost:5135/api/user/${UserId}/update`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                id,
                UserId,
                Photo,
                Ville,
                LinkedinUrl,
                Status,
                Telephone,
                Dispo,
                Categorie,
                UrlCv,
                UrlLettre





            })
            
            
        });
        const content = await response.json();

        if (content.message){
          navigate('/');
        }

      
     
        
       
        
    };
    




      
       
    return ( 

      <div className="container">
         <div className='card position-fixed' style={{marginLeft:'10px',marginTop:'30px'}}> 
    <div className="col-lg-2  position-fixed" >
        <center>
    <div className="card card-profile"style={{backgroundColor:"white"}} >
      <div className="card-body" >
   
        <div className="profile-image-wrapper">
          <div className="profile-image">
          <div className="avatar">
                    {userdetails.photo?( <img
                      alt="Profile Picture"
                      onError={(e) => {
                        e.target.src = 'https://img.freepik.com/vecteurs-libre/illustration-homme-affaires_53876-5856.jpg';
                      }}
                      style={{ cursor: 'default', width: '150px', height: '150px' }}
                      src={userdetails.photo}
                      className="img-fluid rounded-circle"
                    />):( <img
                      alt="Profile Picture"
                      onError={(e) => {
                        e.target.src = 'https://img.freepik.com/vecteurs-libre/illustration-homme-affaires_53876-5856.jpg';
                      }}
                      style={{ cursor: 'default', width: '150px', height: '150px' }}
                      src='https://img.freepik.com/vecteurs-libre/illustration-homme-affaires_53876-5856.jpg'
                      className="img-fluid rounded-circle"
                    />)}
                   
                  </div>
          </div>
        </div>
        <h3 className="text-capitalize">{user.name}</h3>
        <h6 className="text-muted"> {user.email}</h6>
        <div style={{color:'blue'}}>
        Étudiant à la recherche d'un stage
        </div>
        <hr className="mb-2" />
        <div className="d-flex justify-content-between align-items-center">
        <ul className="list-group" style={{marginLeft:'30px'}}>
   
      <li className="list-group-item d-flex border-0 text-secondary" style={{marginTop:'10px'}}>
        <p className="float-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-file-text mr-1"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </p>
        <Link style={{color:'#6c757d',textDecoration: 'none'}} to="/demandes"><span>Mes Demandes</span> </Link>
      </li>
    </ul>
        </div>
      </div>
    </div>
    </center>
    </div>
    </div>
      <div className="row d-flex align-items-center">
        <center>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Modification de Profile Candidature</h2>
              <p>
                Merci pour l'intérêt porté à travailler à nos côtés. Veuillez vérifier ci-dessous les offres de postes disponibles, qui répondent à vos critères, puis répondre en complétant ce formulaire de candidature.
              </p>
              <hr />

              {/* Your form controls */}
              <form style={{ textAlign: 'left' }} onSubmit={submit}>
                {/* Name */}
               
             
                <div className="mb-3">
                  <label>Nom & Prénom :</label>
                  <input type="text" className="form-control" placeholder={name} disabled
                  />
               
                </div>

                {/* Email */}
                <div className="mb-3">
                  <label>Email :</label>
                  <input type="email" className="form-control" placeholder={email} disabled />
                </div>
                
                <div className="mb-3">
                  <label>Votre Image :</label>
                  <input type="file" accept="image/png,image/jpeg" name="image" onChange={handleImageChange} />
                </div>
                
                  <button type='sumbit'  className="btn btn-primary" onClick={uploadImage}>
                    Modifier image
                  </button>
                
                <div>
                {imagePreview && (
                   <img src={imagePreview && imagePreview} style={{ width: '250px', height: '250px' }} alt="Image" />

                  )}
                    <img src={userdetails.photo} style={{width:'200px', height:'200px'}}/>
                  
                </div>

                <div className="mb-3">
                  <label>Ville ou vous shouhaitez faire ?</label>
                  <select className="form-control"
                  value={userdetails.ville}
                  onChange={(e) => setVille(e.target.value)}
                  >
                    <option value="1">Sfax</option>
                    <option value="2">Tunis</option>
                    
                  </select>
                </div>

                <div className="mb-3">
                  <label>Linkedin Url :</label>
                  <input type="text" className="form-control" placeholder={LinkedinUrl} required 
                  value={LinkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>


                {/* Dropdown */}
                <div className="mb-3">
                  <label>Quel est vous statut d'emploi actuel?</label>
                  <select className="form-control"
                  value={userdetails.status}
                   onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="1">Employé(e)</option>
                    <option value="2">Étudiant(e)</option>
                    <option value="3">Indépendant(e)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Numero de Téléphone :</label>
                  <input type="number" className="form-control" placeholder={userdetails.telephone} required 
                  value={userdetails.telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Date de Disponibilité :</label>
                  <input type="date" className="form-control" 
                   value={userdetails.dispo ? userdetails.dispo.split('T')[0] : ''}
                  onChange={(e) => setDispo(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Quel est vous domaine d'emploi actuel?</label>
                  <select className="form-control"
                  value={userdetails.categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  >
                    <option value="0">Informatique</option>
                    <option value="1">Mecanique</option>
                    <option value="2">Economie</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Votre CV PDF :<strong>*</strong></label>
                  <br></br>
                  <a href={userdetails.urlCv} target="_blank" rel="noopener noreferrer">
  {userdetails.urlCv}
</a>
<br></br>
<br></br>
                  <input type="file" accept="application/pdf" name="m" onChange={handleCvChange}/>
                </div>
              
                
                
                  <button type='sumbit'  className="btn btn-primary" onClick={uploadCv}>
                    upload cv
                  </button>
                
              
                  
                
                <div>
                  
                </div>
                      <p></p>
                <div className="mb-3">
                  <label>Votre lettre PDF :<strong>*</strong></label>


                  <br></br>
                  <a href={userdetails.urlLettre} target="_blank" rel="noopener noreferrer">
  {userdetails.urlLettre}
</a>
<br></br>
<br></br>
                  <input type="file" accept="application/pdf" name="mx" onChange={handlelettreChange}/>
                </div>
              
                
                
                  <button type='sumbit'  className="btn btn-primary" onClick={uploadlettre}>
                    upload lettre
                  </button>

                    <p></p>
              
                


                      <p></p>

        
                {/* Radio Buttons */}
                {/* ... (continue adding form controls) */}

                {/* Submit Button */}
                <div className="mb-3">
                  <button type="submit" className="btn btn-primary">
                    Soumettre cette candidature
                  </button>
                </div>
              </form>

              {/* Additional content if needed */}
            </div>
          </div>
        </div>
        </center>
        
      </div>
      
    </div>
    

     );
}

export default Profile;