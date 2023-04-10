export const FinishedNUmber = (finished) => {
    switch (finished) {
        case 1:return "You just finished 1 game, only 2 left.";
        case 2:return "You finished 2 games, you did more than half!";
        case 3:return "You have finished my game, congratulations to you, I invite you to click on the gift in the menu for a last little surprise.";
        default:break;
    }
};