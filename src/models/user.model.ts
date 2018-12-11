export class User{
  constructor(
    public token: string,
    public name: string,
    public email: string,
    public birthday: string,
    public date_created: string,
    public gender: string,
    public img: string,
    //stats
    public tokenUser: string,
    public gamesPlayed: number,
    public gamesCompleted: number,
    public gamesPaused:number,
    public gamesDeleted:number,
    public totalTimeGaming:number,
    public sodukoPoints:number,
    public level:number,
    public experienceCurrentLevel:number,
    public experienceNextLevel:number,
    public experienceTotal:number,
    public easyCompleted:number,
    public mediumCompleted:number,
    public hardCompleted:number,
    public heroCompleted:number,
    public godCompleted:number,
    //bonus

  ){}
}
