import { addPost } from "../../services/db.js";
export class NewPost extends HTMLElement{
    username = "";
    post= "";
    usercomment = "";
    hashtag = "";

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        
        const btn = this.shadowRoot?.querySelector("button");
        btn?.addEventListener("click", async ()=>{

            if(this.username && this.post && this.usercomment && this.hashtag) {
                const postData = {
                    username: this.username,
                    post: this.post,
                    usercomment: this.usercomment,
                    hashtag: this.hashtag
                }
                try {
                    await addPost(postData);
                    alert ("El post se creo correctamente");

                    const evt:  CustomEvent = new CustomEvent("form-fullfilled", 
                    {composed: true});
                    this.dispatchEvent(evt);
                } catch (error) {
                    console.error(error);
                    alert ("Ocurrio un error, vuelva a intentar");
                }
            } else {
                alert ("Complete todos los campos");
            }
        });

        const usernameInput = this.shadowRoot?.querySelector('#username');
        const postInput = this.shadowRoot?.querySelector('#post');
        const usercommentInput = this.shadowRoot?.querySelector('#usercomment');
        const hashtagInput = this.shadowRoot?.querySelector('#hashtag');

        usernameInput?.addEventListener("change", (event) => {
        const value: string =(event.target as HTMLInputElement).value || ""
        this.username = value;   
        });
        postInput?.addEventListener("change", (event) => {
        const value: string =(event.target as HTMLInputElement).value || ""
        this.post = value;   
        });
        usercommentInput?.addEventListener("change", (event) => {
        const value: string =(event.target as HTMLInputElement).value || ""
        this.usercomment = value;   
        });
        hashtagInput?.addEventListener("change", (event) => {
        const value: string =(event.target as HTMLInputElement).value || ""
        this.hashtag = value;   
        });
    }

    render(){ 
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `
        <link href="./components/Home/style.css" rel="stylesheet">
        <div class="formpost">
        <article>
        <div class="input">
        <input class="inputF" type="text" placeholder="username" id="username"/>
        </div>
        <div class="input">
        <input class="inputF" type="text" placeholder="post" id="post"/>
        </div>
        <div class="input">
        <input class="inputF" type="text" placeholder="usercommet" id="usercommet"/>
        </div>
        <div class="input">
        <input class="inputF" type="text" placeholder="hashtag" id="hashtag"/>
        </div>
        <button type="submit">Crear nuevo post</button>

        </article>
        </div>
        `
    }
    }

    customElements.define("app-new-post", NewPost);