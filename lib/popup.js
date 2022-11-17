 class PopUp {
    constructor() {
      try {
        this.$ = document.querySelector('body');
      } catch (e) {

      }
    }
    alert(msj,e){
      let  div = document.createElement("div");
      div.style = "display:block; position: fixed; z-index: 15; top: 0px; right:10px";
      div.innerHTML = this.template4(msj,e);
      setTimeout(()=>{
        div.parentNode.removeChild(div);
      },1500)
      this.$.appendChild(div);
    }
    error(msj){
        let  div = document.createElement("div");
        div.style = "width: 100%; height: 100%; position: fixed; z-index: 15; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(2px); top: 0px;";
        div.innerHTML = this.template(msj);
        div.addEventListener("click", e =>{
            e.preventDefault();
            div.parentNode.removeChild(div);
        })
        this.$.appendChild(div);
    }
    lock(msj){
        let  div = document.createElement("div");
        div.style = "width: 100%; height: 100%; position: fixed; z-index: 15; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(2px); top: 0px;";
        div.innerHTML = this.template3(msj);
        div.addEventListener("click", e =>{
            e.preventDefault();
            div.parentNode.removeChild(div);
        })
        this.$.appendChild(div);
    }
    success(msj){
        let  div = document.createElement("div");
        div.style = "width: 100%; height: 100%; position: fixed; z-index: 15; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(2px); top: 0px;";
        div.innerHTML = this.template2(msj);
        div.addEventListener("click", e =>{
            e.preventDefault();
            div.parentNode.removeChild(div);
        })
        this.$.appendChild(div);
    }

    template(msj){
        return `
            <div class="box "
            style='border-radius: 10px;
            background: white;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);'
            >
                <div class="float-right p-3  text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
                </div>
                <br>
                <div class="text-center p-5  text-danger">

                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
                  <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
                </svg>
                <p class="lead my-3">${msj}</p>
                </div>
            </div> `
    }
    template4(msj, t = "s"){
      let bg = "#fb5e5e";
      if(t == "e") bg = "#fb5e5e";
      if(t == "w") bg = "#f7ba20";
      if(t =="s") bg = "#4ac961";
        return `
            <div class="box "
            style='border-radius: 3px;
            background: ${bg}; '
            >
                <div class="text-center text-white  px-4 my-5">
                  <p class="lead py-2">${msj}</p>
                </div>
            </div> `
    }
    template2(msj){
        return `
            <div class="box "
            style='border-radius: 10px;
            background: white;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);'
            >
                <div class="float-right p-3  text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
                </div>
                <br>
                <div class="text-center p-5  text-success">

                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>
                <p class="lead my-3">${msj}</p>
                </div>
            </div> `
    }
    template3(msj){
        return `
            <div class="box "
            style='border-radius: 10px;
            background: white;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);'
            >
                <div class="float-right p-3  text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
                </div>
                <br>
                <div class="text-center p-5  text-warning">

                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                  <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                </svg>
                <p class="lead my-3">${msj}</p>
                </div>
            </div> `
    }
}


const popup = new PopUp();
export default popup;
