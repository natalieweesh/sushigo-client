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
import './Cheatsheet.css';

const Cheatsheet = () => {
  return (
    <div className="instructions scoringGuide">
      <h2>Scoring Guide</h2>
      <h3>Maki Rolls</h3>
      <table>
        <tr>
          <td>
            <img src={maki1} alt="maki1" />
            <img src={maki2} alt="maki2" />
            <img src={maki3} alt="maki3" />
          </td>
          <td>
            <p>Most: 6</p>
            <p>Second: 3</p>
            <p>Split ties</p>
          </td>
        </tr>
      </table>
      <h3>Tempura</h3>
      <table>
        <tr>
          <td>
            <img src={tempura} alt="tempura" />
          </td>
          <td>
            <p>Set of 2: 5</p>
            <p>Otherwise: 0</p>
          </td>
        </tr>
      </table>
      <h3>Sashimi</h3>
      <table>
        <tr>
          <td>
            <img src={sashimi} alt="sashimi" />
          </td>
          <td>
            <p>Set of 3: 10</p>
            <p>Otherwise: 0</p>
          </td>
        </tr>
      </table>
      <h3>Dumplings</h3>
      <table>
        <tr>
          <td>
            <img src={dumpling} alt="dumpling" />
          </td>
          <td>
            <p>Set of 1: 1</p>
            <p>Set of 2: 3</p>
            <p>Set of 3: 6</p>
            <p>Set of 4: 10</p>
            <p>Set of 5+: 15</p>
          </td>
        </tr>
      </table>
      <h3>Nigiri</h3>
      <table>
        <tr>
          <td>
            <img src={salmonnigiri} alt="salmonnigiri" />
            <img src={squidnigiri} alt="squidnigiri" />
            <img src={eggnigiri} alt="eggnigiri" />
          </td>
          <td>
            <p>Squid: 3</p>
            <p>Salmon: 2</p>
            <p>Egg: 1</p>
          </td>
        </tr>
      </table>
      <h3>Wasabi</h3>
      <table>
        <tr>
          <td>
            <img src={wasabi} alt="wasabi" />
          </td>
          <td>
            <p>Triples the value of next nigiri</p>
          </td>
        </tr>
      </table>
      <h3>Chopsticks</h3>
      <table>
        <tr>
          <td>
            <img src={chopsticks} alt="chopsticks" />
          </td>
          <td>
            <p>Use on a later turn to swap for 2 cards</p>
          </td>
        </tr>
      </table>
      <h3>Puddings</h3>
      <table>
        <tr>
          <td>
            <img src={pudding} alt="pudding" />
          </td>
          <td>
            <p>Score at the end of 3 rounds:</p>
            <p>Most: 6</p>
            <p>Least: -6</p>
            <p>Split ties</p>
          </td>
        </tr>
      </table>
    </div>
  )
};

export default Cheatsheet;