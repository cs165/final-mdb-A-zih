class MenuScreen{
    constructor(containerElement,showDiaryView){
        this.containerElement = containerElement;
        this.showDiaryView = showDiaryView;

        this.onClick = this.onClick.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.create_btn = document.getElementById("create");
        this.create_btn.addEventListener('click',this.onClick);
    }
    async onClick(event){
        event.preventDefault();
        const params = {};
        const fetchOptions = {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        };
        const result = await fetch('/create-diary', fetchOptions);
        const json = await result.json();
        window.history.pushState(null, null, window.location.href + 'id/' + json.diaryId);
        this.showDiaryView(json.diaryId);
        this.hide();
    }
    show(){
        this.containerElement.classList.remove('inactive');
    }
    hide() {
        this.containerElement.classList.add('inactive');
    }
}