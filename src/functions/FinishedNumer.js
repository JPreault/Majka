export const FinishedNUmber = (finished) => {
    let numberFinish = 0;
    Object.values(finished).forEach(element => {
        if(element === true){
            numberFinish++
        }
    });
    switch (numberFinish) {
        case 1:return "You have finished my game, congratulations to you, I invite you to click on the link in the menu for a last little surprise.";
        case 2:return "You finished 2 games, you did half!";
        case 3:return "You finished 3 games, there is only 1 left, you are too strong!";
        case 4:return "You have finished my game, congratulations to you, I invite you to click on the link in the menu for a last little surprise.";
        default:break;
    }
};