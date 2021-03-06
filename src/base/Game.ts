import { Player } from '../user/Player';
import { Situation } from './Situation';
import { CardQueue } from './CardQueue';
import { BaseCard } from '../card/BaseCard';

export class Game {
  situation: Situation; // 当前局势，（颜色，数值，方向，加牌量）
  curPlayer: Player; // 当前用户指轮到出牌的用户
  cardQueue: CardQueue;
  gameRunning = true;

  // 出牌的方法
  play (card: BaseCard) {
    // todo 这个null，是需要用特殊牌来代替，还是就是null
    if (card === null) {
      this.affectUser(this.curPlayer);
    } else {
      this.cardEffect(card);
    }
    // 处理后，通知下一个玩家出牌
    this.curPlayer.notifyUserTurn()
  }

  cardEffect (card: BaseCard) {
    card.effect(this.situation);
  }

  affectUser (user: Player = this.curPlayer) {
    const cards = this.cardQueue.getCards(this.situation.total)
    console.debug(cards)
    user.cards.push(...cards);
    this.situation.clearTotal()
  }

}