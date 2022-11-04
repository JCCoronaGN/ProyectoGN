import './styles.css'

let titleTable =["Renglon","Nombre","Edad","Correo","Github","",""];
let data=[];

function buildTable(titleTable,data){
  let tableBorrar = document.getElementById("miTabla");
  if(tableBorrar!== null){
    document
      .getElementById("mountains")
      .removeChild(tableBorrar);
  }
  let table = document.createElement("table");
  table.setAttribute('border', 2);

  table.className = "miTabla";
  table.id = "miTabla";
  let tHead = document.createElement("thead");
  let headRow = document.createElement("tr");
  for(let i = 0; i < titleTable.length; i++) {
    let headCell = document.createElement("th");
    let textCell = document.createTextNode(titleTable[i]);
    headCell.appendChild(textCell);
    headCell.setAttribute('border', 2);
    headRow.appendChild(headCell);

  }
  tHead.appendChild(headRow);
  table.appendChild(tHead);
  let tBody = document.createElement("tbody");
  table.appendChild(tBody);
  for(let i = 0; i < data.length; i++) {
    let tRow = document.createElement("tr");
    for (let j = 0; j < titleTable.length; j++) {
        let tCell = document.createElement("td");
        let button = document.createElement("button");
        button.className ="btn btn-primary btn-block mb-4";
        if(j==5){
          button.innerText ="Borrar";
          button.id = "btnBorrar"+Number(i+1);
          button.addEventListener("click",function(event){
            event.preventDefault();
            renglonBorrar =Number( this.id.slice(9));
            data.splice(renglonBorrar-1,1);
            renumerarRenglon(data);
            buildTable(titleTable,data);
          })
          tCell.appendChild(button);
        }else if (j==6){
          button.innerText ="Editar";
          button.id = "btnEditar"+Number(i+1);
          button.addEventListener("click",function(event){
            event.preventDefault();
            renglonBorrar =Number( this.id.slice(9));
            document.getElementById("formName").value = data[renglonBorrar-1].Nombre;
            document.getElementById("formCorreo").value = data[renglonBorrar-1].Correo;
            document.getElementById("formEdad").value = data[renglonBorrar-1].Edad;
            document.getElementById("btnSubir").innerHTML = "Modificar";
            document.getElementById("btnSubir").name = data[renglonBorrar-1].Renglon
            console.log(document.getElementById("btnSubir").name);
          })

          tCell.appendChild(button);
        } else if(j>=0 && j<=3){
          tCell.appendChild(document.createTextNode(data[i][titleTable[j]])); 
        } else if(j==4){
            getUrl(data[i][titleTable[1]]).then(user=> {
              let ligaGit = document.createTextNode(user);
              if (user!="Sin cuenta"){
                let createA = document.createElement('a');
                createA.setAttribute('href', user);
                createA.setAttribute('target', "blank");
                createA.appendChild(ligaGit);
                tCell.appendChild(createA);
              }else{
                tCell.appendChild(ligaGit);
              }
            }); 
        }
        tRow.appendChild(tCell);
    }
    tBody.appendChild(tRow);
  }
  document
    .getElementById("mountains")
    .appendChild(table);
}

let btnSubir = document.getElementById("form1");
btnSubir.addEventListener("submit",function(event){
  event.preventDefault();
  if (document.getElementById("btnSubir").innerHTML=="Modificar") {
    let rowModified = Number(document.getElementById("btnSubir").name);
    data[rowModified-1].Nombre = document.getElementById("formName").value;
    data[rowModified-1].Correo = document.getElementById("formCorreo").value;
    data[rowModified-1].Edad = document.getElementById("formEdad").value;
  } else {
    let renglon = {
        "Nombre":document.getElementById("formName").value,
        "Edad":document.getElementById("formEdad").value,
        "Correo":document.getElementById("formCorreo").value}
      data.push(renglon);
      renumerarRenglon(data);        
  }
  buildTable(titleTable,data);
  document.getElementById("formName").value="";
  document.getElementById("formEdad").value="";
  document.getElementById("formCorreo").value="";
})
function renumerarRenglon(data){
  for(let i = 0; i < data.length; i++) {
    for (let j = 0; j < titleTable.length; j++) {
      data[i][titleTable[0]]=i+1;
    }
  }
}

async function fetchGH(countGit) {
  let urlGit= ""
    let response = await fetch('https://api.github.com/users/'+countGit, 
    {
      headers: {
          'Authorization': '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',
      }
    })
    let countUserGit= await response.json();
    if(countUserGit.message != undefined){
      urlGit = "Sin cuenta"; 
    }else{
      urlGit = countUserGit.html_url;
    }
  return urlGit
}
async function getUrl(countGit2) { 
  return await fetchGH(countGit2);
}




