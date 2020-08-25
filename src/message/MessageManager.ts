import { Message } from './Message';
import { UserAbstract } from '../user/UserAbstract';
import { Player } from '../user/Player';
import { CardFactory } from '../card/CardFactory';
import { MessageConstants } from './MessageConstants';

export class MessageManager {

  static deal (msg: Message, user: UserAbstract) {
    switch (msg.type) {
      case 10001:
        // 初始化消息
        user.name = msg.body.name;
        user.avatar = msg.body.avatar;
        break;
      case 10002:
        // 用户进入房间
        user.enterRoom(msg);
      case 10003:
        // 用户离开房间
        user.enterRoom(msg);
      case 10004:
        // 出牌消息
        const card = CardFactory.getNewCard(msg.body);
        if (user instanceof Player) {
          user.playCard(card);
        }
        break;
      case 10005:
        const message = MessageConstants.TEXT_MESSAGE(msg.body.text);
        // 说话消息
        user.speak(message);
        break;
    }
  }
}