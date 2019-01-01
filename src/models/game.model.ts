export class Game {
  constructor(
    public token: string,
    public state: string,
    public difficulty: number,
    public dateStart: Date,
    public datePaused: Date,
    public dateEnded: Date,
    public boardSolution: any[],
    public boardHistory: any[],
    public moves: number,
    public time: number
  ) { }
}
