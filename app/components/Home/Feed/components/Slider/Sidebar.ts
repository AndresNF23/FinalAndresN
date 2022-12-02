export enum SBAttribute {
    "username"="username",
    "profilepic" = "profilepic"
}

class MyRecomend extends HTMLElement{
    username?: string;
    profilepic?: string;

    static get observedAttributes(){
        const attrs: Record<SBAttribute,null> = {
            username: null,
            profilepic: null,
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
        propName: SBAttribute,
        oldValue: string | undefined,
        newValue: string | undefined,
        ){
            switch (propName) {
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
            <section class = "recommendedSection">
                    <img class = "profilePicture" ${this.profilepic}
                    <article class = "recommendedArticle">
                        <h4 class = "username">${this.username}</h4>
                        <p class = "subtitle2">Recomenado para ti</p>
                    </article>
                    <p class = "followButton"><t>Seguir</t></p>
            </section>
            `
        }
    }
}

customElements.define("my-slider", MyRecomend);
export default MyRecomend;