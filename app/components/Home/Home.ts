import "../index.js"
import data from "./Feed/data.js"
import "./Feed/components/index.js"
import "./Feed/components/index.js"
import MyStories, {SAttribute} from "./Feed/components/Historias/Historias.js";
import MyCounter, {CAttribute} from "./Feed/components/Counter/Counter.js";
import MyProfile, {Attribute} from "./Feed/components/Profile/Profile.js";
import MyRecomend, {SBAttribute} from "./Feed/components/Slider/Sidebar.js";

import { getPost } from "../../services/db.js";
import MyMenu, { MenuAttribute } from "./Feed/components/Menu/Menu.js";

class FeedContainer extends HTMLElement{
    counters: MyCounter[] = [];
    profiles: MyProfile[] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        data.forEach((counters)=>{
            const counter = this.ownerDocument.createElement("my-counter") as MyCounter;
           // counter.setAttribute(CAttribute.likes, String(counters.likes));
           counter.setAttribute(CAttribute.likes, String(counter.numberLikes));
            counter.button.addEventListener("click",()=>{
               counter.handleClick();
            })
            this.counters.push(counter);
        });
    
       

        data.forEach((user)=>{
            const profileCard = this.ownerDocument.createElement("my-profile") as MyProfile;
            profileCard.setAttribute(Attribute.username, user.username);
            profileCard.setAttribute(Attribute.ubication, user.ubication);
            profileCard.setAttribute(Attribute.profilepic, user.profilepic);
            profileCard.setAttribute(Attribute.post, user.post);
            profileCard.setAttribute(Attribute.usercomment, user.caption.usercomment);
            profileCard.setAttribute(Attribute.hashtag, user.caption.hashtag);
            profileCard.setAttribute(Attribute.numbercomments, String(user.numbercomments));
            profileCard.setAttribute(Attribute.date, user.date);
            this.profiles.push(profileCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.profiles.forEach((profile)=>{
                this.shadowRoot?.appendChild(profile);
            })
            this.counters.forEach((counter)=>{
                this.shadowRoot?.appendChild(counter);
            })
        }
    }
}
class MenuContainer extends HTMLElement {
    menu: MyMenu [] = [];

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        datamenu.forEach((usermenu) =>{
            const menuCard = this.ownerDocument.createElement("app-menu") as MyMenu;
            menuCard.setAttribute(MenuAttribute.instagramLogo,usermenu.instagramLogo);
            menuCard.setAttribute(MenuAttribute.Home,usermenu.Home);
            menuCard.setAttribute(MenuAttribute.Explore,usermenu.Explore);
            menuCard.setAttribute(MenuAttribute.Chat,usermenu.chat);
            menuCard.setAttribute(MenuAttribute.heart,usermenu.heart);
            menuCard.setAttribute(MenuAttribute.Upload,usermenu.Upload);
            menuCard.setAttribute(MenuAttribute.userPicture,usermenu.userPicture);
            this.menu.push(menuCard);
        });
    }
 
    connectedCallback(){
        this.render();    
    }

render(){
    if(this.shadowRoot){
        this.shadowRoot.innerHTML = ``;
        this.menu.forEach((menu)=>{
            this.shadowRoot?.appendChild(menu);
        })
    }
}
}


class StoriesContainer extends HTMLElement{
    stories: MyStories [] =[];

    constructor(){
        super();
        this.attachShadow({mode: "open"});

        data.forEach((user)=>{
            const storyCard = this.ownerDocument.createElement("my-stories") as MyStories;
            storyCard.setAttribute(SAttribute.username, user.username);
            storyCard.setAttribute(SAttribute.profilepic, user.profilepic);
            this.stories.push(storyCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.stories.forEach((story)=>{
                this.shadowRoot?.appendChild(story);
            })
        }
    }
}

class Recomendation extends HTMLElement{
    recomendations: MyRecomend[] =[];
    constructor(){
        super();
        this.attachShadow({mode: "open"});

        data.forEach((user)=>{
            const storyCard = this.ownerDocument.createElement("my-slider") as MyRecomend;
            storyCard.setAttribute(SBAttribute.username, user.username);
            storyCard.setAttribute(SBAttribute.profilepic, user.profilepic);
            this.recomendations.push(storyCard);
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ``;
            this.recomendations.forEach((recomendation)=>{
                this.shadowRoot?.appendChild(recomendation);
            })
        }
    }
}

customElements.define("stories-container",StoriesContainer);

customElements.define("feed-container",FeedContainer);

customElements.define("recomend-container",Recomendation);
customElements.define("menu-container",MenuContainer);


export class Home extends HTMLElement{
    
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(!this.shadowRoot) return;
        this.shadowRoot.innerHTML = `<link href="./components/Home/style.css" rel="stylesheet">
        <section class = "homeSection">
            <link href="./components/Home/style.css" rel="stylesheet">
         <article class="headerArticle">
         <div class = "menuContainer">
         <menu-container></menu-container>
            </div>
         </article>
    <section class="contentSection">
        <article class = "feedArticle">
            <div class="storiesContainer">
                <stories-container></stories-container>
            </div>
            <feed-container></feed-container>
        </article>
        <article class="sideNav">
            <div class="user">
                <img class="profileImg" src="https://th.bing.com/th/id/R.8dc2de37411776a25b88e363c2a3266c?rik=03rrpcI1g3DBcQ&pid=ImgRaw&r=0">
                <div>
                    <p class="titleProfile">Denji Narvaez</p>
                    <p class="subtitleProfile">Mexd</p>
                </div>
                <p class="switchText">Cambiar</p>
            </div>
            <div class="suggestionsContainer">
                <p class="suggestTitle">Recomendados para ti</p>
                <p class="seeallTitle">Seguir a todos</p>
            </div>
            <recomend-container></recomend-container>
            <p class="aboutText">Meta · Información · Blog · Empleo · Ayuda · API Privacidad · Condiciones · Cuentas destacadas · Hashtags · Ubicaciones · Instagram Lite · Subir contactos y no usuarioss</p>
            <p class="aboutText">2022 INSTAGRAM ANDRES xd</p>
        </article>
        </section>
    </section>
        `
    }
}

customElements.define("app-home",Home);