class App{
    constructor(){
     /*   const menuElement = document.querySelector('#menu');
        this.menu = new MenuScreen(menuElement);

        const diaryElement = document.querySelector('#diary');
        this.diary = new DiaryScreen(diaryElement);*/
        this._showDiary = this._showDiary.bind(this);
        const urlPathString = window.location.pathname;
        const parts = urlPathString.split('/');
        if (parts.length > 2 && parts[1] === 'id') {
            const diaryId = parts[2];
            this._showDiary(diaryId);
        } 
        else {
            this._showMenu();
        }
    }
    _showMenu(){
        const menuElement = document.querySelector('#menu');
        this.menu = new MenuScreen(menuElement,this._showDiary);
    }
    _showDiary(diaryId){
        const diaryElement = document.querySelector('#diary');
        this.diary = new DiaryScreen(diaryElement,diaryId);
    }
}