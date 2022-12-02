export class Form extends HTMLElement{
    email = "";
    clave = "";

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();

        const btn = this.shadowRoot?.querySelector("button");
        btn?.addEventListener("click",()=>{
            const event: CustomEvent<{email:string, clave: string}> = 
            new CustomEvent("form-fullfiled",{
                detail: {email: this.email, clave: this.clave},
                composed: true
            });

            this.dispatchEvent(event);
        });

        const emailInput = this.shadowRoot?.querySelector('input[type="email"]');
        const claveInput = this.shadowRoot?.querySelector('input[type="clave"]');
        
        emailInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.email = value;
        });

        claveInput?.addEventListener("change",(evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.clave = value;
        })
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <article class="Form">
        <link href="./Style.css" rel="stylesheet">
            <div>
                <input name="email" type="email" placeholder="Email"/>
            </div>
            <div>
                <input type="clave" placeholder="Contraseña"/>
            </div>
            <button type="submit">Ingresar</button>
        </article>
        `
    }
}

customElements.define("app-form",Form);