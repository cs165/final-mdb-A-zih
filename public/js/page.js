class Page{
    constructor(date,id){
        this.date = date;
        this.diaryId = id;
        this.page = document.getElementById("page");
        this.dateElement = document.getElementById('date');
        this.prompt = document.getElementById('prompt');
        this.content = document.getElementById('contents');

        this.createPage = this.createPage.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.savePage = this.savePage.bind(this);


    }
    async loadPage(){
        const date = this.date.toLocaleDateString();
        let result = await fetch(`/id/${this.diaryId}/${date}`);
        let json = await result.json();
        if (json === null) {
            json = await this.createPage();
        }
        const options = { month: 'long', day: 'numeric' };
        const parsed = this.date.toLocaleDateString('en-US', options);
        this.dateElement.innerHTML = parsed;
        this.prompt.innerHTML = json.prompt;
        this.content.value = json.contents;   
    }
    async savePage(){
        const params = {
            diaryId: this.diaryId,
            date: this.date.toLocaleDateString(),
            prompt: this.prompt.innerText,
            contents: this.content.value
        };
        const fetchOptions = {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        };
        const result = await fetch('/create-entry', fetchOptions);
        const json = await result.json();
        return json;
    }
    async createPage(){
        const randInd = Math.floor(Math.random() * prompts.length);
        this.prompt.innerHTML = prompts[randInd];
        const params = {
            diaryId: this.diaryId,
            date: this.date.toLocaleDateString(),
            prompt: this.prompt.innerText,
            contents: ""
        };
        const fetchOptions = {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        };
        const result = await fetch('/create-entry', fetchOptions);
        const json = await result.json();
        return json;
    }
}