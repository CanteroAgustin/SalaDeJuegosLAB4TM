import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GameService {
    constructor() { }
    /**
     * Math Random para generar un random y multiplicamos por 3
     * Redondeamos el entero superior, quedando 0,1,2 como posibles resultados
     * y con ello selecciona Piedra (r), Papel (p) ó Tijera (s)
     */
    getComputerChoice(): string {
        const choices = ['r', 'p', 's']; // Roca, Pape, Tijeras
        const randomChoice = Math.floor(Math.random() * 3);
        return choices[randomChoice];
    }

    game(userChoice: string): { message: string; userAdd: number; compAdd: number; userChoise: string; compChoise: string; } {
        const compChoise = this.getComputerChoice();
        const playUserComp = userChoice + compChoise;
        console.log(`Jugada realizada: ${playUserComp}`);
        let playStatus: {
            message: string;
            userAdd: number;
            compAdd: number;
            userChoise: string;
            compChoise: string;
        } = { message: '', userAdd: 0, compAdd: 0, userChoise: '', compChoise: '' };
        switch (playUserComp) {

            // Ganamos
            case 'rs':
            case 'sp':
            case 'pr':
                playStatus = {
                    message: 'Ganas a la computadora',
                    userAdd: 1,
                    compAdd: 0,
                    userChoise: userChoice,
                    compChoise: compChoise
                };
                break;
            // Gana la computadora
            case 'rp':
            case 'ps':
            case 'sr':
                playStatus = {
                    message: 'Gana la computadora',
                    userAdd: 0,
                    compAdd: 1,
                    userChoise: userChoice,
                    compChoise: compChoise
                };
                break;
            // Empatamos
            case 'rr':
            case 'pp':
            case 'ss':
                playStatus = {
                    message: 'Es un empate',
                    userAdd: 0,
                    compAdd: 0,
                    userChoise: userChoice,
                    compChoise: compChoise
                };
                break;
        }
        return playStatus;
    }
}