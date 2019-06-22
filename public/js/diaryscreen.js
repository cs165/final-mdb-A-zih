class DiaryScreen{
    constructor(containerElement,diaryId){
        this.containerElement = containerElement;
        this.diaryId = diaryId;
        this.currEntry = null;
    //    this.date = document.getElementById('date');
    //    this.prompt = document.getElementById('prompt');
    //    this.countDate = 0;
        this._loadDiary();

        this._loadDiary = this._loadDiary.bind(this);
        this._edit = this._edit.bind(this);
        this._goNext = this._goNext.bind(this);
        this._goPrevious = this._goPrevious.bind(this);
        this._goHome = this._goHome.bind(this);
        this._confirm = this._confirm.bind(this);
        
        
        this.ta = document.getElementById('contents');
        this.ta.addEventListener('click',this._edit);

        this.check = document.getElementById('checked');
        this.check.addEventListener('click',this._confirm);

        this.previousBtn = document.getElementById('previous');
        this.previousBtn.addEventListener('click',this._goPrevious);

        this.homeBtn = document.getElementById('home');
        this.homeBtn.addEventListener('click',this._goHome);

        this.nextBtn = document.getElementById('next');
        this.nextBtn.addEventListener('click',this._goNext);

    }
    _edit(event){
        this.ta.classList.add('edit');
        document.getElementById('second').classList.add('bar');
    }
    async _goNext(){
        this.currDate.setDate(this.currDate.getDate() + 1);
        this.currEntry = await new Page(this.currDate, this.diaryId);
        await this.currEntry.loadPage();

    }
    async _goPrevious(){
        this.currDate.setDate(this.currDate.getDate() - 1);
        this.currEntry = new Page(this.currDate, this.diaryId);
        await this.currEntry.loadPage();
    }
    async _goHome(){
        this.currDate = new Date();
        this.currEntry = new Page(this.currDate, this.diaryId);
        await this.currEntry.loadPage();
    }
    async _confirm(){
        await this.currEntry.savePage();
        this.ta.classList.remove('edit');
        document.getElementById('second').classList.remove('bar');
    }
    async _loadDiary() {
        const result = await fetch(`/${this.diaryId}`);
        const json = await result.json();
        this.currDate = new Date();
        this.currEntry = new Page(this.currDate, this.diaryId);
        await this.currEntry.loadPage();

        this.containerElement.classList.remove('inactive');
      }
}