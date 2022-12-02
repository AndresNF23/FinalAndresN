
export enum MenuAttribute {
    "instagramLogo" = "instagramLogo",
    "Home" = "Home",
    "Chat" = "Chat",
    "Upload" = "Upload",
    "Explore" = "Explore",
    "heart" = "heart",
    "userPicture" = "userPicture"
}

class MyMenu extends HTMLElement {
    instagramLogo?: string;
    Home?: string;
    Chat?: string;
    Upload?: string;
    Explore?: string;
    heart?: string;
    userpicture?: string;
    btn: HTMLElement;

    static get observedAttributes() {
        const attrs: Record<MenuAttribute, null> = {
            instagramLogo: null,
            Home: null,
            Chat: null,
            Upload: null,
            Explore: null,
            heart: null,
            userPicture: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();

        const btn = this.shadowRoot?.querySelector("buttonPost");
        this.btn = this.ownerDocument.createElement("button");
        this.btn.className = "btnPost";
        this.btn.id = "buttonPost";
        btn?.addEventListener('click', () => {
            console.log('From Menu')

            const event: CustomEvent = new CustomEvent("to-new-post",
                {
                    composed: true
                });

            this.dispatchEvent(event);


        });
    }

    attributeChangedCallback(
        propName: MenuAttribute,
        oldValue: string | undefined,
        newValue: string | undefined,
    ) {

        this[propName] = newValue;
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <link href="./components/Home/style.css" rel="stylesheet">
        <article class="menuContainer">
        <img class="instagramLogo" src="./components/Home/Feed/components/Profile/Imgs/Logo.jpg">
        <input type="text" class="searchInput" placeholder="Search">
     <div class = "iconList">
        <img class = "headerIcon" src="./components/Home/Feed/components/Profile/Imgs/Home.png">
        <img class = "headerIcon" src="./components/Home/Feed/components/Profile/Imgs/Chat.jpg">
        <button type="button"><img class =" headerIcon" src="./components/Home/Feed/components/Profile/Imgs/Upload.png"></button>
        <img class = "headerIcon" src="./components/Home/Feed/components/Profile/Imgs/Explore.png">
        
        <img class = "headerIcon" src="./components/Home/Feed/components/Profile/Imgs/heart.png">
        <img class = "headerIcon" id="userPicture" src="https://th.bing.com/th/id/R.8dc2de37411776a25b88e363c2a3266c?rik=03rrpcI1g3DBcQ&pid=ImgRaw&r=0">    
    </div>
    
 </article>
 `;
            this.shadowRoot.appendChild(this.btn);
        }
    }
}

customElements.define("app-menu", MyMenu);
export default MyMenu;