export enum Attribute {
    "username"="username",
    "ubication" = "ubication",
    "profilepic" = "profilepic",
    "post" = "post",
    "usercomment" = "usercomment",
    "hashtag" = "hashtag",
    "numbercomments" = "numbercomments",
    "date" = "date",
}

class MyProfile extends HTMLElement{
    username?: string;
    ubication?: string;
    profilepic?: string;
    post?: string;
    usercomment?: string;
    hashtag?: string;
    numbercomments?: number;
    date?: string;

    static get observedAttributes(){
        const attrs: Record<Attribute,null> = {
            username: null,
            ubication: null,
            profilepic: null,
            post: null,
            usercomment: null,
            hashtag: null,
            numbercomments: null,
            date: null,
        };
        return Object.keys(attrs);
    }

    constructor(){
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        oldValue: string | undefined,
        newValue: string | undefined,
        ){
            switch (propName) {
                case Attribute.numbercomments:
                    this.numbercomments = newValue ? Number(newValue) : undefined;                                        
                    break;
            
                default:
                    this[propName] = newValue;
                    break;
            }

            this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = `
            <link href="./components/Home/style.css" rel="stylesheet">
            <section class = "profileSection">
                <article id = "headerArticle">
                    <img class = "profilePictureProfile" ${this.profilepic}
                    <div>
                        <h4 class = "username">${this.username}</h4>
                        <p class = "location">${this.ubication}</p>
                    </div>
                    <img class = "iconProfile" src="https://static.thenounproject.com/png/585197-200.png">
                </article>
                <img class = "profilePost" ${this.post}
                <my-counter></my-counter>
                <article id = "subtitleArticle">
                    <p class = "subtitle"><b class="username">${this.username}</b> ${this.usercomment} <t class = "hashtag">${this.hashtag}</t> </p>
                    <p class = "comment">View all ${this.numbercomments} comments</p>
                    <p class = "date">${this.date}</p>
                </article>
            </section>
            `
        }
    }
}

customElements.define("my-profile", MyProfile);
export default MyProfile;