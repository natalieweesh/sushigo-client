import React from 'react';
import maki1 from '../../images/maki1.PNG';
import maki2 from '../../images/maki2.PNG';
import maki3 from '../../images/maki3.PNG';
import tempura from '../../images/tempura.PNG';
import sashimi from '../../images/sashimi.PNG';
import dumpling from '../../images/dumpling.PNG';
import salmonnigiri from '../../images/salmonnigiri.PNG';
import squidnigiri from '../../images/squidnigiri.PNG';
import eggnigiri from '../../images/eggnigiri.PNG';
import wasabi from '../../images/wasabi.PNG';
import chopsticks from '../../images/chopsticks.PNG';
import pudding from '../../images/pudding.PNG';
import './Rules.css';

const Rules = () => {
  
  return (
    <div className="instructions">
      <h2>How to play!</h2>
      <p>2-5 players can play this game! After everyone presses the Ready to Play button, the cards will be shuffled and dealt out. In a 2 player game, each person gets 10 cards. In a 3 person game, each player gets 9 cards. In a 4 person game, each player gets 8 cards. In a 5 person game, each player gets 7 cards.</p>
      <p>Each player secretly holds their cards in their pink rectangle.</p>
      <p>There is a scorecard on the top right of the screen, for keeping track of the score after each round.</p>
      <p>FYI these are the card counts:</p>
      <table>
        <tr>
          <td>14x Tempura <img src={tempura} alt="tempura"/> &nbsp;&nbsp;</td>
          <td>14x Sashimi  <img src={sashimi} alt="sashimi"/></td>
        </tr>
        <tr>
          <td>14x Dumpling  <img src={dumpling} alt="dumpling"/>&nbsp;&nbsp;</td>
          <td>12x 2 Maki Rolls <img src={maki2} alt="maki2"/></td>
        </tr>
        <tr>
          <td>8x 3 Maki Rolls  <img src={maki3} alt="maki3"/>&nbsp;&nbsp;</td>
          <td>6x 1 Maki Roll <img src={maki1} alt="maki1"/></td>
        </tr>
        <tr>
          <td>10x Salmon Nigiri  <img src={salmonnigiri} alt="salmonnigiri"/>&nbsp;&nbsp;</td>
          <td>5x Squid Nigiri  <img src={squidnigiri} alt="squidnigiri"/></td>
        </tr>
        <tr>
          <td>5x Egg Nigiri  <img src={eggnigiri} alt="eggnigiri"/>&nbsp;&nbsp;</td>
          <td>10x Pudding <img src={pudding} alt="pudding"/></td>
        </tr>
        <tr>
          <td>6x Wasabi  <img src={wasabi} alt="wasabi"/>&nbsp;&nbsp;</td>
          <td>4x Chopsticks <img src={chopsticks} alt="chopsticks"/></td>
        </tr>
      </table>
      <p>The game takes place over 3 rounds. To start a round, each player chooses 1 card from their hand to keep by moving it to their purple rectangle and pressing the Finalize your Turn button. Once everyone has picked a card, and finalized their turn, then everyone's cards in their purple rectangle will be shown to everyone else, and the next round, and each person passes their hand to the next person.</p>
      <p>Now everyone has a smaller hand of cards to choose from. When the final remaining card of each hand is passed on, you add this last card to your purple rectangle, and the round is over.</p>
      <h3>Special cards</h3>
      <h4>To use a wasabi card:  <img src={wasabi} alt="wasabi"/></h4>
      <p>If you choose a salmon, squid, or egg nigiri card, and already have a wasabi card in your purple rectangle, then this nigiri must be placed on top of your wasabi card, to show that your nigiri has been dipped in wasabi and has tripled in value!</p>
      <p>Note: you may have multiple wasabi cards in your purple rectangle but only 1 nigiri card may be placed on each wasabi card.</p>
      <h4>To use a chopsticks card:  <img src={chopsticks} alt="chopsticks"/></h4>
      <p>If you already have a chopsticks card in your purple rectangle, you may take 2 sushi cards on a future turn! Instead of taking one card from your hand, you will take 2 cards from the hand and put the chopsticks card back in the pink rectangle to pass it back to the next person.</p>
      <p>Note: you may have multiple chopsticks cards in your purple rectangle but you may only use 1 per turn.</p>
      <h3>Scoring</h3>
      <p>At the end of the round you will score everyone's hands.</p>
      <h4>Maki Rolls  <img src={maki1} alt="maki1"/> <img src={maki2} alt="maki2"/> <img src={maki3} alt="maki3"/></h4>
      <p>The player with the most Maki Rolls scores 6 points. The player with the second most Maki Rolls scores 3 points. If multiple players tie for second place, they split the points evenly (ignoring any remainder).</p>
      <h4>Tempura <img src={tempura} alt="tempura"/></h4>
      <p>A set of 2 tempura cards scores 5 points. A single tempura card is worth nothing. You may score multiple sets of tempura in a round.</p>
      <h4>Sashimi  <img src={sashimi} alt="sashimi"/></h4>
      <p>A set of 3 sashimi cards scores 10 points. A single sashimi card or a set of only 2 is worth nothing. You may score multiple sets of sashimi in a round, although this is very hard to do!</p>
      <h4>Dumplings <img src={dumpling} alt="dumpling"/></h4>
      <p>The more dumpling cards you have, the more points you will score. 1 dumpling card scores 1 point, 2 dumpling cards scores 3 points, 3 dumpling cards scores 6 points, 4 dumpling cards scores 10 points, and 5 or more dumpling cards scores 15 points.</p>
      <h4>Nigiri and Wasabi  <img src={salmonnigiri} alt="salmonnigiri"/> <img src={squidnigiri} alt="squidnigiri"/> <img src={eggnigiri} alt="eggnigiri"/> <img src={wasabi} alt="wasabi"/></h4>
      <p>A squid nigiri scores 3 points. If it is on top of a wasabi card it scores 9 points.</p>
      <p>A salmon nigiri scores 2 points. If it is on top of a wasabi card it scores 6 points.</p>
      <p>An egg nigiri scores 1 point. If it is on top of a wasabi card it scores 3 points.</p>
      <p>A wasabi card with no nigiri on it scores nothing.</p>
      <h4>Chopsticks <img src={chopsticks} alt="chopsticks"/></h4>
      <p>A chopsticks card scores nothing.</p>
      <h4>Puddings  <img src={pudding} alt="pudding"/></h4>
      <p>Wait to the end of the 3 rounds before scoring the pudding cards. Make sure to keep track of everyone's accumulated puddings in the scorecard at the top right of the screen.</p>
      <p>At the end of the 3 rounds, the player with the most pudding cards scores 6 points. If multiple players tie for the most, they split the points evenly (ignoring any remainder).</p>
      <p>The player with the fewest pudding cards (including players with none) loses 6 points. If multiple players tie for the least, they split the lost points evenly (ignoring any remainder).</p>
      <p>On the rare occasion that all players have the same number of pudding cards, no one scores anything for them.</p>
      <p></p>
      <p>Make sure to keep track of everyone's scores using the scorecard at the top right of the screen. Don't forget to keep track of your pudding cards for scoring at the end of the 3 rounds.</p>
      <p>After scoring the round, everyone can press the Play Again button to start the next round. When the next round of cards is dealt, it will be reshuffled but not including the pudding cards that people have already accumulated in previous rounds.</p>
      <p>At the end of the 3 rounds (don't forget to score the puddings!), the player with the most points is the winner!</p>
      <p>You may reset the scorecards and press Play again to start another 3 rounds!</p>
    </div>
  )
};

export default Rules;