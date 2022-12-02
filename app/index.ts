import "./components/index.js";
import { queryUser } from "./services/db.js";
enum Screens {
    login,
    register,
    home,
    newpost,
}

class AppContainer extends HTMLElement{
    screen: Screens = Screens.register;

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
        this.setEventListeners();
    }

    setEventListeners(){
        const GoSignUp = this.shadowRoot?.querySelector("app-register");
        GoSignUp?.addEventListener("register-success", ()=>{
            this.screen = Screens.login;
            this.render();
            this.setEventListeners();
        })  
            const login = this.shadowRoot?.querySelector("app-login");
            login?.addEventListener("login-success", ()=>{
            this.screen = Screens.home;
            this.render();
            this.setEventListeners();
        })
        const newpost= this.shadowRoot?.querySelector("app-new-post");
        login?.addEventListener("form-fullfilled", ()=>{
            console.log('se llamo afuera')
            this.screen = Screens.home;
            this.render();
            this.setEventListeners();
        });

        const Menu = this.shadowRoot?.querySelector("my-menu");
        Menu?.addEventListener('new-post', () => {
            this.screen = Screens.newpost;
            this.render();
            this.setEventListeners();
        });
    }

    render(){
        if(!this.shadowRoot) return;
        switch (this.screen) {
            case Screens.home:
                this.shadowRoot.innerHTML = "<app-home></app-home>"
                break;
        
            case Screens.login:
                this.shadowRoot.innerHTML = "<app-login></app-login>"
            break;
            
            case Screens.register:
                this.shadowRoot.innerHTML = "<app-register></app-register>"
            break;

            default:
                break;
        }
    }
}

customElements.define("app-container",AppContainer);