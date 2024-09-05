

import React, { useEffect, useState } from 'react';


import { useNavigate } from "react-router-dom";


import { IoBody } from 'react-icons/io5';
import { toast } from "react-toastify";
const HomeUser = () => {
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
  
    
   
    const submit = async (e) => {
        e.preventDefault();
        setUserId(id);
        setId(id);
        const response =await fetch(`http://localhost:5135/api/user/${id}/create`, {
            method: 'POST',
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
        if(content)
        navigate('/load');
        

      
     
        
       
        
    };
    




      
       
    return ( 

      <div className="container">
      <div className="row d-flex align-items-center">
        <center>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Formulaire de Candidature à un Stage</h2>
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
                    upload image
                  </button>
                
                <div>
                  {imagePreview && (
                   <img src={imagePreview && imagePreview} style={{ width: '250px', height: '250px' }} alt="Image" />

                  )}
                </div>

                <div className="mb-3">
                  <label>Ville ou vous shouhaitez faire ?</label>
                  <select className="form-control"
                  onChange={(e) => setVille(e.target.value)}
                  >
                    <option value="1">Sfax</option>
                    <option value="2">Tunis</option>
                    
                  </select>
                </div>

                <div className="mb-3">
                  <label>Linkedin Url :</label>
                  <input type="text" className="form-control" placeholder="Exemple : https://www.linkedin.com/in/achraf-mkaouar-41a90527a/" required 
                  value={LinkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>


                {/* Dropdown */}
                <div className="mb-3">
                  <label>Quel est vous statut d'emploi actuel?</label>
                  <select className="form-control"
                   onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="0">Employé(e)</option>
                    <option value="1">Étudiant(e)</option>
                    <option value="2">Indépendant(e)</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Numero de Téléphone :</label>
                  <input type="number" className="form-control" placeholder="Numéro de téléphone" required 
                  value={Telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Date de Disponibilité :</label>
                  <input type="date" className="form-control" 
                  value={Dispo}
                  onChange={(e) => setDispo(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label>Quel est vous domaine d'emploi actuel?</label>
                  <select className="form-control"
                  onChange={(e) => setCategorie(e.target.value)}
                  >
                    <option value="0">Informatique</option>
                    <option value="1">Mecanique</option>
                    <option value="2">Economie</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label>Votre CV PDF :<strong>*</strong></label>
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

export default HomeUser;